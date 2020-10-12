(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var q = "PM";

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            if (h < 12) {
                q = "AM";
            }
            if (h > 12) {
                q = "PM";
                h = +h % 12 || 12;
                if (h < 10) {
                    h = "0" + h;
            }
            }
            c.innerHTML = h + ":" + m + ":" + s + " " + q;
            
        };
        
    });
    
    // forms
    var hind = 0.00;
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    document.getElementById("form").addEventListener("submit", validateForm);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function validateForm(event) {
        event.preventDefault();

        var eesnimi = document.getElementById("fname");
        var perenimi = document.getElementById("lname");
        var rule = /^[a-zA-Z]*$/;
        var valitud = false;
        if (eesnimi.value === "") {
            alert("Palun sisestage eesnimi!");
            eesnimi.focus();
            return;
        }
        if (perenimi.value === "") {
            alert("Palun sisestage perekonnanimi!");
            perenimi.focus();
            return;
        }
        if(!rule.test(eesnimi.value)) {
            alert("Eesnimi ei tohi sisaldada numbreid!");
            eesnimi.focus();
            return;
        }
        if(!rule.test(perenimi.value)) {
            alert("Perenimi ei tohi sisaldada numbreid!");
            perenimi.focus();
            return;
        }
        var radios = document.getElementsByName("sugu");
        for (var i = 0, len = radios.length; i < len; i++) {
            if (radios[i].checked) {
                valitud = true;
            }
        }
        if (valitud == false) {
            alert("Sugu peab olema valitud!");
            return;
        }
    }

    function estimateDelivery(event) {
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        if (document.getElementById('v1').checked) {
            hind += 5.00;
        }
        if (document.getElementById('v2').checked) {
            hind += 1.00;
        }
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        }
        else if (linn.value === "tln") {
            hind += 0.00;
            hind = hind.toFixed(2);
            
        }
        else if (linn.value === "trt") {
            hind += 2.50;
            hind = hind.toFixed(2);
        }
        else if (linn.value === "nrv") {
            hind += 2.50;
            hind = hind.toFixed(2);
        } 
        else if (linn.value === "prn") {
            hind += 3.00;
            hind = hind.toFixed(2);
        } 
        e.innerHTML = hind + " &euro;"; 
        hind = 0.00;
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;
var infobox;

function GetMap() {
    
    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    var puhja = new Microsoft.Maps.Location(
            58.338512, 
            26.313051
    );
    var centerlat = (58.38104+58.338512)/2;
    var centerlon = (26.71992+26.313051)/2;
    var kesk = new Microsoft.Maps.Location(
        centerlat,
        centerlon
    );
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: kesk,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);
    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    pushpin.metadata = {
            title: 'Tartu Ülikool',
            description: 'Hea Koht'
    };
    var pushpin2 = new Microsoft.Maps.Pushpin(puhja, {
            title: 'Puhja',
            //subTitle: 'Kodu',
            //text: 'Home'
        });
    pushpin2.metadata = {
        title: 'Kodu',
        description: 'Kõige Parem Koht'
    };
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin);
    map.entities.push(pushpin2);
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

