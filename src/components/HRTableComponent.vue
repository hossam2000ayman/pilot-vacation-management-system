<template>
  <div class="table-container">
    <table class="hr-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hr in hrs" :key="hr.id">
          <td>{{ hr.name }}</td>
          <td>{{ hr.position }}</td>
          <td>{{ hr.department }}</td>
          <td>
            <button @click="editHR(hr)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HRTableComponent",
  data() {
    return {
      hrs: [], // Placeholder for the manager data
    };
  },
  created() {
    this.fetchHRs();
  },
  methods: {
    fetchHRs() {
      // Simulate an API call
      this.hrs = [
        { id: 1, name: "John Doe", position: "HR", department: "Sales" },
        {
          id: 2,
          name: "Jane Smith",
          position: "HR",
          department: "Marketing",
        },
        // Add more managers as needed
      ];
    },
    editHR(hr) {
      this.$emit("edit-hr", hr);
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

.hr-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hr-table th,
.hr-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 12px;
}

.hr-table th {
  background-color: #4682b4; /* Steel blue */
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

.hr-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.hr-table td {
  font-size: 13px;
}
</style>
