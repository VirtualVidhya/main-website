import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from '@playform/compress';
import compressor from 'astro-compressor';

export default defineConfig({
    integrations: [
        tailwind(),
        compress(
            {
                CSS: true,
                HTML: {
                  'html-minifier-terser': {
                    removeAttributeQuotes: false,
                  },
                },
                Image: true,
                JavaScript: true,
                SVG: true,
              }
        ),
        compressor({
            fileExtensions: [".html", ".css", ".js", ".mjs", ".svg"],
            gzip: true,
            brotli: true,
        })
    ],
    output: "static",
});
