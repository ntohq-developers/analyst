<!--
   Author: Wesley Ford (ntohq)
   Date: 03/07/2021
 -->

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
