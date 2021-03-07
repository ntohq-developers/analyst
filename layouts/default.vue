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
        <a class="navbar-item" href="/">
          ANALYST
        </a>
      </div>
    </nav>
    <div class="page-wrapper">
      <div style="flex: 6">
        <section class="main-content columns">
          <!-- style="max-width: 125em; margin-left: auto; margin-right: auto" -->
          <aside class="column is-2 section">
            <p class="menu-label is-hidden-touch">
              General
            </p>
            <ul class="menu-list">
              <li v-for="(item, key) of items" :key="key">
                <nuxt-link :to="item.to" exact-active-class="is-active">
                  <b-icon :icon="item.icon" /> {{ item.title }}
                </nuxt-link>
              </li>
            </ul>
          </aside>

          <div class="container column is-10">
            <nuxt />
          </div>
        </section>
      </div>
      <footer
        class="footer level has-background-primary has-text-centered has-text-white box"
        style="padding: 20px; flex: 0.5;"
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
              style="color: rgb(255, 100, 213); padding-left: 5px;"
              >nuxt.js</a
            >
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
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
        }
      ]
    }
  }
}
</script>
