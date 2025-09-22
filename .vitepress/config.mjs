import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  srcExclude: ["README.md"],
  cleanUrls: true,
  ignoreDeadLinks: true,
  title: "Morgan Marshall",
  description:
    "Dad, Reverse EMP, Developer & CTO @FieldPursuit. Peeling back the layers of existence one at a time, amateur quantum researcher.",
  sitemap: {
    hostname: "https://morganmarshall.dev",
  },
  head: [
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://morganmarshall.dev/",
        name: "Morgan Marshall",
      }),
    ],

    [
      "meta",
      {
        name: "description",
        content:
          "Dad, Reverse EMP, Developer & CTO @FieldPursuit. Peeling back the layers of existence one at a time, amateur quantum researcher.",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Morgan Marshall, Developer, CTO, FieldPursuit, Quantum Researcher, Technology, Innovation",
      },
    ],
    ["meta", { name: "author", content: "Morgan Marshall" }],
    ["meta", { name: "robots", content: "index, follow" }],
    ["meta", { property: "og:title", content: "Morgan Marshall" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Dad, Reverse EMP, Developer & CTO @FieldPursuit. Peeling back the layers of existence one at a time, amateur quantum researcher.",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://morganmarshall.dev" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://morganmarshall.dev/android-chrome-512x512.png",
      },
    ], // Replace with an actual image URL
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:creator", content: "@imorganmarshall" }],
    ["meta", { name: "twitter:title", content: "Morgan Marshall" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Dad, Reverse EMP, Developer & CTO @FieldPursuit. Peeling back the layers of existence one at a time, amateur quantum researcher.",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://morganmarshall.dev/android-chrome-512x512.png",
      },
    ], // Replace with an actual image URL
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: { src: "/logo.svg", alt: "Morgan Marshall Logo" },
    nav: [{ text: "Home", link: "/" }],

    socialLinks: [
      {
        icon: {
          svg: `
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24">
              <title>LinkedIn</title>
              <path fill="currentColor" d="M20.447 20.452H16.89V14.8c0-1.348-.027-3.086-1.882-3.086-1.884 0-2.173 1.47-2.173 2.984v5.754H9.279V9h3.405v1.561h.048c.474-.9 1.635-1.848 3.366-1.848 3.596 0 4.259 2.366 4.259 5.444v6.295zM5.337 7.433a1.956 1.956 0 1 1 0-3.911 1.956 1.956 0 0 1 0 3.911zM6.986 20.452H3.688V9h3.298v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          `,
          ariaLabel: "linkedin",
        },
        link: "https://www.linkedin.com/in/morgan-marshall-837882a9",
      },
      {
        icon: "github",
        link: "https://github.com/MorganMarshall",
        ariaLabel: "github",
      },
      {
        icon: "x",
        link: "https://x.com/imorganmarshall",
        ariaLabel: "x.com",
      },
      {
        icon: "linktree",
        link: "https://linktr.ee/morganmarshall",
        ariaLabel: "linkedin",
      },
    ],
  },
  vite: {
    build: {
      target: "esnext", // modern JS reduces polyfills
      cssCodeSplit: true, // split CSS into smaller chunks
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor";
          },
        },
      },
    },
  },
});
