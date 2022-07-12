<template>
  <section class="bg-happy-background mx-6 p-4 my-12">
    <h1
      class="ml-8 mt-6 text-5xl font-cursive border-b-2 border-b-solid border-b-happy-border pb-2"
    >
      Public votes in the community
    </h1>
    <form
      class="relative flex flex-wrap items-center h-12 my-14 border border-solid border-happy-border rounded-full"
      @submit.prevent="searchElections"
    >
      <font-awesome-icon :icon="['fas', 'search']" class="mx-4" />
      <div class="relative flex items-center flex-1 h-full pr-3">
        <em
          ><label for="election-title" class="absolute left-0 -top-8"
            >Topic</label
          >
        </em>
        <input
          v-model="topicFilter"
          type="text"
          name="election-title"
          :placeholder="mostPopularTopic.title"
          class="focus:outline-none"
        />
      </div>
      <span
        class="flex items-center h-full px-3 border-l border-r border-happy-border"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <em>
          <label for="election-location" class="absolute left-0 -top-8"
            >Location</label
          >
        </em>
        <input
          v-model="locationFilter"
          name="election-location"
          placeholder="United States"
          class="focus:outline-none"
        />
      </div>
      <action-button
        display-text="Find Elections"
        :action="searchElections"
        class="mt-4 ml-12"
      />
    </form>
    <div>
      <ol>
        <li v-for="topic of searchResults" :key="topic._id">
          {{ topic.name }}
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import ActionButton from "@/components/ui/ActionButton.vue";

export default {
  name: "ElectionSearch",
  components: {
    ActionButton,
  },
  data() {
    return {
      topics: [
        {
          title: "Climate action priorities",
          ballots: [[1, 2, 3]],
        },
        {
          title: "Best monuments to visit",
          ballots: [
            [3, 1, 5, 2],
            [4, 1],
          ],
        },
      ],
      searchResults: [],
      electionFilter: "",
      locationFilter: "",
    };
  },
  computed: {
    mostPopularTopic() {
      return this.topics.reduce((popularest, topic) => {
        if (
          !popularest.ballots ||
          topic.ballots.length > popularest.ballots.length
        ) {
          return topic;
        }
        return popularest;
      }, {});
    },
    topicsByPopularity() {
      return this.topics.reduce((sorted, topic) => {
        for (let i = 0; i < sorted.length; i++) {
          if (
            !sorted[i].ballots ||
            topic.ballots?.length > sorted[i].ballots?.length
          ) {
            sorted.splice(i, 0, topic);
            return sorted;
          }
        }
        sorted.push(topic);
        return sorted;
      }, []);
    },
  },
  methods: {
    async searchElections() {
      let fetchString = `https://magnova.space/wiki/search?target=${encodeURIComponent(
        this.topicFilter
      )}&issues=true`;
      this.searchResults = await fetch(fetchString)
        .then((res) => res.json())
        .then((res) => res.issues);
    },
  },
};
</script>
<style></style>
