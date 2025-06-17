<script setup>
import { ref, onMounted } from "vue";
import ButtonMenuUser from "./ButtonMenuUser.vue";
import ButtonWishlist from "./ButtonWishlist.vue";

const isMobile = ref(false);
const showMobileMenu = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 600;
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener("resize", checkIsMobile);
});
</script>

<template>
  <header class="header" data-testid="header">
    <router-link to="/" class="logo-link" data-testid="logo-link">
      <img class="logo" src="../../assets/logo.svg" alt="Logo da Netshoes" />
    </router-link>

    <div v-if="!isMobile" data-testid="header-actions" class="header-actions">
      <router-link to="/wishlist" data-testid="wishlist-link-desktop"
        ><ButtonWishlist
      /></router-link>
      <ButtonMenuUser :isMobile="false" />
    </div>

    <div
      v-else
      class="mobile-menu-icon"
      data-testid="hamburger-button"
      @click="showMobileMenu = !showMobileMenu"
    >
      ☰
    </div>

    <div
      v-if="isMobile && showMobileMenu"
      class="mobile-dropdown"
      data-testid="mobile-menu"
    >
      <router-link
        to="/wishlist"
        data-testid="wishlist-link-mobile"
        @click.native="showMobileMenu = false"
      >
        <ButtonWishlist />
      </router-link>
      <ButtonMenuUser :isMobile="true" />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #8200ff;
  height: 70px;
  width: 100vw;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 100;

  .logo {
    height: 40px;
    max-width: 150px;
    width: auto;
    object-fit: contain;
  }

  .header-actions {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
  }

  .mobile-menu-icon {
    font-size: 28px;
    color: white;
    cursor: pointer;
  }

  .mobile-dropdown {
    position: absolute;
    top: 70px;
    right: 0;
    background-color: #8200ff;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 20px;
    z-index: 99;

    a {
      text-decoration: none;
    }
  }
}

@media only screen and (max-width: 600px) {
  .logo {
    height: 30px;
    max-width: 100px;
  }

  .mobile-dropdown {
    width: 100%;
    right: 0;
    left: 0;
    align-items: flex-start;
    padding-left: 20px;
  }
}
</style>
