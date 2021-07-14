<!--
   Authors: Wesley Ford (ntohq) 
            Sergix
   Date: 03/07/2021
 -->

<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
          style="padding-top: 0; padding-bottom: 0;"
        >
          <img
            src="@/static/Analyst_Logo_Transparent.png"
            width="26"
            height="26"
            style="padding: 5px;"
          />
          <h1 class="title is-6 has-text-white">analyst</h1>
        </a>
      </div>
    </nav>
    <div class="page-wrapper">
      <section class="main-content columns" style="flex: 6;">
        <aside class="column is-2 section">
          <ul class="menu-list">
            <li v-for="(item, key) of items" :key="key">
              <nuxt-link :to="item.to" exact-active-class="is-active">
                <b-icon :icon="item.icon" /> {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </aside>

        <div
          class="container column is-10"
          style="display: flex; flex-direction: column;"
        >
          <nuxt />
        </div>
      </section>
      <footer
        class="footer level has-background-primary has-text-centered has-text-white box"
        style="padding: 20px; flex: 0.5; border-radius: 6px 6px 0px 0px"
      >
        <div class="level-left">
          <p class="level-item">Analyst 2021&copy;</p>
        </div>
        <div class="level-center">
          <p class="level-item">
            This software is experimental and is not a professional stock market
            advisor.
          </p>
        </div>
        <div class="level-center">
          <p class="level-item">
            Written with
            <a
              href="https://nuxtjs.org/"
              style="color: rgb(255, 100, 213); padding-left: 5px"
              >nuxt.js</a
            >
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
body {
  overflow-x: hidden;
}
.page-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  max-width: 125em;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Settings',
          icon: 'user-cog',
          to: { name: 'config' }
        },
        {
          title: 'More',
          icon: 'info-circle',
          to: { name: 'about' }
        }
      ]
    }
  },

  created() {
    this.loadVuexState()
    this.pushNotifications()
  },
  methods: {
    loadVuexState() {
      this.$store.commit('getSavedBroker')
      this.$store.commit('getSavedQuickLink')
    },
    pushNotifications() {
      this.danger()
    },
    danger() {
      this.$buefy.notification.open({
        message: `Welcome to Analyst!<br> If <b>you</b> continue to use this website, you are accepting to <ol><li>the use of cookies,</li> <li>the fact that this software is not a professional advisor,</li>and <li>The use of this site at your own risk.</li></lo><br> <p>Happy Trading!<br><i>    ntohq and sergix</i></p>`,
        position: 'is-bottom-right',
        closable: true,
        indefinite: true,
        type: 'is-warning',
        hasIcon: true,
        icon: 'exclamation-triangle'
      })
    }
  }
}
</script>
