<template>
  <div class="card" v-if="visible" @click="showModal = true">
    <button
      v-if="isInWishlist(code)"
      class="favorite wishlist"
      @click="removeFromWishlist(code)"
    >
      <img class="heart-favorite" :src="iconSrc" :alt="iconAlt" />
    </button>
    <button v-else class="favorite" @click="addToWishlist(code)">
      <img
        class="heart-favorite"
        src="../assets/heart.png"
        alt="Ícone de coração"
      />
    </button>

    <img
      class="image"
      :src="image"
      alt="produto que está sendo mostrado no card"
    />

    <div class="card-infos">
      <p class="title">{{ name }}</p>
      <star-rating
        class="rating"
        :read-only="true"
        :rating="rating"
        :increment="0.01"
        :star-size="15"
      />
      <p class="total-value">{{ `R$ ${formatCurrency(priceInCents)}` }}</p>
      <p class="final-value">
        {{ `R$ ${formatCurrency(salePriceInCents)}` }}
      </p>
    </div>
  </div>
  <ModalDetalhes
    v-if="showModal"
    :name="name"
    :priceInCents="priceInCents"
    :rating="rating"
    @close="showModal = false"
  />
</template>

<script setup>
import { inject, computed, ref } from "vue";
import { formatCurrency } from "../utils/utils";
import StarRating from "vue-star-rating";
import { useWishlistStore } from "../stores/wishlist";
import ModalDetalhes from "./ModalDetalhes.vue";

const wishlistStore = useWishlistStore();

const props = defineProps({
  code: String,
  name: String,
  visible: Boolean,
  priceInCents: String,
  salePriceInCents: String,
  rating: Number,
  image: String,
  fromWishlist: false,
});

const showModal = ref(false);

const iconSrc = computed(() =>
  props.fromWishlist
    ? new URL("../assets/x-icon.png", import.meta.url).href
    : new URL("../assets/heart.png", import.meta.url).href
);

const iconAlt = computed(() =>
  props.fromWishlist ? "Ícone de X" : "Ícone de coração"
);

const addToWishlist = (code) => {
  wishlistStore.addToWishlist(code);
};

const removeFromWishlist = (code) => {
  wishlistStore.removeFromWishlist(code);
};

const isInWishlist = (code) => {
  return wishlistStore.isInWishlist(code);
};
</script>

<style lang="scss">
.card {
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 20px 16px 16px 16px;
  margin: 20px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .image {
    width: 100%;
    height: auto;
    margin-top: 12px;
    object-fit: contain;
  }

  .favorite {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    background-color: #eee;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #ccc;
    }

    .heart-favorite {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }
  }

  .wishlist {
    background-color: #ff5f5f;

    &:hover {
      background-color: #e94e4e;
    }
  }

  .card-infos {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-top: 16px;
  }

  .title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  .rating {
    margin-bottom: 6px;
  }

  .total-value {
    text-decoration: line-through;
    margin: 0;
    font-size: 13px;
    color: #aaa;
  }

  .final-value {
    color: #8200ff;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
}
</style>
