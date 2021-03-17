<template>
  <div style="display:flex;">
    <div style="flex: 1; text-align: center;">
      <ul>
        <li><b>Open:</b> {{ open }}</li>
        <li><b>High:</b> {{ high }}</li>
        <li><b>Volume:</b> {{ volume }}</li>
      </ul>
    </div>
    <div style="flex: 1; text-align: center;">
      <ul>
        <li><b>Close:</b> {{ close }}</li>
        <li><b>Low:</b> {{ low }}</li>
        <li><b>Market Cap:</b> {{ marketCap }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default() {
        return {
          open: '',
          high: '',
          volume: '',
          close: '',
          low: '',
          marketCap: ''
        }
      }
    }
  },
  data() {
    return {
      open: '',
      high: '',
      volume: '',
      close: '',
      low: '',
      marketCap: ''
    }
  },
  watch: {
    content() {
      this.volume = this.content.volume
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.open = this.cleanDecimalPlace(this.content.open)
      this.high = this.cleanDecimalPlace(this.content.high)
      this.low = this.cleanDecimalPlace(this.content.low)
      this.close = this.cleanDecimalPlace(this.content.close)
      this.marketCap = this.content.marketCap
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  methods: {
    cleanDecimalPlace(number) {
      return number.toFixed(2)
    }
  }
}
</script>
