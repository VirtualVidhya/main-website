import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import compressor from "astro-compressor";
import fs from "fs";
import path from "path";

export default defineConfig({
  site: "https://www.vvidhya.com",

  integrations: [
    sitemap({
      serialize(item) {
        let relativePath = new URL(item.url).pathname; // Convert full URL to relative path

        // Normalize paths (`/index` → `/`, `/dir/index` → `/dir/`)
        if (relativePath === "/index") {
          relativePath = "/";
        } else if (relativePath.endsWith("/index")) {
          relativePath = relativePath.replace("/index", "");
        }

        // Define custom priority and changefreq per page
        const pageConfig = {
          "/": { priority: 1.0, changefreq: "daily" },
          "/contact/": { priority: 0.7, changefreq: "weekly" },
          "/terms-and-conditions/": { priority: 0.5, changefreq: "monthly" },
          "/privacy-policy/": { priority: 0.5, changefreq: "monthly" },
          "/courses/": { priority: 0.9, changefreq: "weekly" },
          "/courses/multimedia/": { priority: 0.9, changefreq: "weekly" },
          "/courses/programming/": { priority: 0.9, changefreq: "weekly" },
          "/courses/kids/": { priority: 0.9, changefreq: "weekly" },
          "/courses/literacy/": { priority: 0.9, changefreq: "weekly" },
        };

        // Assign custom config or use default values
        const { priority, changefreq } = pageConfig[relativePath] || {
          priority: 0.8,
          changefreq: "weekly",
        };
        item.priority = priority;
        item.changefreq = changefreq;

        // Set lastmod automatically from file modification date
        const filePath = path.join(
          process.cwd(),
          "dist",
          relativePath.endsWith("/")
            ? `${relativePath}index.html`
            : `${relativePath}.html`
        );

        if (fs.existsSync(filePath)) {
          item.lastmod = fs.statSync(filePath).mtime.toISOString(); // Use last modified timestamp
        } else {
          item.lastmod = new Date().toISOString(); // Default to now
        }

        // Print log only in production
        // if (process.env.NODE_ENV === "production") {
        //   console.log(
        //     chalk.grey(`Path:`) +
        //       chalk.green(` ${relativePath}, `) +
        //       chalk.grey(`Priority:`) +
        //       chalk.whiteBright(` ${item.priority}, `) +
        //       chalk.grey(`ChangeFreq:`) +
        //       chalk.whiteBright(` ${item.changefreq}`)
        //   );
        // }

        return item;
      },
    }),
    compress({
      CSS: false,
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
      Image: true,
      JavaScript: true,
      SVG: false,
    }),
    compressor({
      fileExtensions: [".html", ".css", ".js", ".cjs", ".mjs", ".svg", ".xml"],
      gzip: true,
      brotli: true,
    }),
  ],
  
  prefetch: {
    // Automatically prefetch all links once the page loads.
    // (If you prefer hover-only, set this to false and add data-astro-prefetch on each <a>.)
    prefetchAll: false,

    // Optionally override the default strategy for links without an explicit value.
    // defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  output: "static",

  build: {
    assets: "resources",
  },
});
