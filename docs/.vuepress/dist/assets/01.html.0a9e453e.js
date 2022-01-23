import { r as resolveComponent, o as openBlock, c as createElementBlock, b as createBaseVNode, a as createVNode, F as Fragment, e as createStaticVNode, d as createTextVNode } from "./app.13f74eb1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h2 id="\u524D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u524D\u7F6E" aria-hidden="true">#</a> \u524D\u7F6E</h2><p>\u6700\u597D\u6709\u4E00\u5B9A\u7684HTML\u3001JavaScript\u3001CSS\u57FA\u7840\u3002</p><h2 id="mvvm\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#mvvm\u6A21\u5F0F" aria-hidden="true">#</a> MVVM\u6A21\u5F0F\uFF1F</h2><p><code>MVVM</code>\u662F<code>Model-View-ViewModel</code>\u7684\u7F29\u5199\u3002<br><code>MVVM</code> \u7684\u6838\u5FC3\u662F <code>ViewModel</code> \u5C42\uFF0C\u5B83\u5C31\u50CF\u662F\u4E00\u4E2A\u4E2D\u8F6C\u7AD9<code>\uFF08value converter\uFF09</code>\uFF0C\u8D1F\u8D23\u8F6C\u6362 <code>Model</code> \u4E2D\u7684\u6570\u636E\u5BF9\u8C61\u6765\u8BA9\u6570\u636E\u53D8\u5F97\u66F4\u5BB9\u6613\u7BA1\u7406\u548C\u4F7F\u7528\uFF0C\u8BE5\u5C42\u5411\u4E0A\u4E0E\u89C6\u56FE\u5C42\u8FDB\u884C\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\uFF0C\u5411\u4E0B\u4E0E <code>Model</code> \u5C42\u901A\u8FC7\u63A5\u53E3\u8BF7\u6C42\u8FDB\u884C\u6570\u636E\u4EA4\u4E92\uFF0C\u8D77\u5448\u4E0A\u542F\u4E0B\u4F5C\u7528\u3002</p>', 4);
const _hoisted_5 = { class: "custom-container tip" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("p", { class: "custom-container-title" }, "\u53C2\u8003", -1);
const _hoisted_7 = {
  href: "http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_8 = /* @__PURE__ */ createTextVNode("http://www.ruanyifeng.com");
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_10 = {
  href: "https://www.liaoxuefeng.com/wiki/1022910821149312/1108898947791072",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_11 = /* @__PURE__ */ createTextVNode("https://www.liaoxuefeng.com");
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_13 = {
  href: "https://www.cnblogs.com/iovec/p/7840228.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_14 = /* @__PURE__ */ createTextVNode("https://www.cnblogs.com");
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_16 = /* @__PURE__ */ createStaticVNode('<h3 id="mvc" tabindex="-1"><a class="header-anchor" href="#mvc" aria-hidden="true">#</a> MVC</h3><p>\uFF08\u6709\u5370\u8C61\u5373\u53EF\uFF09</p><p><img src="https://s6.jpg.cm/2022/01/04/LN4yR5.png" alt="LN4yR5.png"></p><p>\u6240\u6709\u901A\u4FE1\u90FD\u662F\u5355\u5411\u7684\u3002\uFF08\u6709\u65F6MVC\u4F1A\u5BFC\u81F4\u4E1A\u52A1\u903B\u8F91\u90FD\u90E8\u7F72\u5728 View\uFF0C\u4F7FView \u975E\u5E38\u539A\uFF0C\u800C Controller \u76F8\u5BF9\u8584\u3002\uFF09</p><h3 id="mvp" tabindex="-1"><a class="header-anchor" href="#mvp" aria-hidden="true">#</a> MVP</h3><p>\uFF08\u6709\u5370\u8C61\u5373\u53EF\uFF09</p><p><img src="https://s6.jpg.cm/2022/01/04/LN4MTG.png" alt="LN4MTG.png"></p><p>MVP \u6A21\u5F0F\u5C06 Controller \u6539\u540D\u4E3A Presenter\uFF0C\u540C\u65F6\u6539\u53D8\u4E86\u901A\u4FE1\u65B9\u5411\u3002</p><ol><li><p>\u5404\u90E8\u5206\u4E4B\u95F4\u7684\u901A\u4FE1\uFF0C\u90FD\u662F\u53CC\u5411\u7684\u3002</p></li><li><p>View \u4E0E Model \u4E0D\u53D1\u751F\u8054\u7CFB\uFF0C\u90FD\u901A\u8FC7 Presenter \u4F20\u9012\u3002</p></li><li><p>View \u975E\u5E38\u8584\uFF0C\u4E0D\u90E8\u7F72\u4EFB\u4F55\u4E1A\u52A1\u903B\u8F91\uFF0C\u79F0\u4E3A&quot;\u88AB\u52A8\u89C6\u56FE&quot;\uFF08Passive View\uFF09\uFF0C\u5373\u6CA1\u6709\u4EFB\u4F55\u4E3B\u52A8\u6027\uFF0C\u800C Presenter\u975E\u5E38\u539A\uFF0C\u6240\u6709\u903B\u8F91\u90FD\u90E8\u7F72\u5728\u90A3\u91CC\u3002</p></li><li><p>\u4E4B\u6240\u4EE5\u5217\u51FAMVP\uFF0C\u662F\u56E0\u4E3AMVVM \u6A21\u5F0F\u5C06 Presenter \u6539\u540D\u4E3A ViewModel\uFF0C\u57FA\u672C\u4E0A\u4E0E MVP \u6A21\u5F0F\u5B8C\u5168\u4E00\u81F4\uFF08\u6CE8\u610F\u5BF9\u6BD4\u7BAD\u5934\u2014\u2014\u901A\u8BAF\u65B9\u5F0F\u7684\u533A\u522B\uFF09\u3002</p></li></ol><h3 id="mvvm" tabindex="-1"><a class="header-anchor" href="#mvvm" aria-hidden="true">#</a> MVVM</h3><p><img src="https://s6.jpg.cm/2022/01/04/LN4Dmu.png" alt="LN4Dmu.png"></p><p>\u552F\u4E00\u7684\u533A\u522B\u662F\uFF0C\u5B83\u91C7\u7528\u53CC\u5411\u7ED1\u5B9A\uFF08data-binding\uFF09\uFF1AView\u7684\u53D8\u52A8\uFF0C\u81EA\u52A8\u53CD\u6620\u5728 ViewModel\uFF0C\u53CD\u4E4B\u4EA6\u7136\u3002Angular \u548C Ember \u90FD\u91C7\u7528\u8FD9\u79CD\u6A21\u5F0F\u3002</p><h3 id="\u4F8B\u5B50\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#\u4F8B\u5B50\u5BF9\u6BD4" aria-hidden="true">#</a> \u4F8B\u5B50\u5BF9\u6BD4</h3><ol><li><code>MVC</code>\u6A21\u5F0F\uFF08<code>jQuery</code>\u5B9E\u73B0\u7684\u4FEE\u6539\u4E24\u4E2ADOM\u8282\u70B9\u7684\u4F8B\u5B50\uFF09</li></ol><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token comment">&lt;!-- HTML --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Hello, <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Bart<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>You are <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>age<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;Homer&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">51</span><span class="token punctuation">;</span>\n\n<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;#age&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">//\u64CD\u4F5CDOM</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="2"><li>\u5982\u679C\u6211\u4EEC\u4F7F\u7528<code>MVVM</code>\u6846\u67B6\u6765\u5B9E\u73B0\u540C\u6837\u7684\u529F\u80FD\uFF0C\u6211\u4EEC\u9996\u5148\u5E76\u4E0D\u5173\u5FC3<code>DOM</code>\u7684\u7ED3\u6784\uFF0C\u800C\u662F\u5173\u5FC3\u6570\u636E\u5982\u4F55\u5B58\u50A8\u3002\u6700\u7B80\u5355\u7684\u6570\u636E\u5B58\u50A8\u65B9\u5F0F\u662F\u4F7F\u7528<code>JavaScript</code>\u5BF9\u8C61\uFF1A</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n    name<span class="token operator">:</span> <span class="token string">&#39;Bart&#39;</span><span class="token punctuation">,</span>\n    age<span class="token operator">:</span> <span class="token number">12</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\nperson<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;Homer&#39;</span><span class="token punctuation">;</span>\nperson<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">51</span><span class="token punctuation">;</span>\n<span class="token comment">//\u6539\u53D8JavaScript\u5BF9\u8C61\u7684\u72B6\u6001\uFF0C\u4F1A\u5BFC\u81F4DOM\u7ED3\u6784\u4F5C\u51FA\u5BF9\u5E94\u7684\u53D8\u5316</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="vue\u5B9E\u73B0\u4F8B\u5B50" tabindex="-1"><a class="header-anchor" href="#vue\u5B9E\u73B0\u4F8B\u5B50" aria-hidden="true">#</a> vue\u5B9E\u73B0\u4F8B\u5B50</h3><p>\u770B\u5B8C\u4E0A\u9762\u61F5\u61F5\u61C2\u61C2\uFF1F\u4E0B\u9762\u770B\u4E00\u4E9B\u5728<code>vue</code>\u4E2D\u7684\u4F53\u73B0\uFF0C\u4E0D\u6DF1\u7A76\uFF0C\u6BD5\u7ADF\u8FD9\u91CC\u8FD8\u6CA1\u5F00\u59CB\u8FDB\u5165\u5B66\u4E60\uFF0C\u5728\u540E\u7EED\u4F7F\u7528\u4E2D\u5C31\u4F1A\u660E\u767D\uFF1A</p><p>Vue \u7684 View \u6A21\u677F\uFF1A</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>{{message}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>showMessage()<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Click me<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Vue \u7684 ViewModel \u5C42\uFF08\u4F2A\u4EE3\u7801\uFF09\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    el<span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>\n    data<span class="token operator">:</span> <span class="token punctuation">{</span>     <span class="token comment">// \u7528\u4E8E\u63CF\u8FF0\u89C6\u56FE\u72B6\u6001\uFF08\u6709\u57FA\u4E8E Model \u5C42\u6570\u636E\u5B9A\u4E49\u7684\uFF0C\u4E5F\u6709\u7EAF\u524D\u7AEF\u5B9A\u4E49\uFF09</span>\n        message<span class="token operator">:</span> <span class="token string">&#39;Hello Vue!&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// \u7EAF\u524D\u7AEF\u5B9A\u4E49</span>\n        server<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// \u5B58\u653E\u57FA\u4E8E Model \u5C42\u6570\u636E\u7684\u4E8C\u6B21\u5C01\u88C5\u6570\u636E</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    methods<span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token comment">// \u7528\u4E8E\u63CF\u8FF0\u89C6\u56FE\u884C\u4E3A\uFF08\u5B8C\u5168\u524D\u7AEF\u5B9A\u4E49\uFF09</span>\n        <span class="token function">showMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n            <span class="token keyword">let</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n            <span class="token function">alert</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">let</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Ajax \u83B7\u53D6 Model \u5C42\u7684\u6570\u636E</span>\n        <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            url<span class="token operator">:</span> <span class="token string">&#39;/your/server/data/api&#39;</span><span class="token punctuation">,</span>\n            <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n                <span class="token comment">// TODO \u5BF9\u83B7\u53D6\u5230\u7684 Model \u6570\u636E\u8FDB\u884C\u8F6C\u6362\u5904\u7406\uFF0C\u505A\u4E8C\u6B21\u5C01\u88C5</span>\n                vm<span class="token punctuation">.</span>server <span class="token operator">=</span> res<span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>\u670D\u52A1\u7AEF\u7684 Model \u5C42\uFF08\u7701\u7565\u4E1A\u52A1\u903B\u8F91\u5904\u7406\uFF0C\u53EA\u63CF\u8FF0\u5BF9\u5916\u63A5\u53E3\uFF09\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n    <span class="token string">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/your/server/data/api&quot;</span><span class="token punctuation">,</span>\n    <span class="token string">&quot;res&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;success&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;IoveC&quot;</span><span class="token punctuation">,</span>\n        <span class="token string">&quot;domain&quot;</span><span class="token operator">:</span> <span class="token string">&quot;www.cnblogs.com&quot;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u518D\u7ED9\u4E00\u5F20\u56FE\uFF1A</p><p><img src="https://s6.jpg.cm/2022/01/04/LNBNCy.png" alt="LNBNCy.png"></p><p>\u8FD9\u5C31\u5B9E\u73B0\u4E86\u524D\u540E\u7AEF\u5206\u79BB\u4E86\u3002</p><p>\u6846\u67B6\u5E2E\u6211\u4EEC\u5B9E\u73B0\u4E86MVVM\u6A21\u5F0F\uFF0C\u6211\u4EEC\u4EE5\u8FD9\u6837\u7684\u6A21\u5F0F\u8FDB\u884C\u5F00\u53D1\u3002OK\uFF1F</p><h2 id="\u5B89\u88C5vue-devtools" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5vue-devtools" aria-hidden="true">#</a> \u5B89\u88C5vue-devtools</h2><p>\u5E76\u975E\u5FC5\u987B\u7684\uFF0C\u53EF\u9009\u3002</p>', 32);
const _hoisted_48 = /* @__PURE__ */ createTextVNode("\u963F\u91CC\u4E91\u76D8\u5206\u4EAB\uFF1A");
const _hoisted_49 = {
  href: "https://www.aliyundrive.com/s/xcqqvUnWqeV",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_50 = /* @__PURE__ */ createTextVNode("vue-devtools5.3.4.crx");
const _hoisted_51 = /* @__PURE__ */ createTextVNode("\u6D4F\u89C8\u5668\u63D2\u4EF6\u6587\u4EF6");
const _hoisted_52 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("strong", null, "\u63D2\u4EF6\u65B9\u5F0F\u5B89\u88C5"),
  /* @__PURE__ */ createTextVNode("\uFF1A")
], -1);
const _hoisted_53 = /* @__PURE__ */ createBaseVNode("ol", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "\u4E0B\u8F7D\u5B89\u88C5\u6587\u4EF6\uFF08.crx\u6587\u4EF6\uFF09"),
  /* @__PURE__ */ createBaseVNode("li", null, [
    /* @__PURE__ */ createTextVNode("\u6253\u5F00\u6269\u5C55\u7A0B\u5E8F\u5B89\u88C5\u9875\u9762\uFF0Cchrome\u6D4F\u89C8\u5668\u53EF\u8F93\u5165\uFF1A"),
    /* @__PURE__ */ createBaseVNode("code", null, "chrome://extensions"),
    /* @__PURE__ */ createTextVNode("\uFF0C\u6253\u5F00\u53F3\u4E0A\u89D2\u7684\u3010\u5F00\u53D1\u8005\u6A21\u5F0F\u3011\u3002")
  ]),
  /* @__PURE__ */ createBaseVNode("li", null, "\u5C06\u4E0B\u8F7D\u597D\u7684.crx\u6587\u4EF6\u62D6\u62FD\u5230\u5230\u6269\u5C55\u5B89\u88C5\u9875\u9762\u5185\uFF0C\u7B49\u5F85\u6570\u79D2\uFF0C\u5728\u5B89\u88C5\u5F39\u7A97\u5185\u70B9\u51FB\u6DFB\u52A0\u5373\u53EF\u3002")
], -1);
const _hoisted_54 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("strong", null, "\u624B\u52A8\u5B89\u88C5"),
  /* @__PURE__ */ createTextVNode("\uFF1A")
], -1);
const _hoisted_55 = /* @__PURE__ */ createTextVNode("\u5230guthub\u4E0A\u53BB\u4E0B\u8F7D\u5B89\u88C5\u5305\uFF0C");
const _hoisted_56 = {
  href: "https://github.com/vuejs/vue-devtools/tree/master",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_57 = /* @__PURE__ */ createTextVNode("vue-devtools");
const _hoisted_58 = /* @__PURE__ */ createTextVNode(",\u4E0B\u8F7D\u6210\u529F\u540E\u91CC\u9762\u4F1A\u6709\u4E00\u4E2A");
const _hoisted_59 = /* @__PURE__ */ createBaseVNode("code", null, "shells", -1);
const _hoisted_60 = /* @__PURE__ */ createTextVNode("\u6587\u4EF6\u5939\uFF0C\u8BF4\u660E\u662F\u53EF\u7528\u7248\u672C\uFF0C\u4E0D\u662F");
const _hoisted_61 = /* @__PURE__ */ createBaseVNode("code", null, "master", -1);
const _hoisted_62 = /* @__PURE__ */ createTextVNode("\u5206\u652F\u7684\u4E0D\u4F1A\u4E0D\u4F1A\u6709\u6B64\u6587\u4EF6\u5939");
const _hoisted_63 = /* @__PURE__ */ createStaticVNode("<li>\u8FDB\u5165<code>vue-devtools-master</code>\u6587\u4EF6\u5939\u4E0B\uFF0C\u5728\u8DEF\u5F84\u680F\u8F93\u5165cmd\uFF0C\u7136\u540E\u56DE\u8F66\u3002</li><li>\u7136\u540E\u8F93\u5165<code>npm install</code>\u547D\u4EE4\u5B89\u88C5\u4F9D\u8D56\u3002\uFF08\u5982\u679C\u9519\u8BEF\u5927\u4E0D\u4E86\u63A8\u5012\u91CD\u6765\uFF0C\u68C0\u67E5\u662F\u5426\u4E3A<code>master</code>\u5206\u652F\uFF0C\u6216\u4F7F\u7528<code>cnpm</code>\u7B49\u65B9\u6CD5\u4E0B\u8F7D\u3002\uFF09</li><li>\u5B89\u88C5\u5B8C\u6210\u4E4B\u540E\u6267\u884C\u547D\u4EE4<code>npm run build</code>\u3002</li><li>\u6253\u5F00\u8C37\u6B4C\u6D4F\u89C8\u5668\uFF0C\u8FDB\u5165\u66F4\u591A\u5DE5\u5177 &gt; \u6269\u5C55\u7A0B\u5E8F &gt; \u70B9\u51FB\u52A0\u8F7D\u5DF2\u89E3\u538B\u7684\u62D3\u5C55\u7A0B\u5E8F &gt; \u9009\u62E9<code>vue-devtools-matser</code>\u6587\u4EF6\u4E2D<code>shells</code>\u6587\u4EF6\u4E2D\u7684<code>chrome</code>\u6587\u4EF6\u3002</li>", 4);
const _hoisted_67 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode("\u5B89\u88C5\u6210\u529F\u4F60\u4F1A\u770B\u5230\u4E0B\u9762\u5185\u5BB9\uFF1A "),
  /* @__PURE__ */ createBaseVNode("img", {
    src: "https://s2.loli.net/2022/01/07/iAPnmWhQY7aOBVE.png",
    alt: ""
  })
], -1);
const _hoisted_68 = /* @__PURE__ */ createBaseVNode("p", null, "\u8C03\u8BD5\u9700\u8981\u4F60\u8FD0\u884C\u4E00\u4E2Avue\u5B9E\u4F8B\u3002", -1);
const _hoisted_69 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "\u5F00\u53D1\u5DE5\u5177",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#\u5F00\u53D1\u5DE5\u5177",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" \u5F00\u53D1\u5DE5\u5177")
], -1);
const _hoisted_70 = /* @__PURE__ */ createBaseVNode("p", null, "\u5BF9\u5F00\u53D1\u5DE5\u5177\u6CA1\u592A\u5927\u8981\u6C42\uFF0C\u4E0B\u9762\u662F\u4E00\u4E9B\u5E38\u7528\u7684\u5DE5\u5177\uFF1A", -1);
const _hoisted_71 = {
  href: "https://code.visualstudio.com/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_72 = /* @__PURE__ */ createTextVNode("VSCode");
const _hoisted_73 = {
  href: "https://www.dcloud.io/hbuilderx.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_74 = /* @__PURE__ */ createTextVNode("HBuilder X");
const _hoisted_75 = {
  href: "https://www.jetbrains.com/webstorm/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_76 = /* @__PURE__ */ createTextVNode("WebStorm");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createBaseVNode("div", _hoisted_5, [
      _hoisted_6,
      createBaseVNode("p", null, [
        createBaseVNode("a", _hoisted_7, [
          _hoisted_8,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_9,
        createBaseVNode("a", _hoisted_10, [
          _hoisted_11,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_12,
        createBaseVNode("a", _hoisted_13, [
          _hoisted_14,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_15
      ])
    ]),
    _hoisted_16,
    createBaseVNode("p", null, [
      _hoisted_48,
      createBaseVNode("a", _hoisted_49, [
        _hoisted_50,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_51
    ]),
    _hoisted_52,
    _hoisted_53,
    _hoisted_54,
    createBaseVNode("ol", null, [
      createBaseVNode("li", null, [
        _hoisted_55,
        createBaseVNode("a", _hoisted_56, [
          _hoisted_57,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_58,
        _hoisted_59,
        _hoisted_60,
        _hoisted_61,
        _hoisted_62
      ]),
      _hoisted_63
    ]),
    _hoisted_67,
    _hoisted_68,
    _hoisted_69,
    _hoisted_70,
    createBaseVNode("ol", null, [
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_71, [
          _hoisted_72,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_73, [
          _hoisted_74,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_75, [
          _hoisted_76,
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ])
  ], 64);
}
var _01_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { _01_html as default };
