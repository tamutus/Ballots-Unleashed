<template>
  <div
    class="mx-auto mt-8 w-11/12 xl:w-5/12 px-2 md:px-8 py-16 bg-dark-shadow border-4 border-nice-foreground border-solid text-nice-foreground"
  >
    <h3 class="text-3xl font-cursive">Add a Candidate</h3>
    <form v-if="isLoggedIn" @submit.prevent="submitCandidate">
      <div class="grid grid-rows-6 flex-row flex-wrap">
        <div class="row-span-2 py-2 flex flex-col md:grid md:grid-cols-4">
          <label for="new-candidate-name" class="col-span-1 my-auto"
            >Candidate Name</label
          >
          <input
            id="new-candidate-name"
            v-model="newCandidate.name"
            type="text"
            placeholder="Who/What should win?"
            class="col-span-3 pl-2 bg-black text-white placeholder:text-nice-background"
          />
        </div>
        <div class="row-span-3 py-2 flex flex-col md:grid md:grid-cols-4">
          <label for="new-candidate-description" class="col-span-1 my-auto"
            >Description</label
          >
          <textarea
            id="new-candidate-description"
            v-model="newCandidate.description"
            type="text"
            class="col-span-3 p-1 bg-black text-white placeholder:text-nice-background"
          />
        </div>
      </div>
      <button
        class="m-2 p-2 rounded-md bg-blue-900 hover:bg-cyan-600 text-white transition-colors duration-300"
      >
        Submit
      </button>
    </form>
    <h4 v-else class="mt-3 mx-4 text-xl text-center">
      <em>Log in to submit a new candidate</em>
    </h4>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import { SUBMIT_CANDIDATE } from "@/store/constants";

export default {
  name: "CandidateSubmitter",
  data() {
    return {
      newCandidate: {
        name: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapState(["election", "isLoggedIn"]),
  },
  methods: {
    async submitCandidate() {
      if (
        this.newCandidate.name.length > 0 &&
        window.confirm(`Would you like to submit "${this.newCandidate.name}" as a candidate? \n
        Description: \n
        ${this.newCandidate.description}`)
      ) {
        await this.SUBMIT_CANDIDATE({
          electionID: this.election.id,
          candidate: { ...this.newCandidate },
        });
        this.newCandidate = {
          name: "",
          description: "",
        };
      }
    },
    ...mapActions([SUBMIT_CANDIDATE]),
  },
};
</script>

<style></style>
