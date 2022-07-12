<template>
  <nav id="user-nav" class="sticky top-0 w-1/4 ml-auto">
    <div
      id="auth-links"
      class="fixed top-0 right-0 h-16 justify-center items-end pr-2 w-1/4 bg-nice-background flex flex-col border-b-4 border-solid border-nice-border"
    >
      <a v-if="isLoggedIn">Profile</a>
      <a v-if="isLoggedIn" @click="logOut">Log Out</a>
      <a v-else>Register</a>
    </div>
    <div
      id="user-display"
      class="relative top-0 w-full mt-16 ml-auto mr-0 bg-nice-background p-2 text-right font-cursive border-b-4 border-solid border-nice-border"
    >
      <h1 v-if="isLoggedIn">
        {{ user.username }}
      </h1>
      <action-button
        v-else
        display-text="Log In"
        :action="logIn"
        button-style="energetic"
        test-name="login-button"
      />
    </div>
  </nav>
</template>
<script>
import ActionButton from "@/components/ui/ActionButton.vue";

export default {
  name: "UserNav",
  components: {
    ActionButton: ActionButton,
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: "Guest",
        };
      },
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["login", "logout"],
  methods: {
    logIn() {
      this.$emit("login");
    },
    logOut() {
      this.$emit("logout");
    },
  },
};
</script>
<style scoped>
#user-display {
  border-radius: 0 0 0 50% / 0 0 0 35%;
  z-index: 10;
}
h1 {
  font-size: 38.5px;
}
</style>
