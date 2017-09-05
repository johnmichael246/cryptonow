var Stock = require('../models/stock');
var stockURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
var request = require('request');

function getStocks(req, res) {
    var options = {
        url: `${stockURL}`
    }
    request(options.url, (err, response, body) => {
        let stocks = JSON.parse(body)
        console.log(stocks)
        res.send(stocks)
    })
}

// function toggleFav(req, res) {
//     User.populate(req.user, 'favPets', function(err, user) {
//         if (user.favPets.some(dog => dog.petfinderId === req.params.id) ) {
//             var dogDocId = user.favPets.find(dog => dog.petfinderId === req.params.id)._id;
//             User.findById(req.user.id, function(err, u) {
//                 u.favPets.remove(dogDocId);
//                 u.save();
//             });
//         } else {
//             console.log('hitting add dog part of request')
//             Pet.findById(req.params.id, function(err, dog) {
//                 if(dog) {
//                     req.user.favPets.push(dog._id);
//                     req.user.save();
//                     res.end()
//                 } else {
//                     var options = {
//                     url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
//                     method: 'GET'
//                     };
//                     request(options.url, function( err, response, body) {

//                         let doc = JSON.parse(body);
//                         let dog = doc.petfinder.pet;
//                         Pet.create({
//                             name: dog.name.$t,
//                             contact: {
//                                 phone: dog.contact.phone.$t,
//                                 email: dog.contact.email.$t,
//                                 state: dog.contact.state.$t,
//                                 city: dog.contact.city.$t,
//                                 zipcode: dog.contact.zip.$t
//                             },
//                             petfinderId: dog.id.$t,
//                             photos: dog.media.photos.photo[2].$t || "http://i.imgur.com/vI1T0h6.jpg?1",
//                             description: dog.description.$t,
//                             animal: dog.animal.$t
//                         }, function( err, dog) {
//                                 console.log(err)
//                                 console.log('Get dog from MONGO', dog)
//                                 req.user.favPets.push(dog._id);
//                                 req.user.save(function(err) {
//                                     res.end();
//                             });
//                         });
//                     })
//                 }
//             })
//         }
//     })
// };



module.exports = {
    getStocks
}