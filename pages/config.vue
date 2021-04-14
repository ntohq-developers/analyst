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
          <h1 class="title is-6"><u>Options</u></h1>
          <b-field label="Your Broker">
            <div style="display: inline-flex;">
              <b-select value="brokerSelected">
                <option
                  v-for="o in this.$store.getters.getBrokerOptions"
                  :key="o"
                  :value="o.key"
                  >{{ o.val }}</option
                >
              </b-select>
              <b-tooltip
                label="This is the current value that is set."
                position="is-bottom"
              >
                <b-tag
                  type="is-primary"
                  style="margin-left: 10px; align-self: center;"
                >
                  {{ brokerSelected }}
                </b-tag>
              </b-tooltip>
            </div>
          </b-field>
        </b-tab-item>
        <b-tab-item label="General Settings" icon="sliders-h">
          <h1 class="title is-6"><u>Options</u></h1>
          <b-field>
            <b-switch :value="true">Quick Link</b-switch>
          </b-field>
        </b-tab-item>
        <b-tab-item label="Style Settings" icon="palette">
          <h1 class="title is-6"><u>Options</u></h1>
          <b-field>
            <b-switch>Dark Mode</b-switch>
          </b-field>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      brokerSelected: '',
      QuickLink: this.$store.getters.getQuickLinkSet
    }
  },
  computed: {
    ...mapGetters(['getQuickLinkSet', 'getBroker']),
    ...mapMutations({
      setBroker: 'setBroker',
      toggleQuickLink: 'toggleQuickLink'
    })
  },
  watch: {
    brokerSelected() {
      // this.$store.commit('setBroker', this.brokerSelected)
      // eslint-disable-next-line
      console.warn(this.getBroker, this.brokerSelected)
    }
  }
}
</script>
