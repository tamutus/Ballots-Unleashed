<template>
  <div id="app-box" :class="appClass">
    <MainNav />
    <UserNav class="relative z-10" />
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import UserNav from "@/components/ui/UserNav.vue";
import MainNav from "@/components/ui/MainNav.vue";

export default {
  name: "App",
  components: {
    UserNav,
    MainNav,
  },
  data() {
    return {
      activeBackground: "bg-main-background",
    };
  },
  computed: {
    appClass() {
      return {
        [this.activeBackground]: true,
        "pb-24": true,
      };
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#app-box {
  min-height: 100vh;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.slide-leave-active {
  position: absolute;
}
.slide-enter-from {
  transform: scale(0);
  opacity: 0;
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
