<!--
   Author: Wesley Ford (ntohq)
   Date: 03/07/2021
 -->

<template>
  <section style="margin-top: 5vh;">
    <b-tabs position="is-centered">
      <b-tab-item label="Stats" icon="chart-pie">
        <h1 class="title is-6"><u>Analysis</u></h1>
      </b-tab-item>
      <b-tab-item label="ML" icon="project-diagram">
        <h1 class="title is-6"><u>Machine Learning Stats</u></h1>
      </b-tab-item>
      <b-tab-item label="News" icon="newspaper" pack="far">
        <h1 class="title is-6"><u>Stock News</u></h1>
        <p>
          <b>Note:</b>
          <i
            >Generic news will be fetched if the chart ticker is not filled
            in.</i
          >
        </p>
        <slot />
      </b-tab-item>
      <b-tab-item label="Settings" icon="sliders-h">
        <h1 class="title is-6"><u>Settings</u></h1>
      </b-tab-item>
    </b-tabs>
  </section>
</template>
