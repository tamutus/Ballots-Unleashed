<template>
  <div class="elections">
    <h1>Elections on Ballots Unleashed</h1>
    <election-search />
    <election-creator />
  </div>
</template>
<script>
import ElectionSearch from "@/components/electionSearch/ElectionSearch.vue";
import ElectionCreator from "@/components/election/ElectionCreator.vue";

export default {
  name: "ElectionsView",
  components: { ElectionSearch, ElectionCreator },
};
</script>
<style></style>
