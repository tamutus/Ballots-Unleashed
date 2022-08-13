<template>
  <nav class="w-full">
    <div
      class="fixed top-0 left-0 w-3/4 h-12 md:h-16 bg-nice-background border-b-4 border-solid border-nice-border"
    >
      <div
        class="ml-0 flex flex-nowrap items-center h-full w-4/5 md:px-8 mx-auto"
      >
        <ProfileImage
          v-if="isLoggedIn"
          :img-source="user.profileImage"
          class="rounded-lg"
          data-test="profile-image"
        />
        <div
          v-for="menuItem of menuItems"
          :key="menuItem.title"
          class="mx-2 md:ml-4 text-xs md:text-lg flex flex-col md:flex-row"
        >
          <router-link
            :to="menuItem.link"
            data-test="main-nav-item"
            @mouseenter="loadSubNav(menuItem)"
            @click="closeSubNav()"
            >{{ menuItem.title }}</router-link
          >
          <font-awesome-icon
            :ref="`${menuItem.title}-toggler`"
            :icon="['fas', 'angle-down']"
            :class="`mt-1 mx-auto md:mt-0 md:ml-1 p-1 text-center caret rounded-full ${
              menuItem === expandedMenuItem ? 'expanded' : ''
            }`"
            @click="toggleSubNav(menuItem)"
          />
        </div>
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
import { mapState } from "vuex";

import ProfileImage from "@/components/ui/ProfileImage.vue";
import SubNav from "@/components/ui/SubNav.vue";

export default {
  name: "MainNav",
  components: {
    ProfileImage: ProfileImage,
    SubNav: SubNav,
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
      expandedMenuItem: undefined,
    };
  },
  computed: {
    activeSubMenuItems() {
      return (
        this.activeMenuItem?.subMenuItems ||
        this.expandedMenuItem?.subMenuItems ||
        []
      );
    },
    subMenuOpen() {
      if (this.activeMenuItem) {
        return true;
      }
      return false;
    },
    subMenuHeldOpen() {
      if (this.expandedMenuItem) {
        return true;
      }
      return false;
    },
    ...mapState(["isLoggedIn", "user"]),
  },
  methods: {
    loadSubNav(menuItem) {
      if (!this.subMenuHeldOpen) {
        this.expandedMenuItem = undefined;
        this.activeMenuItem = menuItem;
      }
    },
    toggleSubNav(menuItem) {
      if (menuItem === this.expandedMenuItem) {
        this.expandedMenuItem = undefined;
      } else {
        this.activeMenuItem = undefined;
        this.expandedMenuItem = menuItem;
      }
    },
    closeSubNav() {
      if (!this.subMenuHeldOpen) {
        this.activeMenuItem = undefined;
      }
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
.caret {
  transition: transform 0.3s ease, background-color 0.3s ease;
}
.caret.expanded {
  transform: rotateX(180deg);
  @apply bg-nice-border;
}
</style>
