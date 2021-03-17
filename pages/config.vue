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
              <b-select v-model="brokerSelected">
                <option
                  v-for="o in this.$store.state.brokerOptions"
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
            <b-switch>Quick Link</b-switch>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      brokerSelected: mapGetters.getBroker
    }
  },
  computed: {
    ...mapGetters(['getBroker'])
  },
  watch: {
    brokerSelected() {
      this.$store.commit('setBroker')
      // eslint-disable-next-line
      console.warn(computed.mapGetters)
    }
  }
}
</script>
