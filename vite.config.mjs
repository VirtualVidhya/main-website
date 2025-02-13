import { defineConfig } from "vite";
import fastGlob from "fast-glob";
import path from "path";
import chalk from 'chalk'; // for colored logs
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { createHtmlPlugin } from "vite-plugin-html";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import { imageToWebpPlugin } from 'vite-plugin-image-to-webp';
import Sitemap from "vite-plugin-sitemap";

async function getStaticPages() {
  const files = await fastGlob('dist/**/*.html'); // Get all .html files inside dist
  const pageData = {};

  if (process.env.NODE_ENV === 'production') {
    console.log(chalk.yellowBright(`# generating sitemap...`));
  }

  files.forEach(file => {
    let relativePath = file.replace('dist', '').replace('.html', ''); // Convert to URL path

    // Ensure root path is `/`, but keep subdirectories correctly formatted
    if (relativePath === '/index') {
      relativePath = '/';
    } else if (relativePath.endsWith('/index')) {
      relativePath = relativePath.replace('/index', ''); // Remove `/index`, but keep the folder path
    }

    // Manually set fixed priorities and changefreq
    const pageConfig = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/contact': { priority: 0.7, changefreq: 'weekly' },
      '/terms-and-conditions': { priority: 0.5, changefreq: 'monthly' },
      '/privacy-policy': { priority: 0.5, changefreq: 'monthly' },
      '/courses': { priority: 0.9, changefreq: 'weekly' },
      '/courses/multimedia': { priority: 0.9, changefreq: 'weekly' },
      '/courses/programming': { priority: 0.9, changefreq: 'weekly' },
      '/courses/kids': { priority: 0.9, changefreq: 'weekly' },
      '/courses/literacy': { priority: 0.9, changefreq: 'weekly' },
    };

    if (pageConfig[relativePath]) {
      pageData[relativePath] = pageConfig[relativePath];
    } else {
      pageData[relativePath] = { priority: 0.8, changefreq: 'weekly' }; // Default values
    }

    // console.log(`Path: ${relativePath}, Priority: ${pageData[relativePath].priority}, ChangeFreq: ${pageData[relativePath].changefreq}`);
    // Print log only in production
    if (process.env.NODE_ENV === 'production') {
      console.log(
        chalk.grey(`Path:`) + 
        chalk.green(` ${relativePath}, `) + 
        chalk.grey(`Priority:`) + 
        chalk.whiteBright(` ${pageData[relativePath].priority}, `) + 
        chalk.grey(`ChangeFreq:`) + 
        chalk.whiteBright(` ${pageData[relativePath].changefreq}`)
      );
    }
  });

  if (process.env.NODE_ENV === 'production') {
    console.log(
      chalk.white(`✔ `) +
      chalk.yellowBright(`successfully generated sitemap\n\n`)
    );
  }

  return pageData;
}

export default defineConfig(async () => {
  const staticPages = await getStaticPages(); // Fetch static pages once and reuse
  
  return {
    base: "",
    plugins: [
      createHtmlPlugin({
        inject: {
          injectTo: "body", // Ensures JS files are placed just before </body>
        },
      },),
      ViteImageOptimizer({
        // test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i,
        test: /public\/(images\/(course-icons|course-work|logo-icons|favicons))\/.*\.(jpe?g|png|gif|tiff|webp|avif|svg)$/i, 
        jpg: { quality: 100 },
        jpeg: { quality: 100 },
        png: { quality: 100 },
        webp: { quality: 100 },
        avif: { quality: 100 },
        // svg: false,
      }),
      // imageToWebpPlugin({
      //   filter: (filename) => {
      //     return filename.includes('/public/assets/images'); // Add your directory path here
      //   },
      //   imageFormats: ['jpg', 'jpeg', 'png'],
      //   webpQuality: {},
      //   destinationFolder: 'dist',
      // }),
      Sitemap({
        hostname: 'https://www.vvidhya.com',
        outDir: 'dist',
        changefreq: Object.fromEntries(
          Object.entries(staticPages).map(([url, data]) => [url, data.changefreq])
        ),
        priority: Object.fromEntries(
          Object.entries(staticPages).map(([url, data]) => [url, data.priority])
        ),
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
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // Remove console logs
          pure_funcs: ["console.log", "console.info"], // Remove debug functions
          module: true,
          toplevel: true,
          passes: 3,
        },
        output: {
          comments: false,
        }
      },
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        treeshake: true,
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
              if (id.includes("swiper")) return "swiper";
              if (id.includes("resend")) return "resend";
              if (id.includes("lottiefiles")) return "lottiefiles";
              return "vendor"; // Other node_modules dependencies
            }
            if (id.includes("/scripts/common/")) return "common"; // Shared utilities
            if (id.includes("/scripts/specific/course-carousel.js"))
              return "carousel";
            if (id.includes("/scripts/specific/contact-form-validation.js"))
              return "contact-form";
            if (id.includes("/scripts/specific/lottie-anim.js"))
              return "lottie-anim";
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
  }
});
