const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String
    },

    author: {
        type: String
    },

    price: {
        type: String
    },

    image: {
        type: String
    },

    category : {
        type: String,
        enum: ["Fiction", "Non-Fiction", "Young Adult", "All", "Library Classifications"]
    },

    genre: {
        type: String,
        enum: [ 
            "Fantasy", 
            "Romance", 
            "Historical", 
            "Self-Help", 
            "History", 
            "Thriller",
            "Literary Fiction",  
            "Business", 
            "Finance",
            "Science", 
            "Family Fiction", 
            "Entrepreneurship", 
            "Moral Fiction"]
    },

    rating: {
        type: String
    },

    bookFormate : {
        type: String
    },

    isbn: {
        type: String
    },

    language: {
        type: String
    },

    pages : {
        type: String
    },

    publishYear : {
        type: String
    },

    publisher : {
        type: String
    },

    subGenre : {
        type: String
    },

    summary : {
        type: String
    },

    discount : {
       type : String
    },

    discountPrice : {
        type: String
    },

    salePrice : {
        type: String
    },

    deliveryCharges : {
        type: String
    },

    quantity: {
        type: String
    }
},
{timeStamps: true}
)

const BooksData = mongoose.model('BooksData', bookSchema)

module.exports = BooksData;
