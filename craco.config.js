module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss/nesting"),
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
  webpack: {
    configure: {
      optimization: {
        splitChunks: {
          chunks: "async",
          minSize: 20000,
          minChunks: 5,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    },
  },
};
