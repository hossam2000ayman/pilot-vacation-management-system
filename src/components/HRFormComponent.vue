<template>
  <!-- Snackbar -->
  <div v-if="snackbar.show" class="snackbar">{{ snackbar.message }}</div>

  <div class="hr-form-container">
    <form>
      <label class="form-label left-align-label" for="EmployeeID"
        >Employee ID:</label
      >
      <input
        type="text"
        class="form-control"
        id="employeeId"
        v-model="form.EmployeeID"
        readonly
      />

      <label class="form-label left-align-label" for="EmployeeName"
        >Employee Name:</label
      >
      <input
        type="text"
        class="form-control"
        id="employeeName"
        v-model="form.EmployeeName"
        readonly
      />

      <label class="form-label left-align-label" for="StartAt">Start At:</label>
      <input
        type="text"
        class="form-control"
        id="startAt"
        v-model="form.StartAt"
        readonly
      />

      <label class="form-label left-align-label" for="EndAt">End At:</label>
      <input
        type="text"
        class="form-control"
        id="endAt"
        v-model="form.EndAt"
        readonly
      />

      <label class="form-label left-align-label" for="NumberOfDays"
        >Number Of Days:</label
      >
      <input
        type="text"
        class="form-control"
        id="numberOfDays"
        v-model="form.NumberOfDays"
        readonly
      />

      <label class="form-label left-align-label" for="Reason">Reason:</label>
      <textarea
        type="text"
        class="form-control"
        id="reason"
        v-model="form.Reason"
        readonly
      />
      <label for="vacationType" class="form-label left-align-label"
        >Vacation Type:
      </label>
      <input
        type="text"
        class="form-control"
        id="vacationType"
        v-model="form.VacationType"
        readonly
      />
      <div v-if="form.HRApproval == 'Approve' || form.HRApproval == 'Reject'">
        <h2 class="font-impact m-4">
          {{ form.HRApproval }}
        </h2>
      </div>

      <div v-else-if="form.HRApproval == 'Pending'">
        <button
          type="button"
          @click="submitDecision('Approve')"
          class="btn btn-outline-success m-3"
        >
          Approve
        </button>
        <button
          type="button"
          @click="submitDecision('Reject')"
          class="btn btn-outline-danger m-3"
        >
          Reject
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { TaskService } from "@/service/TaskService";

export default {
  name: "HRFormComponent",
  props: {
    vacation: Object,
  },
  data() {
    return {
      form: {
        EmployeeID: "",
        EmployeeName: "",
        EndAt: "",
        NumberOfDays: "",
        Reason: "",
        StartAt: "",
        VacationType: "",
        HRApproval: "",
      },
      snackbar: {
        show: false,
        message: "",
      },
    };
  },
  watch: {
    vacation: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal.Properties }; // Populate form with vacation data
          this.form.StartAt = this.formatDate(this.form.StartAt);
          this.form.EndAt = this.formatDate(this.form.EndAt);
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
    submitDecision(decision) {
      if (decision == "Approve") {
        this.form.HRApproval = "Approve";
        console.log("Approve taken to this Form :: ");
      } else if (decision == "Reject") {
        this.form.HRApproval = "Reject";
        console.log("Reject taken to this Form :: ");
      }
      console.log("Form submitted:", this.form);
      console.log("Decision taken is ::", decision);
      //1- Claim Action
      TaskService.claimTaskByTaskInstanceAndTarget();
      //2- Update the vacation status to approved
      this.$emit("update-decision", this.form.HRApproval); // Emit an event to update the decision state
      this.showSnackBar(
        `Your decision is ${this.form.HRApproval}ed Successfully :: `
      );
    },

    showSnackBar(message) {
      this.snackbar.message = message;
      this.snackbar.show = true;
      setTimeout(() => {
        this.snackbar.show = false;
      }, 3000); // Snackbar will disappear after 3 seconds
    },
  },
};
</script>

<style scoped>
.font-impact {
  font-family: Impact;
}
.hr-form-container {
  background-color: #f0f8ff;
  height: 85vh;
  padding: 20px;
  color: black;
  width: 450px;
}

.left-align-label {
  width: 100%;
  text-align: left;
}
</style>
