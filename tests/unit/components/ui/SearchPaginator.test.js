import { shallowMount } from "@vue/test-utils";

import SearchPaginator from "@/components/ui/SearchPaginator.vue";

describe("SearchPaginator", () => {
  const createRoute = (queryParams = {}) => ({
    path: "/search",
    query: {
      testparam: "test123",
      ...queryParams,
    },
  });
  const push = jest.fn();
  const createConfig = ($route, props = {}) => ({
    global: {
      mocks: {
        $route,
        $router: { push },
      },
    },
    props: {
      page: 5,
      pageCount: 10,
      ...props,
    },
  });

  describe("when query params exclude page number", () => {
    it("navigates to the first page automatically", () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: undefined })
      );
      const pageCounter = wrapper.find("[data-test='page-counter']");
      expect(pageCounter.text()).toMatch("1");
    });
  });

  it("shows the current page number", () => {
    const wrapper = shallowMount(
      SearchPaginator,
      createConfig(createRoute(), { page: 3 })
    );
    const pageCounter = wrapper.find("[data-test='page-counter']");
    expect(pageCounter.text()).toMatch("3");
  });

  it("shows the total page count", () => {
    const wrapper = shallowMount(
      SearchPaginator,
      createConfig(createRoute(), { pageCount: 4 })
    );
    const pageTotal = wrapper.find("[data-test='page-total']");
    expect(pageTotal.text()).toMatch("4");
  });

  describe("when only one page", () => {
    it('hides the "Next Page" button', () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 1, pageCount: 1 })
      );
      const pageTurner = wrapper.find("[data-test='next-page']");
      expect(pageTurner.exists()).toBe(false);
    });
  });

  describe("When on the first page of multiple", () => {
    it('shows a "Next Page" button', () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 1, pageCount: 2 })
      );
      const pageTurner = wrapper.find("[data-test='next-page']");
      expect(pageTurner.exists()).toBe(true);
    });

    it('hides a "Previous Page" button', () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 1, pageCount: 2 })
      );
      const pageTurner = wrapper.find("[data-test='previous-page']");
      expect(pageTurner.exists()).toBe(false);
    });
  });

  describe("when on a middle page", () => {
    it('shows a "Next Page" button', () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 2, pageCount: 3 })
      );
      const pageTurner = wrapper.find("[data-test='next-page']");
      expect(pageTurner.exists()).toBe(true);
    });

    it('shows a "Previous Page" button', () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 2, pageCount: 2 })
      );
      const pageTurner = wrapper.find("[data-test='previous-page']");
      expect(pageTurner.exists()).toBe(true);
    });
  });

  describe("when on the last page", () => {
    it('hides the "Next Page" button', () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 2, pageCount: 2 })
      );
      const pageTurner = wrapper.find("[data-test='next-page']");
      expect(pageTurner.exists()).toBe(false);
    });

    it('shows a "Previous Page" button', () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 2, pageCount: 2 })
      );
      const pageTurner = wrapper.find("[data-test='previous-page']");
      expect(pageTurner.exists()).toBe(true);
    });
  });

  describe("when users navigate to the previous page", () => {
    it("routes to the previous page", async () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 5 })
      );
      const pageTurner = wrapper.find("[data-test='previous-page']");
      await pageTurner.trigger("click");
      expect(push).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.objectContaining({
            page: 4,
          }),
        })
      );
    });
    it("preserves query parameters", async () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute({ gobbledegook: "extreme" }))
      );
      const pageTurner = wrapper.find("[data-test='previous-page']");
      await pageTurner.trigger("click");
      expect(push).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.objectContaining({
            gobbledegook: "extreme",
          }),
        })
      );
    });
  });

  describe("when users navigate to the next page", () => {
    it("routes to the next page", async () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute(), { page: 6 })
      );
      const pageTurner = wrapper.find("[data-test='next-page']");
      await pageTurner.trigger("click");
      expect(push).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.objectContaining({
            page: 7,
          }),
        })
      );
    });
    it("preserves query parameters", async () => {
      const wrapper = shallowMount(
        SearchPaginator,
        createConfig(createRoute({ gobbledegook: "extreme" }))
      );
      const pageTurner = wrapper.find("[data-test='next-page']");
      await pageTurner.trigger("click");
      expect(push).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.objectContaining({
            gobbledegook: "extreme",
          }),
        })
      );
    });
  });
});
