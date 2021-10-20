<template>
  <transition name="formData">
    <form @submit.prevent="actionForm(dataDetails)">
      <Loader v-show="loader" />
      <div class="row">
        <h4>{{ formTitle }}</h4>
      </div>
      <Inputfield
        phName="Clave de producto"
        name="productId"
        type="text"
        v-model="$v.dataDetails.productId.$model"
        :showError="$v.dataDetails.productId.$error"
        typemsg="error"
      >
        <span v-if="$v.dataDetails.productId.$error">* Campo obligatorio</span>
      </Inputfield>

      <Inputfield
        :disabled="true"
        :placeholder="$v.dataDetails.location.$model"
        name="location"
        type="text"
        v-model="$v.dataDetails.location.$model"
        typemsg="error"
      >
      </Inputfield>

      <Inputfield
        phName="Nueva ubicación"
        name="newLocation"
        type="text"
        v-model="$v.dataDetails.newLocation.$model"
        :showError="$v.dataDetails.newLocation.$error"
        typemsg="error"
      >
        <span v-if="$v.dataDetails.newLocation.$error"
          >* Campo obligatorio</span
        >
      </Inputfield>

      <Inputfield
        phName="Cantidad"
        name="quantity"
        type="number"
        v-model="$v.dataDetails.quantity.$model"
        :showError="$v.dataDetails.quantity.$error"
        typemsg="error"
      >
        <span v-if="$v.dataDetails.quantity.$error">* Campo obligatorio</span>
      </Inputfield>

      <div class="box__buttons">
        <FanButton @btnClick="close" :text="btnCancel" ui="secondary" />
        <FanButton :text="btnOk" ui="primary" :isSubmit="true" />
      </div>
    </form>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
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

  mounted() {
    this.item;
    this.dataDetails;
  },

  data() {
    return {
      dataDetails: {
        action: "UPDATE_LOCATION",
        productId: this.item.product_id,
        location: this.item.final_location,
        newLocation: this.newLocation,
        quantity: this.item.quantity,
      },
    };
  },

  validations: {
    dataDetails: {
      action: { required },
      productId: { required },
      location: { required },
      newLocation: { required },
      quantity: { required },
    },
  },

  watch: {
    newLocation: function(val) {
      this.dataDetails.newLocation = val
    },
    $route: 'actionForm'
  },

  methods: {
    close() {
      this.$emit("close");
    },
    
    actionForm(data) {
      this.$emit("actionForm", data)
    },
  },
  computed: {
    loader() {
      return this.$store.state.entries.loader;
    },
  },
};
</script>
