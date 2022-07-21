<template>
  <nav class="grid grid-cols-10">
    <div class="col-start-2 col-span-1">
      <input
        type="number"
        min="1"
        max="50"
        step="1"
        :value="pageSize"
        @change="updatePageSize"
      />
      <span>Items/page</span>
    </div>
    <div class="col-start-4 col-span-2">
      <button
        v-if="page > 1"
        class="mx-auto"
        data-test="previous-page"
        @click="previousPage"
      >
        Previous
      </button>
    </div>
    <h6 class="col-start-7 col-span 1">
      <span class="font-cursive" data-test="page-counter">{{ page }}</span> of
      <span class="font-cursive" data-test="page-total">{{ pageCount }}</span>
    </h6>
    <div class="col-start-9 col-span-2">
      <button
        v-if="page < pageCount"
        class="mx-auto"
        data-test="next-page"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SearchPaginator",
  props: {
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10,
    },
    pageCount: {
      type: Number,
      required: true,
    },
  },
  emits: ["updatePageSize"],
  methods: {
    previousPage() {
      if (this.page > 1) {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, page: this.page - 1 },
        });
      }
    },
    nextPage() {
      if (this.page < this.pageCount) {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, page: this.page + 1 },
        });
      }
    },
    updatePageSize($event) {
      this.$emit("updatePageSize", $event.target.value);
    },
  },
};
</script>

<style scoped></style>
