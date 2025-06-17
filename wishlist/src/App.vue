<script setup>
import Header from "./components/Header/Header.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
</script>

<template>
  <Header />

  <div class="page-container">
    <Breadcrumb />
    <router-view />
  </div>
</template>

<style lang="scss">
body,
#app {
  font-family: "Source Sans Pro", sans-serif;
  margin: 0;
  margin-top: 120px;
}

.page-container {
  padding: 0 10%;
  margin-top: 10px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 0 5%;
  }
}

.empty-state {
  text-align: center;
  margin-top: 80px;
  padding: 0 20px;

  img {
    width: 120px;
    margin-bottom: 20px;
  }

  h2 {
    color: #8200ff;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 15px;
    margin-bottom: 20px;
  }

  .button-back {
    display: inline-block;
    background-color: #8200ff;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      background-color: #6a00cc;
    }
  }
}
</style>
