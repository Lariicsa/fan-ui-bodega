<template>
  <div class="container__box">
    <Message type="warning fixed surprise" v-show="isValidImage">{{
      messaggeInfo
    }}</Message>
    <div class="uploader__box">
      <h4>Agregar</h4>
      <label class="uploader__wrapper">
        <input class="uploader" type="file" ref="file" @change="selectFile" />
        <span :class="pickedFile ? 'uploader__text-filled' : 'uploader__text'">
          Selecciona una imagen…
        </span>
        <div class="uploader__picked" :class="{ large: tooBig }">
          {{ pickedFile }}
        </div>
        <span class="uploader__icon"></span>
      </label>

      <div class="row between">
        <FanButton
          @btnClick="btnCancel"
          v-show="progress === 0"
          text="Cancelar"
          ui="secondary md"
        />
        <div v-if="currentFile" class="uploader__progress">
          <div class="uploader__progress-num" role="progressbar">
            {{ progress }}%
          </div>
          <div class="uploader__progress-bar">
            <div
              class="uploader__progress-fill"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
        <FanButton
          v-show="selectedFiles"
          @btnClick="upload"
          text="Agregar imagen"
          :ui="!isValidImage ? 'primary md' : 'disabled md'"
        />
      </div>
    </div>
    <!-- <div class="alert alert-light" role="alert">{{ message }}</div> -->
  </div>
</template>

<script>
import FanButton from "@/components/Button";
import Message from "@/components/Message";
import UploadService from "@/services/uploadService";

export default {
  name: "uploadFiles",

  components: {
    FanButton,
    Message,
  },
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      isValidImage: false,
      messaggeInfo: "",
      tooBig: false,
    };
  },

  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data.body;
    });
  },

  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      console.log("this.selectedFiles", this.selectedFiles);
      if (this.pickedFile.length > 26) {
        this.tooBig = true;
      }
      if (this.sizeFile > 800000) {
        this.isValidImage = true;
        this.messaggeInfo = "La imagen es muy grande. No de ser mayor a 500kb.";
      } else if (["image/jpeg", "image/png"].includes(this.typeFile) !== true) {
        this.isValidImage = true;
        this.messaggeInfo =
          "Archivo de imagen inválido, solo JPG y PNG permitidos.";
      } else {
        this.isValidImage = false;
      }
    },

    btnCancel() {
      this.$emit("btnCancel");
    },

    upload() {
      if (!this.isValidImage) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        UploadService.upload(this.currentFile, (event) => {
          this.progress = Math.round((100 * event.loaded) / event.total);
        })
          .then((response) => {
            this.message = response.data.message;
            console.log("this.message", response.data);
            return UploadService.getFiles();
          })
          .then((files) => {
            this.fileInfos = files.data;
            location.reload();
          })
          .catch(() => {
            this.progress = 0;
            this.message = "No se pudo adjuntar el archivo. Intenta de nuevo.";
            this.currentFile = undefined;
          });
        this.selectedFiles = undefined;
      }
    },
  },

  computed: {
    pickedFile() {
      if (this.selectedFiles !== undefined) {
        return this.selectedFiles[0].name;
      } else {
        return "";
      }
    },

    sizeFile() {
      return this.selectedFiles[0].size;
    },

    typeFile() {
      return this.selectedFiles[0].type;
    },
  },
};
</script>
<style lang="scss">
.media {
  &__image {
    max-width: 100%;
  }
}

.btn__primary.md,
.btn__secondary.md,
.btn__disabled.md {
  width: 48%;
}
</style>
