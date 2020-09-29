const searchForm = document.querySelector(".search-form"),
      searchInput = document.querySelector('.search-form__input');
const ipAdress = document.querySelector('#ip'),
      ipLocation = document.querySelector('#location'),
      ipTimezone = document.querySelector('#timezone'),
      ipIsp = document.querySelector('#isp');
var map;

searchForm.addEventListener('submit',getFormIp);

function getClientIp() {
  fetch ('https://api.ipify.org/')
  .then( respuesta => respuesta.text())
  .then( datos => apiConsult(datos))
}
function getFormIp(event) {
  event.preventDefault();
  formIp = searchInput.value;
  apiConsult(formIp);
}
function apiConsult(ip) {
  const url = `https://geo.ipify.org/api/v1?apiKey=at_1mvDDGGXePFLGro0ebnUhWVxuhhLB&ipAddress=${ip}`
  fetch(url)
  .then(respuesta => respuesta.json())
  .then( datos => {
    console.log(datos);
    showData(datos);
  })
}
function showData(data) {
  searchInput.value= data.ip;
  ipAdress.textContent= data.ip;
  ipLocation.textContent = data.location.region + ", "+ data.location.city;
  ipTimezone.textContent = "UTC " + data.location.timezone;
  ipIsp.textContent = data.isp;
  if(!map) {
    mapInit(data)
  }else {
    ipMap(data)
  }
}
function mapInit(data) {
console.log("no existe")
map = L.map('ipMap');
map.setView([data.location.lat, data.location.lng], 18);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([data.location.lat, data.location.lng]).addTo(map)
.bindPopup('Aproximate location')
.openPopup();
}
function ipMap(data) {
  console.log("cambiando")
  map.setView([data.location.lat, data.location.lng], 18);
  L.marker([data.location.lat, data.location.lng]).addTo(map)
.bindPopup('Aproximate location')
.openPopup();
}
getClientIp()