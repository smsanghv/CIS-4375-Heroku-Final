<template>
<!-- Complete SPA CRUD for customer records in database -->
  <div class="w3-container w3-light-grey" style="padding:128px 16px" id="customerRecords">
    <div class="row">
      <div class="col-sm-10">
        <h2 class="w3-center">Customer Records</h2>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.customerRecord-modal>Set Up New Customer Record</button>
        <button type="button" class="btn btn-primary btn-sm" style="margin:5px;" @click="downloadPDF">Download PDF</button>
        <br><br>
        <input class="form-control" id="custSearch" type="text" placeholder="Search">
        <table id="thisCustTable" class="table table-hover">
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
              <th scope="col" @click="sort('vehicleMake')">Vehicle Make</th>
              <th scope="col" @click="sort('vehicleModel')">Vehicle Model</th>
              <th scope="col" @click="sort('vehicleyear')">Vehicle Year</th>
              <th scope="col" @click="sort('liscenseplate')">License Plate</th>
              <th scope="col">Vehicle History</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="custTable">
            <tr v-for="customerRecord in sortedCustomerRecords" :key="customerRecord._id">
              <td>{{ customerRecord.firstname }}</td>
              <td>{{ customerRecord.lastname }}</td>
              <td>{{ customerRecord.email }}</td>
              <td>{{ customerRecord.phone }}</td>
              <td>{{ customerRecord.address }}</td>
              <td>{{ customerRecord.city }}</td>
              <td>{{ customerRecord.state }}</td>
              <td>{{ customerRecord.zip }}</td>
              <td>{{ customerRecord.vehiclemake }}</td>
              <td>{{ customerRecord.vehiclemodel }}</td>
              <td>{{ customerRecord.vehicleyear }}</td>
              <td>{{ customerRecord.licenseplate }}</td>
              <td>{{ customerRecord.history }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.customerRecord-update-modal
                          @click="editCustomerRecord(customerRecord)">
                      Edit
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteCustomerRecord(customerRecord)">
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
    <b-modal ref="addCustomerRecordModal"
            id="customerRecord-modal"
            title="Create a new customer record"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-firstname-group"
                    label="First Name:"
                    label-for="form-firstname-input">
          <b-form-input id="form-firstname-input"
                        type="text"
                        v-model="addCustomerRecordForm.firstname"
                        required
                        placeholder="Enter first name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-lastname-group"
                    label="Last Name:"
                    label-for="form-lastname-input">
          <b-form-input id="form-lastname-input"
                        type="text"
                        v-model="addCustomerRecordForm.lastname"
                        required
                        placeholder="Enter last name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-email-group"
                      label="Email:"
                      label-for="form-email-input">
            <b-form-input id="form-email-input"
                          type="text"
                          v-model="addCustomerRecordForm.email"
                          required
                          placeholder="Enter email">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-phone-group"
                    label="Phone Number:"
                    label-for="form-phone-input">
          <b-form-input id="form-phone-input"
                        type="text"
                        v-model="addCustomerRecordForm.phone"
                        required
                        placeholder="Enter phone number">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-address-group"
                    label="Street Address:"
                    label-for="form-address-input">
          <b-form-input id="form-address-input"
                        type="text"
                        v-model="addCustomerRecordForm.address"
                        required
                        placeholder="Enter street address">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-city-group"
                    label="City:"
                    label-for="form-city-input">
          <b-form-input id="form-city-input"
                        type="text"
                        v-model="addCustomerRecordForm.city"
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
                        v-model="addCustomerRecordForm.state"
                        required>
          </b-form-select>
        </b-form-group>
        <b-form-group id="form-zip-group"
                    label="Zip code:"
                    label-for="form-zip-input">
          <b-form-input id="form-zip-input"
                        type="text"
                        v-model="addCustomerRecordForm.zip"
                        required
                        placeholder="Enter zip code">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-vehiclemake-group"
                    label="Vehicle Make:"
                    label-for="form-vehiclemake-input">
          <b-form-input id="form-vehiclemake-input"
                        type="text"
                        v-model="addCustomerRecordForm.vehiclemake"
                        required
                        placeholder="Enter vehicle make">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-vehiclemodel-group"
                    label="Vehicle Model:"
                    label-for="form-vehiclemodel-input">
          <b-form-input id="form-vehiclemodel-input"
                        type="text"
                        v-model="addCustomerRecordForm.vehiclemodel"
                        required
                        placeholder="Enter vehicle model">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-vehicleyear-group"
                    label="Vehicle Year:"
                    label-for="form-vehicleyear-input">
          <b-form-input id="form-vehicleyear-input"
                        type="text"
                        v-model="addCustomerRecordForm.vehicleyear"
                        required
                        placeholder="Enter vehicle year">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-licenseplate-group"
                    label="License Plate:"
                    label-for="form-licenseplate-input">
          <b-form-input id="form-licenseplate-input"
                        type="text"
                        v-model="addCustomerRecordForm.licenseplate"
                        required
                        placeholder="Enter license plate">
          </b-form-input>
        </b-form-group>
          <b-form-group id="form-history-group"
                      label="Vehicle History:"
                      label-for="form-history-input">
            <b-form-input id="form-history-input"
                          type="text"
                          v-model="addCustomerRecordForm.history"
                          required
                          placeholder="Enter vehicle history">
            </b-form-input>
          </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="editCustomerRecordModal"
            id="customerRecord-update-modal"
            title="Edit Exxon customer record"
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
          <b-form-group id="form-vehiclemake-edit-group"
                      label="Vehice Make:"
                      label-for="form-vehiclemake-edit-input">
            <b-form-input id="form-email-vehiclemake-input"
                          type="text"
                          v-model="editForm.vehiclemake"
                          required
                          placeholder="Enter vehicle make">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-vehiclemodel-edit-group"
                      label="Vehicle Model:"
                      label-for="form-vehiclemodel-edit-input">
            <b-form-input id="form-vehiclemodel-edit-input"
                          type="text"
                          v-model="editForm.vehiclemodel"
                          required
                          placeholder="Enter vehicle model">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-vehicleyear-edit-group"
                      label="Vehicle Year:"
                      label-for="form-vehicleyear-edit-input">
            <b-form-input id="form-vehicleyear-edit-input"
                          type="text"
                          v-model="editForm.vehicleyear"
                          required
                          placeholder="Enter vehicle year">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-licenseplate-edit-group"
                      label="License Plate:"
                      label-for="form-licenseplate-edit-input">
            <b-form-input id="form-licenseplate-edit-input"
                          type="text"
                          v-model="editForm.licenseplate"
                          required
                          placeholder="Enter license plate">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-history-edit-group"
                      label="Vehicle History:"
                      label-for="form-history-edit-input">
            <b-form-input id="form-history-edit-input"
                          type="text"
                          v-model="editForm.history"
                          required
                          placeholder="Enter vehicle history">
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
  $("#custSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#custTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

export default {
  data() {
    return {
      customerRecords: [],
      addCustomerRecordForm: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        vehiclemake: '',
        vehiclemodel: '',
        vehicleyear: '',
        licenseplate: '',
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
        vehiclemake: '',
        vehiclemodel: '',
        vehicleyear: '',
        licenseplate: '',
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
    getCustomerRecords() {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/customer/getallcustomers';
      axios.get(path)
        .then((res) => {
          this.customerRecords = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addCustomerRecord(payload) {
      const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/customer/createcustomer';
      axios.post(path, payload)
        .then(() => {
          this.getCustomerRecords();
          this.message = 'Customer Record created!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getCustomerRecords();
        });
    },
    initForm() {
      this.addCustomerRecordForm.firstname = '';
      this.addCustomerRecordForm.lastname = '';
      this.addCustomerRecordForm.email = '';
      this.addCustomerRecordForm.phone = '';
      this.addCustomerRecordForm.address = '';
      this.addCustomerRecordForm.city = '';
      this.addCustomerRecordForm.state = '';
      this.addCustomerRecordForm.zip = '';
      this.addCustomerRecordForm.vehiclemake = '';
      this.addCustomerRecordForm.vehiclemodel = '';
      this.addCustomerRecordForm.vehicleyear = '';
      this.addCustomerRecordForm.licenseplate = '';
      this.addCustomerRecordForm.history = '';
      this.editForm._id = '';
      this.editForm.firstname = '';
      this.editForm.laststname = '';
      this.editForm.email = '';
      this.editForm.phone = '';
      this.editForm.address = '';
      this.editForm.city = '';
      this.editForm.state = '';
      this.editForm.zip = '';
      this.editForm.vehiclemake = '';
      this.editForm.vehiclemodel = '';
      this.editForm.vehicleyear = '';
      this.editForm.licenseplate = '';
      this.editForm.description = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addCustomerRecordModal.hide();
      //let read = false;
      //if (this.addCustomerRecordForm.read[0]) read = true;
      const payload = {
        firstname: this.addCustomerRecordForm.firstname,
        lastname: this.addCustomerRecordForm.lastname,
        email: this.addCustomerRecordForm.email,
        phone: this.addCustomerRecordForm.phone,
        address: this.addCustomerRecordForm.address,
        city: this.addCustomerRecordForm.city,
        state: this.addCustomerRecordForm.state,
        zip: this.addCustomerRecordForm.zip,
        vehiclemake: this.addCustomerRecordForm.vehiclemake,
        vehiclemodel: this.addCustomerRecordForm.vehiclemodel,
        vehicleyear: this.addCustomerRecordForm.vehicleyear,
        licenseplate: this.addCustomerRecordForm.licenseplate,
        history: this.addCustomerRecordForm.history,
      };
      this.addCustomerRecord(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addCustomerRecordModal.hide();
      this.initForm();
    },
    editCustomerRecord(customerRecord) {
      this.editForm = customerRecord;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editCustomerRecordModal.hide();
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
        vehiclemake: this.editForm.vehiclemake,
        vehiclemodel: this.editForm.vehiclemodel,
        vehicleyear: this.editForm.vehicleyear,
        licenseplate: this.editForm.licenseplate,
        history: this.editForm.history,
      };
      this.updateCustomerRecord(payload, this.editForm._id);
    },
    updateCustomerRecord(payload, customerRecordID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/customer/updatecustrec/${customerRecordID}`;
      axios.put(path, payload)
        .then(() => {
          this.getCustomerRecords();
          this.message = 'Customer Record updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getCustomerRecords();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editCustomerRecordModal.hide();
      this.initForm();
      this.getCustomerRecords();
    },
    removeCustomerRecord(customerRecordID) {
      const path = `https://broadway-exxon-auto-care.herokuapp.com/api/customer/deletecustrec/${customerRecordID}`;
      axios.delete(path)
        .then(() => {
          this.getCustomerRecords();
          this.message = 'Customer Record deleted!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getCustomerRecords();
        });
    },
    onDeleteCustomerRecord(customerRecord) {
      this.removeCustomerRecord(customerRecord._id);
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.customerRecords.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    downloadPDF() {
      var pdfsize = 'a0';
      const doc = new jsPDF('l', 'pt', pdfsize)
      autoTable(doc, { html: '#thisCustTable', theme: 'grid', startY: 60, styles: { overflow: 'linebreak', fontSize: 25, cellWidth: 'wrap' }, columnStyles: { 2: { columnWidth: 'auto' }} })
      doc.save('customers_table.pdf')
    }
  },
  created() {
    this.getCustomerRecords();
  },
  computed: {
    sortedCustomerRecords:function() {
      return this.customerRecords.slice(0).sort((a,b) => {
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