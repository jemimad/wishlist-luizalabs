import { mount } from "@vue/test-utils";
import Header from "@/components/Header/Header.vue";
import { nextTick } from "vue";

vi.mock("@/components/ButtonMenuUser.vue", () => ({
  default: {
    name: "ButtonMenuUser",
    template: '<div data-testid="button-menu-user" />',
    props: ["isMobile"],
  },
}));

vi.mock("@/components/ButtonWishlist.vue", () => ({
  default: {
    name: "ButtonWishlist",
    template: '<div data-testid="button-wishlist" />',
  },
}));

describe("Header", () => {
  const resizeWindow = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  };

  it("deve renderizar corretamente no desktop", async () => {
    resizeWindow(1024);

    const wrapper = mount(Header, {
      global: {
        stubs: ["router-link"],
      },
    });

    await nextTick();

    expect(wrapper.get('[data-testid="header"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="header-actions"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="hamburger-button"]').exists()).toBe(
      false
    );
    expect(wrapper.get('[data-testid="wishlist-link-desktop"]').exists()).toBe(
      true
    );
  });

  it("deve renderizar corretamente no mobile", async () => {
    resizeWindow(480);

    const wrapper = mount(Header, {
      global: {
        stubs: ["router-link"],
      },
    });

    await nextTick();

    expect(wrapper.find('[data-testid="header-actions"]').exists()).toBe(false);
    expect(wrapper.get('[data-testid="hamburger-button"]').exists()).toBe(true);
  });

  it("deve abrir e fechar o menu mobile ao clicar no botão", async () => {
    resizeWindow(480);

    const wrapper = mount(Header, {
      global: {
        stubs: ["router-link"],
      },
    });

    await nextTick();

    const hamburger = wrapper.get('[data-testid="hamburger-button"]');

    expect(wrapper.find('[data-testid="mobile-menu"]').exists()).toBe(false);

    await hamburger.trigger("click");
    expect(wrapper.get('[data-testid="mobile-menu"]').exists()).toBe(true);

    await hamburger.trigger("click");
    expect(wrapper.find('[data-testid="mobile-menu"]').exists()).toBe(false);
  });

  it("deve fechar o menu mobile ao clicar no link de wishlist", async () => {
    resizeWindow(480);

    const wrapper = mount(Header, {
      global: {
        stubs: ["router-link"],
      },
    });

    await nextTick();

    await wrapper.get('[data-testid="hamburger-button"]').trigger("click");

    const wishlistLink = wrapper.get('[data-testid="wishlist-link-mobile"]');
    await wishlistLink.trigger("click");

    expect(wrapper.find('[data-testid="mobile-menu"]').exists()).toBe(false);
  });
});
