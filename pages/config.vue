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
              <b-select v-model="brokerIndex" :change="saveBroker()">
                <option
                  v-for="(broker, index) in brokers.list"
                  :key="broker.id"
                  :value="index"
                  >{{ broker.name }}</option
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
                  Selected brockers
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
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      brokerIndex: 0
    }
  },
  computed: {
    ...mapState(['brokers']),
    ...mapGetters(['getSetBroker'])
  },
  created() {
    this.getSavedBroker()
  },
  methods: {
    ...mapMutations(['setBroker']),
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
    getSavedBroker() {
      this.brokerIndex = this.$store.state.brokers.set.index
    }
  }
}
</script>
