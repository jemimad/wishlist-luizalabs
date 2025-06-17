<template>
  <button class="button-wishlist" @click="$emit('clicked')">
    <img
      class="icon-heart"
      src="../../assets/heart.png"
      alt="Ícone de coração"
    />
    <span class="text">Wishlist</span>
  </button>
</template>

<script setup>
defineEmits(["clicked"]);
</script>

<style lang="scss" scoped>
.button-wishlist {
  display: flex;
  align-items: center;
  font-weight: 600;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;

  .icon-heart {
    width: 20px;
    margin-right: 8px;
  }

  .text {
    font-size: 14px;
  }
}
</style>
