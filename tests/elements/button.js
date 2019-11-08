import commonTests from "../_commonTests";

commonTests({
  name: "button",
  mixinPath: "/elements/button",
  types: [
    {
      type: "<button> type",
      expectedTpl: '<button class="button">{{BLOCK}}</button>'
    },
    {
      type: "<a> type",
      mixinAttributes: {
        type: "a"
      },
      expectedTpl: '<a class="button">{{BLOCK}}</a>'
    },
    {
      type: "<input type=submit> type",
      mixinAttributes: {
        type: "submit"
      },
      expectedTpl: '<input class="button" type="submit"/>'
    },
    {
      type: "<input type=reset> type",
      mixinAttributes: {
        type: "reset"
      },
      expectedTpl: '<input class="button" type="reset"/>'
    },
    {
      type: "white",
      mixinAttributes: {
        white: true
      },
      expectedTpl: '<button class="button is-white">{{BLOCK}}</button>'
    }
  ]
});
