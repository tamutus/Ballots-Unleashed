import { createStore } from "vuex";
import actions from "@/store/actions.js";
import getters from "@/store/getters.js";
import mutations from "@/store/mutations.js";
import state from "@/store/state";

const store = createStore({
  state,
  mutations,
  getters,
  actions,
  strict: process.env.NODE_ENV !== "production",
});

export default store;

// getters: {},
// mutations: {},
// actions: {},
// modules: {},
