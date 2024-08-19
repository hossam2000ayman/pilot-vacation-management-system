import { reactive, computed } from "vue";
//Make the getter for selectedSideBarItem and isSidebarOpen through the state object
export const state = reactive({
  isSidebarOpen: false, //it will closed the sidebar at beginning
  getSelectedSidebarItem: "Home Page", // Initial selection
  getSelectedListItem: "Vacations", // Default to Vacations
});

export const toggleSidebar = () => {
  state.isSidebarOpen = !state.isSidebarOpen;
};

export function selectSidebarItem(item) {
  state.getSelectedSidebarItem = item;
}

export function changeListItem(item) {
  state.getSelectedListItem = item;
}

export const SIDEBAR_WIDTH = 250; // Update this to match the width in SidebarComponent.vue
export const SIDEBAR_WIDTH_COLLAPSED = 0; // Set this to 0 to completely hide the sidebar

export const sideBarWidth = computed(
  () => `${state.isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED}px`
);
