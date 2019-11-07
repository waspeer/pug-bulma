import test from "ava";
import { commonTests } from "../_utils";

commonTests({
  name: "box",
  mixinPath: "/elements/box",
  types: [
    {
      type: "generic",
      expectedTpl: '<div class="box">{{BLOCK}}</div>'
    }
  ]
});
