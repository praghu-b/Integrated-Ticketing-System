const distance = require('google-distance-matrix')

distance.key('')
distance.units('metric')


// CALCULATING DISTANCE: The distance & duration between the origin & destination will be 
// calculated using google's distance API.
function getDistanceTime(origins, destinations) {
    console.log('CALCULATING DISTANCE & DURATION...')
    return new Promise((resolve, reject) => {
      distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
          reject(err);
        }
        if (!distances) {
          reject(err);
        }
        if (distances.status == "OK") {
          for (var i = 0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
              var origin = distances.origin_addresses[i];
              var destination = distances.destination_addresses[j];
              if (distances.rows[0].elements[j].status == "OK") {
                var distance = distances.rows[i].elements[j].distance.text;
                var duration = distances.rows[i].elements[j].duration.text;
                var km = parseInt(distance.split(' ')[0]);
                resolve({ distance: km, duration: duration });
              } else {
                reject(destination + " is not reachable by land from " + origin);
              }
            }
          }
        } else {
          reject("Distance matrix api not working");
        }
      });
    });
  }

module.exports = { getDistanceTime }
