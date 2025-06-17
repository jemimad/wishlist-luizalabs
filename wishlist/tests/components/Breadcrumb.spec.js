import { mount } from "@vue/test-utils";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { createMemoryHistory, createRouter } from "vue-router";

const createWrapper = async (routeName) => {
  const routes = [
    { path: "/", name: "Home", component: { template: "<div>Home</div>" } },
    {
      path: "/wishlist",
      name: "Wishlist",
      component: { template: "<div>Wishlist</div>" },
    },
  ];

  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });

  await router.push({ name: routeName });
  await router.isReady();

  return mount(Breadcrumb, {
    global: {
      plugins: [router],
    },
  });
};

describe("Breadcrumb", () => {
  it('mostra apenas "Home" quando está na rota Home', async () => {
    const wrapper = await createWrapper("Home");

    expect(wrapper.text()).toContain("Home");
    expect(wrapper.findAll("li").length).toBe(1);
    expect(wrapper.find("li.current").text()).toBe("Home");
    expect(wrapper.find("router-link").exists()).toBe(false);
  });

  it('mostra "Home / Wishlist" quando está na rota Wishlist', async () => {
    const wrapper = await createWrapper("Wishlist");

    const items = wrapper.findAll("li");
    expect(items.length).toBe(2);

    // "Home" está como link
    expect(items[0].text()).toContain("Home");
    expect(items[0].find("a").exists()).toBe(true); // <== aqui
    expect(items[0].classes()).not.toContain("current");

    // "Wishlist" está como span atual
    expect(items[1].text()).toContain("Wishlist");
    expect(items[1].find("a").exists()).toBe(false); // <== aqui
    expect(items[1].classes()).toContain("current");

    // Separador aparece
    expect(wrapper.findAll(".separator").length).toBe(1);
  });
});
