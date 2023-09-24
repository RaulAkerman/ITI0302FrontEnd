<template>
  <div class="CustomerTable">
    <div>
      <ul>
        <li v-for="{ id, firstName, lastName, rankName, customerNationalId  } in customers" :key="id">
          {{ "ID : " + id }} <br>
          {{"First name: " + firstName }} <br>
          {{"Last name: " + lastName }} <br>
          {{"Rank: " + rankName }} <br>
          {{"National ID : " + customerNationalId}} <br>
          <br>
        </li>
      </ul>
      <div>
        <button @click="getAllCustomers">Click to get all Customers</button>
        <button @click="orderBy=0">Sort Customers by First Name</button>
        <button @click="orderBy=1">Sort Customers by Last Name</button>
        <button @click="ascending=!ascending">Change sort direction</button>
        </div>
      <div>
        <button @click="decrementPage">Previous Page</button>
        <button @click="pageNr++">Next Page</button>
      </div>
      <div>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" placeholder="firstName" v-model="firstNameSearch">

        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" placeholder="lastName" v-model="lastNameSearch">
      </div>
    </div>
  </div>
</template>

<style>
.CustomerTable {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
import Axios from "axios";

export default {
  watch: {
    pageNr: function() {
      this.getAllCustomers();
    },
    orderBy: function() {
      this.getAllCustomers();
    },
    ascending: function() {
      this.getAllCustomers();
    },
    firstNameSearch: function() {
      this.getAllCustomers();
    },
    lastNameSearch: function() {
      this.getAllCustomers();
    }

  },
  data: () => ({
    firstNameSearch: "",
    lastNameSearch: "",
    customers: [],
    pageNr: 0,
    orderBy: 0,
    ascending: true,

  }),
  name: "TableView",
  methods: {
    getAllCustomers() {
      const order = this.ascending ? "ASC" : "desc";
      const orderBy = this.orderBy === 0 ? "fname" : "lastName";
      console.log("getAllCustomers")
      Axios.post(`/api/customer/getAllCustomers?page=${this.pageNr}&orderBy=${orderBy}&order=${order}&fname=${this.firstNameSearch}&lastName=${this.lastNameSearch}`)
          .then(response => {
            console.log(response)
            if (response.data != null) {
              this.customers = response.data;
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
  }
}
</script>

<style scoped>

</style>