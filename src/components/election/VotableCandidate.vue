<template>
  <li class="flex flex-row my-2">
    <vote-button-pair
      :top="top"
      :sorted="sorted"
      @upvote="upvote"
      @downvote="downvote"
    />
    <div
      class="w-full mx-2 py-5 flex flex-row items-baseline bg-serious-foreground rounded-tr-3xl"
    >
      <h3 class="font-cursive text-2xl mx-2">{{ candidate.name }}</h3>
      <p class="border-b-4 border-serious-background mx-4">
        {{ candidate.description }}
      </p>
    </div>
    <h4 v-if="voteScore">{{ voteScore }}</h4>
  </li>
</template>

<script>
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

<style></style>
