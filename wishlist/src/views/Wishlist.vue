<template>
  <div class="wishlist">
    <List
      v-if="wishlistProducts.length > 0"
      :productsToList="wishlistProducts"
      :fromWishlist="true"
    />
    <div v-else class="empty-state">
      <img src="@/assets/heart-empty.svg" alt="Wishlist vazia" />
      <h2>Sua wishlist está vazia 💜</h2>
      <p>Adicione os produtos que você ama para encontrá-los aqui.</p>
      <router-link to="/" class="button-back">Ver produtos</router-link>
    </div>
  </div>
</template>

<script setup>
import List from "../components/List.vue";
import { computed } from "vue";

import { useWishlistStore } from "../stores/wishlist";
import { useProductsStore } from "../stores/products";

const productsStore = useProductsStore();
const wishlistStore = useWishlistStore();

const products = computed(() => productsStore.products);

const wishlistProducts = computed(() =>
  products.value.filter((product) =>
    wishlistStore.wishlist.includes(product.code)
  )
);
</script>
