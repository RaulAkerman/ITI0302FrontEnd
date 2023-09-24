<template>
  <div class="Login">
    <h1>API login page</h1>
    <div>
      <FormKit type="form" v-model="Data" id="form" submit-label="Reset" @submit="this.$formkit.reset('form')">
        <FormKit
            type="text"
            label="Username"
            id="userName"
            placeholder="username"
            validation="required|userName"
        />
        <FormKit
            type="text"
            label="Password"
            id="password"
            placeholder="password"
            validation="required|password"
        />
      </FormKit>
    </div>
    <button @click="login">Login</button>
    <button @click="register">Register</button>
  </div>
</template>


<script>
// @ is an alias to /src
import Axios from 'axios'
import {FormKit} from "@formkit/vue/index";
let userNameExport = ""
export {userNameExport}

export default {
  name: 'App',
  components: {FormKit},
  methods: {
    login() {
      const userName = this.$formkit.get("userName").value
      const password = this.$formkit.get("password").value
      userNameExport = userName
      Axios.post('/api/public/login', {
        username:userName,
        password:password
      })
          .then(response => {
            console.log(response.data)
            Axios.defaults.headers.common['Authorization'] = "Bearer " + response.data
            alert("Login successful!")
          })
          .catch(error => {
            console.log(error)
            alert("Login unsuccessful!")
          })
    },

    register() {
      const userName = this.$formkit.get("userName").value
      const password = this.$formkit.get("password").value
      Axios.post('/api/public/create/user', {
        username:userName,
        password:password
      })
          .then(response => {
            console.log(response)
            alert("Registered user successfully!")
          })
          .catch(error => {
            console.log(error)
            alert("User registration failed!")
          })

    },
  }
}
</script>

<style>
.Login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
