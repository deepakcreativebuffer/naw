// next.config.js
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withCSS((withSass({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })

    return config
  }
})))
// module.exports = withSass()
// next.config.js

module.exports = {
  plugins: [
    [
      "@fullhuman/postcss-purgecss",
       ["production", "test"].indexOf(process.env.NODE_ENV) > -1
        ? {
          // the paths to all template files
          content: [
            "./pages/**/*.{js,jsx,ts,tsx}",
            "./components/**/*.{js,jsx,ts,tsx}",
          ],
          // function used to extract class names from the templates
          defaultExtractor: (content) =>
            content.match(/[\w-/:]+(?<!:)/g) || [],
        }
        : false,
    ],
  ], images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['com-crayon-naw.s3.amazonaws.com', 'www.tripadvisor.com.mx', 'naw-media.s3.amazonaws.com'],
    minimumCacheTTL: 60,
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
};