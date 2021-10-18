<template>
  <div class="container__box">
    <div class="row center">
      <h1>UI Testing</h1>
    </div>
    <div class="col">
      <Label type="asignado" />
      <Label type="acomodando" />
      <Label type="acomodado" />
      <Label type="surtiendo" />
      <Label type="surtido" />
      <Label type="cotejando" />
      <Label type="cotejado" />
      <Label type="registrado" />
    </div>
  </div>
</template>
<script>
import Label from "@/components/Label";
export default {
  name: "Testing",

  components: {
    Label,
  },
};
</script>