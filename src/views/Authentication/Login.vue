<template>
  <div class="box">
    <Loader v-show="loader" />
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
import { mapGetters } from "vuex";
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

  watch: {
    isLoged: "redirectIfLogin",
  },

  methods: {
    registerUser() {
      const user = {
        email: this.register.email,
        password: this.register.password,
      };
      this.$store.dispatch("loginSuper", user).then(() => {
        this.redirectIfLogin();
      });
    },

    redirectIfLogin() {
      if (this.isLoged) {
        this.$router.push({ name: "Home" });
        console.log("hell-o!");
      }
    },
  },

  computed: {
    ...mapGetters(["isLoged"]),
    loader() {
      return this.$store.state.auth.loader;
    },
  },
};
</script>