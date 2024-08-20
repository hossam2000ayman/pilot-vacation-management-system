<template>
  <!-- Snackbar -->
  <div v-if="snackbar.show" class="snackbar">{{ snackbar.message }}</div>
  <div class="table-container">
    <button
      class="add-button"
      v-if="dataType == 'vacations'"
      @click="showDialog = true"
    >
      +
    </button>

    <div v-if="loading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
    <!-- Table -->
    <table v-if="!loading" class="vacation-table">
      <thead>
        <tr v-if="dataType === 'vacations'">
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Vacation Type</th>
          <th>Start At</th>
          <th>End At</th>
          <th>Number of Days</th>
          <th>Reason</th>
        </tr>
        <tr v-else-if="dataType === 'tasks'">
          <th>Target Name</th>
          <th>Source Name</th>
          <th>Subject</th>
          <th>Priority</th>
          <th>Start Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody v-if="dataType === 'vacations'">
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.Properties.EmployeeID + "" }}</td>
          <td>
            {{ item.Properties.EmployeeName + "" }}
          </td>
          <td>
            {{ item.Properties.VacationType + "" }}
          </td>
          <td>{{ formatDate(item.Properties.StartAt) + "" }}</td>
          <td>{{ formatDate(item.Properties.EndAt) + "" }}</td>
          <td>{{ item.Properties.NumberOfDays + "" }}</td>
          <td>{{ item.Properties.Reason + "" }}</td>
        </tr>
      </tbody>
      <tbody v-else-if="dataType == 'tasks'">
        <tr v-for="(item, index) in items" :key="index">
          <td>
            {{ item.Task.TargetName + "" || "" }}
          </td>
          <td>{{ item.Task.SourceName + "" || "" }}</td>
          <td>{{ item.Task.Subject + "" || "" }}</td>
          <td>
            {{ item.Task.Priority + "" || "" }}
          </td>
          <td>{{ formatDate(item.Task.StartDate) + "" || "" }}</td>
          <td>
            {{
              item.Task.State == 1
                ? "Created"
                : item.Task.State == 3
                ? "Pending"
                : item.Task.State == 5
                ? "Completed"
                : item.Task.State == 2
                ? "Assigned"
                : item.Task.State + ""
            }}
          </td>
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
import { TaskService } from "@/service/TaskService";

export default {
  name: "TableComponent",
  props: {
    selectedItem: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      items: [],
      showDialog: false,
      dataType: "vacations", //Default DataType
      loading: false, // Add loading state
      newVacation: {
        EmployeeID: "",
        EmployeeName: "",
        VacationType: "Annual",
        StartAt: "",
        EndAt: "",
        NumberOfDays: 0,
        Reason: "",
      },
      snackbar: {
        show: false,
        message: "",
      },
    };
  },
  watch: {
    selectedItem: {
      immediate: true,
      async handler(newVal) {
        this.loading = true; // Start loading
        console.log("Selected Item:", newVal);
        try {
          if (newVal === "All Vacations") {
            this.dataType = "vacations";
            const response = await VacationService.getAllVacations();
            this.items = response._embedded.Vacations;
          } else if (newVal === "All Tasks") {
            this.dataType = "tasks";
            const response = await TaskService.getAllTasks();
            this.items = response._embedded.AllTasks;
          } else if (newVal == "Personal Tasks") {
            this.dataType = "tasks";
            const response = await TaskService.getPersonalTasks();
            this.items = response._embedded.PersonalTasks;
          } else if (newVal == "Roles Tasks") {
            this.dataType = "tasks";
            const response = await TaskService.getRolesTasks();
            this.items = response._embedded.RolesTasks;
          } else if (newVal == "Teams Tasks") {
            this.dataType = "tasks";
            const response = await TaskService.getTeamTasks();
            this.items = response._embedded.TeamsTasks;
          }
        } catch (error) {
          console.log(`Error fetching the data :: ${error}`);
        } finally {
          this.loading = false;
        }
      },
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    calculateDays() {
      if (this.newVacation.StartAt && this.newVacation.EndAt) {
        const startDate = new Date(this.newVacation.StartAt);
        const endDate = new Date(this.newVacation.EndAt);
        const timeDiff = endDate - startDate;
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        this.newVacation.NumberOfDays = daysDiff + 1; // Include start date
      }
    },
    async refreshVacations() {
      this.loading = true;
      const response = await VacationService.getAllVacations();
      this.items = response._embedded.Vacations;
      this.loading = false;
    },
    showSnackBar(message) {
      this.snackbar.message = message;
      this.snackbar.show = true;
      setTimeout(() => {
        this.snackbar.show = false;
      }, 3000); // Snackbar will disappear after 3 seconds
    },
    async submitVacation() {
      //validation on date before submit
      if (this.newVacation.StartAt < new Date()) {
        alert("Start date cannot be before the current date.");
        return;
      }

      if (this.newVacation.EndAt < new Date()) {
        alert("End date cannot be before the current date.");
        return;
      }

      if (this.newVacation.StartAt >= this.newVacation.EndAt) {
        alert("Start date should be before the end date and not equal.");
        return;
      }
      // Logic to submit the new vacation
      console.log("Submitting vacation:", this.newVacation);
      //create API for create the vacation
      try {
        let response = VacationService.createVacation(this.newVacation);
        console.log(response);
        // After submission, update the vacations array
        await this.refreshVacations();
        // close the dialog
        this.showDialog = false;
        // Show success snackbar
        this.showSnackBar("Vacation created successfully!");
      } catch (error) {
        this.showSnackBar("Error creating vacation. Please try again.");
        console.log("Error submitting vacation:", error);
      }
    },
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50; /* Green background */
  color: white;
  padding: 16px;
  border-radius: 4px;
  font-size: 16px;
  z-index: 10000; /* Make sure it appears on top */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4682b4;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

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
