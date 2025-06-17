import { shallowMount } from "@vue/test-utils";
import List from "@/components/List.vue";
import Card from "@/components/Card.vue";

describe("List.vue", () => {
  const productsMock = [
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

  it("renderiza o número correto de Cards", () => {
    const wrapper = shallowMount(List, {
      props: { productsToList: productsMock, fromWishlist: false },
    });

    const cards = wrapper.findAllComponents(Card);
    expect(cards).toHaveLength(productsMock.length);
  });

  it("passa as props do produto para o Card", () => {
    const wrapper = shallowMount(List, {
      props: { productsToList: productsMock, fromWishlist: false },
    });

    const cards = wrapper.findAllComponents(Card);

    cards.forEach((cardWrapper, index) => {
      expect(cardWrapper.props()).toMatchObject(productsMock[index]);
    });
  });

  it("passa a prop fromWishlist para os Cards", () => {
    const wrapper = shallowMount(List, {
      props: { productsToList: productsMock, fromWishlist: true },
    });

    const cards = wrapper.findAllComponents(Card);
    cards.forEach((cardWrapper) => {
      expect(cardWrapper.props("fromWishlist")).toBe(true);
    });
  });
});
