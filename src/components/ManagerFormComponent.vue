<template>
  <div class="manager-form-container">
    <form>
      <label class="form-label left-align-label" for="name">Name:</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="form.name"
        readonly
      />

      <label class="form-label left-align-label" for="position"
        >Position:</label
      >
      <input
        type="text"
        class="form-control"
        id="position"
        v-model="form.position"
        readonly
      />

      <label class="form-label left-align-label" for="department"
        >Department:</label
      >
      <input
        type="text"
        class="form-control"
        id="department"
        v-model="form.department"
        readonly
      />

      <label for="vacationType" class="form-label left-align-label"
        >Vacation Type:
      </label>
      <select class="form-select" id="vacationType">
        <option>Annual</option>
        <option>UnPaid</option>
        <option>Sick</option>
      </select>

      <div v-if="!localMakeDecision">
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
      <div v-if="localMakeDecision">
        <h2 class="font-impact m-4">
          {{ finalDecision }}
        </h2>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ManagerFormComponent",
  props: {
    manager: Object,
    makeDecision: Boolean,
  },
  data() {
    return {
      form: {
        name: "",
        position: "",
        department: "",
      },
      localMakeDecision: this.makeDecision,
      finalDecision: "",
    };
  },
  watch: {
    manager: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal }; // Populate form with manager data
        }
      },
    },
    makeDecision: {
      immediate: true,
      handler(newVal) {
        this.localMakeDecision = newVal;
      },
    },
  },
  methods: {
    submitDecision(decision) {
      // Replace this with your form submission logic
      console.log("Form submitted:", this.form);
      console.log("Decision taken is ::", decision);

      if (decision === "Approve") {
        this.finalDecision = "APPROVED";
        // Call API related to approve
      } else if (decision === "Reject") {
        this.finalDecision = "REJECTED";
        // Call API related to reject
      }

      this.localMakeDecision = true;
      this.$emit("update-decision", this.localMakeDecision); // Emit an event to update the decision state
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: "",
        position: "",
        department: "",
      };
      this.$emit("form-submitted", this.form);
    },
  },
};
</script>

<style scoped>
.font-impact {
  font-family: Impact;
}
.manager-form-container {
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
