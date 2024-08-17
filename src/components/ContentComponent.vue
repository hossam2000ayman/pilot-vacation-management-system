<template>
  <div class="content-container">
    <h2>Content Component created</h2>
    <div class="content-wrapper">
      <ListComponent @itemSelected="onItemSelected" />
      <TableComponent :selectedItem="selectedItem" />
    </div>
  </div>
</template>

<script>
import ListComponent from "@/components/ListComponent.vue";
import TableComponent from "@/components/TableComponent.vue";

export default {
  name: "ContentComponent",
  components: {
    ListComponent,
    TableComponent,
  },

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
