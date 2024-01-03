const fb = require('../config');
const db = fb.firestore();

function getDataById(userIdToFind) {
    return new Promise((resolve, reject) => {
        console.log('INSIDE getDataById()');
        db.collection('users').doc('id').get()
            .then(snapshot => {
                console.log('Firestore Snapshot:', snapshot.data());

                if (snapshot.exists) {
                    const userDetailsArray = snapshot.data().userdetails || [];

                    console.log('User Details Array:', userDetailsArray);

                    const foundUser = userDetailsArray.find(user => user.id === parseInt(userIdToFind));

                    console.log('Found User:', foundUser);

                    resolve(foundUser);
                } else {
                    resolve(null);
                }
            })
            .catch(err => {
                console.error('Error in getDataById:', err);
                reject(err);
            });
    });
}


module.exports = { getDataById };
