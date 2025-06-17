import { shallowMount } from "@vue/test-utils";
import { vi } from "vitest";
import Card from "@/components/Card.vue";

const mockAddToWishlist = vi.fn();
const mockRemoveFromWishlist = vi.fn();
const mockIsInWishlist = vi.fn();

vi.mock("@/stores/wishlist", () => ({
  useWishlistStore: () => ({
    addToWishlist: mockAddToWishlist,
    removeFromWishlist: mockRemoveFromWishlist,
    isInWishlist: mockIsInWishlist,
  }),
}));

describe("Card.vue", () => {
  const defaultProps = {
    code: "123",
    name: "Produto Teste",
    visible: true,
    priceInCents: "10000",
    salePriceInCents: "8000",
    rating: 4.5,
    image: "image.jpg",
    fromWishlist: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar as infos básicas corretamente", () => {
    mockIsInWishlist.mockReturnValue(false);
    const wrapper = shallowMount(Card, { props: defaultProps });

    expect(wrapper.find(".title").text()).toBe("Produto Teste");
    expect(wrapper.find(".total-value").text()).toContain("R$ 100,00");
    expect(wrapper.find(".final-value").text()).toContain("R$ 80,00");
    expect(wrapper.find("img.image").attributes("src")).toBe("image.jpg");
  });

  it("deve mostrar o botão de adicionar na wishlist quando o item não está na wishlist", async () => {
    mockIsInWishlist.mockReturnValue(false);
    const wrapper = shallowMount(Card, { props: defaultProps });

    const button = wrapper.find("button.favorite:not(.wishlist)");
    expect(button.exists()).toBe(true);

    await button.trigger("click");
    expect(mockAddToWishlist).toHaveBeenCalledWith("123");
  });

  it("deve mostrar o botão de remover na wishlist quando o item está na wishlist", async () => {
    mockIsInWishlist.mockReturnValue(true);
    const wrapper = shallowMount(Card, { props: defaultProps });

    const button = wrapper.find("button.wishlist");
    expect(button.exists()).toBe(true);

    await button.trigger("click");
    expect(mockRemoveFromWishlist).toHaveBeenCalledWith("123");
  });

  it("não deve renderizar nada se visible for false", () => {
    const wrapper = shallowMount(Card, {
      props: { ...defaultProps, visible: false },
    });

    expect(wrapper.find(".card").exists()).toBe(false);
  });
});
