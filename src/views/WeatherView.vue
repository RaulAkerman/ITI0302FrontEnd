<template>
  <div class="weather">
    <div>
      <h1>Weather</h1>
      <FormKit style="alignment: center" type="form" v-model="Data" id="form" submit-label="Get Weather Info for selected city" @submit="getWeather">
        <FormKit style="alignment: center"
          type="select"
          label="City"
          :options="['Tallinn', 'Stockholm', 'London', 'New York', 'Tokyo', 'Sydney']"
          id="city"
          placeholder="Select city"
        />
      </FormKit>
    </div>
    <div>
      <h2>Weather Info:</h2>
      <ul v-if="weather!=null" >
        <li :style="{
      color: 'red',
      fontSize: '30px',
   }" >
          {{"Date : " + weather.daily.time[0]}}
          <br />
          {{"Maximum temp : " + weather.daily.temperature_2m_max[0] + "°C"}}
          <br />
          {{"Minimum temp : " + weather.daily.temperature_2m_min[0] + "°C"}}
          <br />
          {{"Sunrise at : " + (weather.daily.sunrise[0]).toString().substring(11)}}
          <br />
          {{"Sunset at : " + (weather.daily.sunset[0]).toString().substring(11)}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.weather {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
import Axios from 'axios'
export default {
  data: () => ({
    weather: null
  }),
  methods: {
    getWeather() {
      const selectedCity = this.$formkit.get('city').value
      Axios.get('/api/public/weather/' + selectedCity + '/')
        .then(response => {
          this.weather = response.data
        })
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