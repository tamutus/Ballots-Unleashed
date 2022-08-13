<template>
  <div class="election">
    <h1 class="text-5xl font-cursive ml-8 mt-4 mb-8">{{ election.title }}</h1>
    <div v-if="hasElectionData" class="flex flex-col md:flex-row">
      <candidate-section />
      <victor-section />
    </div>
    <candidate-submitter />
  </div>
</template>
<script>
import { mapState } from "vuex";

import CandidateSection from "@/components/election/CandidateSection.vue";
import VictorSection from "@/components/election/VictorSection.vue";
import CandidateSubmitter from "@/components/election/CandidateSubmitter.vue";
import { FETCH_ELECTION } from "@/store/constants";

export default {
  name: "ElectionView",
  components: { CandidateSection, CandidateSubmitter, VictorSection },
  data() {
    return {
      hasElectionData: false,
    };
  },
  computed: {
    ...mapState(["election"]),
  },
  mounted() {
    this.$store.dispatch(FETCH_ELECTION, this.$route.params.id);
    this.hasElectionData = true;
  },
};
</script>
<style></style>
