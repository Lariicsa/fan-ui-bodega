<template>
  <div class="container__box">
    <div class="row center">
      <h1>UI Testing</h1>
    </div>
    <div class="col">
      <Label type="assigned" />
      <Label type="placing" />
      <Label type="placed" />
      <Label type="assorting" />
      <Label type="assorted" />
      <Label type="checking" />
      <Label type="checked" />
      <Label type="registered" />
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