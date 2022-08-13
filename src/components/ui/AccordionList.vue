<template>
  <div class="py-5 border-b border-solid border-serious-border md:w-full">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      data-test="clickable-area"
      @click="open"
    >
      <h3>{{ title }}</h3>

      <font-awesome-icon :icon="caretIcon" />
    </div>

    <Transition name="accordion">
      <div v-if="isOpen" class="w-full mt-5">
        <slot>
          <p>Specify slot content between accordion-list tags</p>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "AccordionList",
  props: {
    title: {
      type: String,
      required: false,
      default: "Provide a title to this",
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    caretIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
.accordion-enter-active,
.accordion-leave-active {
  transition: opacity 0.3s, height 0.3s, padding 0.3s, margin 0.3s;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  height: 0;
  padding: 0;
  margin: 0;
}
</style>
