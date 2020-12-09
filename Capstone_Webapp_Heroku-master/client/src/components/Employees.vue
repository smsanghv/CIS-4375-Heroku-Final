<template >
<!-- Complete SPA CRUD for employee accounts in database -->
  <div class="w3-container w3-light-grey" style="padding:128px 16px" id="employees">
    <div class="row">
      <div class="col-sm-10">
        <h2 class="w3-center">Employee Management</h2>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.User-modal>Set Up New Employee</button>
        <button type="button" class="btn btn-primary btn-sm" style="margin:5px;" @click="downloadPDF">Download PDF</button>
        <br><br>
        <input class="form-control" id="empSearch" type="text" placeholder="Search">
        <table id="thisEmpTable" class="table table-hover">
          <thead>
            <tr>
              <th scope="col" @click="sort('firstname')">First Name</th>
              <th scope="col" @click="sort('lastname')">Last Name</th>
              <th scope="col" @click="sort('email')">Email</th>
              <th scope="col" @click="sort('phone')">Phone Number</th>
              <th scope="col" @click="sort('address')">Street Address</th>
              <th scope="col" @click="sort('city')">City</th>
              <th scope="col" @click="sort('state')">State</th>
              <th scope="col" @click="sort('zip')">Zip Code</th>
              <th scope="col" @click="sort('privilege')">Privilege</th>
              <th scope="col">Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="empTable">
            <tr v-for="User in sortedUsers" :key="User._id">
              <td>{{ User.firstname }}</td>
              <td>{{ User.lastname }}</td>
              <td>{{ User.email }}</td>
              <td>{{ User.phone }}</td>
              <td>{{ User.address }}</td>
              <td>{{ User.city }}</td>
              <td>{{ User.state }}</td>
              <td>{{ User.zip }}</td>
              <td>{{ User.privilege }}</td>
              <td>{{ User.notes }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.User-update-modal
                          @click="editUser(User)">
                      Edit
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteUser(User)">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal ref="addUserModal"
            id="User-modal"
            title="Create a new User"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-firstname-group"
                    label="First Name:"
                    label-for="form-firstname-input">
          <b-form-input id="form-firstname-input"
                        type="text"
                        v-model="addUserForm.firstname"
                        required
                        placeholder="Enter first name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-lastname-group"
                    label="Last Name:"
                    label-for="form-lastname-input">
          <b-form-input id="form-lastname-input"
                        type="text"
                        v-model="addUserForm.lastname"
                        required
                        placeholder="Enter last name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-email-group"
                      label="Email:"
                      label-for="form-email-input">
            <b-form-input id="form-email-input"
                          type="text"
                          v-model="addUserForm.email"
                          required
                          placeholder="Enter email">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-password-group"
                      label="Password:"
                      label-for="form-password-input">
            <b-form-input id="form-password-input"
                          type="password"
                          v-model="addUserForm.password"
                          required
                          placeholder="Enter password">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-confirmpassword-group"
                      label="Confirm password:"
                      label-for="form-confirmpassword-input">
            <b-form-input id="form-confirmpassword-input"
                          type="password"
                          v-model="addUserForm.confirm_password"
                          required
                          placeholder="Confirm password">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-phone-group"
                    label="Phone Number:"
                    label-for="form-phone-input">
          <b-form-input id="form-phone-input"
                        type="text"
                        v-model="addUserForm.phone"
                        required
                        placeholder="Enter phone number">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-address-group"
                    label="Street Address:"
                    label-for="form-address-input">
          <b-form-input id="form-address-input"
                        type="text"
                        v-model="addUserForm.address"
                        required
                        placeholder="Enter street address">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-city-group"
                    label="City:"
                    label-for="form-city-input">
          <b-form-input id="form-city-input"
                        type="text"
                        v-model="addUserForm.city"
                        required
                        placeholder="Enter city">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-state-group"
                    label="State:"
                    label-for="form-state-input">
          <b-form-select id="form-state-input"
                        type="text"
                        :options="stateOptions"
                        v-model="addUserForm.state"
                        required>
          </b-form-select>
        </b-form-group>
        <b-form-group id="form-zip-group"
                    label="Zip code:"
                    label-for="form-zip-input">
          <b-form-input id="form-zip-input"
                        type="text"
                        v-model="addUserForm.zip"
                        required
                        placeholder="Enter zip code">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-privilege-group"
                    label="Privilege:"
                    label-for="form-privilege-input">
          <b-form-select id="form-privilege-input"
                        type="text"
                        :options="privOptions"
                        v-model="addUserForm.privilege"
                        required>
          </b-form-select>
        </b-form-group>
          <b-form-group id="form-notes-group"
                      label="Notes:"
                      label-for="form-notes-input">
            <b-form-input id="form-notes-input"
                          type="text"
                          v-model="addUserForm.notes"
                          placeholder="Enter notes">
            </b-form-input>
          </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="editUserModal"
            id="User-update-modal"
            title="Edit Exxon User"
            hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
      <b-form-group id="form-firstname-edit-group"
                    label="First Name:"
                    label-for="form-firstname-edit-input">
          <b-form-input id="form-firstname-edit-input"
                        type="text"
                        v-model="editForm.firstname"
                        required
                        placeholder="Enter first name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-lastname-edit-group"
                    label="Last Name:"
                    label-for="form-lastname-edit-input">
          <b-form-input id="form-lastname-edit-input"
                        type="text"
                        v-model="editForm.lastname"
                        required
                        placeholder="Enter last name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-email-edit-group"
                      label="Email:"
                      label-for="form-email-edit-input">
            <b-form-input id="form-email-edit-input"
                          type="text"
                          v-model="editForm.email"
                          required
                          placeholder="Enter email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-password-edit-group"
                      label="Password:"
                      label-for="form-password-edit-input">
            <b-form-input id="form-password-edit-input"
                          type="password"
                          v-model="editForm.password"
                          required
                          placeholder="Enter password">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-phone-edit-group"
                      label="Phone Number:"
                      label-for="form-phone-edit-input">
            <b-form-input id="form-phone-edit-input"
                          type="text"
                          v-model="editForm.phone"
                          required
                          placeholder="Enter phone number">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-address-edit-group"
                      label="Street Address:"
                      label-for="form-address-edit-input">
            <b-form-input id="form-address-edit-input"
                          type="text"
                          v-model="editForm.address"
                          required
                          placeholder="Enter street address">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-city-edit-group"
                      label="City:"
                      label-for="form-city-edit-input">
            <b-form-input id="form-city-edit-input"
                          type="text"
                          v-model="editForm.city"
                          required
                          placeholder="Enter city">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-state-edit-group"
                      label="State:"
                      label-for="form-state-edit-input">
            <b-form-input id="form-state-edit-input"
                          type="text"
                          v-model="editForm.state"
                          required
                          placeholder="Enter state">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-zip-edit-group"
                      label="Zip Code:"
                      label-for="form-zip-edit-input">
            <b-form-input id="form-zip-edit-input"
                          type="text"
                          v-model="editForm.zip"
                          required
                          placeholder="Enter zip code">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-privilege-edit-group"
                      label="Privilege:"
                      label-for="form-privilege-edit-input">
            <b-form-input id="form-email-privilege-input"
                          type="text"
                          v-model="editForm.privilege"
                          required
                          placeholder="Enter privilege">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-notes-edit-group"
                      label="Notes:"
                      label-for="form-notes-edit-input">
            <b-form-input id="form-notes-edit-input"
                          type="text"
                          v-model="editForm.notes"
                          required
                          placeholder="Enter notes">
            </b-form-input>
          </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';
import $ from 'jquery';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

//Jquery search bar for searching da table
$(document).ready(function(){
  $("#empSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#empTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

export default {
  data() {
    return {
      Users: [],
      addUserForm: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        privilege: '',
        notes: '',
      },
      message: '',
      showMessage: false,
      editForm: {
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        privilege: '',
        notes: '',
      },
      currentSort:'firstname',
      currentSortDir:'asc',
      stateOptions: [
        {value: 'Alabama', text: 'Alabama' },
        {value: 'Alaska', text: 'Alaska' },
        {value: 'Arizona', text: 'Arizona' },
        {value: 'Arkansas', text: 'Arkansas' },
        {value: 'California', text: 'California' },
        {value: 'Colorado', text: 'Colorado' },
        {value: 'Conneticut', text: 'Conneticut' },
        {value: 'Delaware', text: 'Delaware' },
        {value: 'Florida', text: 'Florida' },
        {value: 'Georgia', text: 'Georgia' },
        {value: 'Hawaii', text: 'Hawaii' },
        {value: 'Idaho', text: 'Idaho' },
        {value: 'Illinois', text: 'Illinois' },
        {value: 'Indiana', text: 'Indiana' },
        {value: 'Iowa', text: 'Iowa' },
        {value: 'Kansas', text: 'Kansas' },
        {value: 'Kentucky', text: 'Kentucky' },
        {value: 'Louisiana', text: 'Louisiana' },
        {value: 'Maine', text: 'Maine' },
        {value: 'Maryland', text: 'Maryland' },
        {value: 'Massachusetts', text: 'Massachusetts' },
        {value: 'Michigan', text: 'Michigan' },
        {value: 'Minnesota', text: 'Minnesota' },
        {value: 'Mississippi', text: 'Mississippi' },
        {value: 'Missouri', text: 'Missouri' },
        {value: 'Montana', text: 'Montana' },
        {value: 'Nebraska', text: 'Nebraska' },
        {value: 'Nevada', text: 'Nevada' },
        {value: 'New Hamshire', text: 'New Hamshire' },
        {value: 'New Jersey', text: 'New Jersey' },
        {value: 'New Mexico', text: 'New Mexico' },
        {value: 'New York', text: 'New York' },
        {value: 'North Carolina', text: 'North Carolina' },
        {value: 'North Dakota', text: 'North Dakota' },
        {value: 'Ohio', text: 'Ohio' },
        {value: 'Oklahoma', text: 'Oklahoma' },
        {value: 'Oregon', text: 'Oregon' },
        {value: 'Pennsylvania', text: 'Pennsylvania' },
        {value: 'Rhode Island', text: 'Rhode Island' },
        {value: 'South Carolina', text: 'South Carolina' },
        {value: 'South Dakota', text: 'South Dakota' },
        {value: 'Tennessee', text: 'Tennessee' },
        {value: 'Texas', text: 'Texas' },
        {value: 'Utah', text: 'Utah' },
        {value: 'Vermont', text: 'Vermont' },
        {value: 'Viginia', text: 'Viginia' },
        {value: 'Washington', text: 'Washington' },
        {value: 'West Virginia', text: 'West Virginia' },
        {value: 'Wisconsin', text: 'Wisconsin' },
        {value: 'Wyoming', text: 'Wyoming' }
      ],
      privOptions : [
        {value: 'Admin', text: 'Admin'},
        {value: 'Employee', text: 'Employee'}
      ]
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getUsers() {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/user/getallusers';
      axios.get(path)
        .then((res) => {
          this.Users = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addUser(payload) {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/user/register';
      axios.post(path, payload)
        .then(() => {
          this.getUsers();
          this.message = 'User created!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getUsers();
        });
    },
    initForm() {
      this.addUserForm.firstname = '';
      this.addUserForm.lastname = '';
      this.addUserForm.email = '';
      this.addUserForm.password = '';
      this.addUserForm.confirm_password = '';
      this.addUserForm.phone = '';
      this.addUserForm.address = '';
      this.addUserForm.city = '';
      this.addUserForm.state = '';
      this.addUserForm.zip = '';
      this.addUserForm.privilege = '';
      this.addUserForm.notes = '';
      this.editForm._id = '';
      this.editForm.firstname = '';
      this.editForm.laststname = '';
      this.editForm.email = '';
      this.editForm.password = '';
      this.editForm.confirm_password = '';
      this.editForm.phone = '';
      this.editForm.address = '';
      this.editForm.city = '';
      this.editForm.state = '';
      this.editForm.zip = '';
      this.editForm.privilege = '';
      this.editForm.notes = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addUserModal.hide();
      //let read = false;
      //if (this.addUserForm.read[0]) read = true;
      const payload = {
        firstname: this.addUserForm.firstname,
        lastname: this.addUserForm.lastname,
        email: this.addUserForm.email,
        password: this.addUserForm.password,
        confirm_password: this.addUserForm.confirm_password,
        phone: this.addUserForm.phone,
        address: this.addUserForm.address,
        city: this.addUserForm.city,
        state: this.addUserForm.state,
        zip: this.addUserForm.zip,
        privilege: this.addUserForm.privilege,
        notes: this.addUserForm.notes,
      };
      this.addUser(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addUserModal.hide();
      this.initForm();
    },
    editUser(User) {
      this.editForm = User;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editUserModal.hide();
      //let read = false;
      //if (this.editForm.read[0]) read = true;
      const payload = {
        firstname: this.editForm.firstname,
        lastname: this.editForm.lastname,
        email: this.editForm.email,
        password: this.editForm.password,
        confirm_password: this.editForm.confirm_password,
        phone: this.editForm.phone,
        address: this.editForm.address,
        city: this.editForm.city,
        state: this.editForm.state,
        zip: this.editForm.zip,
        privilege: this.editForm.privilege,
        notes: this.editForm.notes,
      };
      this.updateUser(payload, this.editForm._id);
    },
    updateUser(payload, UserID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/user/updateuser/${UserID}`;
      axios.put(path, payload)
        .then(() => {
          this.getUsers();
          this.message = 'User updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getUsers();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editUserModal.hide();
      this.initForm();
      this.getUsers();
    },
    removeUser(UserID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/user/deleteuser/${UserID}`;
      axios.delete(path)
        .then(() => {
          this.getUsers();
          this.message = 'User deleted!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getUsers();
        });
    },
    onDeleteUser(User) {
      this.removeUser(User._id);
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    downloadPDF() {
      const doc = new jsPDF()
      autoTable(doc, { html: '#thisEmpTable', theme: 'grid' })
      doc.save('employees_table.pdf')
    }
  },
  created() {
    this.getUsers();
  },
  computed: {
    sortedUsers:function() {
      return this.Users.slice(0).sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  },
};
</script>