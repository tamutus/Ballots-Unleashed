<template>
  <section
    v-for="(section, index) of sections"
    :key="section.title"
    :data-section-index="index"
    class="mx-3 px-5 mb-14 pt-4 pb-8 bg-nice-background"
  >
    <h1 class="text-5xl mb-4 pb-2 border-b-2 border-b-nice-border">
      {{ section.header }}
    </h1>
    <p
      v-for="(paragraph, parIndex) of section.paragraphs"
      :key="parIndex"
      class="mr-4 mb-4 indent-7"
    >
      {{ paragraph }}
    </p>
  </section>
</template>
<script>
export default {
  name: "SortableSelections",
  props: {
    sections: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style></style>
