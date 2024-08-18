<template>
  <div class="table-container">
    <!-- <h2>Table Component created</h2> -->
    <table class="vacation-table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Vacation Type</th>
          <th>Start At</th>
          <th>End At</th>
          <th>Number of Days</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vacation, index) in vacations" :key="index">
          <td>{{ vacation.Properties.EmployeeID }}</td>
          <td>{{ vacation.Properties.EmployeeName }}</td>
          <td>{{ vacation.Properties.VacationType }}</td>
          <td>{{ vacation.Properties.StartAt }}</td>
          <td>{{ vacation.Properties.EndAt }}</td>
          <td>{{ vacation.Properties.NumberOfDays }}</td>
          <td>{{ vacation.Properties.Reason || "" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { VacationService } from "@/service/VacationService.js";

export default {
  name: "TableComponent",
  data() {
    return {
      vacations: [],
    };
  },
  async mounted() {
    try {
      let response = await VacationService.getAllVacations();
      this.vacations = response._embedded.Vacations;
    } catch (error) {
      console.error("Error fetching vacations:", error);
    }
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
}

.vacation-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.vacation-table th,
.vacation-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 12px;
}

.vacation-table th {
  background-color: #4682b4; /* Steel blue */
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

.vacation-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.vacation-table td {
  font-size: 13px;
}
</style>
