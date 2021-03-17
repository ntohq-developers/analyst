<template>
  <div>
    <p>
      {{ firstSummaryParagraph }}
    </p>
    <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
      <template #trigger="props">
        <a aria-controls="contentIdForA11y1">
          <b-icon :icon="!props.open ? 'sort-down' : 'sort-up'"></b-icon>
          {{ !props.open ? 'Read More' : 'Collapse' }}
        </a>
      </template>
      <p>
        {{ secondSummaryParagraph }}
      </p>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    summary: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      firstSummaryParagraph: 'n/a',
      secondSummaryParagraph: ''
    }
  },
  watch: {
    summary() {
      this.firstSummaryParagraph = this.summary.substr(
        0,
        this.summary.length / 3
      )
      this.secondSummaryParagraph = this.summary.substr(this.summary.length / 3)
    }
  }
}
</script>
