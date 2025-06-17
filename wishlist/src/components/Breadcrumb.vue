<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const breadcrumbs = computed(() => {
  if (route.name === "Home") {
    return [{ name: "Home", label: "Home" }];
  } else if (route.name === "Wishlist") {
    return [
      { name: "Home", label: "Home" },
      { name: "Wishlist", label: "Wishlist" },
    ];
  }
  return [{ name: "Home", label: "Home" }];
});

const isCurrent = (name) => route.name === name;
</script>

<template>
  <nav class="breadcrumb" v-if="breadcrumbs.length">
    <ul>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="crumb.name"
        :class="{ current: isCurrent(crumb.name) }"
      >
        <router-link
          v-if="!isCurrent(crumb.name)"
          :to="{ name: crumb.name }"
          class="link"
        >
          {{ crumb.label }}
        </router-link>
        <span v-else>{{ crumb.label }}</span>

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
