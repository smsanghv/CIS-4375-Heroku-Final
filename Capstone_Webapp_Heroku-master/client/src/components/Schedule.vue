<template>
  <section class="page-section bg-dark" id="schedule">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Request an Appointment</h2>
                    <h3 class="section-subheading text-muted">To better serve you, you can schedule your appointment below.</h3>
                </div>
                <alert :message=message v-if="showMessage"></alert><br>
                <div class="button-center">
                  <button type="button" class="btn btn-primary btn-xl text-uppercase" v-b-modal.Appointment-modal>Request Appointment</button>
                </div>
                <b-modal ref="addAppointmentModal"
                    id="Appointment-modal"
                    title="Request a New Appointment"
                    hide-footer>
                    <b-form @submit="onSubmit" class="w-100">
                        <b-form-group id="form-firstname-group"
                    label="First Name:"
                    label-for="form-firstname-input">
          <b-form-input id="form-firstname-input"
                        type="text"
                        v-model="addAppointmentForm.firstname"
                        required
                        placeholder="Please enter your first name.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-lastname-group"
                    label="Last Name:"
                    label-for="form-lastname-input">
          <b-form-input id="form-lastname-input"
                        type="text"
                        v-model="addAppointmentForm.lastname"
                        required
                        placeholder="Please enter your last name.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-email-group"
                      label="Email:"
                      label-for="form-email-input">
            <b-form-input id="form-email-input"
                          type="text"
                          v-model="addAppointmentForm.email"
                          required
                          placeholder="Please enter your email address.">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-phone-group"
                    label="Phone Number:"
                    label-for="form-phone-input">
          <b-form-input id="form-phone-input"
                        type="text"
                        v-model="addAppointmentForm.phone"
                        required
                        placeholder="Please enter your phone number.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-address-group"
                    label="Street Address:"
                    label-for="form-address-input">
          <b-form-input id="form-address-input"
                        type="text"
                        v-model="addAppointmentForm.address"
                        required
                        placeholder="Please enter your street address.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-city-group"
                    label="City:"
                    label-for="form-city-input">
          <b-form-input id="form-city-input"
                        type="text"
                        v-model="addAppointmentForm.city"
                        required
                        placeholder="Please enter your city.">
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
                        placeholder="Please enter your zip code.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-appointmentdate-group"
                    label="Appointment Date:"
                    label-for="form-appointmentdate-input">
          <b-form-input id="form-appointmentdate-input"
                        type="date"
                        v-model="addAppointmentForm.appointmentdate"
                        required
                        placeholder="Please select an appointment date.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-appointmenttime-group"
                    label="Appointment Time:"
                    label-for="form-appointmenttime-input">
          <b-form-input id="form-appointmenttime-input"
                        type="time"
                        v-model="addAppointmentForm.appointmenttime"
                        required
                        placeholder="Please select an appointment time.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-vehicleMake-group"
                    label="Vehicle Make:"
                    label-for="form-vehicleMake-input">
          <b-form-input id="form-vehicleMake-input"
                        type="text"
                        v-model="addAppointmentForm.vehicleMake"
                        required
                        placeholder="Please enter your vehicle's make.">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-vehicleModel-group"
                    label="Vehicle Model:"
                    label-for="form-vehicleModel-input">
          <b-form-input id="form-vehicleModel-input"
                        type="text"
                        v-model="addAppointmentForm.vehicleModel"
                        required
                        placeholder="Please enter your vehicle's model.">
          </b-form-input>
        </b-form-group>
          <b-form-group id="form-description-group"
                      label="Appointment Details:"
                      label-for="form-description-input">
            <b-form-input id="form-description-input"
                          type="text"
                          v-model="addAppointmentForm.description"
                          required
                          placeholder="Please describe the reason for your appointment.">
            </b-form-input>
          </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-button-group>
      </b-form>
                </b-modal>
                <!--
                <form ref="addAppointmentModal" id="contactForm" name="sentMessage" novalidate="novalidate" @submit="onSubmit">
                    <div class="row align-items-stretch mb-5">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input class="form-control" id="firstname" type="text" placeholder="First Name *" v-model="addAppointmentForm.firstname" required="required" 
                                data-validation-required-message="Please enter your first name." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="lastname" type="text" placeholder="Last Name *" v-model="addAppointmentForm.lastname" required="required" 
                                data-validation-required-message="Please enter your last name." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="email" type="email" placeholder="Your Email *" v-model="addAppointmentForm.email" required="required" 
                                data-validation-required-message="Please enter your email address." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group mb-md-0">
                                <input class="form-control" id="phone" type="text" placeholder="Your Phone *" v-model="addAppointmentForm.phone" required="required" 
                                data-validation-required-message="Please enter your phone number." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group mb-md-0">
                                <input class="form-control" id="address" type="text" placeholder="Your Address *" v-model="addAppointmentForm.address" required="required" 
                                data-validation-required-message="Please enter your street." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group mb-md-0">
                                <input class="form-control" id="city" type="text" placeholder="Your City *" v-model="addAppointmentForm.city" required="required" 
                                data-validation-required-message="Please enter your city." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group mb-md-0">
                                <input class="form-control" id="state" type="text" placeholder="Your State *" v-model="addAppointmentForm.state" required="required" 
                                data-validation-required-message="Please enter your state." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group mb-md-0">
                                <input class="form-control" id="zip" type="text" placeholder="Your Zip code *" v-model="addAppointmentForm.zip" required="required" 
                                data-validation-required-message="Please enter your zip code." />
                                <p class="help-block text-danger"></p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-md-0">
                                <input class="form-control" id="date" type="date" placeholder="Appointment Date *" v-model="addAppointmentForm.appointmentdate" required="required" 
                                data-validation-required-message="Please enter your chosen appointment date." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="caryear" type="time" placeholder="Appointment Time *" v-model="addAppointmentForm.appointmenttime" required="required" 
                                data-validation-required-message="Please enter your chosen appointment time." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="carmake" type="text" placeholder="Vehicle Make *" v-model="addAppointmentForm.vehicleMake" required="required" 
                                data-validation-required-message="Please enter your vehicle's make." />
                                <p class="help-block text-danger"></p>
                            </div>                            
                            <div class="form-group">
                                <input class="form-control" id="color" type="text" placeholder="Vehicle Model *" v-model="addAppointmentForm.vehicleModel" required="required" 
                                data-validation-required-message="Please enter your vehicle's model." />
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="desc" type="text" placeholder="Details of Appointment *" v-model="addAppointmentForm.description" required="required" 
                                data-validation-required-message="Please describe the reason for your appointment" />
                                <p class="help-block text-danger"></p>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div id="success"></div>
                        <button class="btn btn-primary btn-xl text-uppercase" id="sendMessageButton" type="submit">Request Appointment</button>
                    </div>
                </form>
                    -->
            </div>
        </section>

</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';

export default {
    data () {
        return {
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
    addAppointment(payload) {
        const path = 'https://broadway-exxon-auto-care.herokuapp.com/api/appointment/createappointment';
        axios.post(path, payload)
        .then(() => {
            this.message = 'Appointment created!';
            this.showMessage = true;
        })
        .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
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
  },
};
</script>

<style>
.button-center {
  text-align: center;
}
</style>