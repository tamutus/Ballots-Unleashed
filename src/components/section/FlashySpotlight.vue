<template>
  <main>
    <section class="flashy h-screen grid grid-cols-12 grid-rows-6">
      <header class="col-start-2 col-span-7 row-start-2 row-span-4">
        <div v-for="(headerPart, index) of headerParts" :key="index">
          <div v-if="Array.isArray(headerPart)" class="h-12 overflow-hidden">
            <div
              :id="`headerArray-${index}`"
              class="cycling flex flex-col flex-nowrap"
            >
              <h2
                v-for="(headerSubPart, partIndex) of headerPart"
                :key="partIndex"
                :class="`color-set-${partIndex % 4}`"
              >
                {{ headerSubPart }}
              </h2>
              <!-- Duplicate first entry key for seamless transition in script -->
              <h2 class="color-set-0">{{ headerPart[0] }}</h2>
            </div>
          </div>
          <h1 v-else>{{ headerPart }}</h1>
        </div>
      </header>
      <div
        class="col-end-12 col-span-5 row-start-1 row-span-4 flex justify-end"
      >
        <img :src="image" class="w-80 h-80 object-contain" />
      </div>
      <ol class="col-start-9 col-span-3 row-end-6">
        <li v-for="(section, sectionIndex) of sections" :key="sectionIndex">
          {{ section }}
        </li>
      </ol>
    </section>
  </main>
</template>
<script>
export default {
  name: "FlashySpotlight",
  props: {
    headerParts: {
      type: Array,
      default() {
        return ["Header", ["with", "shifting", "text"]];
      },
    },
    sections: {
      type: Array,
      default() {
        return [];
      },
    },
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png",
    },
  },
  emits: ["orderchange"],
  data() {
    return {
      intervals: [],
      intervalLength: 4000,
    };
  },
  created() {
    for (let i = 0; i < this.headerParts.length; i++) {
      const part = this.headerParts[i];
      if (Array.isArray(part)) {
        this.createHeaderCycle(`headerArray-${i}`);
      }
    }
  },
  beforeUnmount() {
    for (const interval of this.intervals) {
      clearInterval(interval.timer);
    }
  },
  methods: {
    changeOrder(fromIndex, toIndex) {
      this.$emit("orderchange", fromIndex, toIndex);
    },
    createHeaderCycle(cyclerID) {
      const intervalDetails = {
        id: cyclerID,
        currentIndex: 0,
        timer: undefined,
      };
      const newTimer = setInterval(() => {
        const cyclingDiv = document.getElementById(cyclerID);
        if (
          intervalDetails.currentIndex + 1 ===
          this.headerParts[Number(cyclerID.slice(12))].length
        ) {
          setTimeout(() => {
            const existingDuration = cyclingDiv.style.transitionDuration;
            cyclingDiv.style.transitionDuration = "0s";
            intervalDetails.currentIndex = 0;
            cyclingDiv.style.transform = "translate(0)";
            setTimeout(() => {
              cyclingDiv.style.transitionDuration = existingDuration;
            }, 1);
          }, this.intervalLength / 2);
        }
        intervalDetails.currentIndex++;
        cyclingDiv.style.transform = `translateY(${
          -60 * intervalDetails.currentIndex
        }px)`;
      }, this.intervalLength);
      intervalDetails.timer = newTimer;
      this.intervals.push(intervalDetails);
    },
  },
};
</script>
<style scoped>
.flashy {
  font-size: 40px;
}
.flashy * {
  z-index: 1;
}
li {
  font-size: 25px;
}
.cycling {
  transition: transform 0.4s ease-in-out;
}
.color-set-0 {
  color: theme("colors.cautious-background");
  text-shadow: 0px 0px 5px theme("colors.cautious-text");
}
.color-set-1 {
  color: theme("colors.nice-border");
  text-shadow: 0px 0px 4px theme("colors.nice-background");
}
.color-set-2 {
  color: theme("colors.serious-border");
  text-shadow: 0px 0px 5px theme("colors.serious-background");
}
.color-set-3 {
  color: theme("colors.happy-border");
  text-shadow: 0px 0px 5px theme("colors.happy-background");
}
</style>
