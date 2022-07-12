<template>
  <div class="fixed left-0 w-3/4">
    <a
      v-for="menuItem of menuItems"
      :key="menuItem.title"
      :href="menuItem.link"
      class="bg-nice-background border-b-4 h-16 ml-4 first:ml-0 p-2 border-solid border-nice-border rounded-full"
      data-test="sub-nav-item"
    >
      <font-awesome-icon
        v-if="menuItem.icon"
        :icon="['fas', menuItem.icon]"
        class="mr-2"
      />
      {{ menuItem.title }}
    </a>
  </div>
</template>
<script>
export default {
  name: "SubNav",
  props: {
    menuItems: {
      type: Array,
      required: true,
      default() {
        return [];
      },
      validator(items) {
        if (!Array.isArray(items)) {
          return false;
        }
        for (const item of items) {
          if (!item.title || !(item.link || item.action)) {
            return false;
          }
        }
        return true;
      },
    },
  },
};
</script>
<style scoped></style>
