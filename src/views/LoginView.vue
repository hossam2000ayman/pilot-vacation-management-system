<template>
  <div class="login-container">
    <div class="card p-4 shadow-sm">
      <div class="text-center mb-4">
        <img class="logo" src="@/assets/asset_header_image.png" />
      </div>
      <h5 class="card-title text-center mb-4">Login</h5>
      <form @submit.prevent="handleAPILogin">
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
import { AuthService } from "@/service/authService.js";

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
        this.$router.replace({ name: "home" }); // Navigate to home page
      } else {
        alert("Invalid login credentials");
        this.username = "";
        this.password = "";
      }
    },

    /*
     On using the API login function it will pass through 3 steps 
    1- login with username and password and return the ticket
    2- Generate a SAML Art by using the ticket
    3- Get user information by using the SAML Art and for any other authorization
    */
    async handleAPILogin() {
      this.loading = true; //tell user that request are processing "Signing in ..."
      try {
        let ticket = await AuthService.loginOTDS(this.username, this.password);
        if (ticket) {
          let samlArt = await AuthService.generateSamlToken(ticket);
          if (samlArt) {
            let userDetails = await AuthService.getUserDetails(samlArt);
            if (userDetails) {
              // Assuming the API returns a success flag
              this.$router.replace({ name: "home" }); // Navigate to home page
              this.loading = false; //end the processing
              return;
            } else {
              alert(
                `Failed to get user details check your response :: ${userDetails}`
              );
            }
          } else {
            alert(
              `Failed to generate SAML token check your response :: ${samlArt} `
            );
          }
        } else {
          alert(`Invalid login credentials check your response :: ${ticket}`);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false; //end the processing
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
  background-size: 400% 400%; /* Start with large background for animation */
  animation: gradientAnimation 4s ease infinite; /* Adjust timing and easing */
}

/* Keyframes for gradient animation with background-size */
@keyframes gradientAnimation {
  0% {
    background-position: 50% 20%;
    background-size: 200% 200%;
  }
  50% {
    background-position: 100% 70%;
    background-size: 100% 100%; /* Shrink background */
  }
  100% {
    background-position: 50% 20%;
    background-size: 200% 200%; /* Reset to original size */
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
  background-color: #3a0a6e;
}
</style>
