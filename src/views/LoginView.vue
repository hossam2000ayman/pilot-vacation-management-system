<template>
  <div class="login-container">
    <div class="card p-4 shadow-sm">
      <div class="text-center mb-4">
        <img class="logo" src="@/assets/asset_header_image.png" />
      </div>
      <h5 class="card-title text-center mb-4">Login</h5>
      <form @submit.prevent="defaultLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            id="username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="password"
            required
          />
        </div>
        <div class="form-check mb-3">
          <input type="checkbox" class="form-check-input" id="rememberMe" />
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Signing in..." : "Sign in" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  generateSamlToken,
  loginOTDS,
  getUserDetails,
} from "@/service/authService";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    defaultLogin() {
      if (this.username === "Admin" && this.password === "Asset99a") {
        this.$router.push({ name: "home" }); // Navigate to home page
      } else {
        alert("Invalid login credentials");
        this.username = "";
        this.password = "";
      }
    },

    async handleAPILogin() {
      this.loading = true;
      try {
        let response = await loginOTDS(this.username, this.password);
        if (response.success) {
          response = await generateSamlToken(response.data.ticket);
          if (response.success) {
            response = await getUserDetails(response.data);
            // Assuming the API returns a success flag
            this.$router.push({ name: "home" }); // Navigate to home page
            return;
          } else {
            alert("Failed to generate SAML token");
          }
        } else {
          alert("Invalid login credentials");
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Container with animated gradient background */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    #5baafa,
    #00172e
  ); /* Static Gradient as fallback */
  background-size: 400% 400%; /* Ensures animation covers the entire background */
  animation: gradientAnimation 7s linear infinite;
}

/* Keyframes for gradient animation */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.card {
  width: 300px;
  border-radius: 10px;
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* Slight transparency to blend with the background */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* Subtle shadow for a raised effect */
}

.logo {
  width: 100%;
}

.btn-primary {
  background-color: #2575fc;
  border: none;
}

.btn-primary:hover {
  background-color: #6a11cb;
}
</style>
