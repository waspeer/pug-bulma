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

  // sort class attribute
  newHtmlString = newHtmlString.replace(
    /class="([^"]*)"/,
    (match, classList) => {
      classList = classList.split(" ");
      const newClassList = classList.sort().join(" ");
      return `class="${newClassList}"`;
    }
  );

  return newHtmlString;
}

/*
 * RENDERERS
 */

function createHtmlRenderer(renderStrategy) {
  let properties = {
    classes: [],
    block: ""
  };
  return {
    addClass: (...newClasses) => {
      properties.classes = properties.classes.concat(newClasses);
    },
    setBlock: newBlock => {
      properties.block = newBlock;
    },
    set: (property, value) => {
      properties[property] = value;
    },
    render: () => renderStrategy(properties)
  };
}

// creates a pug renderer that renders the mixin type that is tested with
// the specified classes and content
function createActualRenderer(mixinName, mixinPath, mixinTypeAttributes = {}) {
  const renderStrategy = properties => {
    const { classes, block } = properties;
    const extraProperties = Object.keys(properties)
      .filter(property => !(property == "classes" || property == "block"))
      .reduce((acc, property) => {
        acc[property] = properties[property];
        return acc;
      }, {});

    let mixinAttributes = {};
    if (mixinTypeAttributes)
      Object.assign(mixinAttributes, mixinTypeAttributes);
    if (classes && classes.length) mixinAttributes.class = classes;
    if (extraProperties) Object.assign(mixinAttributes, extraProperties);
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
  const tmplPlaceholder = "{{BLOCK}}";

  const renderStrategy = ({ classes = [], block = "" }) => {
    let htmlString = expectedTpl
      .replace(/class="([^"]*)"/, (match, classList) => {
        const newClassList = classList
          .split("\n")
          .concat(classes)
          .join(" ");
        return `class="${newClassList}"`;
      })
      .replace(tmplPlaceholder, block);

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
          render: () => renderStrategy(),
          actual,
          expected
        };
      };

      tests(descriptor, setup);
    });
  };
}
