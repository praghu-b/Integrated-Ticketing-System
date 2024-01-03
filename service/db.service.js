const fb = require('../config');
const db = fb.firestore();


// GET USER DETAILS
function getDataById(userIdToFind) {
    return new Promise((resolve, reject) => {
        console.log('VERIFYING USER ID...');
        db.collection('users').doc('id').get()
            .then(snapshot => {

                if (snapshot.exists) {
                    const userDetailsArray = snapshot.data().userdetails || [];
                    const foundUser = userDetailsArray.find(user => user.id === parseInt(userIdToFind));
                    console.log("VERIFIED USER ID");
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


// DEDUCTS MONEY
function deductMoney(userIdToDeduct, amountToDeduct) {
    return new Promise((resolve, reject) => {
        console.log('PROCESSING PAYMENT...');

        db.collection('users').doc('id').get()
            .then(snapshot => {

                if (snapshot.exists) {

                    const userDetailsArray = snapshot.data().userdetails || [];

                    const foundUser = userDetailsArray.find(user => user.id === parseInt(userIdToDeduct));

                    if (foundUser) {

                        foundUser.balance -= amountToDeduct;

                        db.collection('users').doc('id').update({ userdetails: userDetailsArray })
                            .then(() => {
                                console.log(`DEDUCTED ${amountToDeduct} FROM USER ${userIdToDeduct}'S BALANCE.`);
                                resolve(foundUser.balance);
                            })
                            .catch(updateError => {
                                console.error('Error updating userdetails array:', updateError);
                                reject(updateError);
                            });
                    } else {
                        console.log(`User with ID ${userIdToDeduct} not found.`);
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            })
            .catch(err => {
                console.error('Error in deductBalance:', err);
                reject(err);
            });
    });
}


// STORING BOOKING HISTORY
function saveBooking(bookingData) {
    return new Promise((resolve, reject) => {
        console.log("STORING BOOKING DETAILS...")
        db.collection('history').doc(`${bookingData.bookID}`).set({
            ...bookingData,
            createdAt: fb.firestore.Timestamp.now()
        })
            .then(() => {
                console.log("STORED BOOKING DETAILS.")
                resolve()
            })
            .catch((error) => {
                console.error("Error storing data: ", error)
                reject(error)
            })
    })
}


module.exports = { getDataById, deductMoney, saveBooking };
