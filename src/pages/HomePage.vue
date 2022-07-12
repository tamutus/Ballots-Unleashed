<template>
  <div class="bg-main-background">
    <h1 class="text-center mt-24 font-cursive">Ballots Unleashed</h1>
    <flashy-spotlight
      :header-parts="flashyHeader"
      :sections="sectionTitles"
      @orderchange="changeOrder"
    />
    <election-search />
    <sortable-sections :sections="homeSections" />
  </div>
</template>
<script>
import ElectionSearch from "@/components/ElectionSearch.vue";
import FlashySpotlight from "@/components/ui/FlashySpotlight.vue";
import SortableSections from "@/components/ui/SortableSections.vue";

export default {
  name: "HomePage",
  components: {
    ElectionSearch,
    FlashySpotlight,
    SortableSections,
  },
  props: {
    user: {
      type: Object,
      default() {
        return {
          username: "Guest",
        };
      },
    },
  },
  data() {
    return {
      homeSections: [
        {
          title: "Quality",
          header: "Voting shouldn't SUCK",
          paragraphs: [
            `You know the elections where you vote for one person, and the most votes
            wins? This is called "First Past the Post" and it has overwhelmingly been
            proven to be abusable and unjust in practice in numerous circumstances.
            There's a lot of complexity behind the theory of voting, but the process
            should be easy for anybody to do.`,
          ],
        },
        {
          title: "Versatility",
          header: "Choose How You Choose",
          paragraphs: [
            `Groups needing to organize should have the freedom to decide what kind of
              election would work best and be the most fair for their use case. Do you
              need to select multiple winners? Do you care whether the person with the
              most first place votes is always the winner?`,
            `We allow you to choose different methods of calculating winners given a set
    of ballots.`,
          ],
        },
        {
          title: "Free",
          header: "Always Free!",
          paragraphs: [
            `We will never charge money.`,
            `Voting shouldn't cost money, and it shouldn't be hard.`,
          ],
        },
      ],
      flashyHeader: [
        "Vote with",
        ["Meaning", "Versatility", "Preference", "-out Money"],
        // ["Versatility", "Preference", "-out Money", "Meaning"],
        // ["Preference", "-out Money", "Meaning", "Versatility"],
        // ["-out Money", "Meaning", "Versatility", "Preference"],
      ],
    };
  },
  computed: {
    sectionTitles() {
      return this.homeSections.map((sec) => sec.title);
    },
  },
  methods: {
    changeOrder(fromIndex, toIndex) {
      console.log(fromIndex);
      console.log(toIndex);
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 100px;
}
h2 {
  font-size: 30px;
}
p {
  font-size: 20px;
}
</style>
