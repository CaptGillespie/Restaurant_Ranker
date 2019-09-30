const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/PetsDB');


const RestaurantSchema = new mongoose.Schema({
    
    name: {type: String, unique: [true, "*Already exists in database"], minlength: 3, required: [true, "*What's the Name of the Restaurant?"]},
    type: {type: String, minlength: 3, required: [true, "*What sort of food?"]},
    description: {type: String, minlength: 3, required: [true, "*Describe it!"]},
    votes: {type: Number, default: 0},
    reviews:[{
        yourname:{type:String, minlength:[3, "Don't be shy, leave your name!"]}, 
        stars:{type:Number, default: 1},
        comment: {type: String, minlength: [3, "Get your internet bravado on"]}
    }]

},
{timestamps:true}
)


const Restaurant = mongoose.model("Restaurant", RestaurantSchema);


module.exports = Restaurant;


    