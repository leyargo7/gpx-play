import { Schema, model, models } from "mongoose";

const videoSchema = new Schema({
    title: {
        type: String,
        required:[ true, 'Title is required' ],
        minLength: [ 3, 'Title must be at least 3 characters'],
        maxLength: [ 100, 'Title must be at most 100 characters'],
    },
    description: {
        type: String,
        required: [ true, 'Description is required'],
        minLength: [ 3, 'Description must be at least 3 characters'],
        maxLength: [ 500, 'Description must be at most 500 characters'],
    },
    url: {
        type: String,
        required: [ true, 'URL is required'],
    },
    thumbnailUrl: {
        type: String,
        required: [ true, 'thumbnailUrl is required'],
    },
    category: {
        type: String,
        required: [ true, 'Category is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true,
    versionKey: false,
});

const Video = models.Video || model('Video', videoSchema);
export default Video;