const Creature = require('../models/Creature');
const User = require('../models/User');


exports.getAll = () => Creature.find({}).lean();

exports.getById = (userId) => User.findById(userId);

exports.create = async (ownerId, creatureData) => {
    const user = await this.getById(ownerId);
    creatureData.owner = {
        _id: user._id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email
    };
    
    const creature = await Creature.create({ ...creatureData });
    
};

exports.getOneDetailed = (creatureId) => Creature.findById(creatureId).populate('owner').populate('votes', 'email');

exports.getOne = (creatureId) => Creature.findById(creatureId).lean();

exports.edit = (photoId, photoData) => Creature.findByIdAndUpdate(photoId, photoData, { runValidators: true });

exports.getPostByAuthor = (userId) => Creature.find({owner: userId}) 

exports.vote = async (userId, creatureId, value) => {
    const creature = await Creature.findById(creatureId);
    const user = await this.getById(userId);

    if (creature.votes.includes(user)) {
        throw new Error('User has already voted!');
    }
    creature.votes.push(user);
    return creature.save();
}

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);


