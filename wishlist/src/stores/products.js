import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        this.products = data;
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    },
  },
});
