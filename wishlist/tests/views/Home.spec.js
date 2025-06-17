import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

const fetchProductsMock = vi.fn();

vi.mock("@/stores/products", () => {
  return {
    useProductsStore: () => ({
      products: [],
      fetchProducts: fetchProductsMock,
    }),
  };
});

import Home from "@/views/Home.vue";

describe("Home", () => {
  beforeEach(() => {
    fetchProductsMock.mockClear();
    setActivePinia(createPinia());
  });

  it("chama fetchProducts no onMounted", async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createPinia()],
      },
    });

    await wrapper.vm.$nextTick();

    expect(fetchProductsMock).toHaveBeenCalled();
  });
});
