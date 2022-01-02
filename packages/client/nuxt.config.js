import { defineNuxtConfig } from 'nuxt3'
import sass from 'sass'
import buefy from 'nuxt-buefy'
import dotenv from '@nuxtjs/dotenv'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
   head: {
      title: process.env.APP_NAME || 'analyst',
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         {
            hid: 'description',
            name: 'description',
            content: ''
         }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
   },

   modules: [
      buefy,
      dotenv
   ],

   build: {
      loaders: {
         sass: {
            implementation: sass,
         },
         scss: {
            implementation: sass,
         },
      },
   }
})
