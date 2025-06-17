<template>
  <div class="home">
    <List
      v-if="productsStore.products.length"
      :productsToList="productsStore.products"
    />
    <div v-else class="empty-state">
      <img src="@/assets/empty-box.svg" alt="Nenhum produto encontrado" />
      <h2>Oops! Nenhum produto foi encontrado.</h2>
      <p>Tente atualizar a página ou volte mais tarde.</p>
    </div>
  </div>
</template>

<script setup>
import List from "../components/List.vue";
import { ref, onMounted } from "vue";
import { useProductsStore } from "../stores/products";

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.fetchProducts();
});
</script>
