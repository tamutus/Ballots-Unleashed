<template>
  <div
    class="w-5/6 md:w-5/12 ml-4 p-6 bg-happy-background border-happy-border border-4 rounded-md"
  >
    <h2 class="w-full border-b-2 border-happy-border text-3xl font-cursive">
      Victors
    </h2>
  </div>
</template>

<script>
export default {
  name: "VictorSection",
  props: {
    victors: {
      type: Array,
      default() {
        return [];
      },
      required: false,
    },
  },
};
</script>

<style></style>
