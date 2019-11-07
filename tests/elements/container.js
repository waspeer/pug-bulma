import test from "ava";
import { commonTests } from "../_utils";

commonTests({
  name: "container",
  mixinPath: "/elements/container",
  types: [
    {
      type: "generic",
      expectedTpl: '<div class="container">{{BLOCK}}</div>'
    },
    {
      type: "fuid",
      mixinAttributes: { fluid: true },
      expectedTpl: '<div class="container is-fluid">{{BLOCK}}</div>'
    }
  ]
});
