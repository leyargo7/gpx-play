import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required:[ true, 'Email is required' ],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, 'Password is required'],
        select: false,
    },
    fullname: {
        type: String,
        required: [ true, 'Fullname is required'],
        minLength: [ 3, 'Fullname must be at least 3 characters'],
        maxLength: [ 50, 'Fullname must be at most 50 characters'],
    },
    member:{
        type: Boolean,
        default: false,
    },
    
},{
    timestamps: true,
    versionKey: false,
});

const User = models.User || model('User', userSchema);
export default User;