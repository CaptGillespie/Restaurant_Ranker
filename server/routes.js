const controller = require('./controller');

module.exports = function (app){
    app.get('/api/restaurant', controller.allRestaurants)
    app.post('/api/restaurant', controller.createRestaurant)
    app.get('/api/restaurant/:id', controller.oneRestaurant)
    app.delete('/api/restaurant/:id', controller.deleteRestaurant)
    app.put('/api/restaurant/:id', controller.updateRestaurant)
   
 
    app.patch('/api/restaurant/:rid', controller.addReview)
    app.put('api/restaurant/:rid/:id', controller.updateReview)
    app.delete('/api/restaurant/:rid/:id', controller.deleteReview)

    // app.put('/api/restaurant/:id/:vid', controller.updateVote)

    // app.all("*", (req,res,next) => {
    //     res.sendFile(path.resolve("./public/dist/public/index.html"))
    //   });
}