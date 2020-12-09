<template>
  <div class="account">
    <!-- Account page... for account stuff... -->
    <div class="w3-top">
      <div class="w3-bar w3-white w3-card" id="myNavbar">
        <a href="" class="w3-bar-item w3-button w3-wide">BROADWAY EXXON AUTO CARE</a>
        <!-- Right-sided navbar links -->
        <div class="w3-right w3-hide-small">
          <a href="#home" class="w3-bar-item w3-button">Your Info</a>
          <a href="#appointments" class="w3-bar-item w3-button">Appointments</a>
          <a href="#customerRecords" class="w3-bar-item w3-button">Records</a>
          <a href="#inventory" class="w3-bar-item w3-button">Inventory</a>
          <a href="#employees" class="w3-bar-item w3-button" v-if="user.privilege === 'Admin'">{{ user.privilege }} Management</a>
          <a to="/logout" class="w3-bar-item w3-button" @click.prevent="logoutUser">Logout</a>
        </div>
        <!-- Hide right-floated links on small screens and replace them with a menu icon -->
        <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="w3_open()">
          <i class="fa fa-bars"></i>
        </a>
      </div>
    </div>

    <div class="w3-container w3-light-grey" style="padding:128px 16px" id="home">
      <h2 class="w3-center">Your Account</h2>
      <h3>Account Information</h3>
        <p class="w3-large">First Name</p>
        <p>{{ user.firstname }}</p>
        <p class="w3-large">Last Name</p>
        <p>{{ user.lastname }}</p>
        <p class="w3-large">Email Address</p>
        <p>{{ user.email }}</p>
        <p class="w3-large">Phone Number</p>
        <p>{{ user.phone }}</p>
        <p class="w3-large">Role</p>
        <p>{{ user.privilege }}</p>
    </div>
    <Appointments/>
    <CustomerRecords/>
    <Inventory/>
    <div v-if="user.privilege === 'Admin'">{{ user.privilege }}
      <Employees/>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import Appointments from "@/components/Appointments";
import CustomerRecords from "@/components/CustomerRecords";
import Inventory from "@/components/Inventory";
import Employees from "@/components/Employees";
import TheFooter from "@/components/TheFooter";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Account',
  components: {
    Appointments,
    CustomerRecords,
    Inventory,
    Employees,
    TheFooter
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
    ...mapActions(["getAccount"])
  },
  created() {
    this.getAccount();
  }
}
</script>

<style>

</style>