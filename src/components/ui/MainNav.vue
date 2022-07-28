<template>
  <nav class="w-full">
    <div
      class="fixed top-0 left-0 w-3/4 h-16 bg-nice-background border-b-4 border-solid border-nice-border"
    >
      <div class="ml-0 flex flex-nowrap items-center h-full w-4/5 px-8 mx-auto">
        <ProfileImage
          v-if="isLoggedIn"
          :img-source="user.profileImage"
          class="ml-0 rounded-lg"
          data-test="profile-image"
        />
        <router-link
          v-for="menuItem of menuItems"
          :key="menuItem.title"
          :to="menuItem.link"
          class="ml-8 first:ml-0"
          data-test="main-nav-item"
          @mouseenter="loadSubNav(menuItem)"
          >{{ menuItem.title }}</router-link
        >
      </div>
    </div>
    <sub-nav
      :menu-items="activeSubMenuItems"
      class="top-16 mt-0"
      @mouseleave="closeSubNav"
    />
  </nav>
</template>
<script>
import ProfileImage from "@/components/ui/ProfileImage.vue";
import SubNav from "@/components/ui/SubNav.vue";

export default {
  name: "MainNav",
  components: {
    ProfileImage: ProfileImage,
    SubNav: SubNav,
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
  },
  data: () => {
    return {
      menuItems: [
        {
          title: "RCV",
          link: "/",
          subMenuItems: [
            {
              title: "About",
              link: "/about",
            },
            {
              title: "Help",
              link: "/help",
            },
            {
              title: "Donate",
              link: "/donate",
            },
          ],
        },
        {
          title: "Bubbles",
          link: "/bubbles",
          subMenuItems: [
            {
              title: "My bubbles",
              link: "/bubbles/of-mine",
            },
            {
              title: "Find",
              link: "/bubbles/find",
              icon: "search",
            },
          ],
        },
        {
          title: "Elections",
          link: "/elections",
          subMenuItems: [
            {
              title: "My Elections",
              link: "/elections/of-mine",
            },
          ],
        },
      ],
      activeMenuItem: undefined,
    };
  },
  computed: {
    activeSubMenuItems() {
      return this.activeMenuItem?.subMenuItems || [];
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    subMenuOpen() {
      if (this.activeMenuItem) {
        return true;
      }
      return false;
    },
  },
  methods: {
    loadSubNav(menuItem) {
      this.activeMenuItem = menuItem;
    },
    closeSubNav() {
      this.activeMenuItem = undefined;
    },
  },
};
</script>
<style scoped>
nav {
  display: flex;
  flex-flow: row wrap;
  z-index: 10;
  position: relative;
}
</style>
