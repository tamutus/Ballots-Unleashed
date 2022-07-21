<template>
  <li class="mb-6">
    <router-link
      :to="electionURL"
      class="block mx-auto bg-serious-foreground rounded hover:shadow-cautious"
    >
      <div class="pt-5 pb-2 mx-8 border-b border-solid border-nice-border">
        <h2 class="mb-2 text-2xl">
          {{ election.title || "(No Election Title)" }}
        </h2>
        <div class="flex flex-row flex-nowrap">
          <div class="mr-5 flex-1">
            <span>{{ election.topic }}</span>
          </div>
          <div>
            <span data-test="ballot-count" role="ballot count"
              >{{ election.ballots?.length || 0 }} votes cast</span
            >
          </div>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "ElectionHighlight",
  props: {
    election: {
      type: Object,
      required: true,
    },
  },
  computed: {
    electionURL() {
      return `/elections/${this.election._id || ""}`;
    },
  },
};
</script>

<style>
a {
  transition: box-shadow 0.5s cubic-bezier(0.325, 1.355, 0.83, 0.14);
}
</style>
