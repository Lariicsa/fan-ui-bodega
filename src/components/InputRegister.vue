<template>
  <div class="inputregister">
    <form class="inputregister__form" @submit.prevent="actionForm(product)">
      <Inputfield
        phName="Clave de producto"
        name="productId"
        type="text"
        v-model="product.idProd"
        :showError="false"
        typemsg="error"
      />

      <Inputfield
        phName="Cantidad"
        name="productquantity"
        type="number"
        v-model="product.quantity"
        :showError="false"
        typemsg="error"
      />

      <button class="inputregister__submit" formData.action="/submit">
        {{ txtBtnOk }}
      </button>
    </form>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import Inputfield from "@/components/InputField";
export default {
  name: "InputRegister",

  components: {
    Inputfield,
  },

  props: ["txtBtnOk"],

  data() {
    return {
      product: {
        idProd: "",
        quantity: null,
      },
    };
  },

  validations: {
    product: {
      idProd: { required },
      quantity: { required },
    },
  },

  methods: {
    actionForm() {
      {
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log("faltan campos");
        } else {
          const data = {
            productId: this.product.idProd,
            quantity: this.product.quantity,
          };
          this.$store.commit("ADD_OUT_ITEM", data);
        }
      }
    },
  },
};
</script>