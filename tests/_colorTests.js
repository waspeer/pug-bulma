import test from "ava";
import { testWrapper } from "./_utils";

const colorMap = {
  white: "is-white",
  black: "is-black",
  light: "is-light",
  dark: "is-dark",
  primary: "is-primary",
  link: "is-link",
  info: "is-info",
  success: "is-success",
  warning: "is-warning",
  danger: "is-danger"
};

const colorTests = testWrapper((descriptor, setup) => {
  // INDIVIDUAL COLORS
  test(`individual colors on ${descriptor}`, t => {
    Object.keys(colorMap).forEach(color => {
      const { actual, expected } = setup();
      actual.set(color, true);
      expected.addClass(colorMap[color]);
      t.is(
        actual.render(),
        expected.render(),
        `${descriptor} supports color ${color}`
      );
    });
  });

  // MULTIPLE COLORS
  test(`multiple colors on ${descriptor}`, t => {
    const { actual, expected } = setup();
    const colors = Object.keys(colorMap).slice(-3);
    colors.forEach(color => {
      actual.set(color, true);
      expected.addClass(colorMap[color]);
    });
    t.is(actual.render(), expected.render());
  });
});

export default colorTests;
