<template>
  <main class="flex-auto p-8 bg-nice-background">
    <ol>
      <election-highlight
        v-for="election of elections"
        :key="election._id"
        :election="election"
        data-test="election-highlight"
      />
    </ol>
  </main>
</template>

<script>
import ElectionHighlight from "@/components/electionSearch/ElectionHighlight.vue";

export default {
  name: "ElectionList",
  components: { ElectionHighlight },
  props: {
    elections: {
      type: Array,
      required: false,
      default() {
        return [
          {
            title: "Election name",
            topic: "Short topic description",
            ballots: [],
          },
        ];
      },
    },
  },
};
</script>

<style></style>
