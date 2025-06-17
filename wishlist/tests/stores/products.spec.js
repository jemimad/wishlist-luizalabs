import { setActivePinia, createPinia } from "pinia";
import { useProductsStore } from "@/stores/products";

describe("useProductsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("deve buscar produtos e atualizar o state", async () => {
    const fakeProducts = [{ id: 1, name: "Produto Teste" }];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeProducts),
      })
    );

    const store = useProductsStore();

    await store.fetchProducts();

    expect(store.products).toEqual(fakeProducts);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/products");
  });

  it("deve lidar com erro na requisição", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch = vi.fn(() => Promise.reject("API off"));

    const store = useProductsStore();

    await store.fetchProducts();

    expect(store.products).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar produtos:",
      "API off"
    );

    consoleErrorSpy.mockRestore();
  });
});
