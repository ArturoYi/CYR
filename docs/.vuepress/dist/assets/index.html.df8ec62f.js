import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createVNode, w as withCtx, F as Fragment, b as createBaseVNode, d as createTextVNode } from "./app.70bbf807.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "clientonly\u4F7F\u7528\u7EC4\u4EF6",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#clientonly\u4F7F\u7528\u7EC4\u4EF6",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" ClientOnly\u4F7F\u7528\u7EC4\u4EF6")
], -1);
function _sfc_render(_ctx, _cache) {
  const _component_MyTemplate = resolveComponent("MyTemplate");
  const _component_ClientOnly = resolveComponent("ClientOnly");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createVNode(_component_ClientOnly, null, {
      default: withCtx(() => [
        createVNode(_component_MyTemplate)
      ]),
      _: 1
    })
  ], 64);
}
var index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index_html as default };
