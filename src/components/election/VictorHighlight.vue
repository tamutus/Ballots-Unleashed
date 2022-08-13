<template>
  <li class="flex flex-row my-2">
    <div
      class="w-full mx-2 py-5 flex flex-col md:flex-row items-baseline bg-happy-foreground rounded-tr-3xl"
    >
      <h3 class="font-cursive text-2xl mx-2">{{ victor.name }}</h3>
      <p class="border-b-4 border-happy-border mx-4">
        {{ victor.description }}
      </p>
    </div>
    <h4 v-if="voteScore">{{ voteScore }}</h4>
  </li>
</template>

<script>
export default {
  name: "VictorHighlight",
  props: {
    victor: {
      type: Object,
      required: true,
    },
    voteScore: {
      type: Number,
      required: false,
      default: 0,
    },
  },
};
</script>

<style></style>
