import { reactive, computed } from "vue";

export const state = reactive({
  isSidebarOpen: true,
  selectedSidebarItem: "Home Page", // Initial value
});

export const toggleSidebar = () => {
  state.isSidebarOpen = !state.isSidebarOpen;
};

export function selectSidebarItem(item) {
  state.selectedSidebarItem = item;
}

export const SIDEBAR_WIDTH = 250; // Update this to match the width in SidebarComponent.vue
export const SIDEBAR_WIDTH_COLLAPSED = 0; // Set this to 0 to completely hide the sidebar

export const sideBarWidth = computed(
  () => `${state.isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED}px`
);
