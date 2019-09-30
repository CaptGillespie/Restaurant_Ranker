const Pets = require('./models')

const controllers ={

    createRestaurant: (req, res) => {
        Pets.create(req.body)
            .then(data=> res.json ({info: data, msg:'success'}))
            .catch(err=> res.json({info: err, msg: 'ERROR!'}))
    },

    allRestaurants: (req, res) =>{
        Pets.find().sort({votes:-1})
            .then(data=> res.json ({info: data, msg:'success'}))
            .catch(err=> res.json({info: err, msg: 'ERROR!'}))
    },

    oneRestaurant: (req, res) =>{
        Pets.findById(req.params.id)
        .then(data=> res.json ({info: data, msg:'success'}))
        .catch(err=> res.json({info: err, msg: 'ERROR!'}))
    },

    updateRestaurant: (req, res) => {
        Pets.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
            .then(data=> res.json ({info: data, msg:'success'}))
            .catch(err=> res.json({info: err, msg: 'ERROR!'}))
    },

    deleteRestaurant: (req, res) =>{ console.log("hit the delete route")
        Pets.remove({_id: req.params.id})
        .then(data=> res.json ({info: data, msg:'deleted!'}))
        .catch(err=> res.json({info: err, msg: 'ERROR!'}))
        },






    addReview: (req,res)=>{
        Pets.findOneAndUpdate({_id:req.params.rid}, {$push:{reviews: req.body}})
        .then (data=> res.json({info: data, msg:'added Review!'}))
        .catch(err => res.json({info: err, msg: 'ERROR!'}))
    },

    updateReview:(req,res)=>{
        Pets.$where.findOneAndUpdate(
            {"_id":req.params.rid, "reviews._id":req.params.id},
            {
                "$set":{"reviews.$.comment":req.body.comment},
                "$set":{"reviews.$.stars":req.body.stars}
            }
        )
    },
    deleteReview: (req,res)=>{
        Pets.findOneAndUpdate(
            {_id:req.params.rid},
            {
                $pull:{reviews:{_id:req.params.id}}}
            )
        .then (data=> res.json({info: data, msg:'deleted the review!'}))
        .catch(err => res.json({info: err, msg: 'ERROR!'}))
    },


    // updateVote: function updateVote(req, res){
    //     Pets.findOneAndUpdate(
    //         {"_id":req.params.id, "votes._id":req.params.vid},
    //         {
    //             "$set":{"restaurants.$.votes":req.body.votes}
    //         }
    //         .then (data=> res.json({message:"success", restaurants:data}))
    //     .catch(err => res.json({message:"failed", errors:err}))
    //     )
    // }





}

module.exports = controllers