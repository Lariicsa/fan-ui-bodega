<template>
  <div class="container__box nobg">
    <div class="row center">
      <h1>Sistema de Bodega Fantadmin</h1>
    </div>
    <Loader v-show="loader" />
    <div class="box">
      <div class="row">
        <h4>Iniciar sesión</h4>
      </div>

      <div class="row">
        <Inputfield
          phName="eMail"
          name="rEmail"
          type="email"
          v-model="register.email"
          :showError="userError"
          typemsg="error"
        >
          <span v-if="userError">{{ autResponseMessage }}</span>
        </Inputfield>
        <Inputfield
          phName="Contraseña"
          name="rpass"
          type="password"
          v-model="register.password"
          :showError="passwordError"
          typemsg="error"
        >
          <span v-if="passwordError">{{ autResponseMessage }}</span>
        </Inputfield>
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

  beforeMount() {
    this.redirectIfLogin();
  },

  mounted() {
    this.redirectIfLogin();
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
        this.$router.push({ name: "Home" }).then(()=>{
          location.reload()
        })
        console.log("hell-o!");
      }
    },
  },

  computed: {
    ...mapGetters(["isLoged", "autResponseMessage"]),
    loader() {
      return this.$store.state.auth.loader;
    },
    passwordError() {
      let type = this.autResponseMessage;
      if (type.includes("password")) {
        return true;
      } else {
        return false;
      }
    },
    userError() {
      let type = this.autResponseMessage;
      if (type.includes("usuario")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>