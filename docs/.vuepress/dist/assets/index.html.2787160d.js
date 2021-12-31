import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createVNode, w as withCtx, F as Fragment, b as createBaseVNode, d as createTextVNode } from "./app.a6f06224.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h3", {
  id: "_1\u30012\u30013",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#_1\u30012\u30013",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" 1\u30012\u30013")
], -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js line-numbers-mode" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" foo "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'foo'"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("div", { class: "line-numbers" }, [
    /* @__PURE__ */ createBaseVNode("span", { class: "line-number" }, "1"),
    /* @__PURE__ */ createBaseVNode("br")
  ])
], -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "language-javascript ext-js line-numbers-mode" }, [
  /* @__PURE__ */ createBaseVNode("pre", { class: "language-javascript" }, [
    /* @__PURE__ */ createBaseVNode("code", null, [
      /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "const"),
      /* @__PURE__ */ createTextVNode(" bar "),
      /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, "="),
      /* @__PURE__ */ createTextVNode(),
      /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'bar'"),
      /* @__PURE__ */ createTextVNode("\n")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("div", { class: "line-numbers" }, [
    /* @__PURE__ */ createBaseVNode("span", { class: "line-number" }, "1"),
    /* @__PURE__ */ createBaseVNode("br")
  ])
], -1);
function _sfc_render(_ctx, _cache) {
  const _component_CodeGroupItem = resolveComponent("CodeGroupItem");
  const _component_CodeGroup = resolveComponent("CodeGroup");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createVNode(_component_CodeGroup, null, {
      default: withCtx(() => [
        createVNode(_component_CodeGroupItem, { title: "FOO" }, {
          default: withCtx(() => [
            _hoisted_2
          ]),
          _: 1
        }),
        createVNode(_component_CodeGroupItem, { title: "BAR" }, {
          default: withCtx(() => [
            _hoisted_3
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
var index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index_html as default };
