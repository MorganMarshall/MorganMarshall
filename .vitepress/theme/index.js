import DefaultTheme from "vitepress/theme";
import { h } from "vue";
//import BlogIndex from "./theme/BlogIndex.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Injects the GTM noscript iframe at the very top of the <body> wrapper
      "layout-top": () =>
        h("noscript", {}, [
          h("iframe", {
            src: "https://www.googletagmanager.com/ns.html?id=GTM-5LB44MBK",
            height: "0",
            width: "0",
            style: "display:none;visibility:hidden",
          }),
        ]),
    });
  },
};
