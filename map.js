function Init(){

	var app = new Vue({
		el:"#app",
		data:{
			message:" "
		},
		methods:{
			submit: function () {
				var temp = this.message.split(",");
				if(!isNaN(temp[0])) {
					var coordinates = L.latLng(parseFloat(temp[0]), parseFloat(temp[1]));
					map.setView(coordinates);	
				} else {
					var xhttp = new XMLHttpRequest();
					console.log(temp[0]);
					var url= 'https://nominatim.openstreetmap.org/search?street='+temp[0]+"&format=json";
					xhttp.open("GET",url);
					xhttp.send();
					xhttp.onreadystatechange = function() {
						if(this.readyState == 4 && this.status == 200) {
							var address = JSON.parse(xhttp.responseText);
							console.log(address[0].lat);
							console.log(address[0].lon);
							var coordinates = L.latLng(parseFloat(address[0].lat),parseFloat(address[0].lon));
							map.setView(coordinates, 18);	
						}
					}
				}

			}	
		}
		
	});	
	
	var map = L.map('map').setView([44.938500,-93.094225], 12);
	map.setMaxBounds([[44.892384,-93.206011],[44.991944,-93.005194]]);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
		maxZoom: 18,
		minZoom: 11,
		id: 'mapbox/streets-v11',
		accessToken: 'pk.eyJ1IjoibGVlMDMzNjYiLCJhIjoiY2szemJ5ZHB2MW4wNjNudDZ6NmozNjI5byJ9.031whUscC0xfmxgrOKEOQA'
	}).addTo(map);
	
}