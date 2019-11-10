import modifierTests from './_modifierTests';

const sizeMap = {
  small: 'is-small',
  normal: 'is-normal',
  medium: 'is-medium',
  large: 'is-large',
};

const sizeTests = (testContext) => modifierTests(testContext, sizeMap);

export default sizeTests;
