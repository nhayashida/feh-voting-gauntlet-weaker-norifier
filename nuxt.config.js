/* eslint-disable nuxt/no-cjs-in-config */

const fs = require('fs');
const path = require('path');

require('dotenv').config();

const config = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: process.env.LIFF_SDK_URL || '' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/composition-api'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/dotenv', '@nuxtjs/style-resources'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', 'nuxt-buefy'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  server: {},

  serverMiddleware: ['~/server/controllers/'],
};

if (process.env.SSL_KEY && process.env.SSL_CERT) {
  if (config.server) {
    config.server.https = {
      key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY)),
      cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CERT)),
    };
  }
}

module.exports = config;
