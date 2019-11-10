import commonTests from "../_commonTests";
import modifierTests from "../_modifierTests";

const buttonsContext = {
  name: "buttons",
  mixinPath: "/elements/buttons",
  types: [
    {
      type: "generic",
      expectedTpl: '<div class="buttons">{{BLOCK}}</div>'
    }
  ]
};

const buttonsModifierMap = {
  // SIZES
  small: "are-small",
  medium: "are-medium",
  large: "are-large",

  // GENERAL
  addons: "has-addons",

  // ALIGNMENT
  centered: "is-centered",
  right: "is-right"
};

commonTests(buttonsContext);

modifierTests(buttonsContext, buttonsModifierMap);
