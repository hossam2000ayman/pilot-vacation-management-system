<template>
  <div class="table-container">
    <button class="add-button" @click="showDialog = true">+</button>

    <!-- Table -->
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

    <!-- Dialog for adding vacation -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>Add Vacation</h3>
        <form @submit.prevent="submitVacation">
          <div class="form-group">
            <label for="employeeId">Employee ID:</label>
            <input
              type="text"
              v-model="newVacation.EmployeeID"
              id="employeeId"
              required
            />
          </div>

          <div class="form-group">
            <label for="employeeName">Employee Name:</label>
            <input
              type="text"
              v-model="newVacation.EmployeeName"
              id="employeeName"
              required
            />
          </div>

          <div class="form-group">
            <label for="vacationType">Vacation Type:</label>
            <select v-model="newVacation.VacationType" id="vacationType">
              <option value="Annual">Annual</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Sick">Sick</option>
            </select>
          </div>

          <div class="form-group">
            <label for="startAt">Start At:</label>
            <input
              type="date"
              v-model="newVacation.StartAt"
              id="startAt"
              required
              @change="calculateDays"
            />
          </div>

          <div class="form-group">
            <label for="endAt">End At:</label>
            <input
              type="date"
              v-model="newVacation.EndAt"
              id="endAt"
              required
              @change="calculateDays"
            />
          </div>

          <div class="form-group">
            <label for="numberOfDays">Number of Days:</label>
            <input
              type="number"
              v-model="newVacation.NumberOfDays"
              id="numberOfDays"
              readonly
            />
          </div>

          <div class="form-group">
            <label for="reason">Reason:</label>
            <textarea v-model="newVacation.Reason" id="reason"></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-button">Submit</button>
            <button
              type="button"
              class="cancel-button"
              @click="showDialog = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { VacationService } from "@/service/VacationService.js";

export default {
  name: "TableComponent",
  data() {
    return {
      vacations: [],
      showDialog: false,
      newVacation: {
        EmployeeID: "",
        EmployeeName: "",
        VacationType: "Annual",
        StartAt: "",
        EndAt: "",
        NumberOfDays: 0,
        Reason: "",
      },
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
  methods: {
    calculateDays() {
      if (this.newVacation.StartAt && this.newVacation.EndAt) {
        const startDate = new Date(this.newVacation.StartAt);
        const endDate = new Date(this.newVacation.EndAt);
        const timeDiff = endDate - startDate;
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        this.newVacation.NumberOfDays = daysDiff + 1; // Include start date
      }
    },
    submitVacation() {
      // Logic to submit the new vacation
      console.log("Submitting vacation:", this.newVacation);
      // After submission, close the dialog
      this.showDialog = false;
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

.add-button {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #4682b4;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #1c4364;
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

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.dialog h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-button,
.cancel-button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button {
  background-color: #4caf50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button:hover {
  background-color: #e53935;
}
</style>
