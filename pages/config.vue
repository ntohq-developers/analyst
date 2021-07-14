<!--
   Author: Wesley Ford (ntohq)
   Date: 03/07/2021
 -->

<template>
  <section class="section">
    <div class="section">
      <h2 class="is-2 title has-text-centered">Configure Analyst</h2>
      <b-tabs position="is-centered">
        <b-tab-item label="Broker Settings" icon="handshake">
          <b-field label="Your Broker">
            <div style="display: inline-flex;">
              <b-select v-model="brokerIndex" :change="saveBroker()">
                <option
                  v-for="(broker, index) in brokers.list"
                  :key="broker.id"
                  :value="index"
                  >{{ broker.name }}</option
                >
              </b-select>
            </div>
          </b-field>
        </b-tab-item>
        <b-tab-item label="General Settings" icon="sliders-h">
          <b-field>
            <b-switch :value="quickLinkValue" @input="saveQuickLink($event)"
              >Quick Link</b-switch
            >
          </b-field>
        </b-tab-item>
        <b-tab-item label="Style Settings" icon="palette">
          <b-field>
            <b-switch>Dark Mode</b-switch>
          </b-field>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      brokerIndex: 0
    }
  },

  computed: {
    ...mapState(['brokers', { quickLinkValue: 'settings.quick_link' }])
  },

  created() {
    this.getSavedBroker()
    this.getSavedQuickLink()
  },

  methods: {
    saveBroker(event) {
      const name = this.$store.state.brokers.list[this.brokerIndex].name
      const link = this.$store.state.brokers.list[this.brokerIndex].link
      const index = this.brokerIndex
      this.$store.commit('setBroker', {
        link,
        name,
        index
      })
      this.$store.commit('saveBroker')
    },

    saveQuickLink(event) {
      this.$store.commit('settings', 'setQuickLink', event)
      this.$store.commit('settings', 'saveQuickLink')
    },

    getSavedBroker() {
      this.brokerIndex = this.$store.state.brokers.set.index
    },

    getSavedQuickLink() {
      this.quickLinkValue = this.$store.state.settings.options.quick_link
    }
  }
}
</script>
