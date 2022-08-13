<template>
  <div
    v-if="victors.length > 0"
    class="w-11/12 mt-4 md:mt-0 md:w-5/12 ml-3 md:ml-4 p-6 bg-happy-background border-happy-border border-4 rounded-md"
  >
    <h2 class="w-full border-b-2 border-happy-border text-3xl font-cursive">
      Victors
    </h2>
    <ol class="border-b-2">
      <victor-highlight
        v-for="victor of victors"
        :key="victor.ordinal"
        :victor="victor"
      />
    </ol>
  </div>
</template>

<script>
import { mapState } from "vuex";

import VictorHighlight from "@/components/election/VictorHighlight.vue";

export default {
  name: "VictorSection",
  components: { VictorHighlight },
  props: {
    algorithm: {
      type: String,
      default: "droop_STV",
      required: false,
    },
  },
  computed: {
    victors() {
      if (!this.election?.candidates) {
        return [];
      }
      const victors = [];
      let remainingSeats = this.election.seats || 2;
      let remainingCandidates = this.election.candidates.map(
          (candidate) => candidate.ordinal
        ),
        adjustedBallots = this.election.ballots.map((ballot) => [
          ...ballot.ranking,
        ]);

      console.log(remainingCandidates);
      if (this.algorithm === "droop_STV") {
        if (this.election?.ballots?.length > 0) {
          let round = 1;
          while (
            remainingSeats > 0 &&
            remainingCandidates.length > remainingSeats &&
            adjustedBallots.length > 0 &&
            round < 5
          ) {
            console.log(`Round ${round} begins.`);
            const quota =
              Math.floor(adjustedBallots.length / (remainingSeats + 1)) + 1;
            console.log(`Quota to win: ${quota}`);
            adjustedBallots = adjustedBallots.filter(
              (ballot) => ballot.length > 0
            );
            const candidateScores = remainingCandidates.reduce(
              (list, ordinal) => {
                list[ordinal] = 0;
                return list;
              },
              {}
            );
            console.log(candidateScores);
            // Tally how many first choices each candidate got
            const firstChoices = adjustedBallots
              .map((ballot) => ballot[0])
              .reduce((counters, candidateOrdinal) => {
                counters[candidateOrdinal]++;
                return counters;
              }, candidateScores);
            let newVictors = [],
              sortedCandidates = Object.keys(firstChoices)
                .map((ordinal) => {
                  return {
                    ordinal: Number.parseInt(ordinal),
                    score: firstChoices[ordinal],
                  };
                })
                .sort((a, b) => b.score - a.score);
            console.log("sorted candidates:");
            console.log(sortedCandidates);
            console.log("new victors:");
            console.log(newVictors);
            // Second, check for anybody meeting quota

            for (
              let i = 0;
              i < remainingSeats && sortedCandidates[i].score >= quota;
              i++
            ) {
              newVictors.push(sortedCandidates[i].ordinal);
              victors.push(sortedCandidates[i].ordinal);
              remainingSeats--;
            }

            // If and only if nobody reached quota this round, eliminate lowest scoring candidate
            let eliminated;
            if (newVictors.length === 0) {
              eliminated = sortedCandidates.at(-1).ordinal;
              console.log(`Eliminated: ${eliminated}`);
            }
            remainingCandidates = remainingCandidates.filter((candidate) => {
              return (
                !newVictors.includes(candidate) && candidate !== eliminated
              );
            });
            console.log("Remaining candidates:");
            console.log(remainingCandidates);
            // Eliminate victors and lowest scoring candidates from everybody's ballots
            for (let i = 0; i < adjustedBallots.length; i++) {
              let ballot = adjustedBallots[i];
              adjustedBallots[i] = ballot.filter((ordinal) => {
                return ordinal !== eliminated && !newVictors.includes(ordinal);
              });
              if (ballot.length === 0) {
                adjustedBallots.splice(i, 1);
                i--;
              }
            }
            console.log(remainingCandidates);
            console.log(adjustedBallots);
            round++;
            console.log(`Round ${round} complete.`);
            console.log(`Remaining seats: ${remainingSeats}`);
            console.log(
              `Remaining candidates: ${remainingCandidates.join(", ")}`
            );
            console.log("Ballots still being counted:");
            console.log(adjustedBallots);
          }
        }
      }
      return victors.map((ordinal) =>
        this.election.candidates.find(
          (candidate) => candidate.ordinal === ordinal
        )
      );
    },
    ...mapState(["election"]),
  },
  methods: {},
};
</script>

<style></style>
