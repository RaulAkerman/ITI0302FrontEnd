<template>
  <div class="HistoryForm">
    <FormKit type="form" v-model="Data" id="form" submit-label="Get All Reservations" @submit="getActiveReservations">
      <FormKit
          type="text"
          label="National Id"
          id="national_id"
          placeholder="Enter national id"
          validation="required|national_id"
      />
    </FormKit>
    <FormKit type="button" label="Get pending reservations" @click="getAllReservations"/>
  </div>
  <div>
    <h2>Active reservations</h2>
    <ul v-if="activeReservations!=null">
      <li v-for="{ id, establishment, date, status } in activeReservations" :key="id">
        {{ "ID : " + id }} <br>
        {{ "Establishment : " + establishment }} <br>
        {{ "Date : " + date }} <br>
        {{ "Status : " + status }} <br>
        <br>
      </li>
    </ul>
  </div>
  <div>
    <ul v-if="reservationsHistory!=null">
      <li v-for="{ id, establishment, date, status } in reservationsHistory" :key="id">
        {{ "ID : " + id }} <br>
        {{ "Establishment : " + establishment }} <br>
        {{ "Date : " + date }} <br>
        {{ "Status : " + status }} <br>
        <br>
      </li>
    </ul>
  </div>

</template>

<script>
import Axios from "axios";

export default {

  name: "CustomerReservationHistoryView",
  data: () => ({
    activeReservations: [],
    reservationsHistory: [],
  }),
  methods: {
    getAllReservations() {

      Axios.get(`/api/reservation/get/${this.$formkit.get("national_id").value}` + '/')
          .then(response => {
            console.log(response)
            if (response.data != null) {
              this.reservationsHistory = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
    },
    getActiveReservations() {
      Axios.get(`/api/reservation/getHistory/${this.$formkit.get("national_id").value}` + '/')
          .then(response => {
            console.log(response)
            if (response.data != null) {
              this.activeReservations = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
    },
  }
}
</script>

<style scoped>
.HistoryForm {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>