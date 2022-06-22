const Sauce = require('../models/Sauce')
const fs = require('fs')

exports.getAllSauces = (req,res,next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch(error => res.status(404).json({error}))
}

exports.getOneSauce = (req,res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}))
}

exports.createSauce = (req,res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
    .then(() => res.status(201).json({message: "Sauce created !"}))
    .catch(error => res.status(400).json({error}));
  }

exports.modifySauce = (req,res) => {
    if(req.file) { 
        console.log(req.file)
        //Supprimer l'ancien fichier dans le serveur
        Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => console.log("Picture deleted !"))
        })
        
        //Créer le nouvel objet et le MAJ
        const sauceObject = {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        updateSauce(sauceObject)
    } 
    else {
        const sauceObject = {...req.body}
        updateSauce(sauceObject)
    }

    function updateSauce(p){
        Sauce.updateOne({_id: req.params.id}, {...p, _id: req.params.id})
        .then(() => res.status(200).json({message: "Sauce updated !"}))
        .catch(error => res.status(400).json({error}))
    }
}

exports.deleteSauce = (req,res) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        if(!sauce) 
            return res.status(400).json({error: new Error("Sauce not found !")})
        if(sauce.userId !== req.auth.userId) 
            return res.status(401).json({error: new Error("Non authorized request !")})
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Sauce deleted !'}))
            .catch(error => res.status(500).json({error}))
        })
    })
    .catch(error => res.status(500).json({error}))
}

exports.likeSauce = (req,res) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        let userWantsToLike = (req.body.like === 1)
        let userWantsToDislike = (req.body.like === -1)
        let userWantsToUnvote = (req.body.like === 0)
        let userHasLiked = (sauce.usersLiked.includes(req.body.userId))
        let userHasDisliked = (sauce.usersDisliked.includes(req.body.userId))
        let userWantsToVote = userHasLiked || userHasDisliked

        //Cas 1 : L'utilsateur n'a pas encore noté et met un like
        if (!userWantsToVote && userWantsToLike) {
            sauce.usersLiked.push(req.body.userId) 
        }
        
        //Cas 2 : L'utilsateur n'a pas encore noté et met un dislike
        if (!userWantsToVote && userWantsToDislike) {
            sauce.usersDisliked.push(req.body.userId) 
        }
       
        //Cas 3 : L'utilisateur retire son like
        if (userWantsToUnvote && userHasLiked){
            let userIdIndex = sauce.usersLiked.indexOf(req.body.userId)
            sauce.usersLiked.splice(userIdIndex, 1)
        }
    
        //Cas 4 : L'utilisateur retire son dislike
        if (userWantsToUnvote && userHasDisliked){
            let userIdIndex = sauce.usersDisliked.indexOf(req.body.userId)
            sauce.usersDisliked.splice(userIdIndex, 1)
        }
        sauce.likes = sauce.usersLiked.length;
        sauce.dislikes = sauce.usersDisliked.length;
        Sauce.updateOne({_id: req.params.id}, sauce)
        .then(() => res.status(201).json({message: "Rate added !"}))
        .catch(error => res.status(400).json({error}));

    })
    .catch(() => res.status(500).json({Message : "Internal Server Error !"}))
}