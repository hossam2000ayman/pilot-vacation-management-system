<template>
  <div class="table-container">
    <table class="manager-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="manager in managers" :key="manager.id">
          <td>{{ manager.name }}</td>
          <td>{{ manager.position }}</td>
          <td>{{ manager.department }}</td>
          <td>
            <button
              type="button"
              @click="viewManager(manager)"
              class="btn btn-outline-info"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ManagerTableComponent",
  data() {
    return {
      managers: [], // Placeholder for the manager data
    };
  },
  created() {
    this.fetchManagers();
  },
  methods: {
    fetchManagers() {
      // Simulate an API call
      this.managers = [
        {
          id: 1,
          name: "John Doe",
          position: "Manager",
          department: "Sales",
          makeDecision: false, // Initialize as false
        },
        {
          id: 2,
          name: "Jane Smith",
          position: "Manager",
          department: "Marketing",
          makeDecision: false, // Initialize as false
        },
        // Add more managers as needed
      ];
    },
    viewManager(manager) {
      this.$emit("view-manager", manager);
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f0f8ff; /* Lightened background color */
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

.manager-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.manager-table th,
.manager-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 12px;
}

.manager-table th {
  background-color: #4682b4; /* Steel blue */
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

.manager-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.manager-table td {
  font-size: 13px;
}
</style>
