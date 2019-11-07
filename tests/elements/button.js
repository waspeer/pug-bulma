import test from "ava";
import { pug, commonTests } from "../_utils";

commonTests({
  name: "button",
  mixinPath: "/elements/button",
  types: [
    {
      type: "<button> type",
      expectedTpl: '<button class="button">{{BLOCK}}</button>'
    }
  ]
});
