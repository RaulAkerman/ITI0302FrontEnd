<template>
  <div class="ReservationTable">
  <div>
    <ul>
      <li v-for="{ id, establishment, date, status, username } in reservations" :key="establishment">
        {{ "ID : " + id }} <br>
        {{ "Establishment : " + establishment }} <br>
        {{ "Date : " + date }} <br>
        {{ "Status : " + status }} <br>
        {{ "User : " + username }} <br>
        <br>
      </li>
    </ul>
    <div>
      <button @click="getAllReservations">Click to get all Reservations</button>
      <button @click="orderBy='establishment'">Sort Reservations by establishment</button>
      <button @click="orderBy='status'">Sort Reservations by status</button>
      <button @click="orderBy='date'">Sort Reservations by date</button>
      <button @click="ascending=!ascending">Change sort direction</button>
    </div>
    <div>
      <button @click="decrementPage">Previous Page</button>
      <button @click="pageNr++">Next Page</button>
    </div>
    <div>
      <label for="date">Date</label>
      <input type="text" id="date" placeholder="Date" v-model="date">
    </div>
  </div>
    <FormKit type="form" v-model="Data" id="form" submit-label="Register customer to reservation" @submit="registerCustomer">
      <FormKit
          type="text"
          label="Customer National Id"
          id="id"
          placeholder="Enter National Id"
          validation="required|name"
      />
      <FormKit
          type="number"
          label="Reservation Id"
          id="reservation_id"
          placeholder="Enter reservation ID"
          validation="required|reservation_id"
      />
    </FormKit>
    <FormKit type="button" label="Fulfill reservation" @click="fulfillReservation"/>
    <FormKit type="button" label="Cancel reservation" @click="cancelReservation"/>
  </div>
</template>

<style>
.ReservationTable {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
import Axios from "axios";

export default {
  watch: {
    pageNr: function() {
      this.getAllReservations();
    },
    date: function() {
      this.getAllReservations();
    },
    orderBy: function() {
      this.getAllReservations();
    },
    ascending: function() {
      this.getAllReservations();
    },

  },
  data: () => ({
    establishment: "",
    date: "",
    reservations: [],
    pageNr: 0,
    orderBy: "establishment",
    ascending: true,
    nationalid: "",
    reservationid: 0
  }),
  name: "TableView",
  methods: {
    getAllReservations() {
      this.reservations = [];
      const order = this.ascending ? "ASC" : "desc";
      console.log("getAllCustomers")
      Axios.get(`/api/reservation/getAll?page=${this.pageNr}&orderBy=${this.orderBy}&order=${order}&date=${this.date}`)
          .then(response => {
            console.log(response)
            if (response.data != null) {
              this.reservations = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
    },
    decrementPage() {
      if (this.pageNr > 0) {
        this.pageNr--;
      }
    },
    registerCustomer() {
      const nationalId = this.$formkit.get("id").value
      const reservationId = this.$formkit.get("reservation_id").value
      Axios.post('/api/reservation/makeReservation/' + nationalId + '/' + reservationId + '/', {
      })
          .then(response => {
            console.log(response.data)
            alert("Customer registered to reservation!")
          })
          .catch(error => {
            console.log(error)
            alert("Registration failed!")
          })
    },
    fulfillReservation() {
      const reservationId = this.$formkit.get("reservation_id").value
      Axios.post('/api/reservation/fulfill/' + reservationId + '/', {
      })
          .then(response => {
            console.log(response.data)
            alert("Customer reservation fulfilled!")
          })
          .catch(error => {
            console.log(error)
            alert("Reservation fulfillment failed!")
          })
    },
    cancelReservation() {
      const reservationId = this.$formkit.get("reservation_id").value
      Axios.post('/api/reservation/cancel/' + reservationId, {
      })
          .then(response => {
            console.log(response.data)
            alert("Reservation successfully canceled!")
          })
          .catch(error => {
            console.log(error)
            alert("Reservation cancellation failed!")
          })
    }
  }
}
</script>
