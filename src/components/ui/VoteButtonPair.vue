<template>
  <div class="flex flex-col">
    <button
      v-if="!top"
      data-test="upvoter"
      class="rounded-tl-full rounded-tr-full text-happy-border"
      @click="upvote"
    >
      ↑
    </button>
    <button
      v-if="sorted"
      data-test="downvoter"
      class="rounded-bl-full rounded-br-full downvote text-serious-border"
      @click="downvote"
    >
      ↓
    </button>
  </div>
</template>
<script>
export default {
  name: "VoteButtonPair",
  props: {
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
    buttonClass() {
      return {
        [this.buttonStyle]: true,
      };
    },
  },
  methods: {
    upvote() {
      this.$emit("upvote");
    },
    downvote() {
      this.$emit("downvote");
    },
  },
};
</script>
<style scoped>
button {
  @apply m-1 p-2 h-10 w-10;
  background-color: navy;
}
.energetic {
  @apply bg-happy-background border-happy-border rounded-lg p-2 hover:shadow-nice;
}
.cautious {
  @apply bg-cautious-background border-cautious-border p-2 hover:shadow-cautious;
}
</style>
