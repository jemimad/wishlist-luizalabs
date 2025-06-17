<template>
  <div class="list">
    <Card
      v-for="product in productsToList"
      v-bind="product"
      :fromWishlist="fromWishlist"
    />
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import { computed } from "vue";

defineProps({
  productsToList: Array,
  fromWishlist: Boolean,
});
</script>

<style lang="scss">
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  padding: 0;
  padding-bottom: 80px;
}
</style>
