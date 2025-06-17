<script setup>
import { ref, onMounted } from "vue";
defineProps({ isMobile: Boolean });

const showMenu = ref(false);
const optionsMenu = ["Entrar", "Minha conta", "Endereços", "Minha Netshoes"];

const closeOnClickOutside = (event) => {
  if (!event.target.closest(".menu")) {
    showMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeOnClickOutside);
});
</script>

<template>
  <div
    class="menu"
    :class="{ hoverable: !isMobile }"
    @mouseenter="!isMobile && (showMenu = true)"
    @mouseleave="!isMobile && (showMenu = false)"
    @click="isMobile && (showMenu = !showMenu)"
  >
    <img
      v-if="!isMobile"
      class="person-icon"
      src="../../assets/user.png"
      alt="Ícone do usuário"
    />

    <div v-if="!isMobile && showMenu" class="menu-content">
      <p v-for="option in optionsMenu" :key="option">{{ option }}</p>
    </div>

    <div v-if="isMobile" class="menu-content static-list">
      <p v-for="option in optionsMenu" :key="option">{{ option }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  position: relative;
  cursor: pointer;

  .person-icon {
    width: 30px;
    height: 30px;
  }

  .menu-content {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: #fff;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    padding: 10px 16px;
    z-index: 100;
    min-width: 150px;

    p {
      margin: 6px 0;
      font-size: 14px;
    }
  }

  &.hoverable:hover .menu-content {
    display: block;
  }
}

.menu-content.static-list {
  position: static;
  background-color: transparent;
  color: white;
  box-shadow: none;
  padding: 0;
  min-width: auto;

  p {
    margin: 6px 0;
    font-size: 14px;
    color: white;
    cursor: pointer;
  }
}
</style>
