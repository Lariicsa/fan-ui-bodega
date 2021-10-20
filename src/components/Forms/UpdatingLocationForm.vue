<template>
  <transition name="formData">
    <form @submit.prevent="actionForm(dataDetails)">
      <Loader v-show="loader" />
      <div class="row">
        <h4>{{ formTitle }}</h4>
      </div>
      <!-- <Dropdown
        v-model="$v.userAddress.estado.$model"
        phName="Estado"
        variant="form"
        :options="estados"
        :name="userAddress.estado"
        :error="$v.userAddress.estado.$error"
        @onChange="setEstadoSelected($v.userAddress.estado.$model)"
      />
      <Inputfield
        phName="Alias de dirección:"
        :autofocus="true"
        name="alias"
        type="text"
        @onBlur="checkDuplicate(userAddress.alias)"
        v-model="userAddress.alias"
        :showError="!$v.userAddress.alias.regexAlias || isDuplicatedAlias"
        typemsg="error"
      >
        <span v-if="isDuplicatedAlias">Ya usaste ese nombre</span>
        <span v-if="!$v.userAddress.alias.regexAlias"
          >Sólo se permiten letras y/ó números, sin espacios</span
        >
      </Inputfield> -->

      <div class="box__buttons">
        <FanButton @btnClick="close" :text="btnCancel" ui="secondary" />
        <FanButton :text="btnOk" ui="primary" :isSubmit="true" />
      </div>
    </form>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Dropdown from "@/components/Dropdown";
import FanButton from "@/components/Button";
import Inputfield from "@/components/InputField";
import Loader from "@/components/Loader";

export default {
  name: "RelocateForm",
  props: ["isShown", "btnOk", "btnCancel", "formTitle", "item"],

  components: {
    Dropdown,
    FanButton,
    Inputfield,
    Loader,
  },

  data() {
    return {
      dataDetails: {
        action: "",
        productId: "",
        location: "",
        newLocation: "",
        quantity: null,
      },
    };
  },

  validations: {},

  methods: {
    close() {
      this.$emit("close");
    },
  },
  computed: {
    estados() {
      let estados = this.estadosList.map((item) => {
        return { value: item, text: item };
      });
      return estados;
    },

    loader() {
      return this.$store.state.entries.loader;
    },
  },
};
</script>
