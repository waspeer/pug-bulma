import commonTests from "../_commonTests";
import colorTests from "../_colorTests";
import sizeTests from "../_sizeTests";
import modifierTests from "../_modifierTests";
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

const buttonModifierMap = {
  // DISPLAYS
  fullwidth: "is-fullwidth",

  // STYLES
  outlined: "is-outlined",
  inverted: "is-inverted",
  rounded: "is-rounded",

  // STATES
  hovered: "is-hovered",
  focused: "is-focused",
  active: "is-active",
  loading: "is-loading",
  static: "is-static",

  // GROUPING
  selected: "is-selected"
};

commonTests(buttonContext);

colorTests(buttonContext);

sizeTests(buttonContext);

modifierTests(buttonContext, buttonModifierMap);

// test for disabled state seperately
testWrapper((descriptor, setup) => {
  test(`disabled ${descriptor}`, t => {
    const { setAttribute, render } = setup();
    setAttribute("disabled", true);
    const { actual, expected } = render();
    t.is(actual, expected);
  });
})(buttonContext);
