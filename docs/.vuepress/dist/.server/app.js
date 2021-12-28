"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var vueRouter = require("vue-router");
var vue = require("vue");
var core = require("@vueuse/core");
var shared = require("@vuepress/shared");
var nprogress$1 = require("nprogress");
var serverRenderer = require("vue/server-renderer");
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var nprogress__namespace = /* @__PURE__ */ _interopNamespace(nprogress$1);
const ClientOnly = vue.defineComponent({
  setup(_, ctx) {
    const isMounted = vue.ref(false);
    vue.onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a, _b;
      return isMounted.value ? (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a) : null;
    };
  }
});
const pagesComponents = {
  "v-8daa1a0e": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return index_html$2;
  })),
  "v-6e6848ee": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text1_html$8;
  })),
  "v-3803ce0e": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text_html$b;
  })),
  "v-9b98914c": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text_html$9;
  })),
  "v-6e7820a0": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text_html$7;
  })),
  "v-74ac52d9": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text_html$5;
  })),
  "v-89e39176": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text1_html$6;
  })),
  "v-8679e038": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text2_html$5;
  })),
  "v-72bd4e03": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _____html$5;
  })),
  "v-7e09a6ba": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _____html$3;
  })),
  "v-576d49b2": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text1_html$4;
  })),
  "v-59222251": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return text2_html$3;
  })),
  "v-3706649a": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _404_html$2;
  }))
};
const pagesData$1 = {
  "v-8daa1a0e": () => Promise.resolve().then(function() {
    return index_html;
  }).then(({ data: data2 }) => data2),
  "v-6e6848ee": () => Promise.resolve().then(function() {
    return text1_html$2;
  }).then(({ data: data2 }) => data2),
  "v-3803ce0e": () => Promise.resolve().then(function() {
    return text_html$3;
  }).then(({ data: data2 }) => data2),
  "v-9b98914c": () => Promise.resolve().then(function() {
    return text_html$2;
  }).then(({ data: data2 }) => data2),
  "v-6e7820a0": () => Promise.resolve().then(function() {
    return text_html$1;
  }).then(({ data: data2 }) => data2),
  "v-74ac52d9": () => Promise.resolve().then(function() {
    return text_html;
  }).then(({ data: data2 }) => data2),
  "v-89e39176": () => Promise.resolve().then(function() {
    return text1_html$1;
  }).then(({ data: data2 }) => data2),
  "v-8679e038": () => Promise.resolve().then(function() {
    return text2_html$1;
  }).then(({ data: data2 }) => data2),
  "v-72bd4e03": () => Promise.resolve().then(function() {
    return _____html$1;
  }).then(({ data: data2 }) => data2),
  "v-7e09a6ba": () => Promise.resolve().then(function() {
    return _____html;
  }).then(({ data: data2 }) => data2),
  "v-576d49b2": () => Promise.resolve().then(function() {
    return text1_html;
  }).then(({ data: data2 }) => data2),
  "v-59222251": () => Promise.resolve().then(function() {
    return text2_html;
  }).then(({ data: data2 }) => data2),
  "v-3706649a": () => Promise.resolve().then(function() {
    return _404_html;
  }).then(({ data: data2 }) => data2)
};
const pagesData = vue.ref(pagesData$1);
const pageDataEmpty = vue.readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  excerpt: "",
  headers: []
});
const pageData = vue.ref(pageDataEmpty);
const usePageData = () => pageData;
const resolvePageData = async (pageKey) => {
  const pageDataResolver = pagesData.value[pageKey];
  if (!pageDataResolver) {
    return pageDataEmpty;
  }
  const pageData2 = await pageDataResolver();
  return pageData2 !== null && pageData2 !== void 0 ? pageData2 : pageDataEmpty;
};
if (false) {
  __VUE_HMR_RUNTIME__.updatePageData = (data2) => {
    pagesData.value[data2.key] = () => Promise.resolve(data2);
    if (data2.key === pageData.value.key) {
      pageData.value = data2;
    }
  };
}
const pageFrontmatterSymbol = Symbol("");
const usePageFrontmatter = () => {
  const pageFrontmatter = vue.inject(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
const resolvePageFrontmatter = (pageData2) => pageData2.frontmatter;
const pageHeadSymbol = Symbol("");
const usePageHead = () => {
  const pageHead = vue.inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
const resolvePageHead = (headTitle, frontmatter, siteLocale) => {
  const description = shared.isString(frontmatter.description) ? frontmatter.description : siteLocale.description;
  const head = [
    ...shared.isArray(frontmatter.head) ? frontmatter.head : [],
    ...siteLocale.head,
    ["title", {}, headTitle],
    ["meta", { name: "description", content: description }]
  ];
  return shared.dedupeHead(head);
};
const pageHeadTitleSymbol = Symbol("");
const resolvePageHeadTitle = (page, siteLocale) => `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`;
const pageLangSymbol = Symbol("");
const usePageLang = () => {
  const pageLang = vue.inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
const resolvePageLang = (pageData2) => pageData2.lang || "en";
const routeLocaleSymbol = Symbol("");
const useRouteLocale = () => {
  const routeLocale = vue.inject(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
const resolveRouteLocale = (locales2, routePath) => shared.resolveLocalePath(locales2, routePath);
const siteData$1 = {
  "base": "/",
  "lang": "zh-CN",
  "title": "IUUI",
  "description": "IUUI",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/images/favicon.ico"
      }
    ]
  ],
  "locales": {}
};
const siteData = vue.ref(siteData$1);
const useSiteData = () => siteData;
if (false) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data2) => {
    siteData.value = data2;
  };
}
const siteLocaleDataSymbol = Symbol("");
const useSiteLocaleData = () => {
  const siteLocaleData = vue.inject(siteLocaleDataSymbol);
  if (!siteLocaleData) {
    throw new Error("useSiteLocaleData() is called without provider.");
  }
  return siteLocaleData;
};
const resolveSiteLocaleData = (site, routeLocale) => __spreadValues(__spreadValues({}, site), site.locales[routeLocale]);
const setupUpdateHead = () => {
  vueRouter.useRoute();
  const head = usePageHead();
  const lang = usePageLang();
  {
    const ssrContext = vue.useSSRContext();
    if (ssrContext) {
      ssrContext.head = head.value;
      ssrContext.lang = lang.value;
    }
    return;
  }
};
const Content = (props) => {
  let key;
  if (props.pageKey) {
    key = props.pageKey;
  } else {
    const page = usePageData();
    key = page.value.key;
  }
  const component = pagesComponents[key];
  if (component) {
    return vue.h(component);
  }
  return vue.h("div", "404 Not Found");
};
Content.displayName = "Content";
Content.props = {
  pageKey: {
    type: String,
    required: false
  }
};
const layoutComponents = {
  "404": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _404;
  })),
  "Layout": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Layout;
  }))
};
const Vuepress = vue.defineComponent({
  name: "Vuepress",
  setup() {
    const page = usePageData();
    const layoutComponent = vue.computed(() => {
      let layoutName;
      if (page.value.path) {
        const frontmatterLayout = page.value.frontmatter.layout;
        if (shared.isString(frontmatterLayout)) {
          layoutName = frontmatterLayout;
        } else {
          layoutName = "Layout";
        }
      } else {
        layoutName = "404";
      }
      return layoutComponents[layoutName] || vue.resolveComponent(layoutName, false);
    });
    return () => vue.h(layoutComponent.value);
  }
});
const defineClientAppEnhance = (clientAppEnhance) => clientAppEnhance;
const defineClientAppSetup = (clientAppSetup) => clientAppSetup;
const withBase = (url) => {
  if (shared.isLinkHttp(url))
    return url;
  const base = useSiteData().value.base;
  return `${base}${shared.removeLeadingSlash(url)}`;
};
var vars$4 = "";
var externalLinkIcon = "";
const svg = vue.h("svg", {
  "class": "external-link-icon",
  "xmlns": "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  "focusable": "false",
  "x": "0px",
  "y": "0px",
  "viewBox": "0 0 100 100",
  "width": "15",
  "height": "15"
}, [
  vue.h("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  vue.h("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = (_, { slots }) => {
  var _a;
  return vue.h("span", [svg, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
};
ExternalLinkIcon.displayName = "ExternalLinkIcon";
var clientAppEnhance0 = defineClientAppEnhance(({ app }) => {
  app.component("ExternalLinkIcon", ExternalLinkIcon);
});
var vars$3 = "";
var mediumZoom = "";
var clientAppEnhance1 = defineClientAppEnhance(({ app, router }) => {
  return;
});
const themeData$1 = {
  "nextLinks": true,
  "prevLinks": true,
  "search": true,
  "editLink": false,
  "logo": "/images/favicon.ico",
  "navbar": [
    {
      "text": "\u9996\u9875",
      "link": "/"
    },
    {
      "text": "\u524D\u7AEF",
      "children": [
        {
          "text": "vue",
          "children": [
            {
              "text": "vue1",
              "link": "/web/vue/text1.md"
            }
          ]
        },
        {
          "text": "html",
          "children": [
            {
              "text": "html1",
              "link": "/web/html/text1.md"
            }
          ]
        },
        {
          "text": "css",
          "children": [
            {
              "text": "CSS1",
              "link": "https://www.baidu.com/"
            }
          ]
        },
        {
          "text": "JavaScript",
          "children": [
            {
              "text": "\u300AJavaScript\u6559\u7A0B\u300B",
              "link": "/web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.md"
            }
          ]
        },
        {
          "text": "ES6",
          "children": [
            {
              "text": "ES6",
              "link": "https://www.baidu.com/"
            }
          ]
        }
      ]
    },
    {
      "text": "\u5176\u5B83",
      "children": [
        {
          "text": "\u552F\u9E21\u6C64",
          "link": "/guide/\u9E21\u6C64/text.md"
        },
        {
          "text": "\u6559\u7A0B",
          "link": "/guide/\u6559\u7A0B/text.md"
        },
        {
          "text": "\u9762\u8BD5",
          "link": "/guide/\u9762\u8BD5/text.md"
        },
        {
          "text": "\u968F\u7B14",
          "link": "/guide/\u968F\u7B14/text.md"
        }
      ]
    }
  ],
  "sidebarDepth": 2,
  "sidebar": {
    "/guide/\u9762\u8BD5/": [
      {
        "text": "\u9762\u8BD5",
        "children": [
          "text.md"
        ]
      }
    ],
    "/web/vue/": [
      {
        "text": "\u6807\u9898",
        "children": [
          "text2.md",
          "text1.md"
        ]
      }
    ],
    "/web/html/": [
      {
        "text": "\u6807\u9898",
        "children": [
          "/web/html/text2.md",
          "/web/html/text1.md"
        ]
      }
    ],
    "/web/JavaScript/": [
      {
        "text": "\u300AJavaScript\u6559\u7A0B\u300B",
        "children": [
          "\u5165\u95E8\u5BFC\u8BBA.md",
          "\u6570\u636E\u7C7B\u578B.md"
        ]
      }
    ],
    "/": [
      ""
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
};
const themeData = vue.ref(themeData$1);
const useThemeData = () => themeData;
if (false) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data2) => {
    themeData.value = data2;
  };
}
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = vue.inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  var _a;
  return __spreadValues(__spreadValues({}, theme), (_a = theme.locales) === null || _a === void 0 ? void 0 : _a[routeLocale]);
};
var clientAppEnhance2 = defineClientAppEnhance(({ app }) => {
  const themeData2 = useThemeData();
  const routeLocale = app._context.provides[routeLocaleSymbol];
  const themeLocaleData = vue.computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
  app.provide(themeLocaleDataSymbol, themeLocaleData);
  Object.defineProperties(app.config.globalProperties, {
    $theme: {
      get() {
        return themeData2.value;
      }
    },
    $themeLocale: {
      get() {
        return themeLocaleData.value;
      }
    }
  });
});
const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: false,
      default: "tip"
    },
    text: {
      type: String,
      required: false,
      default: ""
    },
    vertical: {
      type: String,
      required: false,
      default: void 0
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: ["badge", __props.type],
        style: {
          verticalAlign: __props.vertical
        }
      }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${serverRenderer.ssrInterpolate(__props.text)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/Badge.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
var CodeGroup = vue.defineComponent({
  name: "CodeGroup",
  setup(_, { slots }) {
    const activeIndex = vue.ref(-1);
    const tabRefs = vue.ref([]);
    const activateNext = (i = activeIndex.value) => {
      if (i < tabRefs.value.length - 1) {
        activeIndex.value = i + 1;
      } else {
        activeIndex.value = 0;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const activatePrev = (i = activeIndex.value) => {
      if (i > 0) {
        activeIndex.value = i - 1;
      } else {
        activeIndex.value = tabRefs.value.length - 1;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const keyboardHandler = (event, i) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = i;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext(i);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev(i);
      }
    };
    return () => {
      var _a;
      const items = (((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || []).filter((vnode) => vnode.type.name === "CodeGroupItem").map((vnode) => {
        if (vnode.props === null) {
          vnode.props = {};
        }
        return vnode;
      });
      if (items.length === 0) {
        return null;
      }
      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        activeIndex.value = items.findIndex((vnode) => vnode.props.active === "" || vnode.props.active === true);
        if (activeIndex.value === -1) {
          activeIndex.value = 0;
        }
      } else {
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value;
        });
      }
      return vue.h("div", { class: "code-group" }, [
        vue.h("div", { class: "code-group__nav" }, vue.h("ul", { class: "code-group__ul" }, items.map((vnode, i) => {
          const isActive = i === activeIndex.value;
          return vue.h("li", { class: "code-group__li" }, vue.h("button", {
            ref: (element) => {
              if (element) {
                tabRefs.value[i] = element;
              }
            },
            class: {
              "code-group__nav-tab": true,
              "code-group__nav-tab-active": isActive
            },
            ariaPressed: isActive,
            ariaExpanded: isActive,
            onClick: () => activeIndex.value = i,
            onKeydown: (e) => keyboardHandler(e, i)
          }, vnode.props.title));
        }))),
        items
      ]);
    };
  }
});
const __default__$1 = vue.defineComponent({
  name: "CodeGroupItem"
});
const _sfc_main$t = /* @__PURE__ */ vue.defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: ["code-group-item", { "code-group-item__active": __props.active }],
        "aria-selected": __props.active
      }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
}));
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/CodeGroupItem.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const darkModeSymbol = Symbol("");
const useDarkMode = () => {
  const isDarkMode = vue.inject(darkModeSymbol);
  if (!isDarkMode) {
    throw new Error("useDarkMode() is called without provider.");
  }
  return isDarkMode;
};
const setupDarkMode = () => {
  const themeLocale = useThemeLocaleData();
  const isDarkPreferred = core.usePreferredDark();
  const darkStorage = core.useStorage("vuepress-color-scheme", "auto");
  const isDarkMode = vue.computed({
    get() {
      if (!themeLocale.value.darkMode) {
        return false;
      }
      if (darkStorage.value === "auto") {
        return isDarkPreferred.value;
      }
      return darkStorage.value === "dark";
    },
    set(val) {
      if (val === isDarkPreferred.value) {
        darkStorage.value = "auto";
      } else {
        darkStorage.value = val ? "dark" : "light";
      }
    }
  });
  vue.provide(darkModeSymbol, isDarkMode);
  updateHtmlDarkClass(isDarkMode);
};
const updateHtmlDarkClass = (isDarkMode) => {
  const update = (value = isDarkMode.value) => {
    const htmlEl = window === null || window === void 0 ? void 0 : window.document.querySelector("html");
    htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.toggle("dark", value);
  };
  vue.onMounted(() => {
    vue.watch(isDarkMode, update, { immediate: true });
  });
  vue.onUnmounted(() => update());
};
const useResolveRouteWithRedirect = (...args) => {
  const router = vueRouter.useRouter();
  const route = router.resolve(...args);
  const lastMatched = route.matched[route.matched.length - 1];
  if (!(lastMatched === null || lastMatched === void 0 ? void 0 : lastMatched.redirect)) {
    return route;
  }
  const { redirect } = lastMatched;
  const resolvedRedirect = shared.isFunction(redirect) ? redirect(route) : redirect;
  const resolvedRedirectObj = shared.isString(resolvedRedirect) ? { path: resolvedRedirect } : resolvedRedirect;
  return useResolveRouteWithRedirect(__spreadValues({
    hash: route.hash,
    query: route.query,
    params: route.params
  }, resolvedRedirectObj));
};
const useNavLink = (item) => {
  const resolved = useResolveRouteWithRedirect(item);
  return {
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath
  };
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => promiseResolve = resolve);
  },
  resolve: () => {
    promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const sidebarItemsSymbol = Symbol("sidebarItems");
const useSidebarItems = () => {
  const sidebarItems = vue.inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
const setupSidebarItems = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  const sidebarItems = vue.computed(() => resolveSidebarItems(frontmatter.value, themeLocale.value));
  vue.provide(sidebarItemsSymbol, sidebarItems);
};
const resolveSidebarItems = (frontmatter, themeLocale) => {
  var _a, _b, _c, _d;
  const sidebarConfig = (_b = (_a = frontmatter.sidebar) !== null && _a !== void 0 ? _a : themeLocale.sidebar) !== null && _b !== void 0 ? _b : "auto";
  const sidebarDepth = (_d = (_c = frontmatter.sidebarDepth) !== null && _c !== void 0 ? _c : themeLocale.sidebarDepth) !== null && _d !== void 0 ? _d : 2;
  if (frontmatter.home || sidebarConfig === false) {
    return [];
  }
  if (sidebarConfig === "auto") {
    return resolveAutoSidebarItems(sidebarDepth);
  }
  if (shared.isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, sidebarDepth);
  }
  if (shared.isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, sidebarDepth);
  }
  return [];
};
const headerToSidebarItem = (header, sidebarDepth) => ({
  text: header.title,
  link: `#${header.slug}`,
  children: headersToSidebarItemChildren(header.children, sidebarDepth)
});
const headersToSidebarItemChildren = (headers, sidebarDepth) => sidebarDepth > 0 ? headers.map((header) => headerToSidebarItem(header, sidebarDepth - 1)) : [];
const resolveAutoSidebarItems = (sidebarDepth) => {
  const page = usePageData();
  return [
    {
      text: page.value.title,
      children: headersToSidebarItemChildren(page.value.headers, sidebarDepth)
    }
  ];
};
const resolveArraySidebarItems = (sidebarConfig, sidebarDepth) => {
  const route = vueRouter.useRoute();
  const page = usePageData();
  const handleChildItem = (item) => {
    var _a;
    let childItem;
    if (shared.isString(item)) {
      childItem = useNavLink(item);
    } else {
      childItem = item;
    }
    if (childItem.children) {
      return __spreadProps(__spreadValues({}, childItem), {
        children: childItem.children.map((item2) => handleChildItem(item2))
      });
    }
    if (childItem.link === route.path) {
      const headers = ((_a = page.value.headers[0]) === null || _a === void 0 ? void 0 : _a.level) === 1 ? page.value.headers[0].children : page.value.headers;
      return __spreadProps(__spreadValues({}, childItem), {
        children: headersToSidebarItemChildren(headers, sidebarDepth)
      });
    }
    return childItem;
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, sidebarDepth) => {
  var _a;
  const route = vueRouter.useRoute();
  const sidebarPath = shared.resolveLocalePath(sidebarConfig, route.path);
  const matchedSidebarConfig = (_a = sidebarConfig[sidebarPath]) !== null && _a !== void 0 ? _a : [];
  return resolveArraySidebarItems(matchedSidebarConfig, sidebarDepth);
};
const useThemeLocaleData = () => useThemeLocaleData$1();
const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.ssrRenderComponent(vue.unref(ExternalLinkIcon), _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sr-only"${_scopeId}>${serverRenderer.ssrInterpolate(vue.unref(themeLocale).openInNewWindow)}</span>`);
          } else {
            return [
              vue.createVNode("span", { class: "sr-only" }, vue.toDisplayString(vue.unref(themeLocale).openInNewWindow), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/ExternalLinkIcon.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
var index = "";
var clientAppEnhance3 = defineClientAppEnhance(({ app, router }) => {
  app.component("Badge", _sfc_main$u);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", _sfc_main$t);
  delete app._context.components.ExternalLinkIcon;
  app.component("ExternalLinkIcon", _sfc_main$s);
  app.component("NavbarSearch", () => {
    const SearchComponent = app.component("Docsearch") || app.component("SearchBox");
    if (SearchComponent) {
      return vue.h(SearchComponent);
    }
    return null;
  });
  const scrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
var clientAppEnhance4 = ({ app }) => {
  app.component("MyTemplate", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return MyTemplate$1;
  })));
};
const useHotKeys = ({ input, hotKeys: hotKeys2 }) => {
  const onKeydown = (event) => {
    if (!input.value || hotKeys2.value.length === 0)
      return;
    if (event.target === document.body && hotKeys2.value.includes(event.key)) {
      input.value.focus();
      event.preventDefault();
    }
  };
  vue.onMounted(() => {
    document.addEventListener("keydown", onKeydown);
  });
  vue.onBeforeUnmount(() => {
    document.removeEventListener("keydown", onKeydown);
  });
};
const searchIndex$1 = [
  {
    "title": "",
    "headers": [],
    "path": "/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u9875\u9762\u7684\u6807\u9898",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/web/text1.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "1a",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/guide/%E6%95%99%E7%A8%8B/text.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "1a",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/guide/%E9%9A%8F%E7%AC%94/text.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "1a",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/guide/%E9%B8%A1%E6%B1%A4/text.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "1a",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/guide/%E9%9D%A2%E8%AF%95/text.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "html\u6807\u9898",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/web/html/text1.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "html2\u6807\u9898",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/web/html/text2.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u5165\u95E8\u5BFC\u8BBA",
    "headers": [
      {
        "level": 2,
        "title": "JavaScript\u4ECB\u7ECD",
        "slug": "javascript\u4ECB\u7ECD",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F7F\u7528\u9886\u57DF",
        "slug": "\u4F7F\u7528\u9886\u57DF",
        "children": []
      },
      {
        "level": 2,
        "title": "JavaScript \u4E0E Java \u7684\u5173\u7CFB",
        "slug": "javascript-\u4E0E-java-\u7684\u5173\u7CFB",
        "children": []
      },
      {
        "level": 2,
        "title": "JavaScript \u4E0E ECMAScript \u7684\u5173\u7CFB",
        "slug": "javascript-\u4E0E-ecmascript-\u7684\u5173\u7CFB",
        "children": []
      }
    ],
    "path": "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u6570\u636E\u7C7B\u578B",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "vue\u6807\u9898",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/web/vue/text1.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "vue2\u6807\u9898",
    "headers": [
      {
        "level": 2,
        "title": "3",
        "slug": "_3",
        "children": []
      },
      {
        "level": 2,
        "title": "4",
        "slug": "_4",
        "children": []
      }
    ],
    "path": "/web/vue/text2.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "",
    "headers": [],
    "path": "/404.html",
    "pathLocale": "/",
    "extraFields": []
  }
];
const searchIndex = vue.ref(searchIndex$1);
const useSearchIndex = () => searchIndex;
if (false) {
  __VUE_HMR_RUNTIME__.updateSearchIndex = (data2) => {
    searchIndex.value = data2;
  };
}
const nonASCIIRegExp = /[^\x00-\x7F]/;
const splitWords = (str) => str.split(/\s+/g).map((str2) => str2.trim()).filter((str2) => !!str2);
const escapeRegExp = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
const isQueryMatched = (query, toMatch) => {
  const toMatchStr = toMatch.join(" ");
  const words = splitWords(query);
  if (nonASCIIRegExp.test(query)) {
    return words.some((word) => toMatchStr.toLowerCase().indexOf(word) > -1);
  }
  const hasTrailingSpace = query.endsWith(" ");
  const searchRegex = new RegExp(words.map((word, index2) => {
    if (words.length === index2 + 1 && !hasTrailingSpace) {
      return `(?=.*\\b${escapeRegExp(word)})`;
    }
    return `(?=.*\\b${escapeRegExp(word)}\\b)`;
  }).join("") + ".+", "gi");
  return searchRegex.test(toMatchStr);
};
const useSearchSuggestions = ({ searchIndex: searchIndex2, routeLocale, query, maxSuggestions: maxSuggestions2 }) => {
  const localeSearchIndex = vue.computed(() => searchIndex2.value.filter((item) => item.pathLocale === routeLocale.value));
  return vue.computed(() => {
    const searchStr = query.value.trim().toLowerCase();
    if (!searchStr)
      return [];
    const suggestions = [];
    const matchPageHeader = (searchIndexItem, header) => {
      if (isQueryMatched(searchStr, [header.title])) {
        suggestions.push({
          link: `${searchIndexItem.path}#${header.slug}`,
          title: searchIndexItem.title,
          header: header.title
        });
      }
      for (const child of header.children) {
        if (suggestions.length >= maxSuggestions2.value) {
          return;
        }
        matchPageHeader(searchIndexItem, child);
      }
    };
    for (const searchIndexItem of localeSearchIndex.value) {
      if (suggestions.length >= maxSuggestions2.value) {
        break;
      }
      if (isQueryMatched(searchStr, [
        searchIndexItem.title,
        ...searchIndexItem.extraFields
      ])) {
        suggestions.push({
          link: searchIndexItem.path,
          title: searchIndexItem.title
        });
        continue;
      }
      for (const header of searchIndexItem.headers) {
        if (suggestions.length >= maxSuggestions2.value) {
          break;
        }
        matchPageHeader(searchIndexItem, header);
      }
    }
    return suggestions;
  });
};
const useSuggestionsFocus = (suggestions) => {
  const focusIndex = vue.ref(0);
  const focusNext = () => {
    if (focusIndex.value < suggestions.value.length - 1) {
      focusIndex.value += 1;
    } else {
      focusIndex.value = 0;
    }
  };
  const focusPrev = () => {
    if (focusIndex.value > 0) {
      focusIndex.value -= 1;
    } else {
      focusIndex.value = suggestions.value.length - 1;
    }
  };
  return {
    focusIndex,
    focusNext,
    focusPrev
  };
};
const SearchBox = vue.defineComponent({
  name: "SearchBox",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    },
    hotKeys: {
      type: Array,
      required: false,
      default: () => []
    },
    maxSuggestions: {
      type: Number,
      required: false,
      default: 5
    }
  },
  setup(props) {
    const { locales: locales2, hotKeys: hotKeys2, maxSuggestions: maxSuggestions2 } = vue.toRefs(props);
    const router = vueRouter.useRouter();
    const routeLocale = useRouteLocale();
    const searchIndex2 = useSearchIndex();
    const input = vue.ref(null);
    const isActive = vue.ref(false);
    const query = vue.ref("");
    const locale = vue.computed(() => {
      var _a;
      return (_a = locales2.value[routeLocale.value]) !== null && _a !== void 0 ? _a : {};
    });
    const suggestions = useSearchSuggestions({
      searchIndex: searchIndex2,
      routeLocale,
      query,
      maxSuggestions: maxSuggestions2
    });
    const { focusIndex, focusNext, focusPrev } = useSuggestionsFocus(suggestions);
    useHotKeys({ input, hotKeys: hotKeys2 });
    const showSuggestions = vue.computed(() => isActive.value && !!suggestions.value.length);
    const onArrowUp = () => {
      if (!showSuggestions.value) {
        return;
      }
      focusPrev();
    };
    const onArrowDown = () => {
      if (!showSuggestions.value) {
        return;
      }
      focusNext();
    };
    const goTo = (index2) => {
      if (!showSuggestions.value) {
        return;
      }
      const suggestion = suggestions.value[index2];
      if (!suggestion) {
        return;
      }
      router.push(suggestion.link).then(() => {
        query.value = "";
        focusIndex.value = 0;
      });
    };
    return () => vue.h("form", {
      class: "search-box",
      role: "search"
    }, [
      vue.h("input", {
        ref: input,
        type: "search",
        placeholder: locale.value.placeholder,
        autocomplete: "off",
        spellcheck: false,
        value: query.value,
        onFocus: () => isActive.value = true,
        onBlur: () => isActive.value = false,
        onInput: (event) => query.value = event.target.value,
        onKeydown: (event) => {
          switch (event.key) {
            case "ArrowUp": {
              onArrowUp();
              break;
            }
            case "ArrowDown": {
              onArrowDown();
              break;
            }
            case "Enter": {
              event.preventDefault();
              goTo(focusIndex.value);
              break;
            }
          }
        }
      }),
      showSuggestions.value && vue.h("ul", {
        class: "suggestions",
        onMouseleave: () => focusIndex.value = -1
      }, suggestions.value.map(({ link, title, header }, index2) => vue.h("li", {
        class: [
          "suggestion",
          {
            focus: focusIndex.value === index2
          }
        ],
        onMouseenter: () => focusIndex.value = index2,
        onMousedown: () => goTo(index2)
      }, vue.h("a", {
        href: link,
        onClick: (event) => event.preventDefault()
      }, [
        vue.h("span", {
          class: "page-title"
        }, title),
        header && vue.h("span", { class: "page-header" }, `> ${header}`)
      ]))))
    ]);
  }
});
var vars$2 = "";
var search = "";
const locales = { "/": { "placeholder": "\u641C\u7D22" } };
const hotKeys = ["s", "/"];
const maxSuggestions = 5;
var clientAppEnhance5 = defineClientAppEnhance(({ app }) => {
  app.component("SearchBox", (props) => vue.h(SearchBox, __spreadValues({
    locales,
    hotKeys,
    maxSuggestions
  }, props)));
});
const clientAppEnhances = [
  clientAppEnhance0,
  clientAppEnhance1,
  clientAppEnhance2,
  clientAppEnhance3,
  clientAppEnhance4,
  clientAppEnhance5
];
function r(r2, e, n) {
  var i, t, o;
  e === void 0 && (e = 50), n === void 0 && (n = {});
  var a = (i = n.isImmediate) != null && i, u = (t = n.callback) != null && t, c = n.maxWait, v = Date.now(), l = [];
  function f() {
    if (c !== void 0) {
      var r3 = Date.now() - v;
      if (r3 + e >= c)
        return c - r3;
    }
    return e;
  }
  var d = function() {
    var e2 = [].slice.call(arguments), n2 = this;
    return new Promise(function(i2, t2) {
      var c2 = a && o === void 0;
      if (o !== void 0 && clearTimeout(o), o = setTimeout(function() {
        if (o = void 0, v = Date.now(), !a) {
          var i3 = r2.apply(n2, e2);
          u && u(i3), l.forEach(function(r3) {
            return (0, r3.resolve)(i3);
          }), l = [];
        }
      }, f()), c2) {
        var d2 = r2.apply(n2, e2);
        return u && u(d2), i2(d2);
      }
      l.push({ resolve: i2, reject: t2 });
    });
  };
  return d.cancel = function(r3) {
    o !== void 0 && clearTimeout(o), l.forEach(function(e2) {
      return (0, e2.reject)(r3);
    }), l = [];
  }, d;
}
const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
var vars$1 = "";
var backToTop = "";
const BackToTop = vue.defineComponent({
  name: "BackToTop",
  setup() {
    const scrollTop = vue.ref(0);
    const show = vue.computed(() => scrollTop.value > 300);
    const onScroll = r(() => {
      scrollTop.value = getScrollTop();
    }, 100);
    vue.onMounted(() => {
      scrollTop.value = getScrollTop();
      window.addEventListener("scroll", () => onScroll());
    });
    const backToTopEl = vue.h("div", { class: "back-to-top", onClick: scrollToTop });
    return () => vue.h(vue.Transition, {
      name: "back-to-top"
    }, {
      default: () => show.value ? backToTopEl : null
    });
  }
});
const clientAppRootComponents = [
  BackToTop
];
var clientAppSetup0 = defineClientAppSetup(() => {
  return;
});
var vars = "";
var nprogress = "";
const useNprogress = () => {
  vue.onMounted(() => {
    const router = vueRouter.useRouter();
    const loadedPages = new Set();
    loadedPages.add(router.currentRoute.value.path);
    nprogress__namespace.configure({ showSpinner: false });
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress__namespace.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress__namespace.done();
    });
  });
};
var clientAppSetup1 = defineClientAppSetup(() => {
  useNprogress();
});
var clientAppSetup2 = defineClientAppSetup(() => {
  setupDarkMode();
  setupSidebarItems();
});
const clientAppSetups = [
  clientAppSetup0,
  clientAppSetup1,
  clientAppSetup2
];
const routeItems = [
  ["v-8daa1a0e", "/", { "title": "" }, ["/index.html", "/README.md"]],
  ["v-6e6848ee", "/web/text1.html", { "title": "\u9875\u9762\u7684\u6807\u9898" }, ["/web/text1", "/web/text1.md"]],
  ["v-3803ce0e", "/guide/%E6%95%99%E7%A8%8B/text.html", { "title": "1a" }, ["/guide/\u6559\u7A0B/text.html", "/guide/%E6%95%99%E7%A8%8B/text", "/guide/\u6559\u7A0B/text.md", "/guide/%E6%95%99%E7%A8%8B/text.md"]],
  ["v-9b98914c", "/guide/%E9%9A%8F%E7%AC%94/text.html", { "title": "1a" }, ["/guide/\u968F\u7B14/text.html", "/guide/%E9%9A%8F%E7%AC%94/text", "/guide/\u968F\u7B14/text.md", "/guide/%E9%9A%8F%E7%AC%94/text.md"]],
  ["v-6e7820a0", "/guide/%E9%B8%A1%E6%B1%A4/text.html", { "title": "1a" }, ["/guide/\u9E21\u6C64/text.html", "/guide/%E9%B8%A1%E6%B1%A4/text", "/guide/\u9E21\u6C64/text.md", "/guide/%E9%B8%A1%E6%B1%A4/text.md"]],
  ["v-74ac52d9", "/guide/%E9%9D%A2%E8%AF%95/text.html", { "title": "1a" }, ["/guide/\u9762\u8BD5/text.html", "/guide/%E9%9D%A2%E8%AF%95/text", "/guide/\u9762\u8BD5/text.md", "/guide/%E9%9D%A2%E8%AF%95/text.md"]],
  ["v-89e39176", "/web/html/text1.html", { "title": "html\u6807\u9898" }, ["/web/html/text1", "/web/html/text1.md"]],
  ["v-8679e038", "/web/html/text2.html", { "title": "html2\u6807\u9898" }, ["/web/html/text2", "/web/html/text2.md"]],
  ["v-72bd4e03", "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA.html", { "title": "\u5165\u95E8\u5BFC\u8BBA" }, ["/web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.html", "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA", "/web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.md", "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA.md"]],
  ["v-7e09a6ba", "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.html", { "title": "\u6570\u636E\u7C7B\u578B" }, ["/web/JavaScript/\u6570\u636E\u7C7B\u578B.html", "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B", "/web/JavaScript/\u6570\u636E\u7C7B\u578B.md", "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.md"]],
  ["v-576d49b2", "/web/vue/text1.html", { "title": "vue\u6807\u9898" }, ["/web/vue/text1", "/web/vue/text1.md"]],
  ["v-59222251", "/web/vue/text2.html", { "title": "vue2\u6807\u9898" }, ["/web/vue/text2", "/web/vue/text2.md"]],
  ["v-3706649a", "/404.html", {}, ["/404"]]
];
const pagesRoutes = routeItems.reduce((result, [name, path, meta, redirects]) => {
  result.push({
    name,
    path,
    component: Vuepress,
    meta
  }, ...redirects.map((item) => ({
    path: item,
    redirect: path
  })));
  return result;
}, [
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: Vuepress
  }
]);
const provideGlobalComputed = (app, router) => {
  const routeLocale = vue.computed(() => resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path));
  const siteLocaleData = vue.computed(() => resolveSiteLocaleData(siteData.value, routeLocale.value));
  const pageFrontmatter = vue.computed(() => resolvePageFrontmatter(pageData.value));
  const pageHeadTitle = vue.computed(() => resolvePageHeadTitle(pageData.value, siteLocaleData.value));
  const pageHead = vue.computed(() => resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
  const pageLang = vue.computed(() => resolvePageLang(pageData.value));
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
};
const registerGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
const appCreator = vue.createSSRApp;
const historyCreator = vueRouter.createMemoryHistory;
const createVueApp = async () => {
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      setupUpdateHead();
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup();
      }
      return () => [
        vue.h(vueRouter.RouterView),
        ...clientAppRootComponents.map((comp) => vue.h(comp))
      ];
    }
  });
  const router = vueRouter.createRouter({
    history: historyCreator(shared.removeEndingSlash(siteData.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a;
    if (to.path !== from.path || from === vueRouter.START_LOCATION) {
      [pageData.value] = await Promise.all([
        resolvePageData(to.name),
        (_a = pagesComponents[to.name]) === null || _a === void 0 ? void 0 : _a.__asyncLoader()
      ]);
    }
  });
  provideGlobalComputed(app, router);
  registerGlobalComponents(app);
  for (const clientAppEnhance of clientAppEnhances) {
    await clientAppEnhance({ app, router, siteData });
  }
  app.use(router);
  return {
    app,
    router
  };
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$r = {};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/index.html.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
var index_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender$d]]);
var index_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index_html$1
});
const _sfc_main$q = {};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/web/text1.html.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
var text1_html$7 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["ssrRender", _sfc_ssrRender$c]]);
var text1_html$8 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text1_html$7
});
const _sfc_main$p = {};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/guide/\u6559\u7A0B/text.html.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
var text_html$a = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$b]]);
var text_html$b = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text_html$a
});
const _sfc_main$o = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/guide/\u968F\u7B14/text.html.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
var text_html$8 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$a]]);
var text_html$9 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text_html$8
});
const _sfc_main$n = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/guide/\u9E21\u6C64/text.html.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
var text_html$6 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$9]]);
var text_html$7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text_html$6
});
const _sfc_main$m = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/guide/\u9762\u8BD5/text.html.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
var text_html$4 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$8]]);
var text_html$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text_html$4
});
const _sfc_main$l = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/web/html/text1.html.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
var text1_html$5 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$7]]);
var text1_html$6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text1_html$5
});
const _sfc_main$k = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/web/html/text2.html.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
var text2_html$4 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$6]]);
var text2_html$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text2_html$4
});
const _sfc_main$j = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_ExternalLinkIcon = vue.resolveComponent("ExternalLinkIcon");
  _push(`<!--[--><blockquote><p>\u672C\u7B14\u8BB0\u5185\u5BB9\u6574\u5408\u81EA<a href="https://wangdoc.com/javascript/index.html" target="_blank" rel="noopener noreferrer">https://wangdoc.com/javascript/index.html`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a>,\u6559\u7A0B\u7248\u6743\u5F52\u539F\u4F5C\u8005\u6240\u6709\u3002</p></blockquote><h2 id="javascript\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#javascript\u4ECB\u7ECD" aria-hidden="true">#</a> JavaScript\u4ECB\u7ECD</h2><p>JavaScript\u662F\u4E00\u79CD\u8F7B\u91CF\u7EA7\u7684\u811A\u672C\u8BED\u8A00\u3002\u6240\u8C13\u201C\u811A\u672C\u8BED\u8A00\u201D\uFF08script language\uFF09\uFF0C\u6307\u7684\u662F\u5B83\u4E0D\u5177\u5907\u5F00\u53D1\u64CD\u4F5C\u7CFB\u7EDF\u7684\u80FD\u529B\uFF0C\u800C\u662F\u53EA\u7528\u6765\u7F16\u5199\u63A7\u5236\u5176\u4ED6\u5927\u578B\u5E94\u7528\u7A0B\u5E8F\uFF08\u6BD4\u5982\u6D4F\u89C8\u5668\uFF09\u7684\u201C\u811A\u672C\u201D\u3002 </p><p>JavaScript \u4E5F\u662F\u4E00\u79CD\u5D4C\u5165\u5F0F\uFF08embedded\uFF09\u8BED\u8A00\u3002\u5B83\u672C\u8EAB\u63D0\u4F9B\u7684\u6838\u5FC3\u8BED\u6CD5\u4E0D\u7B97\u5F88\u591A\uFF0C\u53EA\u80FD\u7528\u6765\u505A\u4E00\u4E9B\u6570\u5B66\u548C\u903B\u8F91\u8FD0\u7B97\u3002JavaScript \u672C\u8EAB\u4E0D\u63D0\u4F9B\u4EFB\u4F55\u4E0E I/O\uFF08\u8F93\u5165/\u8F93\u51FA\uFF09\u76F8\u5173\u7684 API\uFF0C\u90FD\u8981\u9760\u5BBF\u4E3B\u73AF\u5883\uFF08host\uFF09\u63D0\u4F9B\uFF0C\u6240\u4EE5 JavaScript \u53EA\u5408\u9002\u5D4C\u5165\u66F4\u5927\u578B\u7684\u5E94\u7528\u7A0B\u5E8F\u73AF\u5883\uFF0C\u53BB\u8C03\u7528\u5BBF\u4E3B\u73AF\u5883\u63D0\u4F9B\u7684\u5E95\u5C42 API\u3002 </p><p>\u76EE\u524D\uFF0C\u5DF2\u7ECF\u5D4C\u5165 JavaScript \u7684\u5BBF\u4E3B\u73AF\u5883\u6709\u591A\u79CD\uFF0C\u6700\u5E38\u89C1\u7684\u73AF\u5883\u5C31\u662F\u6D4F\u89C8\u5668\uFF0C\u53E6\u5916\u8FD8\u6709\u670D\u52A1\u5668\u73AF\u5883\uFF0C\u4E5F\u5C31\u662F Node \u9879\u76EE\u3002 </p><p> JavaScript \u7684\u6838\u5FC3\u8BED\u6CD5\u90E8\u5206\u76F8\u5F53\u7CBE\u7B80\uFF0C\u53EA\u5305\u62EC\u4E24\u4E2A\u90E8\u5206\uFF1A\u57FA\u672C\u7684\u8BED\u6CD5\u6784\u9020\uFF08\u6BD4\u5982\u64CD\u4F5C\u7B26\u3001\u63A7\u5236\u7ED3\u6784\u3001\u8BED\u53E5\uFF09\u548C\u6807\u51C6\u5E93\uFF08\u5C31\u662F\u4E00\u7CFB\u5217\u5177\u6709\u5404\u79CD\u529F\u80FD\u7684\u5BF9\u8C61\u6BD4\u5982Array\u3001Date\u3001Math\u7B49\uFF09\u3002\u9664\u6B64\u4E4B\u5916\uFF0C\u5404\u79CD\u5BBF\u4E3B\u73AF\u5883\u63D0\u4F9B\u989D\u5916\u7684 API\uFF08\u5373\u53EA\u80FD\u5728\u8BE5\u73AF\u5883\u4F7F\u7528\u7684\u63A5\u53E3\uFF09\uFF0C\u4EE5\u4FBF JavaScript \u8C03\u7528\u3002\u4EE5\u6D4F\u89C8\u5668\u4E3A\u4F8B\uFF0C\u5B83\u63D0\u4F9B\u7684\u989D\u5916 API \u53EF\u4EE5\u5206\u6210\u4E09\u5927\u7C7B\u3002 </p><ul><li>\u6D4F\u89C8\u5668\u63A7\u5236\u7C7B\uFF1A\u64CD\u4F5C\u6D4F\u89C8\u5668</li><li>DOM \u7C7B\uFF1A\u64CD\u4F5C\u7F51\u9875\u7684\u5404\u79CD\u5143\u7D20</li><li>Web \u7C7B\uFF1A\u5B9E\u73B0\u4E92\u8054\u7F51\u7684\u5404\u79CD\u529F\u80FD</li></ul><p>\u6B64\u7B14\u8BB0\u51E0\u4E4E\u4E0D\u6D89\u53CANode\uFF0C\u4E3B\u8981\u53EF\u4EE5\u603B\u7ED3\u4E3A\u4EE5\u4E0B\u56DB\u90E8\u5206\uFF1A</p><ul><li>\u57FA\u672C\u8BED\u6CD5</li><li>\u6807\u51C6\u5E93</li><li>\u6D4F\u89C8\u5668 API</li><li>DOM</li></ul><h2 id="\u4F7F\u7528\u9886\u57DF" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u9886\u57DF" aria-hidden="true">#</a> \u4F7F\u7528\u9886\u57DF</h2><table><thead><tr><th>\u5E73\u53F0</th><th style="${serverRenderer.ssrRenderStyle({ "text-align": "center" })}">\u6280\u80FD</th></tr></thead><tbody><tr><td>\u6D4F\u89C8\u5668\u7684\u5E73\u53F0\u5316</td><td style="${serverRenderer.ssrRenderStyle({ "text-align": "center" })}">\u6BD4\u5982\u64CD\u4F5C\u672C\u5730\u6587\u4EF6\u3001\u56FE\u7247\u3001\u8C03\u7528\u6444\u50CF\u5934\u548C\u9EA6\u514B\u98CE\u7B49\u7B49</td></tr><tr><td>Node</td><td style="${serverRenderer.ssrRenderStyle({ "text-align": "center" })}">Node \u9879\u76EE\u4F7F\u5F97 JavaScript \u53EF\u4EE5\u7528\u4E8E\u5F00\u53D1\u670D\u52A1\u5668\u7AEF\u7684\u5927\u578B\u9879\u76EE</td></tr><tr><td>\u6570\u636E\u5E93\u64CD\u4F5C</td><td style="${serverRenderer.ssrRenderStyle({ "text-align": "center" })}">NoSQL \u6570\u636E\u5E93\u8FD9\u4E2A\u6982\u5FF5\uFF0C\u672C\u8EAB\u5C31\u662F\u5728 JSON\uFF08JavaScript Object Notation\uFF09\u683C\u5F0F\u7684\u57FA\u7840\u4E0A\u8BDE\u751F\u7684\uFF0C\u5927\u90E8\u5206 NoSQL \u6570\u636E\u5E93\u5141\u8BB8 JavaScript \u76F4\u63A5\u64CD\u4F5C</td></tr><tr><td>\u79FB\u52A8\u5E73\u53F0\u5F00\u53D1</td><td style="${serverRenderer.ssrRenderStyle({ "text-align": "center" })}">JavaScript \u4E5F\u6B63\u5728\u6210\u4E3A\u624B\u673A\u5E94\u7528\u7684\u5F00\u53D1\u8BED\u8A00\u3002\u4E00\u822C\u6765\u8BF4\uFF0C\u5B89\u5353\u5E73\u53F0\u4F7F\u7528 Java \u8BED\u8A00\u5F00\u53D1\uFF0CiOS \u5E73\u53F0\u4F7F\u7528 Objective-C \u6216 Swift \u8BED\u8A00\u5F00\u53D1\u3002</td></tr><tr><td>\u5185\u5D4C\u811A\u672C\u8BED\u8A00</td><td style="${serverRenderer.ssrRenderStyle({ "text-align": "center" })}">\u5C06 JavaScript \u4F5C\u4E3A\u5185\u5D4C\u7684\u811A\u672C\u8BED\u8A00\uFF0C\u6BD4\u5982 Adobe \u516C\u53F8\u7684\u8457\u540D PDF \u9605\u8BFB\u5668 Acrobat\u3001Linux \u684C\u9762\u73AF\u5883 GNOME 3\u3002</td></tr><tr><td>\u8DE8\u5E73\u53F0\u7684\u684C\u9762\u5E94\u7528\u7A0B\u5E8F</td><td style="${serverRenderer.ssrRenderStyle({ "text-align": "center" })}">Chromium OS\u3001Windows 8 \u7B49\u64CD\u4F5C\u7CFB\u7EDF\u76F4\u63A5\u652F\u6301 JavaScript \u7F16\u5199\u5E94\u7528\u7A0B\u5E8F\u3002</td></tr></tbody></table><h2 id="javascript-\u4E0E-java-\u7684\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#javascript-\u4E0E-java-\u7684\u5173\u7CFB" aria-hidden="true">#</a> JavaScript \u4E0E Java \u7684\u5173\u7CFB</h2><p>JavaScript \u7684\u57FA\u672C\u8BED\u6CD5\u548C\u5BF9\u8C61\u4F53\u7CFB\uFF0C\u662F\u6A21\u4EFF Java \u800C\u8BBE\u8BA1\u7684\u3002\u4F46\u662F\uFF0CJavaScript \u6CA1\u6709\u91C7\u7528 Java \u7684\u9759\u6001\u7C7B\u578B\u3002\u6B63\u662F\u56E0\u4E3A JavaScript \u4E0E Java \u6709\u5F88\u5927\u7684\u76F8\u4F3C\u6027\uFF0C\u6240\u4EE5\u8FD9\u95E8\u8BED\u8A00\u624D\u4ECE\u4E00\u5F00\u59CB\u7684 LiveScript \u6539\u540D\u4E3A JavaScript\u3002\u57FA\u672C\u4E0A\uFF0CJavaScript \u8FD9\u4E2A\u540D\u5B57\u7684\u539F\u610F\u662F\u201C\u5F88\u50CFJava\u7684\u811A\u672C\u8BED\u8A00\u201D\u3002 </p><h2 id="javascript-\u4E0E-ecmascript-\u7684\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#javascript-\u4E0E-ecmascript-\u7684\u5173\u7CFB" aria-hidden="true">#</a> JavaScript \u4E0E ECMAScript \u7684\u5173\u7CFB</h2><p> ECMAScript \u548C JavaScript \u7684\u5173\u7CFB\u662F\uFF0C\u524D\u8005\u662F\u540E\u8005\u7684\u89C4\u683C\uFF0C\u540E\u8005\u662F\u524D\u8005\u7684\u4E00\u79CD\u5B9E\u73B0\u3002\u5728\u65E5\u5E38\u573A\u5408\uFF0C\u8FD9\u4E24\u4E2A\u8BCD\u662F\u53EF\u4EE5\u4E92\u6362\u7684\u3002 </p><p> ECMAScript \u53EA\u7528\u6765\u6807\u51C6\u5316 JavaScript \u8FD9\u79CD\u8BED\u8A00\u7684\u57FA\u672C\u8BED\u6CD5\u7ED3\u6784\uFF0C\u4E0E\u90E8\u7F72\u73AF\u5883\u76F8\u5173\u7684\u6807\u51C6\u90FD\u7531\u5176\u4ED6\u6807\u51C6\u89C4\u5B9A\uFF0C\u6BD4\u5982 DOM \u7684\u6807\u51C6\u5C31\u662F\u7531 W3C\u7EC4\u7EC7\uFF08World Wide Web Consortium\uFF09\u5236\u5B9A\u7684\u3002 <p></p> ECMA-262 \u6807\u51C6\u540E\u6765\u4E5F\u88AB\u53E6\u4E00\u4E2A\u56FD\u9645\u6807\u51C6\u5316\u7EC4\u7EC7 ISO\uFF08International Organization for Standardization\uFF09\u6279\u51C6\uFF0C\u6807\u51C6\u53F7\u662F ISO-16262\u3002 </p><!--]-->`);
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.html.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
var _____html$4 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$5]]);
var _____html$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _____html$4
});
const _sfc_main$i = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/web/JavaScript/\u6570\u636E\u7C7B\u578B.html.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
var _____html$2 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$4]]);
var _____html$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _____html$2
});
const _sfc_main$h = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/web/vue/text1.html.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
var text1_html$3 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$3]]);
var text1_html$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text1_html$3
});
const _sfc_main$g = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h2 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h2><h2 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h2><!--]-->`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/web/vue/text2.html.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
var text2_html$2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$2]]);
var text2_html$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": text2_html$2
});
const _sfc_main$f = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/404.html.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
var _404_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$1]]);
var _404_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _404_html$1
});
const data$c = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "home": "true\uFF0C",
    "heroImage": "/images/logo.png",
    "heroText": null,
    "tagline": "vuepress2.x",
    "actions": null,
    "features": null,
    "footer": "MIT Licensed | Copyright \xA9 2020-\u67D2-IU"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1640602916e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 3
      }
    ]
  },
  "filePathRelative": "README.md"
};
var index_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$c
});
const data$b = {
  "key": "v-6e6848ee",
  "path": "/web/text1.html",
  "title": "\u9875\u9762\u7684\u6807\u9898",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "\u9875\u9762\u7684\u6807\u9898",
    "description": "\u9875\u9762\u7684\u63CF\u8FF0"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "web/text1.md"
};
var text1_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$b
});
const data$a = {
  "key": "v-3803ce0e",
  "path": "/guide/%E6%95%99%E7%A8%8B/text.html",
  "title": "1a",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "1a",
    "description": "12a"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "guide/\u6559\u7A0B/text.md"
};
var text_html$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$a
});
const data$9 = {
  "key": "v-9b98914c",
  "path": "/guide/%E9%9A%8F%E7%AC%94/text.html",
  "title": "1a",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "1a",
    "description": "12a"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "guide/\u968F\u7B14/text.md"
};
var text_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$9
});
const data$8 = {
  "key": "v-6e7820a0",
  "path": "/guide/%E9%B8%A1%E6%B1%A4/text.html",
  "title": "1a",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "1a",
    "description": "12a"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "guide/\u9E21\u6C64/text.md"
};
var text_html$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$8
});
const data$7 = {
  "key": "v-74ac52d9",
  "path": "/guide/%E9%9D%A2%E8%AF%95/text.html",
  "title": "1a",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "1a",
    "description": "12a"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "guide/\u9762\u8BD5/text.md"
};
var text_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$7
});
const data$6 = {
  "key": "v-89e39176",
  "path": "/web/html/text1.html",
  "title": "html\u6807\u9898",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "html\u6807\u9898",
    "description": "html\u63CF\u8FF0"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "web/html/text1.md"
};
var text1_html$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$6
});
const data$5 = {
  "key": "v-8679e038",
  "path": "/web/html/text2.html",
  "title": "html2\u6807\u9898",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "html2\u6807\u9898",
    "description": "html2\u63CF\u8FF0"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "web/html/text2.md"
};
var text2_html$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$5
});
const data$4 = {
  "key": "v-72bd4e03",
  "path": "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA.html",
  "title": "\u5165\u95E8\u5BFC\u8BBA",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "\u5165\u95E8\u5BFC\u8BBA",
    "description": "\u9875\u9762\u7684\u63CF\u8FF0",
    "contributors": true
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "JavaScript\u4ECB\u7ECD",
      "slug": "javascript\u4ECB\u7ECD",
      "children": []
    },
    {
      "level": 2,
      "title": "\u4F7F\u7528\u9886\u57DF",
      "slug": "\u4F7F\u7528\u9886\u57DF",
      "children": []
    },
    {
      "level": 2,
      "title": "JavaScript \u4E0E Java \u7684\u5173\u7CFB",
      "slug": "javascript-\u4E0E-java-\u7684\u5173\u7CFB",
      "children": []
    },
    {
      "level": 2,
      "title": "JavaScript \u4E0E ECMAScript \u7684\u5173\u7CFB",
      "slug": "javascript-\u4E0E-ecmascript-\u7684\u5173\u7CFB",
      "children": []
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.md"
};
var _____html$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$4
});
const data$3 = {
  "key": "v-7e09a6ba",
  "path": "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.html",
  "title": "\u6570\u636E\u7C7B\u578B",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "\u6570\u636E\u7C7B\u578B",
    "description": "\u9875\u9762\u7684\u63CF\u8FF0"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "web/JavaScript/\u6570\u636E\u7C7B\u578B.md"
};
var _____html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$3
});
const data$2 = {
  "key": "v-576d49b2",
  "path": "/web/vue/text1.html",
  "title": "vue\u6807\u9898",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "vue\u6807\u9898",
    "description": "vue\u63CF\u8FF0"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "web/vue/text1.md"
};
var text1_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$2
});
const data$1 = {
  "key": "v-59222251",
  "path": "/web/vue/text2.html",
  "title": "vue2\u6807\u9898",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "vue2\u6807\u9898",
    "description": "vue2\u63CF\u8FF0"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "3",
      "slug": "_3",
      "children": []
    },
    {
      "level": 2,
      "title": "4",
      "slug": "_4",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640251957e3,
    "contributors": [
      {
        "name": "\u9648\u67D2",
        "email": "3062995371@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "web/vue/text2.md"
};
var text2_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$1
});
const data = {
  "key": "v-3706649a",
  "path": "/404.html",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "layout": "404"
  },
  "excerpt": "",
  "headers": []
};
var _404_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data
});
const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData();
    const messages = (_a = themeLocale.value.notFound) != null ? _a : ["Not Found"];
    const getMsg = () => messages[Math.floor(Math.random() * messages.length)];
    const homeLink = (_b = themeLocale.value.home) != null ? _b : routeLocale.value;
    const homeText = (_c = themeLocale.value.backToHome) != null ? _c : "Back to home";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = vue.resolveComponent("RouterLink");
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "theme-container" }, _attrs))}><div class="theme-default-content"><h1>404</h1><blockquote>${serverRenderer.ssrInterpolate(getMsg())}</blockquote>`);
      _push(serverRenderer.ssrRenderComponent(_component_RouterLink, { to: vue.unref(homeLink) }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.ssrInterpolate(vue.unref(homeText))}`);
          } else {
            return [
              vue.createTextVNode(vue.toDisplayString(vue.unref(homeText)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/layouts/404.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
var _404 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$e
});
const __default__ = vue.defineComponent({
  inheritAttrs: false
});
const _sfc_main$d = /* @__PURE__ */ vue.defineComponent(__spreadProps(__spreadValues({}, __default__), {
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const route = vueRouter.useRoute();
    const site = useSiteData();
    const { item } = vue.toRefs(props);
    const hasHttpProtocol = vue.computed(() => shared.isLinkHttp(item.value.link));
    const hasNonHttpProtocol = vue.computed(() => shared.isLinkMailto(item.value.link) || shared.isLinkTel(item.value.link));
    const linkTarget = vue.computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.target)
        return item.value.target;
      if (hasHttpProtocol.value)
        return "_blank";
      return void 0;
    });
    const isBlankTarget = vue.computed(() => linkTarget.value === "_blank");
    const isRouterLink = vue.computed(() => !hasHttpProtocol.value && !hasNonHttpProtocol.value && !isBlankTarget.value);
    const linkRel = vue.computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.rel)
        return item.value.rel;
      if (isBlankTarget.value)
        return "noopener noreferrer";
      return void 0;
    });
    const linkAriaLabel = vue.computed(() => item.value.ariaLabel || item.value.text);
    const shouldBeActiveInSubpath = vue.computed(() => {
      const localeKeys = Object.keys(site.value.locales);
      if (localeKeys.length) {
        return !localeKeys.some((key) => key === item.value.link);
      }
      return item.value.link !== "/";
    });
    const isActiveInSubpath = vue.computed(() => {
      if (!shouldBeActiveInSubpath.value) {
        return false;
      }
      return route.path.startsWith(item.value.link);
    });
    const isActive = vue.computed(() => {
      if (!isRouterLink.value) {
        return false;
      }
      if (item.value.activeMatch) {
        return new RegExp(item.value.activeMatch).test(route.path);
      }
      return isActiveInSubpath.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = vue.resolveComponent("RouterLink");
      const _component_ExternalLinkIcon = vue.resolveComponent("ExternalLinkIcon");
      if (vue.unref(isRouterLink)) {
        _push(serverRenderer.ssrRenderComponent(_component_RouterLink, vue.mergeProps({
          class: ["nav-link", { "router-link-active": vue.unref(isActive) }],
          to: vue.unref(item).link,
          "aria-label": vue.unref(linkAriaLabel)
        }, _ctx.$attrs, _attrs), {
          default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              serverRenderer.ssrRenderSlot(_ctx.$slots, "before", {}, null, _push2, _parent2, _scopeId);
              _push2(` ${serverRenderer.ssrInterpolate(vue.unref(item).text)} `);
              serverRenderer.ssrRenderSlot(_ctx.$slots, "after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                vue.renderSlot(_ctx.$slots, "before"),
                vue.createTextVNode(" " + vue.toDisplayString(vue.unref(item).text) + " ", 1),
                vue.renderSlot(_ctx.$slots, "after")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<a${serverRenderer.ssrRenderAttrs(vue.mergeProps({
          class: "nav-link external",
          href: vue.unref(item).link,
          rel: vue.unref(linkRel),
          target: vue.unref(linkTarget),
          "aria-label": vue.unref(linkAriaLabel)
        }, _ctx.$attrs, _attrs))}>`);
        serverRenderer.ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
        _push(` ${serverRenderer.ssrInterpolate(vue.unref(item).text)} `);
        if (vue.unref(isBlankTarget)) {
          _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        serverRenderer.ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
        _push(`</a>`);
      }
    };
  }
}));
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/NavLink.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const isDarkMode = useDarkMode();
    const heroImage = vue.computed(() => {
      if (isDarkMode.value && frontmatter.value.heroImageDark !== void 0) {
        return frontmatter.value.heroImageDark;
      }
      return frontmatter.value.heroImage;
    });
    const heroText = vue.computed(() => {
      if (frontmatter.value.heroText === null) {
        return null;
      }
      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });
    const heroAlt = vue.computed(() => frontmatter.value.heroAlt || heroText.value || "hero");
    const tagline = vue.computed(() => {
      if (frontmatter.value.tagline === null) {
        return null;
      }
      return frontmatter.value.tagline || siteLocale.value.description || "Welcome to your VuePress site";
    });
    const actions = vue.computed(() => {
      if (!shared.isArray(frontmatter.value.actions)) {
        return [];
      }
      return frontmatter.value.actions.map(({ text, link, type = "primary" }) => ({
        text,
        link,
        type
      }));
    });
    const features = vue.computed(() => {
      if (shared.isArray(frontmatter.value.features)) {
        return frontmatter.value.features;
      }
      return [];
    });
    const footer = vue.computed(() => frontmatter.value.footer);
    const footerHtml = vue.computed(() => frontmatter.value.footerHtml);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = vue.resolveComponent("ClientOnly");
      const _component_Content = vue.resolveComponent("Content");
      _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: "home",
        "aria-labelledby": vue.unref(heroText) ? "main-title" : void 0
      }, _attrs))}><header class="hero">`);
      _push(serverRenderer.ssrRenderComponent(_component_ClientOnly, null, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vue.unref(heroImage)) {
              _push2(`<img${serverRenderer.ssrRenderAttr("src", vue.unref(withBase)(vue.unref(heroImage)))}${serverRenderer.ssrRenderAttr("alt", vue.unref(heroAlt))}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vue.unref(heroImage) ? (vue.openBlock(), vue.createBlock("img", {
                key: 0,
                src: vue.unref(withBase)(vue.unref(heroImage)),
                alt: vue.unref(heroAlt)
              }, null, 8, ["src", "alt"])) : vue.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vue.unref(heroText)) {
        _push(`<h1 id="main-title">${serverRenderer.ssrInterpolate(vue.unref(heroText))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      if (vue.unref(tagline)) {
        _push(`<p class="description">${serverRenderer.ssrInterpolate(vue.unref(tagline))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (vue.unref(actions).length) {
        _push(`<p class="actions"><!--[-->`);
        serverRenderer.ssrRenderList(vue.unref(actions), (action) => {
          _push(serverRenderer.ssrRenderComponent(_sfc_main$d, {
            key: action.text,
            class: ["action-button", [action.type]],
            item: action
          }, null, _parent));
        });
        _push(`<!--]--></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      if (vue.unref(features).length) {
        _push(`<div class="features"><!--[-->`);
        serverRenderer.ssrRenderList(vue.unref(features), (feature) => {
          _push(`<div class="feature"><h2>${serverRenderer.ssrInterpolate(feature.title)}</h2><p>${serverRenderer.ssrInterpolate(feature.details)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="theme-default-content custom">`);
      _push(serverRenderer.ssrRenderComponent(_component_Content, null, null, _parent));
      _push(`</div>`);
      if (vue.unref(footer)) {
        _push(`<!--[-->`);
        if (vue.unref(footerHtml)) {
          _push(`<div class="footer">${vue.unref(footer)}</div>`);
        } else {
          _push(`<div class="footer">${serverRenderer.ssrInterpolate(vue.unref(footer))}</div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/Home.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const resolveRepoType = (repo) => {
  if (!shared.isLinkHttp(repo) || /github\.com/.test(repo))
    return "GitHub";
  if (/bitbucket\.org/.test(repo))
    return "Bitbucket";
  if (/gitlab\.com/.test(repo))
    return "GitLab";
  if (/gitee\.com/.test(repo))
    return "Gitee";
  return null;
};
const editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLinkPatterns = ({ docsRepo, editLinkPattern }) => {
  if (editLinkPattern) {
    return editLinkPattern;
  }
  const repoType = resolveRepoType(docsRepo);
  if (repoType !== null) {
    return editLinkPatterns[repoType];
  }
  return null;
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  if (!filePathRelative)
    return null;
  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern });
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, shared.isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, shared.removeLeadingSlash(`${shared.removeEndingSlash(docsDir)}/${filePathRelative}`));
};
const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      serverRenderer.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/DropdownTransition.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { item } = vue.toRefs(props);
    const dropdownAriaLabel = vue.computed(() => item.value.ariaLabel || item.value.text);
    const open = vue.ref(false);
    const route = vueRouter.useRoute();
    vue.watch(() => route.path, () => {
      open.value = false;
    });
    const isLastItemOfArray = (item2, arr) => arr[arr.length - 1] === item2;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: ["dropdown-wrapper", { open: open.value }]
      }, _attrs))}><button class="dropdown-title" type="button"${serverRenderer.ssrRenderAttr("aria-label", vue.unref(dropdownAriaLabel))}><span class="title">${serverRenderer.ssrInterpolate(vue.unref(item).text)}</span><span class="arrow down"></span></button><button class="mobile-dropdown-title" type="button"${serverRenderer.ssrRenderAttr("aria-label", vue.unref(dropdownAriaLabel))}><span class="title">${serverRenderer.ssrInterpolate(vue.unref(item).text)}</span><span class="${serverRenderer.ssrRenderClass([open.value ? "down" : "right", "arrow"])}"></span></button>`);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$b, null, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul style="${serverRenderer.ssrRenderStyle(open.value ? null : { display: "none" })}" class="nav-dropdown"${_scopeId}><!--[-->`);
            serverRenderer.ssrRenderList(vue.unref(item).children, (child, index2) => {
              _push2(`<li class="dropdown-item"${_scopeId}>`);
              if (child.children) {
                _push2(`<!--[--><h4 class="dropdown-subtitle"${_scopeId}>`);
                if (child.link) {
                  _push2(serverRenderer.ssrRenderComponent(_sfc_main$d, { item: child }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span${_scopeId}>${serverRenderer.ssrInterpolate(child.text)}</span>`);
                }
                _push2(`</h4><ul class="dropdown-subitem-wrapper"${_scopeId}><!--[-->`);
                serverRenderer.ssrRenderList(child.children, (grandchild) => {
                  _push2(`<li class="dropdown-subitem"${_scopeId}>`);
                  _push2(serverRenderer.ssrRenderComponent(_sfc_main$d, { item: grandchild }, null, _parent2, _scopeId));
                  _push2(`</li>`);
                });
                _push2(`<!--]--></ul><!--]-->`);
              } else {
                _push2(serverRenderer.ssrRenderComponent(_sfc_main$d, { item: child }, null, _parent2, _scopeId));
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              vue.withDirectives(vue.createVNode("ul", { class: "nav-dropdown" }, [
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(vue.unref(item).children, (child, index2) => {
                  return vue.openBlock(), vue.createBlock("li", {
                    key: child.link || index2,
                    class: "dropdown-item"
                  }, [
                    child.children ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                      vue.createVNode("h4", { class: "dropdown-subtitle" }, [
                        child.link ? (vue.openBlock(), vue.createBlock(_sfc_main$d, {
                          key: 0,
                          item: child,
                          onFocusout: ($event) => isLastItemOfArray(child, vue.unref(item).children) && child.children.length === 0 && (open.value = false)
                        }, null, 8, ["item", "onFocusout"])) : (vue.openBlock(), vue.createBlock("span", { key: 1 }, vue.toDisplayString(child.text), 1))
                      ]),
                      vue.createVNode("ul", { class: "dropdown-subitem-wrapper" }, [
                        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(child.children, (grandchild) => {
                          return vue.openBlock(), vue.createBlock("li", {
                            key: grandchild.link,
                            class: "dropdown-subitem"
                          }, [
                            vue.createVNode(_sfc_main$d, {
                              item: grandchild,
                              onFocusout: ($event) => isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, vue.unref(item).children) && (open.value = false)
                            }, null, 8, ["item", "onFocusout"])
                          ]);
                        }), 128))
                      ])
                    ], 64)) : (vue.openBlock(), vue.createBlock(_sfc_main$d, {
                      key: 1,
                      item: child,
                      onFocusout: ($event) => isLastItemOfArray(child, vue.unref(item).children) && (open.value = false)
                    }, null, 8, ["item", "onFocusout"]))
                  ]);
                }), 128))
              ], 512), [
                [vue.vShow, open.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/DropdownLink.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const useNavbarSelectLanguage = () => {
      const router = vueRouter.useRouter();
      const routeLocale = useRouteLocale();
      const siteLocale = useSiteLocaleData();
      const themeLocale = useThemeLocaleData();
      return vue.computed(() => {
        var _a, _b;
        const localePaths = Object.keys(siteLocale.value.locales);
        if (localePaths.length < 2) {
          return [];
        }
        const currentPath = router.currentRoute.value.path;
        const currentFullPath = router.currentRoute.value.fullPath;
        const languageDropdown = {
          text: (_a = themeLocale.value.selectLanguageText) != null ? _a : "unkown language",
          ariaLabel: (_b = themeLocale.value.selectLanguageAriaLabel) != null ? _b : "unkown language",
          children: localePaths.map((targetLocalePath) => {
            var _a2, _b2, _c, _d, _e, _f;
            const targetSiteLocale = (_b2 = (_a2 = siteLocale.value.locales) == null ? void 0 : _a2[targetLocalePath]) != null ? _b2 : {};
            const targetThemeLocale = (_d = (_c = themeLocale.value.locales) == null ? void 0 : _c[targetLocalePath]) != null ? _d : {};
            const targetLang = `${targetSiteLocale.lang}`;
            const text = (_e = targetThemeLocale.selectLanguageName) != null ? _e : targetLang;
            let link;
            if (targetLang === siteLocale.value.lang) {
              link = currentFullPath;
            } else {
              const targetLocalePage = currentPath.replace(routeLocale.value, targetLocalePath);
              if (router.getRoutes().some((item) => item.path === targetLocalePage)) {
                link = targetLocalePage;
              } else {
                link = (_f = targetThemeLocale.home) != null ? _f : targetLocalePath;
              }
            }
            return {
              text,
              link
            };
          })
        };
        return [languageDropdown];
      });
    };
    const useNavbarRepo = () => {
      const themeLocale = useThemeLocaleData();
      const repo = vue.computed(() => themeLocale.value.repo);
      const repoType = vue.computed(() => repo.value ? resolveRepoType(repo.value) : null);
      const repoLink = vue.computed(() => {
        if (repo.value && !shared.isLinkHttp(repo.value)) {
          return `https://github.com/${repo.value}`;
        }
        return repo.value;
      });
      const repoLabel = vue.computed(() => {
        if (!repoLink.value)
          return null;
        if (themeLocale.value.repoLabel)
          return themeLocale.value.repoLabel;
        if (repoType.value === null)
          return "Source";
        return repoType.value;
      });
      return vue.computed(() => {
        if (!repoLink.value || !repoLabel.value) {
          return [];
        }
        return [
          {
            text: repoLabel.value,
            link: repoLink.value
          }
        ];
      });
    };
    const resolveNavbarItem = (item) => {
      if (shared.isString(item)) {
        return useNavLink(item);
      }
      if (item.children) {
        return __spreadProps(__spreadValues({}, item), {
          children: item.children.map(resolveNavbarItem)
        });
      }
      return item;
    };
    const useNavbarConfig = () => {
      const themeLocale = useThemeLocaleData();
      return vue.computed(() => (themeLocale.value.navbar || []).map(resolveNavbarItem));
    };
    const navbarConfig = useNavbarConfig();
    const navbarSelectLanguage = useNavbarSelectLanguage();
    const navbarRepo = useNavbarRepo();
    const navbarLinks = vue.computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      if (vue.unref(navbarLinks).length) {
        _push(`<nav${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "navbar-links" }, _attrs))}><!--[-->`);
        serverRenderer.ssrRenderList(vue.unref(navbarLinks), (item) => {
          _push(`<div class="navbar-links-item">`);
          if (item.children) {
            _push(serverRenderer.ssrRenderComponent(_sfc_main$a, { item }, null, _parent));
          } else {
            _push(serverRenderer.ssrRenderComponent(_sfc_main$d, { item }, null, _parent));
          }
          _push(`</div>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/NavbarLinks.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    const isDarkMode = useDarkMode();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: "toggle-dark-button",
        title: vue.unref(themeLocale).toggleDarkMode
      }, _attrs))}><svg style="${serverRenderer.ssrRenderStyle(!vue.unref(isDarkMode) ? null : { display: "none" })}" class="icon" focusable="false" viewBox="0 0 32 32"><path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path></svg><svg style="${serverRenderer.ssrRenderStyle(vue.unref(isDarkMode) ? null : { display: "none" })}" class="icon" focusable="false" viewBox="0 0 32 32"><path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z" fill="currentColor"></path></svg></button>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/ToggleDarkModeButton.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  emits: ["toggle"],
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: "toggle-sidebar-button",
        title: vue.unref(themeLocale).toggleSidebar,
        "aria-expanded": "false",
        role: "button",
        tabindex: "0"
      }, _attrs))}><div class="icon" aria-hidden="true"><span></span><span></span><span></span></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/ToggleSidebarButton.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  emits: ["toggle-sidebar"],
  setup(__props) {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const isDarkMode = useDarkMode();
    const navbar = vue.ref(null);
    const siteBrand = vue.ref(null);
    const siteBrandLink = vue.computed(() => themeLocale.value.home || routeLocale.value);
    const siteBrandLogo = vue.computed(() => {
      if (isDarkMode.value && themeLocale.value.logoDark !== void 0) {
        return themeLocale.value.logoDark;
      }
      return themeLocale.value.logo;
    });
    const siteBrandTitle = vue.computed(() => siteLocale.value.title);
    const linksWrapperMaxWidth = vue.ref(0);
    const linksWrapperStyle = vue.computed(() => {
      if (!linksWrapperMaxWidth.value) {
        return {};
      }
      return {
        maxWidth: linksWrapperMaxWidth.value + "px"
      };
    });
    const enableDarkMode = vue.computed(() => themeLocale.value.darkMode);
    vue.onMounted(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const navbarHorizontalPadding = getCssValue(navbar.value, "paddingLeft") + getCssValue(navbar.value, "paddingRight");
      const handleLinksWrapWidth = () => {
        var _a;
        if (window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapperMaxWidth.value = 0;
        } else {
          linksWrapperMaxWidth.value = navbar.value.offsetWidth - navbarHorizontalPadding - (((_a = siteBrand.value) == null ? void 0 : _a.offsetWidth) || 0);
        }
      };
      handleLinksWrapWidth();
      window.addEventListener("resize", handleLinksWrapWidth, false);
      window.addEventListener("orientationchange", handleLinksWrapWidth, false);
    });
    function getCssValue(el, property) {
      var _a, _b, _c;
      const val = (_c = (_b = (_a = el == null ? void 0 : el.ownerDocument) == null ? void 0 : _a.defaultView) == null ? void 0 : _b.getComputedStyle(el, null)) == null ? void 0 : _c[property];
      const num = Number.parseInt(val, 10);
      return Number.isNaN(num) ? 0 : num;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = vue.resolveComponent("RouterLink");
      const _component_ClientOnly = vue.resolveComponent("ClientOnly");
      const _component_NavbarSearch = vue.resolveComponent("NavbarSearch");
      _push(`<header${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        ref_key: "navbar",
        ref: navbar,
        class: "navbar"
      }, _attrs))}>`);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$7, null, null, _parent));
      _push(`<span>`);
      _push(serverRenderer.ssrRenderComponent(_component_RouterLink, { to: vue.unref(siteBrandLink) }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_ClientOnly, null, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vue.unref(siteBrandLogo)) {
                    _push3(`<img class="logo"${serverRenderer.ssrRenderAttr("src", vue.unref(withBase)(vue.unref(siteBrandLogo)))}${serverRenderer.ssrRenderAttr("alt", vue.unref(siteBrandTitle))}${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    vue.unref(siteBrandLogo) ? (vue.openBlock(), vue.createBlock("img", {
                      key: 0,
                      class: "logo",
                      src: vue.unref(withBase)(vue.unref(siteBrandLogo)),
                      alt: vue.unref(siteBrandTitle)
                    }, null, 8, ["src", "alt"])) : vue.createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (vue.unref(siteBrandTitle)) {
              _push2(`<span class="${serverRenderer.ssrRenderClass([{ "can-hide": vue.unref(siteBrandLogo) }, "site-name"])}"${_scopeId}>${serverRenderer.ssrInterpolate(vue.unref(siteBrandTitle))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vue.createVNode(_component_ClientOnly, null, {
                default: vue.withCtx(() => [
                  vue.unref(siteBrandLogo) ? (vue.openBlock(), vue.createBlock("img", {
                    key: 0,
                    class: "logo",
                    src: vue.unref(withBase)(vue.unref(siteBrandLogo)),
                    alt: vue.unref(siteBrandTitle)
                  }, null, 8, ["src", "alt"])) : vue.createCommentVNode("", true)
                ]),
                _: 1
              }),
              vue.unref(siteBrandTitle) ? (vue.openBlock(), vue.createBlock("span", {
                key: 0,
                class: ["site-name", { "can-hide": vue.unref(siteBrandLogo) }]
              }, vue.toDisplayString(vue.unref(siteBrandTitle)), 3)) : vue.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><div class="navbar-links-wrapper" style="${serverRenderer.ssrRenderStyle(vue.unref(linksWrapperStyle))}">`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$9, { class: "can-hide" }, null, _parent));
      serverRenderer.ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
      if (vue.unref(enableDarkMode)) {
        _push(serverRenderer.ssrRenderComponent(_sfc_main$8, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer.ssrRenderComponent(_component_NavbarSearch, null, null, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/Navbar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const useEditNavLink = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return vue.computed(() => {
        var _a, _b, _c;
        const showEditLink = (_b = (_a = frontmatter.value.editLink) != null ? _a : themeLocale2.value.editLink) != null ? _b : true;
        if (!showEditLink) {
          return null;
        }
        const {
          repo,
          docsRepo = repo,
          docsBranch = "main",
          docsDir = "",
          editLinkText
        } = themeLocale2.value;
        if (!docsRepo)
          return null;
        const editLink = resolveEditLink({
          docsRepo,
          docsBranch,
          docsDir,
          filePathRelative: page.value.filePathRelative,
          editLinkPattern: (_c = frontmatter.value.editLinkPattern) != null ? _c : themeLocale2.value.editLinkPattern
        });
        if (!editLink)
          return null;
        return {
          text: editLinkText != null ? editLinkText : "Edit this page",
          link: editLink
        };
      });
    };
    const useLastUpdated = () => {
      useSiteLocaleData();
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return vue.computed(() => {
        var _a, _b, _c, _d;
        const showLastUpdated = (_b = (_a = frontmatter.value.lastUpdated) != null ? _a : themeLocale2.value.lastUpdated) != null ? _b : true;
        if (!showLastUpdated)
          return null;
        if (!((_c = page.value.git) == null ? void 0 : _c.updatedTime))
          return null;
        const updatedDate = new Date((_d = page.value.git) == null ? void 0 : _d.updatedTime);
        return updatedDate.toLocaleString();
      });
    };
    const useContributors = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return vue.computed(() => {
        var _a, _b, _c, _d;
        const showContributors = (_b = (_a = frontmatter.value.contributors) != null ? _a : themeLocale2.value.contributors) != null ? _b : true;
        if (!showContributors)
          return null;
        return (_d = (_c = page.value.git) == null ? void 0 : _c.contributors) != null ? _d : null;
      });
    };
    const themeLocale = useThemeLocaleData();
    const editNavLink = useEditNavLink();
    const lastUpdated = useLastUpdated();
    const contributors = useContributors();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = vue.resolveComponent("ClientOnly");
      _push(`<footer${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "page-meta" }, _attrs))}>`);
      if (vue.unref(editNavLink)) {
        _push(`<div class="meta-item edit-link">`);
        _push(serverRenderer.ssrRenderComponent(_sfc_main$d, {
          class: "meta-item-label",
          item: vue.unref(editNavLink)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue.unref(lastUpdated)) {
        _push(`<div class="meta-item last-updated"><span class="meta-item-label">${serverRenderer.ssrInterpolate(vue.unref(themeLocale).lastUpdatedText)}: </span>`);
        _push(serverRenderer.ssrRenderComponent(_component_ClientOnly, null, {
          default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="meta-item-info"${_scopeId}>${serverRenderer.ssrInterpolate(vue.unref(lastUpdated))}</span>`);
            } else {
              return [
                vue.createVNode("span", { class: "meta-item-info" }, vue.toDisplayString(vue.unref(lastUpdated)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue.unref(contributors) && vue.unref(contributors).length) {
        _push(`<div class="meta-item contributors"><span class="meta-item-label">${serverRenderer.ssrInterpolate(vue.unref(themeLocale).contributorsText)}: </span><span class="meta-item-info"><!--[-->`);
        serverRenderer.ssrRenderList(vue.unref(contributors), (contributor, index2) => {
          _push(`<!--[--><span class="contributor"${serverRenderer.ssrRenderAttr("title", `email: ${contributor.email}`)}>${serverRenderer.ssrInterpolate(contributor.name)}</span>`);
          if (index2 !== vue.unref(contributors).length - 1) {
            _push(`<!--[-->, <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/PageMeta.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const resolveFromFrontmatterConfig = (conf) => {
      if (conf === false) {
        return null;
      }
      if (shared.isString(conf)) {
        return useNavLink(conf);
      }
      if (shared.isPlainObject(conf)) {
        return conf;
      }
      return false;
    };
    const resolveFromSidebarItems = (sidebarItems2, currentPath, offset) => {
      const index2 = sidebarItems2.findIndex((item) => item.link === currentPath);
      if (index2 !== -1) {
        const targetItem = sidebarItems2[index2 + offset];
        if (!(targetItem == null ? void 0 : targetItem.link)) {
          return null;
        }
        return targetItem;
      }
      for (const item of sidebarItems2) {
        if (item.children) {
          const childResult = resolveFromSidebarItems(item.children, currentPath, offset);
          if (childResult) {
            return childResult;
          }
        }
      }
      return null;
    };
    const frontmatter = usePageFrontmatter();
    const sidebarItems = useSidebarItems();
    const route = vueRouter.useRoute();
    const prevNavLink = vue.computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      if (prevConfig !== false) {
        return prevConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, -1);
    });
    const nextNavLink = vue.computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      if (nextConfig !== false) {
        return nextConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, 1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (vue.unref(prevNavLink) || vue.unref(nextNavLink)) {
        _push(`<nav${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "page-nav" }, _attrs))}><p class="inner">`);
        if (vue.unref(prevNavLink)) {
          _push(`<span class="prev">`);
          _push(serverRenderer.ssrRenderComponent(_sfc_main$d, { item: vue.unref(prevNavLink) }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (vue.unref(nextNavLink)) {
          _push(`<span class="next">`);
          _push(serverRenderer.ssrRenderComponent(_sfc_main$d, { item: vue.unref(nextNavLink) }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/PageNav.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = vue.resolveComponent("Content");
      _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "page" }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(`<div class="theme-default-content">`);
      _push(serverRenderer.ssrRenderComponent(_component_Content, null, null, _parent));
      _push(`</div>`);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(serverRenderer.ssrRenderComponent(_sfc_main$4, null, null, _parent));
      serverRenderer.ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/Page.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const normalizePath = (path) => decodeURI(path).replace(/#.*$/, "").replace(/(index)?\.(md|html)$/, "");
const isActiveLink = (route, link) => {
  if (link === void 0) {
    return false;
  }
  if (route.hash === link) {
    return true;
  }
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  return currentPath === targetPath;
};
const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.link)) {
    return true;
  }
  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child));
  }
  return false;
};
const renderItem = (item, props) => {
  if (item.link) {
    return vue.h(_sfc_main$d, __spreadProps(__spreadValues({}, props), {
      item
    }));
  }
  return vue.h("p", props, item.text);
};
const renderChildren = (item, depth) => {
  var _a;
  if (!((_a = item.children) === null || _a === void 0 ? void 0 : _a.length)) {
    return null;
  }
  return vue.h("ul", {
    class: {
      "sidebar-sub-items": depth > 0
    }
  }, item.children.map((child) => vue.h("li", vue.h(SidebarChild, {
    item: child,
    depth: depth + 1
  }))));
};
const SidebarChild = ({ item, depth = 0 }) => {
  const route = vueRouter.useRoute();
  const active = isActiveItem(route, item);
  return [
    renderItem(item, {
      class: {
        "sidebar-heading": depth === 0,
        "sidebar-item": true,
        active
      }
    }),
    renderChildren(item, depth)
  ];
};
SidebarChild.displayName = "SidebarChild";
SidebarChild.props = {
  item: {
    type: Object,
    required: true
  },
  depth: {
    type: Number,
    required: false
  }
};
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarItems = useSidebarItems();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "sidebar" }, _attrs))}>`);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$9, null, null, _parent));
      serverRenderer.ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(`<ul class="sidebar-links"><!--[-->`);
      serverRenderer.ssrRenderList(vue.unref(sidebarItems), (item) => {
        _push(serverRenderer.ssrRenderComponent(vue.unref(SidebarChild), {
          key: item.link || item.text,
          item
        }, null, _parent));
      });
      _push(`<!--]--></ul>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const shouldShowNavbar = vue.computed(() => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false);
    const sidebarItems = useSidebarItems();
    const isSidebarOpen = vue.ref(false);
    const toggleSidebar = (to) => {
      isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
    };
    const containerClass = vue.computed(() => [
      {
        "no-navbar": !shouldShowNavbar.value,
        "no-sidebar": !sidebarItems.value.length,
        "sidebar-open": isSidebarOpen.value
      },
      frontmatter.value.pageClass
    ]);
    let unregisterRouterHook;
    vue.onMounted(() => {
      const router = vueRouter.useRouter();
      unregisterRouterHook = router.afterEach(() => {
        toggleSidebar(false);
      });
    });
    vue.onUnmounted(() => {
      unregisterRouterHook();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: ["theme-container", vue.unref(containerClass)]
      }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "navbar", {}, () => {
        if (vue.unref(shouldShowNavbar)) {
          _push(serverRenderer.ssrRenderComponent(_sfc_main$6, null, {
            before: vue.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                serverRenderer.ssrRenderSlot(_ctx.$slots, "navbar-before", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  vue.renderSlot(_ctx.$slots, "navbar-before")
                ];
              }
            }),
            after: vue.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                serverRenderer.ssrRenderSlot(_ctx.$slots, "navbar-after", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  vue.renderSlot(_ctx.$slots, "navbar-after")
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<div class="sidebar-mask"></div>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "sidebar", {}, () => {
        _push(serverRenderer.ssrRenderComponent(_sfc_main$2, null, {
          top: vue.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              serverRenderer.ssrRenderSlot(_ctx.$slots, "sidebar-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                vue.renderSlot(_ctx.$slots, "sidebar-top")
              ];
            }
          }),
          bottom: vue.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              serverRenderer.ssrRenderSlot(_ctx.$slots, "sidebar-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                vue.renderSlot(_ctx.$slots, "sidebar-bottom")
              ];
            }
          }),
          _: 3
        }, _parent));
      }, _push, _parent);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "page", {}, () => {
        if (vue.unref(frontmatter).home) {
          _push(serverRenderer.ssrRenderComponent(_sfc_main$c, null, null, _parent));
        } else {
          _push(serverRenderer.ssrRenderComponent(_sfc_main$3, vue.mergeProps({
            key: vue.unref(page).path
          }, _attrs), {
            top: vue.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                serverRenderer.ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  vue.renderSlot(_ctx.$slots, "page-top")
                ];
              }
            }),
            bottom: vue.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                serverRenderer.ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  vue.renderSlot(_ctx.$slots, "page-bottom")
                ];
              }
            }),
            _: 3
          }, _parent));
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$1
});
var MyTemplate_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "MyTemplate",
  data() {
    return {
      message: "\u81EA\u5B9A\u4E49\u7EC4\u4EF6"
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "mytemplate" }, _attrs))}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../components/MyTemplate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var MyTemplate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var MyTemplate$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": MyTemplate
});
exports.createVueApp = createVueApp;
