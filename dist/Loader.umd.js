(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Loader = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //



  var script = {
    name: 'Loader',
    props: {
      message: String,
      blinking: {
        type: Boolean,
        default: function default$1(){return true}
      }
    },

  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "loader_wrapper" }, [
      _c("div", { staticClass: "spinner" }),
      _vm._v(" "),
      _vm.message
        ? _c(
            "div",
            { staticClass: "loader_message", class: { blinking: _vm.blinking } },
            [_vm._v("\n    " + _vm._s(_vm.message) + "\n  ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.default
        ? _c(
            "div",
            { staticClass: "loader_message", class: { blinking: _vm.blinking } },
            [_vm._t("default")],
            2
          )
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-56c46d65_0", { source: "\n*[data-v-56c46d65] {\r\n  box-sizing: border-box;\n}\n.loader_wrapper[data-v-56c46d65] {\r\n  display: inline-flex;\r\n  align-items: center;\n}\n.spinner[data-v-56c46d65] {\r\n\r\n  width: 1em;\r\n  height: 1em;\r\n\r\n  border-width: 0.05em;\r\n  border-radius: 100%;\r\n  border-style: solid;\r\n  border-color: currentColor transparent currentColor transparent;\r\n\r\n  animation-name: spinner_rotation-data-v-56c46d65;\r\n  animation-duration: 1s;\r\n  animation-iteration-count: infinite;\r\n  animation-timing-function: linear;\n}\n.loader_message[data-v-56c46d65] {\r\n  margin-left: 0.5em;\n}\n.loader_message.blinking[data-v-56c46d65] {\r\n  animation-name: blinking_text-data-v-56c46d65;\r\n  animation-duration: 1s;\r\n  animation-iteration-count: infinite;\r\n  animation-timing-function: linear;\r\n  animation-direction: alternate;\n}\n@keyframes spinner_rotation-data-v-56c46d65 {\n0% {transform: rotate(0deg);}\n100% {transform: rotate(360deg);}\n}\n@keyframes blinking_text-data-v-56c46d65 {\n0% {opacity: 0;}\n100% {opacity: 1;}\n}\r\n\r\n\r\n", map: {"version":3,"sources":["/home/moreillon/vue/vue_loader/src/Loader.vue"],"names":[],"mappings":";AA4CA;EACA,sBAAA;AACA;AAEA;EACA,oBAAA;EACA,mBAAA;AACA;AAEA;;EAEA,UAAA;EACA,WAAA;;EAEA,oBAAA;EACA,mBAAA;EACA,mBAAA;EACA,+DAAA;;EAEA,gDAAA;EACA,sBAAA;EACA,mCAAA;EACA,iCAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,6CAAA;EACA,sBAAA;EACA,mCAAA;EACA,iCAAA;EACA,8BAAA;AACA;AAEA;AACA,IAAA,uBAAA,CAAA;AACA,MAAA,yBAAA,CAAA;AACA;AAEA;AACA,IAAA,UAAA,CAAA;AACA,MAAA,UAAA,CAAA;AACA","file":"Loader.vue","sourcesContent":["<template>\r\n  <div class=\"loader_wrapper\">\r\n\r\n    <!-- the spinner -->\r\n    <div class=\"spinner\"/>\r\n\r\n    <!-- message if passed as prop -->\r\n    <div\r\n      v-if=\"message\"\r\n      v-bind:class=\"{blinking: blinking}\"\r\n      class=\"loader_message\">\r\n      {{message}}\r\n    </div>\r\n\r\n    <div\r\n      v-if=\"$slots.default\"\r\n      v-bind:class=\"{blinking: blinking}\"\r\n      class=\"loader_message\">\r\n      <slot />\r\n    </div>\r\n\r\n\r\n\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n\r\n\r\nexport default {\r\n  name: 'Loader',\r\n  props: {\r\n    message: String,\r\n    blinking: {\r\n      type: Boolean,\r\n      default(){return true}\r\n    }\r\n  },\r\n\r\n}\r\n</script>\r\n\r\n<!-- Add \"scoped\" attribute to limit CSS to this component only -->\r\n<style scoped>\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.loader_wrapper {\r\n  display: inline-flex;\r\n  align-items: center;\r\n}\r\n\r\n.spinner {\r\n\r\n  width: 1em;\r\n  height: 1em;\r\n\r\n  border-width: 0.05em;\r\n  border-radius: 100%;\r\n  border-style: solid;\r\n  border-color: currentColor transparent currentColor transparent;\r\n\r\n  animation-name: spinner_rotation;\r\n  animation-duration: 1s;\r\n  animation-iteration-count: infinite;\r\n  animation-timing-function: linear;\r\n}\r\n\r\n.loader_message {\r\n  margin-left: 0.5em;\r\n}\r\n\r\n.loader_message.blinking {\r\n  animation-name: blinking_text;\r\n  animation-duration: 1s;\r\n  animation-iteration-count: infinite;\r\n  animation-timing-function: linear;\r\n  animation-direction: alternate;\r\n}\r\n\r\n@keyframes spinner_rotation {\r\n  0% {transform: rotate(0deg);}\r\n  100% {transform: rotate(360deg);}\r\n}\r\n\r\n@keyframes blinking_text {\r\n  0% {opacity: 0;}\r\n  100% {opacity: 1;}\r\n}\r\n\r\n\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-56c46d65";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('Loader', __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
