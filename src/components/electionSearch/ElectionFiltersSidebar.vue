<template>
  <div
    class="w-full flex flex-col p-4 bg-serious-background border-serious-border border-t-4 md:w-96 md:border-r-4 md:border-t-0 border-solid"
  >
    <section
      class="pb-5 flex flex-row md:flex-col md:flex-wrap justify-between"
    >
      <div>
        <h3 class="my-4 text-base font-semibold">
          What do you have opinions on?
        </h3>
        <accordion-list title="Issues" data-test="issue-filters">
          <ul class="flex flex-row flex-wrap">
            <li
              v-for="issueFilter in AVAILABLE_ISSUE_FILTERS"
              :key="issueFilter._id"
              class="w-full xl:w-1/2 xl:px-2 py-1 border-serious-border xl:border-r xl:break-words flex flex-row flex-nowrap items-center"
            >
              <input
                :id="issueFilter._id"
                v-model="filters.issues"
                :name="`${issueFilter.name}-issue-filter`"
                :value="issueFilter._id"
                type="checkbox"
                class="mr-3 h-8 basis-8 flex-none"
                data-test="issue-checkbox"
                @change="updateFilter"
              />
              <label
                for="`${issueFilter.name}-issue-filter`"
                data-test="issue-filter"
              >
                {{ issueFilter.name }}
              </label>
            </li>
          </ul>
        </accordion-list>
        <accordion-list title="Community" data-test="community-filters">
          <ul class="flex flex-row flex-wrap">
            <li
              v-for="community of communities"
              :key="community"
              class="w-full xl:w-1/2 xl:px-2 py-1 border-serious-border xl:border-r xl:break-words flex flex-row flex-nowrap items-center"
            >
              <input
                :id="`${community.toLowerCase()}-filter`"
                v-model="filters.communities"
                :value="community"
                :name="`${community.toLowerCase()}-filter`"
                type="checkbox"
                class="mr-3 h-8 basis-8 flex-none"
                @change="updateFilter"
              />
              <label
                :for="`${community.toLowerCase()}-filter`"
                data-test="community-filter"
              >
                {{ community }}
              </label>
            </li>
          </ul>
        </accordion-list>
      </div>
      <!-- <div class="w-full flex items-center text-sm">
        <action-button display-text="Clear Filters" :action="clearFilters" />
      </div> -->
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import ActionButton from "@/components/ui/ActionButton.vue";
import AccordionList from "@/components/ui/AccordionList.vue";
// import ElectionFiltersSidebarCommunities from "@/components/electionSearch/ElectionFiltersSidebarCommunities.vue";
import {
  AVAILABLE_ISSUE_FILTERS,
  UPDATE_ELECTION_FILTER,
} from "@/store/constants";

export default {
  name: "ElectionFiltersSidebar",
  components: {
    // ActionButton,
    AccordionList,
    // ElectionFiltersSidebarCommunities,
  },
  emits: ["updateFilter"],
  data() {
    return {
      communities: ["Universal", "Region", "Organization", "Bubble", "Friends"],
      filters: {
        issues: [],
        communities: [],
      },
    };
  },
  computed: {
    ...mapGetters([AVAILABLE_ISSUE_FILTERS]),
  },
  methods: {
    updateFilter() {
      this.$store.commit(UPDATE_ELECTION_FILTER, this.filters);
      this.$emit("updateFilter");
    },
    clearFilters() {
      this.filters = {};
      this.$store.commit(UPDATE_ELECTION_FILTER, {});
      this.$emit("updateFilter");
    },
  },
};
</script>

<style></style>
