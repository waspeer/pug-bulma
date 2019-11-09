import commonTests from "../_commonTests";
import colorTests from "../_colorTests";
import sizeTests from "../_sizeTests";
import { testWrapper } from "../_utils";
import test from "ava";

const buttonContext = {
  name: "button",
  mixinPath: "/elements/button",
  types: [
    {
      type: "<button> type",
      expectedTpl: '<button class="button"{{ATTRIBUTES}}>{{BLOCK}}</button>'
    },
    {
      type: "<a> type",
      mixinAttributes: {
        type: "a"
      },
      expectedTpl: '<a class="button"{{ATTRIBUTES}}>{{BLOCK}}</a>'
    },
    {
      type: "<input type=submit> type",
      mixinAttributes: {
        type: "submit"
      },
      expectedTpl: '<input class="button" type="submit"{{ATTRIBUTES}}/>'
    },
    {
      type: "<input type=reset> type",
      mixinAttributes: {
        type: "reset"
      },
      expectedTpl: '<input class="button" type="reset"{{ATTRIBUTES}}/>'
    }
  ]
};

commonTests(buttonContext);

colorTests(buttonContext);

sizeTests(buttonContext);

testWrapper((descriptor, setup) => {
  // SUPPORTS FULLWIDTH MODIFIER
  test(`full-width ${descriptor}`, t => {
    const { actual, expected } = setup();
    actual.setAttribute("fullwidth", true);
    expected.addClass("is-fullwidth");
    t.is(actual.render(), expected.render());
  });

  // BUTTON STYLES
  const buttonStyleMap = {
    outlined: "is-outlined",
    inverted: "is-inverted",
    rounded: "is-rounded"
  };
  // individual styles
  Object.keys(buttonStyleMap).forEach(style => {
    test(`${style} ${descriptor}`, t => {
      const { actual, expected } = setup();
      actual.setAttribute(style, true);
      expected.addClass(buttonStyleMap[style]);
      t.is(actual.render(), expected.render());
    });
  });
  // combined styles
  test(`${descriptor} with combined styles`, t => {
    const { actual, expected } = setup();
    Object.keys(buttonStyleMap).forEach(style => {
      actual.setAttribute(style, true);
      expected.addClass(buttonStyleMap[style]);
    });
    t.is(actual.render(), expected.render());
  });

  // STATES
  const buttonStateMap = {
    hovered: "is-hovered",
    focused: "is-focused",
    active: "is-active",
    loading: "is-loading",
    static: "is-static"
  };
  // individual states
  Object.keys(buttonStateMap).forEach(state => {
    test(`${state} ${descriptor}`, t => {
      const { actual, expected } = setup();
      actual.setAttribute(state, true);
      expected.addClass(buttonStateMap[state]);
      t.is(actual.render(), expected.render());
    });
  });
  // combined styles
  test(`${descriptor} with combined states`, t => {
    const { actual, expected } = setup();
    Object.keys(buttonStateMap).forEach(state => {
      actual.setAttribute(state, true);
      expected.addClass(buttonStateMap[state]);
    });
    t.is(actual.render(), expected.render());
  });
  // test for disabled state seperately
  test(`disabled ${descriptor}`, t => {
    const { setAttribute, render } = setup();
    setAttribute("disabled", true);
    const { actual, expected } = render();
    t.is(actual, expected);
  });
})(buttonContext);
