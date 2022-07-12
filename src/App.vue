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
    <HomePage :user="user" />
  </div>
</template>

<script>
import UserNav from "@/components/ui/UserNav.vue";
import MainNav from "@/components/ui/MainNav.vue";
import HomePage from "@/pages/HomePage.vue";

export default {
  name: "App",
  components: {
    UserNav,
    MainNav,
    HomePage,
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
</style>
