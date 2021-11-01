<template>
  <div class="box">
    <div class="outs__form">
      <div class="row">
        <h4>Registrar usuario</h4>
      </div>

      <div class="row">
        <Inputfield
          phName="eMail"
          name="rEmail"
          type="email"
          v-model="register.email"
          :showError="false"
          typemsg="error"
        />
        <Inputfield
          phName="Contraseña"
          name="rpass"
          type="password"
          v-model="register.password"
          :showError="false"
          typemsg="error"
        />
      </div>
      <div class="row right">
        <FanButton
          text="Iniciar sesión"
          ui="primary"
          @btnClick="registerUser()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Dropdown from "@/components/Dropdown";
import FanButton from "@/components/Button";
import Inputfield from "@/components/InputField";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
export default {
  name: "Login",

  components: {
    Dropdown,
    FanButton,
    Inputfield,
    Loader,
    Message,
  },

  data() {
    return {
      register: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    registerUser() {
      const user = {
        email: this.register.email,
        password: this.register.password,
      };
      this.$store.dispatch("loginSuper", user);
      console.log("clic");
    },
  },
};
</script>