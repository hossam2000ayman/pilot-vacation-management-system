<template>
  <div class="list-container">
    <ul class="list-menu">
      <li class="list-item">
        Vacation
        <ul class="dropdown">
          <li @click="selectListItem('All Vacations')">All Vacations</li>
        </ul>
      </li>
      <li class="list-item">
        My Inbox
        <ul class="dropdown">
          <li @click="selectListItem('All Tasks')">All tasks</li>
          <li @click="selectListItem('Personal Tasks')">Personal tasks</li>
          <li @click="selectListItem('Roles Tasks')">Roles tasks</li>
          <li @click="selectListItem('Teams Tasks')">Teams tasks</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// import { changeListItem, state } from "@/state/state";

export default {
  name: "ListComponent",
  methods: {
    selectListItem(listItem) {
      this.$emit("itemSelected", listItem); // Emits the selected list item to the parent
    },
  },
};
</script>

<style scoped>
.list-container {
  background-color: #003366;
  height: 85vh;
  padding: 20px;
  color: white;
  width: 250px;
}

.list-menu {
  list-style-type: none;
  padding: 0;
}

.list-item {
  padding: 10px 0;
  cursor: pointer;
  position: relative;
}

.list-item:hover {
  background-color: #182532;
}

.dropdown {
  list-style-type: none;
  padding-left: 20px;
  margin-top: 5px;
  display: none;
}

.list-item:hover .dropdown {
  display: block;
}

.dropdown li {
  padding: 5px 0;
  cursor: pointer;
}

.dropdown li:hover {
  color: #1abc9c;
}
</style>
