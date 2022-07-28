<template>
  <div class="election">
    <h1 class="text-5xl font-cursive ml-8 mt-4 mb-8">{{ election.title }}</h1>
    <div class="flex flex-col md:flex-row">
      <candidate-section :candidates="election.candidates" />
      <victor-section />
    </div>
  </div>
</template>
<script>
import axios from "axios";

import CandidateSection from "@/components/election/CandidateSection.vue";
import VictorSection from "@/components/election/VictorSection.vue";

export default {
  name: "ElectionView",
  components: { CandidateSection, VictorSection },
  data() {
    return {
      election: {},
    };
  },
  mounted() {
    const baseURL = process.env.VUE_APP_API_URL;
    axios
      .get(`${baseURL}/elections?_id=${this.$route.params.id}`)
      .then((res) => {
        this.election = res.data[0];
      });
  },
};
</script>
<style></style>
