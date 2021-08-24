<template>
  <header class="fHeader" :style="width">
    <div class="fHeader__top">
      <div class="fHeader__top-right">
        <strong>Hola, Admin</strong>
        <!-- <Burger>
          <ul class="fHeader__mobile-items">
            <li class="fHeader__mobile-item">
              <a href="#" class="user">Hola Lara</a>
            </li>
          </ul>
        </Burger> -->
      </div>
    </div>
  </header>
</template>
<script>
import Burger from "./Burger.vue";
export default {
  name: "Header",

  props: ["width"],

  components: {
    Burger,
  },
};
</script>
