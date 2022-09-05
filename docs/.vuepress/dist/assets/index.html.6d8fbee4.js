import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
var index_html_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  mounted() {
    const ifJanchor = document.getElementById("JanchorDown");
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement("a");
    a.id = "JanchorDown";
    a.className = "anchor-down";
    document.getElementsByClassName("hero")[0].append(a);
    let targetA = document.getElementById("JanchorDown");
    targetA.addEventListener("click", (e) => {
      this.scrollFn();
    });
  },
  methods: {
    scrollFn() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
var index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { index_html as default };
