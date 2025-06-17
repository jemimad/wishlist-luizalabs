import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Wishlist from "@/views/Wishlist.vue";
import { createTestingPinia } from "@pinia/testing";
vi.mock("@/components/List.vue", () => ({
  default: {
    name: "List",
    template: "<div class='mocked-list' />",
    props: ["productsToList", "fromWishlist"],
  },
}));

describe("Wishlist.vue", () => {
  const mockProducts = [
    {
      code: "p1",
      name: "Produto 1",
      visible: true,
      priceInCents: "1000",
      salePriceInCents: "900",
      rating: 4,
      image: "img1.png",
    },
    {
      code: "p2",
      name: "Produto 2",
      visible: true,
      priceInCents: "2000",
      salePriceInCents: "1800",
      rating: 5,
      image: "img2.png",
    },
  ];

  it("exibe o componente List se houver produtos na wishlist", () => {
    const wrapper = mount(Wishlist, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              products: {
                products: mockProducts,
              },
              wishlist: {
                wishlist: ["p1"],
              },
            },
          }),
        ],
      },
    });

    const list = wrapper.findComponent({ name: "List" });
    expect(list.exists()).toBe(true);
    expect(list.props("fromWishlist")).toBe(true);
    expect(list.props("productsToList")).toEqual([mockProducts[0]]);
  });

  it("exibe o estado vazio se não houver produtos na wishlist", () => {
    const wrapper = mount(Wishlist, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              products: {
                products: mockProducts,
              },
              wishlist: {
                wishlist: [],
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(".empty-state").exists()).toBe(true);
    expect(wrapper.text()).toContain("Sua wishlist está vazia 💜");
    expect(wrapper.find("router-link").attributes("to")).toBe("/");
  });
});
