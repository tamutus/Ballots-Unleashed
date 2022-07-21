<template>
  <div
    :class="`fixed left-0 w-3/4 ${navPadding} transition-padding duration-500`"
  >
    <transition-group name="h-list" tag="nav">
      <router-link
        v-for="menuItem of menuItems"
        :key="menuItem.title"
        :to="menuItem.link"
        :class="`bg-nice-background border-b-4 max-h-10 ${linkHeight} ml-4 first:ml-0 px-3 border-solid border-nice-border rounded-full overflow-y-hidden transition-height transition-padding duration-500`"
        data-test="sub-nav-item"
      >
        <font-awesome-icon
          v-if="menuItem.icon"
          :icon="['fas', menuItem.icon]"
          class="mr-2"
        />
        {{ menuItem.title }}
      </router-link>
    </transition-group>
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
  computed: {
    linkHeight() {
      if (this.menuItems.length > 0) {
        return "h-10 py-2";
      } else {
        return "h-0 py-0";
      }
    },
    navPadding() {
      if (this.menuItems.length > 0) {
        return "p-4 pb-6";
      } else {
        return "p-0";
      }
    },
  },
};
</script>
<style scoped>
.h-list-move,
.h-list-enter-active,
.h-list-leave-active {
  transition: height 0.4s, padding 0.4s, transform 0.6s, filter 1s, opacity 1s,
    border-width 1s;
}
.h-list-enter-from {
  opacity: 0;
  filter: hue-rotate(90deg);
  transform: translateY(-100px);
}
.h-list-enter-active {
  @apply ml-0;
}
.h-list-enter-active ~ .h-list-enter-active {
  @apply ml-4;
}
/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.h-list-leave-active {
  position: absolute;
}
.h-list-leave-to {
  opacity: 0;
  transform: translate(100%, -10px);
  filter: hue-rotate(-90deg);
  height: 0;
  padding: 0;
  border-width: 0;
}
</style>
