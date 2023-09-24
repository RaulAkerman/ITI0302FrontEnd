<template>
  <div class="Reservation">
    <FormKit type="form" v-model="Data" id="form" submit-label="Make reservation" @submit="postReservation">
      <FormKit
          type="number"
          label="Establishment ID"
          id="id"
          placeholder="Enter establishment ID"
          validation="required|establishment_id"
      />
      <FormKit
          type="date"
          label="Date"
          id="date"
          value="2023-01-01"
          validation="required|date"
      />
    </FormKit>
  <div>
    <FormKit type="form" v-model="Data" id="form" submit-label="Add Establishment" @submit="addEstablishment">
      <FormKit
          type="text"
          label="Establishment Name"
          id="name"
          placeholder="Enter establishment name"
          validation="required|name"
      />
    </FormKit>
  </div>
  <div>
    <FormKit type="form" v-model="Data" id="form" submit-label="Delete Reservation" @submit="deleteReservation">
      <FormKit
          type="number"
          label="Reservation ID"
          id="reservation_id"
          placeholder="Enter reservation ID"
          validation="required|reservation_id"
      />
      </FormKit>
  </div>
  <div>
    <FormKit type="form" v-model="Data" id="form" submit-label="Delete Establishment" @submit="deleteEstablishment">
      <FormKit
          type="number"
          label="Establishment ID"
          id="establishment_id"
          placeholder="Enter establishment ID"
          validation="required|establishment_id"
      />
      </FormKit>
    </div>
  <div>
    <FormKit type="form" v-model="Data" id="form" submit-label="Update Establishment" @submit="updateEstablishment">
      <FormKit
          type="number"
          label="Establishment ID"
          id="establishment_update_id"
          placeholder="Enter establishment ID"
          validation="required|establishment_update_id"
      />
      <FormKit
          type="text"
          label="Establishment Name"
          id="update_name"
          placeholder="Enter establishment name"
          validation="required|update_name"
      />
      </FormKit>
    </div>
  <div>
    <ul>
      <li v-for="{ id, name  } in establishments" :key="id">
        {{ "ID : " + id }} {{"Name: " + name }}
      </li>
    </ul>
    <div>
      <button @click="getAllEstablishments">Click to get all Establishments</button>
      <button @click="orderBy='id'">Sort establishments by ID</button>
      <button @click="orderBy='name'">Sort establishments by Name</button>
      <button @click="ascending=!ascending">Change sort direction</button>
    </div>
    <div>
      <button @click="decrementPage">Previous Page</button>
      <button @click="pageNr++">Next Page</button>
    </div>
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="firstName" v-model="nameSearch">

    </div>
  </div>
  </div>
</template>

<style>
.Reservation {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
import Axios from 'axios'
import {userNameExport} from './LoginView.vue'

export default {
  watch: {
    nameSearch: function() {
      this.getAllEstablishments();
    },
    orderBy: function() {
      this.getAllEstablishments();
    },
    ascending: function() {
      this.getAllEstablishments();
    },
    pageNr: function() {
      this.getAllEstablishments();
    }

  },
  data: () => ({
    nameSearch: "",
    establishments: [],
    pageNr: 0,
    orderBy: 'id',
    ascending: true,

  }),
  methods: {
    postReservation() {
      Axios.post('/api/reservation/saveReservation/', {
        establishment: this.$formkit.get('id').value,
        date: this.$formkit.get('date').value,
        status: "available",
        username: userNameExport
      })
          .then(response => {
            console.log(response)
            alert("Reservation successfully posted!")
          })
          .catch(error => {
           console.log(error)
           alert("Reservation posting failed!")
      })
    },
    addEstablishment() {
      Axios.post('/api/establishment/add', {
        name: this.$formkit.get('name').value,
      })
          .then(response => {
            console.log(response)
            alert("Establishment successfully added!")
          })
          .catch(error => {
            console.log(error)
            alert("Establishment posting failed!")
          })
    },
    deleteReservation() {
      const reservation_id = this.$formkit.get('reservation_id').value
      Axios.post('/api/reservation/deleteReservation/' + reservation_id + '/', {
        id: reservation_id
      })
          .then(response => {
            console.log(response)
            alert("Reservation deleted successfully!")
          })
          .catch(error => {
            console.log(error)
            alert("Reservation deletion unsuccessful!")
          })
    },
    deleteEstablishment() {
      const establishment_id = this.$formkit.get('establishment_id').value
      Axios.post('/api/establishment/delete/' + establishment_id + '/', {
        id: establishment_id
      })
          .then(response => {
            console.log(response)
            alert("Establishment deleted successfully!")
          })
          .catch(error => {
            console.log(error)
            alert("Establishment deletion unsuccessful!")
          })
    },
    updateReservation() {
      Axios.post('/api/reservation/updateReservation/', {
        id: this.$formkit.get('reservation_update_id').value,
        date: this.$formkit.get('update_date').value,
      })
          .then(response => {
            console.log(response)
            alert("Reservation update successful!")
          })
          .catch(error => {
            console.log(error)
            alert("Reservation update unsuccessful!")
          })
    },
    updateEstablishment() {
      Axios.post('/api/establishment/update/', {
        id: this.$formkit.get('establishment_update_id').value,
        name: this.$formkit.get('update_name').value
      })
          .then(response => {
            console.log(response)
            alert("Establishment update successful!")
          })
          .catch(error => {
            console.log(error)
            alert("Establishment update unsuccessful!")
          })
    },
    getAllEstablishments() {
      const order = this.ascending ? "ASC" : "desc";
      Axios.get('/api/establishment/getAll?page=' + this.pageNr + '&name=' + this.nameSearch + '&orderBy=' + this.orderBy + '&order=' + order)
          .then(response => {
            if (response.data != null) {
              this.establishments = response.data
            }
          })
    },
    decrementPage() {
      if (this.pageNr > 0) {
        this.pageNr--
      }
    }
  }
  }

</script>

<style>
{
  text-align: center;
  align-items: center;
  align-content: center;
  align-self: center;
}
</style>