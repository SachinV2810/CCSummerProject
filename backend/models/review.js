
const mongoose=require('mongoose');
const {Schema}=require('mongoose');
const review=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }  
});

const Review = mongoose.model('Review', review);

module.exports = Review;
