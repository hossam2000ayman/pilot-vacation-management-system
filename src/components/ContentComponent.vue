<template>
  <div class="content-container">
    <div class="content-wrapper" v-if="selectedSidebarItem == 'Home Page'">
      <!-- emit pass information from child to parent -->
      <ListComponent @itemSelected="onItemSelected" />
      <!-- props passing data from parent to child -->
      <TableComponent :selectedItem="selectedListItem" />
    </div>
    <div class="content-wrapper" v-else-if="selectedSidebarItem == 'HR Page'">
      <HRComponent />
    </div>
    <div
      class="content-wrapper"
      v-else-if="selectedSidebarItem == 'Manager Page'"
    >
      <!-- here we separate this component into 2 components -->
      <ManagerComponent />
    </div>

    <div
      class="content-wrapper"
      v-else-if="selectedSidebarItem == 'Profile Page'"
    >
      <ProfileComponent />
    </div>
  </div>
</template>

<script>
import ListComponent from "@/components/ListComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import HRComponent from "@/components/HRComponent.vue";
import ManagerComponent from "@/components/ManagerComponent.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import { state } from "@/state/state.js";
import { computed, ref } from "vue";

export default {
  name: "ContentComponent",
  components: {
    ListComponent,
    TableComponent,
    HRComponent,
    ManagerComponent,
    ProfileComponent,
  },
  setup() {
    const selectedSidebarItem = computed(() => state.getSelectedSidebarItem);

    const selectedListItem = ref("All Vacations"); //Initial Selected List Item
    const onItemSelected = (item) => {
      selectedListItem.value = item;
    };

    return {
      selectedSidebarItem,
      selectedListItem,
      onItemSelected,
    };
  },
};
</script>

<style scoped>
.content-container {
  width: 100%;
  text-align: center;
}

.content-wrapper {
  background-color: #f8f9fa; /* Light background */
  display: flex;
  gap: 20px;
}
</style>
