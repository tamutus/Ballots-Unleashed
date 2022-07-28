<template>
  <div
    class="w-5/6 md:w-1/2 ml-4 p-6 bg-serious-background border-serious-border border-4 rounded-md"
  >
    <h2 class="w-full border-b-2 border-serious-border text-3xl font-cursive">
      Candidates
    </h2>
    <ol class="border-b-2">
      <votable-candidate
        v-for="candidate of sortedCandidates"
        :key="candidate.ordinal"
        :candidate="candidate"
        :vote-score="scoreCandidate(candidate)"
        :top="isTopChoice(candidate)"
        :sorted="true"
        @upvote="upvote"
        @downvote="downvote"
      />
    </ol>
    <ol>
      <votable-candidate
        v-for="candidate of unsortedCandidates"
        :key="candidate.ordinal"
        :candidate="candidate"
        :top="false"
        :sorted="false"
        @upvote="upvote"
        @downvote="downvote"
      />
    </ol>
  </div>
</template>

<script>
import VotableCandidate from "@/components/election/VotableCandidate.vue";

export default {
  name: "CandidateSection",
  components: { VotableCandidate },
  props: {
    candidates: {
      type: Array,
      default() {
        return [];
      },
      required: false,
    },
  },
  data() {
    return {
      userVotes: [],
    };
  },
  computed: {
    sortedCandidates() {
      return this.userVotes.map((ordinal) => {
        return this.candidates.find(
          (candidate) => candidate.ordinal === ordinal
        );
      });
    },
    unsortedCandidates() {
      return this.candidates.filter(
        (candidate) => !this.userVotes.includes(candidate.ordinal)
      );
    },
  },
  methods: {
    upvote(candidateOrdinal) {
      if (this.userVotes.includes(candidateOrdinal)) {
        const position = this.userVotes.findIndex(
          (ordinal) => ordinal === candidateOrdinal
        );
        if (position > 0) {
          [this.userVotes[position], this.userVotes[position - 1]] = [
            this.userVotes[position - 1],
            this.userVotes[position],
          ];
        }
      } else {
        this.userVotes.push(candidateOrdinal);
      }
    },
    downvote(candidateOrdinal) {
      if (this.userVotes.includes(candidateOrdinal)) {
        const position = this.userVotes.findIndex(
          (ordinal) => ordinal === candidateOrdinal
        );
        if (position === this.userVotes.length - 1) {
          this.userVotes.pop();
        } else if (position >= 0) {
          [this.userVotes[position], this.userVotes[position + 1]] = [
            this.userVotes[position + 1],
            this.userVotes[position],
          ];
        }
      }
    },
    isTopChoice(candidate) {
      return this.candidates[0] === candidate.ordinal;
    },
    scoreCandidate(candidate) {
      const score =
        this.candidates.length -
        this.userVotes.findIndex((ordinal) => ordinal === candidate.ordinal);
      return score;
    },
  },
};
</script>

<style></style>
