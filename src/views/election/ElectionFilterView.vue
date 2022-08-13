<template>
  <div class="flex flex-nowrap flex-col-reverse md:flex-row w-full h-full">
    <election-filters-sidebar @update-filter="verifyPage" />
    <div>
      <election-list :elections="displayedElections" />
      <search-paginator
        :page="page"
        :page-count="pageCount"
        :page-size="take"
        class="py-4 bg-nice-foreground border-solid border-t-dashed border-t-4 border-t-black border-b-4 border-b-nice-border"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";

import ElectionFiltersSidebar from "@/components/electionSearch/ElectionFiltersSidebar.vue";
import ElectionList from "@/components/electionSearch/ElectionList.vue";
import SearchPaginator from "@/components/ui/SearchPaginator.vue";
import { FETCH_ELECTIONS, FILTERED_ELECTIONS } from "@/store/constants";

export default {
  name: "ElectionFilterView",
  components: { ElectionFiltersSidebar, ElectionList, SearchPaginator },
  props: {
    results: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      take: 10,
    };
  },
  computed: {
    skip() {
      return (this.page - 1) * this.take;
    },
    displayedElections() {
      return this.FILTERED_ELECTIONS.slice(
        this.skip,
        Math.min(this.skip + this.take, this.FILTERED_ELECTIONS.length)
      );
    },
    page() {
      let queryPage = String(this.$route?.query?.page);
      if (queryPage?.match(/[0-9]/g)) {
        return Number.parseInt(queryPage);
      }
      return 1;
    },
    pageCount() {
      return Math.ceil(this.FILTERED_ELECTIONS.length / this.take);
    },
    ...mapGetters([FILTERED_ELECTIONS]),
  },
  mounted() {
    this.FETCH_ELECTIONS();
  },
  methods: {
    nextPage() {
      this.page++;
    },
    previousPage() {
      this.page--;
    },
    updatePageSize($event) {
      if ($event?.match(/[0-9]/g)) {
        this.take = Number.parseInt($event);
      }
      this.verifyPage();
    },
    verifyPage() {
      let queryPage = String(this.$route?.query?.page);
      if (queryPage?.match(/[0-9]/g)) {
        if (queryPage > this.pageCount) {
          this.$router.push({
            name: "electionFilter",
            query: {
              ...this.$route.query,
              page: this.pageCount,
            },
          });
        }
      }
    },
    ...mapActions([FETCH_ELECTIONS]),
  },
};
</script>
<style></style>
