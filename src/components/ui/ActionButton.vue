<template>
  <button :data-test="testName" :class="buttonClass" @click="handleClick">
    {{ displayText }}
  </button>
</template>
<script>
export default {
  name: "ActionButton",
  props: {
    displayText: {
      type: String,
      required: true,
      default: "Button",
    },
    action: {
      type: Function,
      default: () => {
        console.info(`Pass a function for this button component with :action`);
      },
    },
    testName: {
      type: String,
      default: "button",
    },
    buttonStyle: {
      type: String,
      default: "energetic",
      validator(style) {
        return ["energetic", "cautious"].includes(style);
      },
    },
  },
  computed: {
    buttonClass() {
      return {
        [this.buttonStyle]: true,
      };
    },
  },
  methods: {
    handleClick() {
      this.action();
    },
  },
};
</script>
<style scoped>
button {
  @apply border-4;
}
.energetic {
  @apply bg-happy-background border-happy-border rounded-lg p-2 hover:shadow-nice;
}
.cautious {
  @apply bg-cautious-background border-cautious-border p-2 hover:shadow-cautious;
}
</style>
