const mongoose = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: [3, "First name must be at least 3 characters"],
        //required:  [true, 'First name is required'],
        validate: {
            validator(value){
                return NAME_PATTERN.test(value)
            }, message: 'First name may contain only english letters'
        }
    },
    lastName: {
        type: String,
        minLength: [5, "First name must be at least 5 characters"],
        //required: [true, 'Last name is required'],
        validate: {
            validator(value){
                return NAME_PATTERN.test(value)
            }, message: 'Last name may contain only english letters'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator(value){
                return EMAIL_PATTERN.test(value)
            }, message: 'Email is not correct'
        }
        
    },
    password: {
        type: String,
        minLength: [4, 'Password must be at least 4 characters'],
        required: [true, 'Password is required'],
    },
    myPosts: [{
        type: mongoose.Types.ObjectId,
        //minLength: 20,
        ref: 'PostModel',
    }],
})
const User = mongoose.model('User', userSchema);
module.exports = User;
//userSchema.virtual('repeatPassword')