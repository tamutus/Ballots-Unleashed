<template>
  <div
    class="w-full md:w-1/2 md:ml-4 p-1 md:p-6 bg-serious-background border-serious-border border-4 rounded-md"
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
    <ol v-if="election.candidates?.length > 0">
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
    <h4 v-else class="mt-3 mx-4 text-xl text-center">
      <em v-if="isLoggedIn">Submit a candidate below</em>
      <em v-else>Log in to submit a candidate below</em>
    </h4>
  </div>
</template>

<script>
import { mapState } from "vuex";

import VotableCandidate from "@/components/election/VotableCandidate.vue";

export default {
  name: "CandidateSection",
  components: { VotableCandidate },
  computed: {
    userVotes() {
      if (this.userBallotIndex > -1) {
        console.log(this.election.ballots[this.userBallotIndex]);
        return this.election.ballots[this.userBallotIndex].ranking;
      } else {
        return [];
      }
    },
    sortedCandidates() {
      if (this.election?.candidates && this.userVotes?.length > 0) {
        return this.userVotes.map((ordinal) => {
          return this.election.candidates.find(
            (candidate) => candidate.ordinal === ordinal
          );
        });
      } else {
        return [];
      }
    },
    unsortedCandidates() {
      if (!this.isLoggedIn) {
        return this.election.candidates;
      }
      if (this.election?.candidates) {
        return this.election.candidates.filter(
          (candidate) => !this.userVotes.includes(candidate.ordinal)
        );
      } else {
        return [];
      }
    },
    userBallotIndex() {
      if (this.isLoggedIn && this.election?.ballots.length > 0) {
        return this.election.ballots.findIndex(
          (ballot) => ballot.userID === this.user.id
        );
      }
      return -1;
    },
    ...mapState(["user", "election", "isLoggedIn"]),
  },
  methods: {
    upvote(candidateOrdinal) {
      this.$store.dispatch("UPVOTE_CANDIDATE", {
        ballotIndex: this.userBallotIndex,
        ordinal: candidateOrdinal,
      });
    },
    downvote(candidateOrdinal) {
      this.$store.dispatch("DOWNVOTE_CANDIDATE", {
        ballotIndex: this.userBallotIndex,
        ordinal: candidateOrdinal,
      });
    },
    isTopChoice(candidate) {
      return this.userVotes[0] === candidate.ordinal;
    },
    scoreCandidate(candidate) {
      const score =
        this.election.candidates.length -
        this.userVotes.findIndex((ordinal) => ordinal === candidate.ordinal);
      return score;
    },
  },
};
</script>

<style></style>
