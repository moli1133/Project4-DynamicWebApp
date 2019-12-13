function Init(){


	
	//Change to port that is input on page load
	var port = 8000;
	//Change to cisc-dean.sthomas.edu before we turn it in
	var host = "localhost";
	var neighborhoods = {
		N1:"Conway\/Battlecreek\/Highwood",
		N2:"Greater East Side",
		N3:"West Side",
		N4:"Dayton's Bluff",
		N5:"Payne\/Phalen",
		N6:"North End",
		N7:"Thomas\/Dale(Frogtown)",
		N8:"Summit\/University",
		N9:"West Seventh",
		N10:"Como",
		N11:"Hamline\/Midway",
		N12:"St. Anthony",
		N13:"Union Park",
		N14:"Macalester-Groveland",
		N15:"Highland",
		N16:"Summit Hill",
		N17:"Capitol River"
	}
	
	//Initial crime data from incidents api to use when page loads
	var initial_crime;
	var xhttp = new XMLHttpRequest();				
	var url= 'http://'+host+':'+port+'/incidents?start_date=2019-10-01&end_date=2019-10-31';
	//Making API call so that the table can be loadedwhen the page is loaded
	xhttp.open("GET",url);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			initial_crime = JSON.parse(xhttp.responseText);
			
			for(var i = 0; i < Object.keys(initial_crime).length; i++) {
				var cur_crime = initial_crime[Object.keys(initial_crime)[i]];
				//Change neighborhood_number into the name of the neighborhood
				cur_crime.neighborhood_number=neighborhoods["N"+cur_crime.neighborhood_number];
			}
			
			var app = new Vue({
				el:"#app",
				data:{
					message:" ",
					//Might need this element, maybe not
					lat_long_ne:"",
					//Might need this element, maybe not
					lat_long_sw:"",
					crime_data:initial_crime,
				},
				methods:{
					submit: function () {
						var temp = this.message.split(",");
						if(!isNaN(temp[0])) {
							var coordinates = L.latLng(parseFloat(temp[0]), parseFloat(temp[1]));
							map.setView(coordinates, 18);		
							
						} else {
							var xhttp = new XMLHttpRequest();
							console.log(temp[0]);
							var url= 'https://nominatim.openstreetmap.org/search?street='+temp[0]+"&city=St Paul&format=json";
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
					},
					updateCrimeData: function () {
						var xhttp = new XMLHttpRequest();
						var url= 'http://localhost:8000/incidents?start_date=2019-10-01&end_date=2019-10-31';
						xhttp.open("GET",url);
						xhttp.send();
						xhttp.onreadystatechange = function() {
							if(this.readyState == 4 && this.status == 200) {
								this.crime_data = JSON.parse(xhttp.responseText);
								console.log(JSON.stringify(this.crime_data, null, 2));
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

			

			/* This was just testing the leaflet functionality to help me understand it
			var bounds = map.getBounds();
			console.log("MaxBounds: " + bounds.getNorthEast());
			console.log("MinBounds: " + bounds.getSouthWest());
			app.data.lat_long_ne=bounds.getNorthEast();
			console.log("XXXXX: " + data.lat_long_ne);
			map.on('zoomend', function() {
				
				bounds = map.getBounds();
				console.log("MaxBounds: " + bounds.getNorthEast());
				console.log("MinBounds: " + bounds.getSouthWest());
				app.data.lat_long_ne=bounds.getNorthEast();
				console.log("XXXXX: " + data.lat_long_ne);
				
			});
			
			map.on('moveend', function() {
				
				bounds = map.getBounds();
				console.log("MaxBounds: " + bounds.getNorthEast());
				console.log("MinBounds: " + bounds.getSouthWest());
				app.data.lat_long_ne=bounds.getNorthEast();
				console.log("XXXXX: " + data.lat_long_ne);
				
			});
			*/
			

<<<<<<< HEAD
			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
				attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
				maxZoom: 18,
				minZoom: 11,
				id: 'mapbox/streets-v11',
				accessToken: 'pk.eyJ1IjoibGVlMDMzNjYiLCJhIjoiY2szemJ5ZHB2MW4wNjNudDZ6NmozNjI5byJ9.031whUscC0xfmxgrOKEOQA'
			}).addTo(map);
=======
>>>>>>> d2c3db0521836e9d6a5ac5a20faa033a269062a4
		}
	}
}