import modifierTests from './_modifierTests';

const colorMap = {
  white: 'is-white',
  black: 'is-black',
  light: 'is-light',
  dark: 'is-dark',
  primary: 'is-primary',
  link: 'is-link',
  info: 'is-info',
  success: 'is-success',
  warning: 'is-warning',
  danger: 'is-danger',
  text: 'is-text',
};

const colorTests = (testContext) => modifierTests(testContext, colorMap);

export default colorTests;
