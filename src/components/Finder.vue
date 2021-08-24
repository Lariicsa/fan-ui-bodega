<template>
  <form
    @submit.prevent="search(textTyped)"
    class="finder"
    :class="{ opened: isOpen }"
  >
    <div
      @click="openFinder()"
      class="finder__bg"
      :class="{ opened: isOpen }"
    ></div>
    <span @click="openFinder()" class="finder-cross"></span>
    <input
      type="text"
      :autofocus="true"
      :placeholder="phText"
      v-model="textTyped"
      v-on:keyenter="search(textTyped)"
      @change="toFirstElem()"
    />
    <span
      @click="search(textTyped)"
      class="finder-icon"
      :class="{ show: isOpen }"
    ></span>
    <span
      @click="openFinder()"
      class="finder-icon-mobile"
      :class="{ hide: isOpen }"
    ></span>
    <Loader v-show="loader"></Loader>
  </form>
</template>
<script>
import { mapActions } from "vuex";
import Loader from "@/components/Loader";
export default {
  name: "finder",
  components: {
    Loader,
  },
  props: {
    textUrl: {
      type: String,
    },
    phText: String,
  },

  data() {
    return {
      textTyped: "",
      isOpen: false,
    };
  },

  mounted() {
    this.textInPath;
  },

  watch: {
    $route: "closeFinder",
  },

  methods: {
    getTextToSearch() {
      console.log("getTextToSearch");
    },
    search(text) {
      this.isOpen = false;
      if (text !== "") {
        if (this.textInPath !== text) {
          let textUrl = text.toLowerCase().replace(/[\/, ' ']/g, "+");
        }
      }
    },
    openFinder() {
      this.isOpen = !this.isOpen;
    },

    closeFinder() {
      this.isOpen = false;
    },

    toFirstElem() {
      console.log("toFirstElem");
    },
  },
  computed: {
    text() {
      return this.$store.state.filters.textTyped;
    },
    loader() {
      return this.$store.state.filters.loader;
    },
    currentPath() {
      return this.$route.name;
    },

    textInPath() {
      let fullPath = this.$route.fullPath.slice(8, 1000).toString();
      let textUrl = fullPath
        .toLowerCase()
        .replace(/%[a-fA-F0-9-2f][a-fA-F0-9-2F]/g, "#")
        .split("+")
        .join(" ");
      return textUrl;
    },
  },
};
</script>
