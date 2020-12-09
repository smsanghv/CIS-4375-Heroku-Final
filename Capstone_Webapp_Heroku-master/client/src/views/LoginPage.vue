<template>
<!-- Dedicated login in page for employees and !isLoggedIn redirect from /account-->
  <div class="login">
  <div class="w3-container w3-light-grey" style="padding:128px 16px" id="login">
    <h3 class="w3-center">EMPLOYEE LOG IN ONLY</h3>
    <p class="w3-center w3-large">Log in here:</p>
      <div style="margin-top:48px">
        <form @submit.prevent="loginUser">
          <p><input 
            class="w3-input w3-border" 
            type="text" 
            placeholder="Email" 
            required 
            name="email" 
            v-model="email"></p>
          <p><input 
            class="w3-input w3-border" 
            type="password" 
            placeholder="Password" 
            required 
            name="password" 
            id="password" 
            v-model="password"></p>
          <p>
            <button class="w3-button w3-black" type="submit">
              <i class="fa fa-paper-plane"></i> LOG IN
            </button>
          </p>
        </form>
      </div>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter";
import { mapActions } from "vuex";
export default {
  name: 'Login',
  components: {
    TheFooter
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        email: this.email,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/account");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style>

</style>