"use strict";

import pug from "pug";
import { resolve } from "path";
import test from "ava";

/*
 * NORMALIZERS
 */

// remove excess tabs from pug string created as a multiline string
function normalizePugString(string) {
  if (!string.length) return "";
  let lines = string.split("\n");
  const firstLineIndex = lines[0] === "" ? 1 : 0;
  const tabLength = lines[firstLineIndex].match(/^[\t\s]*/g)[0].length;
  return lines
    .map(line => (line.length < tabLength ? line : line.slice(tabLength)))
    .join("\n")
    .trim();
}

// normalize html string so html rendered by pug and expected html string
// can be compared
function normalizeHtmlString(htmlString) {
  let newHtmlString = htmlString;

  newHtmlString = newHtmlString
    // sort class attribute
    .replace(/class="([^"]*)"/, (match, classList) => {
      classList = classList.split(" ");
      const newClassList = classList.sort().join(" ");
      return `class="${newClassList}"`;
    })
    // sort attributes
    .replace(/(\s\w*(?:="[^"]*")?)+/, attributes => {
      const unsortedAttributes = htmlString
        .match(/<([^>]*)>/)[0]
        .match(/(\s\w*(?:="[^"]*")?)/g);
      return unsortedAttributes === null
        ? attributes
        : unsortedAttributes.sort().join("");
    });

  return newHtmlString;
}

/*
 * RENDERERS
 */

// abstract html renderer
function createHtmlRenderer(renderStrategy) {
  let properties = {
    classes: [],
    block: "",
    attributes: {}
  };
  return {
    addClass: (...newClasses) => {
      properties.classes = properties.classes.concat(newClasses);
    },
    setBlock: newBlock => {
      properties.block = newBlock;
    },
    setAttribute: (attribute, value) => {
      properties.attributes[attribute] = value;
    },
    render: () => renderStrategy(properties)
  };
}

// creates a pug renderer that renders the mixin type that is tested with
// the specified classes and content
function createActualRenderer(mixinName, mixinPath, mixinTypeAttributes = {}) {
  const renderStrategy = properties => {
    const { classes, block, attributes } = properties;

    let mixinAttributes = {};
    if (mixinTypeAttributes)
      Object.assign(mixinAttributes, mixinTypeAttributes);
    if (classes && classes.length) mixinAttributes.class = classes;
    if (Object.keys(attributes).length)
      Object.assign(mixinAttributes, attributes);
    const mixinAttributesString = Object.keys(mixinAttributes).length
      ? `&attributes(${JSON.stringify(mixinAttributes)})`
      : "";

    const blockLines = block
      ? normalizePugString(block)
          .split("\n")
          .map(line => "\t" + line)
      : [];

    const pugString = [
      `include ${mixinPath}`,
      `+${mixinName}${mixinAttributesString}`
    ]
      .concat(blockLines)
      .join("\n");

    const htmlString = pug.render(pugString, {
      basedir: resolve("./src/")
    });

    return normalizeHtmlString(htmlString);
  };

  return createHtmlRenderer(renderStrategy);
}

// creates a renderer that modifies the template string of the type that is
// tested with the specified classes and content
function createExpectedRenderer(expectedTpl) {
  const BLOCK_PLACEHOLDER = "{{BLOCK}}";
  const ATTRIBUTES_PLACEHOLDER = "{{ATTRIBUTES}}";

  const renderStrategy = properties => {
    const { classes, block, attributes } = properties;

    let attributesString = Object.keys(attributes)
      .map(attribute => {
        const attributeValue = attributes[attribute];
        if (attributeValue === false) return false;
        return (
          attribute +
          (attributeValue === true ? `="${attribute}"` : `="${attributeValue}"`)
        );
      })
      .filter(attributeString => attributeString !== false)
      .join(" ");

    let htmlString = expectedTpl
      .replace(/class="([^"]*)"/, (match, classList) => {
        const newClassList = classList
          .split("\n")
          .concat(classes)
          .join(" ");
        return `class="${newClassList}"`;
      })
      .replace(BLOCK_PLACEHOLDER, block)
      .replace(
        ATTRIBUTES_PLACEHOLDER,
        attributesString.length ? " " + attributesString : ""
      );

    return normalizeHtmlString(htmlString);
  };

  return createHtmlRenderer(renderStrategy);
}

/*
 * TEST WRAPPER
 */

// wrapper that takes a function with arguments: descriptor (the descriptor of
// the type tested, eg generic box) and setup (a function that can be called
// at the beginning of every test which returns an object with methods to modify
// the classes and content of the html generated).
// it returns a function that runs the tests when it is provided with information
// about the specific type tested.
export function testWrapper(tests) {
  return function({ name, mixinPath, types }) {
    types.forEach(typeInfo => {
      let { type = "", mixinAttributes, expectedTpl } = typeInfo;
      const descriptor = (type === "" ? "" : type + " ") + name;
      const setup = () => {
        const actual = createActualRenderer(name, mixinPath, mixinAttributes);
        const expected = createExpectedRenderer(expectedTpl);
        const renderStrategy = (classes = [], block = "") => {
          return {
            actual: actual.render(),
            expected: expected.render()
          };
        };
        return {
          addClass: (...classes) => {
            actual.addClass(...classes);
            expected.addClass(...classes);
          },
          setBlock: block => {
            actual.setBlock(block.pug);
            expected.setBlock(block.html);
          },
          setAttribute: (attribute, value) => {
            actual.setAttribute(attribute, value);
            expected.setAttribute(attribute, value);
          },
          render: () => renderStrategy(),
          actual,
          expected
        };
      };

      tests(descriptor, setup);
    });
  };
}
