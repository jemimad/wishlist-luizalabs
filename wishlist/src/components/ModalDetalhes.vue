<template>
  <div class="modal" @click="$emit('close')">
    <div class="modal-content">
      <p>{{ name }}</p>
      <p>{{ priceInCents }}</p>
      <p>{{ rating }}</p>

      <button @click="$emit('close')">Fechar</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close"]);
defineProps({
  name: String,
  priceInCents: String,
  rating: Number,
});
</script>

<style lang="scss">
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  .modal-content {
    background-color: bisque;
    padding: 30px;
  }
}
</style>
