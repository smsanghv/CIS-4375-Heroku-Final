<template>
<!-- Complete SPA CRUD for appointments in database -->
  <div class="w3-container w3-light-grey" style="padding:128px 16px" id="appointments">
    <div class="row">
      <div class="col-sm-10">
        <h2 class="w3-center">Customer Appointments</h2>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.Appointment-modal>Set Up New Appointment</button>
        <button type="button" class="btn btn-primary btn-sm" style="margin:5px;" @click="downloadPDF">Download PDF</button>
        <br><br>
        <input class="form-control" id="appSearch" type="text" placeholder="Search">
        <table id="thisAppTable" class="table table-hover">
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
              <th scope="col" @click="sort('appointmentdate')">Date</th>
              <th scope="col" @click="sort('appointmenttime')">Time</th>
              <th scope="col" @click="sort('vehicleMake')">Vehicle Make</th>
              <th scope="col" @click="sort('vehicleModel')">Vehicle Model</th>
              <th scope="col">Appointment Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="appTable">
            <tr v-for="Appointment in sortedAppointments" :key="Appointment._id">
              <td>{{ Appointment.firstname }}</td>
              <td>{{ Appointment.lastname }}</td>
              <td>{{ Appointment.email }}</td>
              <td>{{ Appointment.phone }}</td>
              <td>{{ Appointment.address }}</td>
              <td>{{ Appointment.city }}</td>
              <td>{{ Appointment.state }}</td>
              <td>{{ Appointment.zip }}</td>
              <td>{{ Appointment.appointmentdate }}</td>
              <td>{{ Appointment.appointmenttime }}</td>
              <td>{{ Appointment.vehicleMake }}</td>
              <td>{{ Appointment.vehicleModel }}</td>
              <td>{{ Appointment.description }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.Appointment-update-modal
                          @click="editAppointment(Appointment)">
                      Edit
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteAppointment(Appointment)">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <button type="button" class="btn btn-info btn-sm" @click="prevPage">Previous</button> 
          <button type="button" class="btn btn-info btn-sm" style="margin:5px;" @click="nextPage">Next</button>
        </p>
      </div>
    </div>
    <b-modal ref="addAppointmentModal"
            id="Appointment-modal"
            title="Create a new appointment"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-firstname-group"
                    label="First Name:"
                    label-for="form-firstname-input">
          <b-form-input id="form-firstname-input"
                        type="text"
                        v-model="addAppointmentForm.firstname"
                        required
                        placeholder="Enter first name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-lastname-group"
                    label="Last Name:"
                    label-for="form-lastname-input">
          <b-form-input id="form-lastname-input"
                        type="text"
                        v-model="addAppointmentForm.lastname"
                        required
                        placeholder="Enter last name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-email-group"
                      label="Email:"
                      label-for="form-email-input">
            <b-form-input id="form-email-input"
                          type="text"
                          v-model="addAppointmentForm.email"
                          required
                          placeholder="Enter email">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-phone-group"
                    label="Phone Number:"
                    label-for="form-phone-input">
          <b-form-input id="form-phone-input"
                        type="text"
                        v-model="addAppointmentForm.phone"
                        required
                        placeholder="Enter phone number">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-address-group"
                    label="Street Address:"
                    label-for="form-address-input">
          <b-form-input id="form-address-input"
                        type="text"
                        v-model="addAppointmentForm.address"
                        required
                        placeholder="Enter street address">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-city-group"
                    label="City:"
                    label-for="form-city-input">
          <b-form-input id="form-city-input"
                        type="text"
                        v-model="addAppointmentForm.city"
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
                        v-model="addAppointmentForm.state"
                        required>
          </b-form-select>
        </b-form-group>
        <b-form-group id="form-zip-group"
                    label="Zip code:"
                    label-for="form-zip-input">
          <b-form-input id="form-zip-input"
                        type="text"
                        v-model="addAppointmentForm.zip"
                        required
                        placeholder="Enter zip code">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-appointmentdate-group"
                    label="Appointment Date:"
                    label-for="form-appointmentdate-input">
          <b-form-input id="form-appointmentdate-input"
                        type="date"
                        v-model="addAppointmentForm.appointmentdate"
                        required
                        placeholder="Enter appointment date">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-appointmenttime-group"
                    label="Appointment Time:"
                    label-for="form-appointmenttime-input">
          <b-form-input id="form-appointmenttime-input"
                        type="time"
                        v-model="addAppointmentForm.appointmenttime"
                        required
                        placeholder="Enter appointment time">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-vehicleMake-group"
                    label="Vehicle Make:"
                    label-for="form-vehicleMake-input">
          <b-form-input id="form-vehicleMake-input"
                        type="text"
                        v-model="addAppointmentForm.vehicleMake"
                        required
                        placeholder="Enter vehicle make">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-vehicleModel-group"
                    label="Vehicle Model:"
                    label-for="form-vehicleModel-input">
          <b-form-input id="form-vehicleModel-input"
                        type="text"
                        v-model="addAppointmentForm.vehicleModel"
                        required
                        placeholder="Enter vehicle model">
          </b-form-input>
        </b-form-group>
          <b-form-group id="form-description-group"
                      label="Appointment Details:"
                      label-for="form-description-input">
            <b-form-input id="form-description-input"
                          type="text"
                          v-model="addAppointmentForm.description"
                          required
                          placeholder="Enter details of appointment">
            </b-form-input>
          </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="editAppointmentModal"
            id="Appointment-update-modal"
            title="Edit Exxon appointment"
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
          <b-form-group id="form-phone-edit-group"
                      label="Phone Number:"
                      label-for="form-phone-edit-input">
            <b-form-input id="form-phone-edit-input"
                          type="tel"
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
          <b-form-group id="form-appointmentdate-edit-group"
                      label="Appointment Date:"
                      label-for="form-appointmentdate-edit-input">
            <b-form-input id="form-appointmentdate-edit-input"
                          type="date"
                          v-model="editForm.appointmentdate"
                          required
                          placeholder="Enter appointment date">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-appointmenttime-edit-group"
                      label="Appointment Time:"
                      label-for="form-appointmenttime-edit-input">
            <b-form-input id="form-appointmenttime-edit-input"
                          type="time"
                          v-model="editForm.appointmenttime"
                          required
                          placeholder="Enter appointment time">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-vehicleMake-edit-group"
                      label="Vehice Make:"
                      label-for="form-vehicleMake-edit-input">
            <b-form-input id="form-email-vehicleMake-input"
                          type="text"
                          v-model="editForm.vehicleMake"
                          required
                          placeholder="Enter vehicle make">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-vehicleModel-edit-group"
                      label="Vehicle Model:"
                      label-for="form-vehicleModel-edit-input">
            <b-form-input id="form-vehicleModel-edit-input"
                          type="text"
                          v-model="editForm.vehicleModel"
                          required
                          placeholder="Enter vehicle model">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-description-edit-group"
                      label="Appointment Details:"
                      label-for="form-description-edit-input">
            <b-form-input id="form-description-edit-input"
                          type="text"
                          v-model="editForm.description"
                          required
                          placeholder="Enter details of appointment">
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

$(document).ready(function(){
  $("#appSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#appTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

export default {
  data() {
    return {
      Appointments: [],
      addAppointmentForm: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        appointmentdate: '',
        appointmenttime: '',
        vehicleMake: '',
        vehicleModel: '',
        description: '',
      },
      message: '',
      showMessage: false,
      editForm: {
        _id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        appointmentdate: '',
        appointmenttime: '',
        vehicleMake: '',
        vehicleModel: '',
        description: '',
      },
      currentSort:'firstname',
      currentSortDir:'asc',
      pageSize:10,
      currentPage:1,
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
      ]
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getAppointments() {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/appointment/getallappointments';
      axios.get(path)
        .then((res) => {
          this.Appointments = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addAppointment(payload) {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/appointment/createappointment';
      axios.post(path, payload)
        .then(() => {
          this.getAppointments();
          this.message = 'Appointment created!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getAppointments();
        });
    },
    initForm() {
      this.addAppointmentForm.firstname = '';
      this.addAppointmentForm.lastname = '';
      this.addAppointmentForm.email = '';
      this.addAppointmentForm.phone = '';
      this.addAppointmentForm.address = '';
      this.addAppointmentForm.city = '';
      this.addAppointmentForm.state = '';
      this.addAppointmentForm.zip = '';
      this.addAppointmentForm.appointmentdate = '';
      this.addAppointmentForm.appointmenttime = '';
      this.addAppointmentForm.vehicleMake = '';
      this.addAppointmentForm.vehicleModel = '';
      this.addAppointmentForm.description = '';
      this.editForm._id = '';
      this.editForm.firstname = '';
      this.editForm.lastname = '';
      this.editForm.email = '';
      this.editForm.phone = '';
      this.editForm.address = '';
      this.editForm.city = '';
      this.editForm.state = '';
      this.editForm.zip = '';
      this.editForm.appointmentdate = '';
      this.editForm.appointmenttime = '';
      this.editForm.vehicleMake = '';
      this.editForm.vehicleModel = '';
      this.editForm.description = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addAppointmentModal.hide();
      //let read = false;
      //if (this.addAppointmentForm.read[0]) read = true;
      const payload = {
        firstname: this.addAppointmentForm.firstname,
        lastname: this.addAppointmentForm.lastname,
        email: this.addAppointmentForm.email,
        phone: this.addAppointmentForm.phone,
        address: this.addAppointmentForm.address,
        city: this.addAppointmentForm.city,
        state: this.addAppointmentForm.state,
        zip: this.addAppointmentForm.zip,
        appointmentdate: this.addAppointmentForm.appointmentdate,
        appointmenttime: this.addAppointmentForm.appointmenttime,
        vehicleMake: this.addAppointmentForm.vehicleMake,
        vehicleModel: this.addAppointmentForm.vehicleModel,
        description: this.addAppointmentForm.description,
      };
      this.addAppointment(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addAppointmentModal.hide();
      this.initForm();
    },
    editAppointment(Appointment) {
      this.editForm = Appointment;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editAppointmentModal.hide();
      //let read = false;
      //if (this.editForm.read[0]) read = true;
      const payload = {
        firstname: this.editForm.firstname,
        lastname: this.editForm.lastname,
        email: this.editForm.email,
        phone: this.editForm.phone,
        address: this.editForm.address,
        city: this.editForm.city,
        state: this.editForm.state,
        zip: this.editForm.zip,
        appointmentdate: this.editForm.appointmentdate,
        appointmenttime: this.editForm.appointmenttime,
        vehicleMake: this.editForm.vehicleMake,
        vehicleModel: this.editForm.vehicleModel,
        description: this.editForm.description,
      };
      this.updateAppointment(payload, this.editForm._id);
    },
    updateAppointment(payload, AppointmentID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/appointment/updateappointment/${AppointmentID}`;
      axios.put(path, payload)
        .then(() => {
          this.getAppointments();
          this.message = 'Appointment updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getAppointments();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editAppointmentModal.hide();
      this.initForm();
      this.getAppointments();
    },
    removeAppointment(AppointmentID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/appointment/deleteappointment/${AppointmentID}`;
      axios.delete(path)
        .then(() => {
          this.getAppointments();
          this.message = 'Appointment deleted!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getAppointments();
        });
    },
    onDeleteAppointment(Appointment) {
      this.removeAppointment(Appointment._id);
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.Appointments.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    downloadPDF() {
      var pdfsize = 'a0';
      const doc = new jsPDF('l', 'pt', pdfsize)
      autoTable(doc, { html: '#thisAppTable', theme: 'grid', startY: 60, styles: { overflow: 'linebreak', fontSize: 25, cellWidth: 'wrap' }, columnStyles: { 2: { columnWidth: 'auto' }} })
      doc.save(pdfsize + 'appointments_table.pdf')
    }
  },
  created() {
    this.getAppointments();
  },
  computed: {
    sortedAppointments:function() {
      return this.Appointments.slice(0).sort((a,b) => {
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