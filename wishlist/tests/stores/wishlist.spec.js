import { setActivePinia, createPinia } from "pinia";
import { useWishlistStore } from "../../src/stores/wishlist";
import { nextTick } from "vue";

describe("useWishlistStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("deve adicionar item na wishlist e salvar no localStorage", async () => {
    const store = useWishlistStore();

    store.addToWishlist("item1");

    // Espera o watch salvar no localStorage
    await nextTick();

    expect(store.wishlist).toContain("item1");

    const savedRaw = localStorage.getItem("wishlist");
    const saved = savedRaw ? JSON.parse(savedRaw) : [];
    expect(saved).toContain("item1");
  });

  it("deve remover item da wishlist e atualizar localStorage", async () => {
    const store = useWishlistStore();

    store.addToWishlist("item1");
    await nextTick();

    store.removeFromWishlist("item1");
    await nextTick();

    expect(store.wishlist).not.toContain("item1");

    const savedRaw = localStorage.getItem("wishlist");
    const saved = savedRaw ? JSON.parse(savedRaw) : [];
    expect(saved).not.toContain("item1");
  });

  it("deve verificar se item está na wishlist", () => {
    const store = useWishlistStore();

    store.addToWishlist("item1");

    expect(store.isInWishlist("item1")).toBe(true);
    expect(store.isInWishlist("item2")).toBe(false);
  });
});
