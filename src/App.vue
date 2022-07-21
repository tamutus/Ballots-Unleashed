<template>
  <div :class="appClass">
    <MainNav :user="user" :is-logged-in="isLoggedIn" />
    <UserNav
      :user="user"
      :is-logged-in="isLoggedIn"
      class="relative z-10"
      @logout="logOut"
      @login="logIn"
    />
    <router-view v-slot="{ Component }" :user="user">
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
      user: {
        username: "Guest",
      },
      activeBackground: "bg-main-background",
    };
  },
  computed: {
    isLoggedIn() {
      if (this.user && this.user.username !== "Guest") {
        return true;
      }
      return false;
    },
    appClass() {
      return {
        [this.activeBackground]: true,
        "pb-24": true,
      };
    },
  },
  methods: {
    logIn() {
      this.user = {
        username: "Lavra",
      };
    },
    logOut() {
      this.user = {
        username: "Guest",
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
