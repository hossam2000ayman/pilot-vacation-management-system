<template>
  <div class="content-container">
    <h2>Content Component created</h2>
    <div class="content-wrapper" v-if="selectedSidebarItem == 'Home Page'">
      <ListComponent @itemSelected="onItemSelected" />
      <TableComponent :selectedItem="selectedItem" />
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
import ProfileComponent from "@/components/ProfileComponent.vue";
import { state } from "@/state/state.js";
import { computed } from "vue";

export default {
  name: "ContentComponent",
  components: {
    ListComponent,
    TableComponent,
    ProfileComponent,
  },
  setup() {
    const selectedSidebarItem = computed(() => state.selectedSidebarItem);
    return {
      selectedSidebarItem,
    };
  },

  //in future versions todo
  data() {
    return {
      selectedItem: null,
    };
  },
  methods: {
    onItemSelected(item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style scoped>
.content-container {
  width: 100%;
  background-color: rgb(255, 93, 93);
  text-align: center;
}

.content-wrapper {
  background-color: #f8f9fa; /* Light background */
  display: flex;
  gap: 20px;
}
</style>
