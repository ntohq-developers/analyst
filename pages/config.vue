<!--
   Author: Wesley Ford (ntohq)
   Date: 03/07/2021
 -->

<template>
  <section class="section">
    <div class="section">
      <h2 class="is-2 title has-text-centered">Configure Analyst</h2>
      <b-field label="Your Broker">
        <div style="display: inline-flex;">
          <b-select v-model="broker">
            <option v-for="o in brokerOptions" :key="o" :value="o.key">{{
              o.val
            }}</option>
          </b-select>
          <b-tooltip
            label="This is the current value that is set."
            position="is-bottom"
          >
            <b-tag
              type="is-primary"
              style="margin-left: 10px; align-self: center;"
            >
              {{ quickLinkPlaceHolder }}
            </b-tag>
          </b-tooltip>
        </div>
      </b-field>
    </div>
    <div class="section" style="margin-top: 15px;">
      <h2 class="is-2 title has-text-centered">Options</h2>
      <b-field>
        <b-switch v-model="quickLink">Quick Link</b-switch>
      </b-field>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      brokerOptions: [
        {
          val: '-',
          key: 'none'
        },
        {
          val: 'E-Trade',
          key: 'eTrade'
        },
        {
          val: 'TD Ameritrade',
          key: 'TD-Ameritrade'
        },
        {
          val: 'Robinhood',
          key: 'Robinhood'
        },
        {
          val: 'Webull',
          key: 'Webull'
        }
      ],
      quickLink: localStorage.quick_link || false,
      broker: null,
      quickLinkPlaceHolder: 'test'
    }
  },
  watch: {
    broker() {
      localStorage.user_broker = this.broker
      this.quickLinkPlaceHolder = localStorage.user_broker
      if (this.broker === 'none' && localStorage.quick_link) {
        this.quickLink = false
        localStorage.quick_link = this.quickLink
      }
    },
    quickLink() {
      if (localStorage.user_broker !== 'none') {
        localStorage.quick_link = this.quickLink
      } else if (
        localStorage.user_broker === 'none' &&
        this.quickLink === true
      ) {
        this.quickLink = false
        localStorage.quick_link = this.quickLink
        this.caution('Please select a broker before using this feature.')
      }
    }
  },
  mounted() {
    if (!localStorage.user_broker || localStorage.user_broker === 'none') {
      this.quickLinkPlaceHolder = 'brocker set [ none ]'
    } else {
      this.quickLinkPlaceHolder = localStorage.user_broker
    }
  },
  methods: {
    caution(msg) {
      alert(msg)
    }
  }
}
</script>
