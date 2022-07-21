<template>
  <form
    class="mx-4 my-8 bg-serious-background p-4"
    @submit.prevent="submitElection"
  >
    <h2>Create an election</h2>
    <input v-model="newTitle" type="text" placeholder="Election Title" />
    <button
      class="ml-4 bg-cautious-background border-cautious-border text-cautious-text p-2"
    >
      Create
    </button>
  </form>
</template>

<script>
export default {
  name: "ElectionCreator",
  data() {
    return {
      newTitle: "",
    };
  },
  methods: {
    submitElection() {
      console.log(`This would create ${this.newTitle} if it were implemented`);
    },
  },
};
</script>

<style></style>
