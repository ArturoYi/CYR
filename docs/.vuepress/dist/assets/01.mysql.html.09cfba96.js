import { r as resolveComponent, o as openBlock, b as createElementBlock, e as createBaseVNode, d as createVNode, F as Fragment, f as createTextVNode, a as createStaticVNode } from "./app.9fb5aa08.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", {
  id: "mysql",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#mysql",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" MySQL")
], -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("p", null, "\u6570\u636E\u7B80\u5355\u6765\u8BF4\u5C31\u662F\u5B58\u50A8\u6570\u636E\u7684\u5E93", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "\u5173\u7CFB\u578B\u6570\u636E\u5E93\uFF1AMySQL,oracle"),
  /* @__PURE__ */ createBaseVNode("li", null, "\u975E\u5173\u7CFB\u578B\u6570\u636E\u5E93\uFF1Aredis,mongodb")
], -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "\u5B89\u88C5",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#\u5B89\u88C5",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" \u5B89\u88C5")
], -1);
const _hoisted_5 = {
  href: "https://dev.mysql.com/downloads/mysql/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_6 = /* @__PURE__ */ createTextVNode("https://dev.mysql.com/downloads/mysql/");
const _hoisted_7 = /* @__PURE__ */ createStaticVNode('<ol><li><p>\u5EFA\u8BAE\u4E0D\u8981\u4F7F\u7528exe\uFF0C\u4F1A\u81EA\u52A8\u6DFB\u52A0\u5230\u6CE8\u518C\u8868\uFF0C\u5220\u9664\u65F6\u4F1A\u5BFC\u81F4\u4E00\u4E9B\u5947\u602A\u60C5\u51B5</p></li><li><p>\u538B\u7F29\u5305\u5B89\u88C5\u65B9\u4FBF\u5378\u8F7D\u548C\u7BA1\u7406</p><p>\u5B89\u88C5\u6559\u7A0B\u8FD9\u91CC\u4E0D\u518D\u8D58\u8FF0</p></li></ol><h2 id="\u5B89\u88C5-navicat" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-navicat" aria-hidden="true">#</a> \u5B89\u88C5 navicat</h2><h2 id="\u57FA\u672C\u547D\u4EE4\u884C" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u547D\u4EE4\u884C" aria-hidden="true">#</a> \u57FA\u672C\u547D\u4EE4\u884C</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>mysql -u root -p 123456\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>', 4);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    _hoisted_2,
    _hoisted_3,
    _hoisted_4,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_5, [
        _hoisted_6,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_7
  ], 64);
}
var _01_mysql_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { _01_mysql_html as default };
