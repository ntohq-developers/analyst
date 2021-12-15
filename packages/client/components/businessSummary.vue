<!--
   Author: Wesley Ford (ntohq)
   Date: 03/29/2021
 -->

<template>
  <section>
    <div class="card-content">
      <div class="content">
        <h3 class="title is-3 has-text-centered">{{ stockName }}</h3>
        <p style="margin-bottom: 0"><b>Sector:</b> {{ buisnessSector }}</p>
        <p style="margin-bottom: 10px">
          <b>Total Employees:</b> {{ totalEmployees }}
        </p>
        {{ summaryParagraph }}
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    employees: {
      type: String,
      default: ''
    },
    sector: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      summaryParagraph: 'n/a',
      buisnessSector: '',
      totalEmployees: '',
      stockName: ''
    }
  },
  watch: {
    summary() {
      this.summaryParagraph = this.summary
      this.buisnessSector = this.sector
      this.totalEmployees = this.employees
      this.stockName = this.name
    }
  }
}
</script>
