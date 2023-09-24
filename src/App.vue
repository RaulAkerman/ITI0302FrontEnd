<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Login</router-link> |
    <router-link to="/services">Service</router-link> |
    <router-link to="/weather">Weather</router-link> |
    <router-link to="/table">Customers</router-link> |
    <router-link to="/reservation">Reservation/Establishment</router-link> |
    <router-link to="/reservationtableview">Book/fulfill reservation</router-link> |
    <router-link to="/customerreservationhistory">Customer Reservation History</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
