<template>
  <li class="flex flex-row my-2">
    <vote-button-pair
      v-if="isLoggedIn"
      :top="top"
      :sorted="sorted"
      @upvote="upvote"
      @downvote="downvote"
    />
    <div
      class="w-full mr-2 py-5 flex flex-col md:flex-row items-baseline bg-serious-foreground rounded-tr-3xl rounded-bl-3xl"
    >
      <h3 class="candidate-name font-cursive text-2xl ml-2 mr-6">
        {{ candidate.name }}
      </h3>
      <p class="border-b-4 border-serious-background mr-4 ml-auto">
        {{ candidate.description }}
      </p>
    </div>
    <h4 v-if="voteScore">{{ voteScore }}</h4>
  </li>
</template>

<script>
import { mapState } from "vuex";

import VoteButtonPair from "@/components/ui/VoteButtonPair.vue";

export default {
  name: "VotableCandidate",
  components: { VoteButtonPair },
  props: {
    candidate: {
      type: Object,
      required: true,
    },
    voteScore: {
      type: Number,
      required: false,
      default: 0,
    },
    sorted: {
      type: Boolean,
      required: true,
    },
    top: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["upvote", "downvote"],
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    upvote() {
      this.$emit("upvote", this.candidate.ordinal);
    },
    downvote() {
      this.$emit("downvote", this.candidate.ordinal);
    },
  },
};
</script>

<style scoped>
.candidate-name {
  border-radius: 35% / 15% 15% 0 0;
}
</style>
