
const mymap = L.map('mapid').setView([56.95, 24.10], 12);

L.tileLayer
// Default public token https://mapbox.com
(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJ5ZGlmZmVybnR1c2VybmFtZSIsImEiOiJja3M0bm5jeTcxc3EyMm9wanp1YTY1anVvIn0.h9QnXgHUmau0ddpZZAF4ag`, {
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

const blackIcon = L.icon({
   
   iconUrl: '../images/icon-location.svg',
   iconSize:     [35, 45], // size of the icon
   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location  
  
 });
 
const getLocation = async inputValue => {
try{
   const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ToHRnZSMplmLFvQWWnsCUNo3T7zmE&ipAddress=${inputValue}`, {
      method: 'GET',
      mode: 'cors',
   })
   const data = await res.json()
   SetLocation(data)
} catch (err) {
   throw err
}

}

const SetLocation = (data) => {
   mymap.setView([data.location.lat, data.location.lng], 13)
   L.marker([data.location.lat, data.location.lng], {icon: blackIcon}).addTo(mymap);
   
   let ipOutput = document.querySelector("#js-ip-output")
   ipOutput.innerText = data.ip

   let ispOutput = document.querySelector("#js-isp-output")
   ispOutput.innerText = data.isp
   
   let locationOutput = document.querySelector("#js-location-output")
   locationOutput.innerText = `${data.location.city}${data.location.country}`

   let timezoneOutput = document.querySelector("#js-timezone-output")
   timezoneOutput.innerText = `UTC${data.location.timezone}`
}
    
const submitIp = document.querySelector('#js-button')
submitIp.addEventListener('click', e => {
   e.preventDefault()
   const inputText = document.querySelector('#js-input')
   
   const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
if(inputText.value.match(ipformat)){
return getLocation(inputText.value) 
} else {
  alert("You have entered an invalid IP address!");
  inputText.focus();return false;
  } 
} )




   
