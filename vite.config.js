import { defineConfig } from "vite";
import fastGlob from "fast-glob";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  base: "",
  plugins: [
    createHtmlPlugin({
      inject: {
        injectTo: "body", // Ensures JS files are placed just before </body>
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Tailwind CSS plugin
        autoprefixer(), // Autoprefixer for cross-browser compatibility
      ],
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        fastGlob
          .sync("**/*.html", {
            ignore: ["node_modules/**/*", "dist/**/*"], // Exclude unwanted directories
          })
          .map((file) => [file, path.resolve(__dirname, file)])
      ),
      output: {
        manualChunks: undefined,
        entryFileNames: "js/[name].min.js", // Disable hashing for JS files
        chunkFileNames: "js/[name].min.js",
        assetFileNames: (assetInfo) => {
          if (/\.(css)$/.test(assetInfo.name)) {
            return "styles/[name].[ext]"; // Place CSS in styles/ directory
          }
          return "[name].[ext]";
        },
      },
    },
  },
});
