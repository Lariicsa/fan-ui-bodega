<template>
  <div class="row between">
    <div class="row md">
      <Finder
        phText="Encuentra un artículo"
        @search="getEntriesData(idTyped)"
        v-model="idTyped"
      />
    </div>
    <div class="row sm between">
      <RadioOption
        v-model="SelectedFilter"
        textOption="Por clave"
        id="clave1"
        @click="selectPaymentType('clave1')"
      />
      <RadioOption
        v-model="SelectedFilter"
        textOption="Por nombre"
        id="nombre2"
        @click="selectPaymentType('nombre2')"
      />
    </div>
  </div>
</template>