<template>
  <div class="service">
    <div>
      <h2>Add Customer</h2>
      <FormKit type="form" v-model="Data" id="form" submit-label="Reset" @submit="this.$formkit.reset('form')">
        <FormKit
          type="text"
          label="First Name"
          id="firstName"
          placeholder="John"
          validation="required|firstName"
          />
      <FormKit
          type="text"
          label="Last Name"
          id="lastName"
          placeholder="Doe"
          validation="required|lastName"
      />
      <FormKit
        type="radio"
        label="rank ID 1/2 NEUTRAL/VIP"
        id="rankId"
        :options="['1','2']"
        validation="required|lastName"
      />
      <FormKit
        type="text"
        label="National ID"
        id="customerNationalId"
        placholder="00000000000"
        validation="required|customerNationalId"
      />
      <FormKit
        type="number"
        label="Customers ID"
        id="Customid"
        placeholder="Add if wishing to remove/update/get customer"
        validation="required|Customid"
        ></FormKit>
      </FormKit>
    </div>
    <button @click="postCustomer">Click to add Customer</button>
    <button @click="removeCustomer">Click to remove Customer</button>
    <button @click="getCustomer">Click to get Customer</button>
    <button @click="updateCustomer">Click to update Customer data</button>
    <div>
      <h2>SELECT CUSTOMER</h2>
      <ul v-if="customer!=null">
        <li>
          {{ "ID : " + customer.id }} {{"First name: " + customer.firstName }} {{"Last name: " + customer.lastName }} {{"Rank: " + customer.rankName }} {{"National ID : " + customer.customerNationalId}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.service {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
// @ is an alias to /src
import Axios from 'axios'
import {FormKit} from "@formkit/vue/index";

export default {
  data: () => ({
    customer: null,
    customers: [],
  }),
  name: 'App',
  components: {FormKit},
  methods: {
    postCustomer() {
      const firstName = this.$formkit.get("firstName").value
      const lastName = this.$formkit.get("lastName").value
      const rankId = this.$formkit.get("rankId").value
      const customerNationalId = this.$formkit.get("customerNationalId").value
      Axios.post('/api/customer/', {
        firstName:firstName,
        lastName:lastName,
        rankId:rankId,
        reservationId:1,
        nrOfVisits:0,
        customerNationalId:customerNationalId
      })
          .then(response => {
            console.log(response)
            alert("Successfully added customer!")
          })
          .catch(error => {
            console.log(error)
            alert("Customer creation failed!")
          })
    },
    removeCustomer() {
      const ID = this.$formkit.get("Customid").value
      Axios.delete('/api/customer/delete/'+ ID.toString())
          .then(response => {
            console.log(response)
            alert("Successfully deleted customer!")
      })
          .catch(error => {
            console.log(error)
            alert("Customer deletion unsuccessful!")
          })

    },
    getCustomer() {
      const ID = this.$formkit.get("Customid").value
      Axios.get('/api/customer/get/'+ ID.toString())
          .then(response => {
            console.log(response)
            this.customer = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    updateCustomer(){
      const firstName = this.$formkit.get("firstName").value
      const lastName = this.$formkit.get("lastName").value
      const rankId = this.$formkit.get("rankId").value
      const customerNationalId = this.$formkit.get("customerNationalId").value
      Axios.post('api/customer/update/', {
        firstName:firstName,
        lastName:lastName,
        rankId:rankId,
        nrOfVisits:0,
        customerNationalId:customerNationalId
      })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style>
{
  text-align: center
}
</style>