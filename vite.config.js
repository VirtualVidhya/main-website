import { defineConfig } from "vite";
import fastGlob from "fast-glob";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { createHtmlPlugin } from "vite-plugin-html";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import { imageToWebpPlugin } from 'vite-plugin-image-to-webp';

export default defineConfig({
  base: "",
  plugins: [
    createHtmlPlugin({
      inject: {
        injectTo: "body", // Ensures JS files are placed just before </body>
      },
    }),
    ViteImageOptimizer({
      jpg: { quality: 100 },
      jpeg: { quality: 100 },
      png: { quality: 100 },
      webp: { quality: 100 },
      avif: { quality: 100 },
      svg: { quality: 100 },
    }),
    // imageToWebpPlugin({
    //   filter: (filename) => {
    //     return filename.includes('/public/assets/images'); // Add your directory path here
    //   },
    //   imageFormats: ['jpg', 'jpeg', 'png'],
    //   webpQuality: {},
    //   destinationFolder: 'dist',
    // }),
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
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        pure_funcs: ["console.log", "console.info"], // Remove debug functions
      },
    },
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      input: Object.fromEntries(
        fastGlob
          .sync("**/*.html", {
            ignore: ["node_modules/**/*", "dist/**/*"], // Exclude unwanted directories
          })
          .map((file) => [file, path.resolve(__dirname, file)])
      ),
      output: {
        // manualChunks: undefined,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("swiper")) return "swiper"; // Swiper.js chunk
            if (id.includes("resend")) return "resend"; // Resend email package chunk
            return "vendor"; // Other node_modules dependencies
          }
          if (id.includes("/scripts/common/")) return "common"; // Shared utilities
          if (id.includes("/scripts/specific/course-carousel.js"))
            return "carousel";
          if (id.includes("/scripts/specific/contact-form-validation.js"))
            return "contact-form";
          return undefined;
        },
        entryFileNames: "scripts/[name].min.js", // Disable hashing for JS files
        chunkFileNames: "scripts/[name].min.js",
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
