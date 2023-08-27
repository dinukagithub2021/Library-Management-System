const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    telephone:{
        type: String,
        required: true,
    },
    birthday:{
        type: String,
        required: true,
    },
    admissionNo:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
})

userSchema.statics.signup = async function(name,age,telephone,birthday,admissionNo,address,email, password){
    if(!name){
        throw Error("Name must be filled")
    }

    if(!password){
        throw Error("Password must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("The email is not a valid email!")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("The password is not strong. Retype a new password")
    }
    
    const exists = await this.findOne({email})
    if(exists){
        throw Error("Email is already in use!")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({name,age,telephone,birthday,admissionNo,address,email, password:hash})
    return user
}

userSchema.statics.loginUser = async function(email,password){
    if(!email || !password){
        throw Error("Fill the email and the password")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error("No user has registered under this email!")
    }

    const isMatching = await bcrypt.compare(password, user.password)
    if(!isMatching){
        throw Error("Incorrect Password!")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)