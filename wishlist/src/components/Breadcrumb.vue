<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const breadcrumbs = computed(() => {
  if (route.name === "Wishlist") {
    return ["Home", "Wishlist"];
  }
  return ["Home"];
});

const isCurrent = (name) => route.name === name;
</script>

<template>
  <nav class="breadcrumb">
    <ul>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        :class="{ current: isCurrent(crumb) }"
      >
        <router-link
          v-if="!isCurrent(crumb)"
          :to="{ name: crumb }"
          class="link"
        >
          {{ crumb }}
        </router-link>
        <span v-else>{{ crumb }}</span>

        <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.breadcrumb {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  width: 100%;
  color: #8200ff;
  font-size: 16px;

  ul {
    list-style: none;
    display: flex;
    gap: 8px;
    margin: 0;
    padding: 0;
  }

  li {
    font-weight: 400;

    &.current {
      font-weight: 700;
    }
  }

  .link {
    text-decoration: none;
    color: #8200ff;

    &:hover {
      text-decoration: underline;
    }
  }

  .separator {
    margin: 0 8px;
  }
}
</style>
