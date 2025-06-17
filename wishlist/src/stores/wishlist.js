import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
  const wishlist = ref([]);

  // Carrega do localStorage na criação da store
  const loadWishlist = () => {
    const stored = localStorage.getItem("wishlist");
    wishlist.value = stored ? JSON.parse(stored) : [];
  };

  // Salva no localStorage sempre que wishlist mudar
  watch(
    wishlist,
    (newVal) => {
      localStorage.setItem("wishlist", JSON.stringify(newVal));
    },
    { deep: true }
  );

  const addToWishlist = (code) => {
    if (!wishlist.value.includes(code)) {
      wishlist.value.push(code);
    }
  };

  const removeFromWishlist = (code) => {
    wishlist.value = wishlist.value.filter((item) => item !== code);
  };

  const isInWishlist = (code) => wishlist.value.includes(code);

  loadWishlist();

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
});
