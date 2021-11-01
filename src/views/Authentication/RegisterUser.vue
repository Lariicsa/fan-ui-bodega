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
        rol: "",
      },
    };
  },

  methods: {
    registerUser() {
      console.log("clic");
    },
  },
};
</script>