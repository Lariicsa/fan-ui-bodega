<template>
  <div class="container__box">
    <Modal :showBox="showUploader" @closeModal="closeUploader">
      <Uploader @btnCancel="closeUploader"></Uploader>
    </Modal>
    <div class="col">
      <h3>Slides actuales</h3>
      <div class="row right">
        <div class="row sm uploader__button">
          <FanButton
            @btnClick="openUploader"
            text="Agregar imagen"
            ui="primary"
          />
        </div>
      </div>
      <FanGrid :cols="3">
        <FanCard
          v-for="(file, $index) in gtrFetchSlides"
          :showOption="true"
          :key="$index"
        >
          <strong>{{ file.name }}</strong>
          <img class="media__image" :src="file.link" />
          <FanButton @btnClick="deleteSlide($index)" ui="delete" />
        </FanCard>
      </FanGrid>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FanButton from "@/components/Button";
import FanCard from "@/components/CardAddress";
import FanGrid from "@/components/Grid";
import Modal from "@/components/ModalContainer";
import Uploader from "@/components/FileUploader";
export default {
  name: "HeroBanner",

  components: {
    FanButton,
    FanCard,
    FanGrid,
    Modal,
    Uploader,
  },
  data() {
    return {
      showUploader: false,
    };
  },

  mounted() {
    this.getBannerSlides();
  },

  methods: {
    ...mapActions(["getBannerSlides"]),

    deleteSlide(id) {
      this.$store.dispatch("deleteSlide", id);
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      console.log("this.selectedFiles", this.selectedFiles);
    },

    openUploader() {
      this.showUploader = true;
    },

    closeUploader() {
      this.showUploader = false;
    },
  },

  computed: {
    ...mapGetters(["gtrFetchSlides"]),
  },
};
</script>
<style lang="scss" scoped>
.uploader__button {
  margin: 3.2rem 0;
}
</style>
