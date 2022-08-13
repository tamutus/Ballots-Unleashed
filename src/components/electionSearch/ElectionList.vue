<template>
  <h2
    class="ml-8 w-1/2 pl-8 pt-8 pb-4 mb-4 text-left text-xl font-cursive border-solid border-b-8 border-nice-border"
    data-test="election-count"
  >
    {{ FILTERED_ELECTIONS.length || 0 }} elections matching filters
  </h2>
  <main
    class="flex-auto p-8 bg-nice-background border-solid border-y-4 border-nice-border"
  >
    <ol>
      <election-highlight
        v-for="election of elections"
        :key="election.id"
        :election="election"
        data-test="election-highlight"
      />
    </ol>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import { FILTERED_ELECTIONS } from "@/store/constants";
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
  computed: {
    ...mapGetters([FILTERED_ELECTIONS]),
  },
};
</script>

<style></style>
