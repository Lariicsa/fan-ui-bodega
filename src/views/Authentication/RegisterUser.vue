<template>
  <div class="box">
    <Message :type="fetchRes.typeMessage" :showmsg="fetchRes.showMessage">
      {{ fetchRes.message }}
    </Message>
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
          phName="Nombre"
          name="rName"
          type="text"
          v-model="register.name"
          :showError="false"
          typemsg="error"
        />
        <Inputfield
          phName="Apellido"
          name="rlastname"
          type="text"
          v-model="register.lastname"
          :showError="false"
          typemsg="error"
        />

        <Inputfield
          phName="Contraseña"
          name="rpass1"
          type="password"
          v-model="register.pass1"
          :showError="false"
          typemsg="error"
        />
        <Inputfield
          phName="Confirmar contraseña"
          name="rpass2"
          type="password"
          v-model="register.pass2"
          :showError="false"
          typemsg="error"
        />
      </div>
      <div class="row right">
        <FanButton
          text="Registrar usuario"
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
  name: "Register",

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
        pass1: "",
        pass2: "",
        name: "",
        lastname: "",
      },
      response: {
        showMessage: false,
        typeMessage: "",
        message: "",
      },
    };
  },

  methods: {
    registerUser() {
      const user = {
        email: this.register.email,
        password: this.register.pass1,
        confirmPassword: this.register.pass2,
        name: this.register.name,
        lastName: this.register.lastname,
        roles: ["ADMIN"],
      };
      this.$store.dispatch("addNewUser", user).then(()=>{
        if(this.autResponseStatus == 200){
          this.router.push({name:'Home'})
        }
      })
      console.log("clic", user);
    },
  },
  computed: {
    ...mapGetters(["autResponseStatus", "autResponseMessage"]),

    fetchRes() {
      let key = this.autResponseStatus;
      switch (key) {
        case 200:
          return (this.response = {
            showMessage: true,
            typeMessage: "success fixed smile",
            message: this.autResponseMessage,
          });
        case 400:
          return (this.response = {
            showMessage: true,
            typeMessage: "warning fixed neutral",
            message: this.autResponseMessage,
          });
        default:
          return (this.response = {
            showMessage: false,
            typeMessage: "",
            message: "na",
          });
      }
    },
  },
};
</script>