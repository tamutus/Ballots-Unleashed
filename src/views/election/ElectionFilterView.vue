<template>
  <div class="flex flex-nowrap flex-col-reverse md:flex-row w-full h-full">
    <election-filters-sidebar :elections="elections" />
    <div>
      <election-list :elections="displayedElections" />
      <search-paginator
        :page="page"
        :page-count="pageCount"
        :page-size="take"
        class="pt-2 pb-2"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";

import ElectionFiltersSidebar from "@/components/electionSearch/ElectionFiltersSidebar.vue";
import ElectionList from "@/components/electionSearch/ElectionList.vue";
import SearchPaginator from "@/components/ui/SearchPaginator.vue";

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
      elections: [],
      take: 10,
    };
  },
  computed: {
    skip() {
      return (this.page - 1) * this.take;
    },
    displayedElections() {
      return this.elections.slice(
        this.skip,
        Math.min(this.skip + this.take, this.elections.length)
      );
    },
    page() {
      return Number.parseInt(this.$route?.query?.page || 1);
    },
    pageCount() {
      return Math.ceil(this.elections.length / this.take);
    },
  },
  mounted() {
    const baseURL = process.env.VUE_APP_API_URL;
    axios.get(`${baseURL}/elections`).then((res) => {
      this.elections = res.data;
    });
  },
  methods: {
    nextPage() {
      this.page++;
    },
    previousPage() {
      this.page--;
    },
    updatePageSize($event) {
      this.take = $event;
    },
  },
};
</script>
<style></style>
