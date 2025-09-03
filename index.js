const { initializeDB } = require("./db.connect");
const BooksData = require("./book.model");
console.log(BooksData, "checking booksData")
// const fs = require("fs");

const express = require("express");
const cors = require("cors");

const app = express()
app.use(cors());

const corsOptions = {
    origin: "*",
    Credential : true
}

initializeDB();

// const jsonData = fs.readFileSync("book.json", "utf-8");
// console.log(jsonData, "checking jsonData")

// const booksData = JSON.parse(jsonData)
// console.log(booksData, "Checking booksData")

// function seedData(){
//     try{
//         for(const bookData of booksData){
//             const newBook = new BooksData({
//                  name: bookData.name,
//                  author: bookData.author,
//                  price: bookData.price,
//                  image : bookData.image,
//                  category: bookData.category,
//                  genre: bookData.genre,
//                  rating: bookData.rating,
//                  isbn: bookData.isbn,
//                  language: bookData.language,
//                  pages: bookData.pages,
//                  publishYear: bookData.publishYear,
//                  publisher: bookData.publisher,
//                  subGenre: bookData.subGenre,
//                  summary: bookData.summary,
//                  discount: bookData.discount,
//                  discountPrice: bookData.discountPrice,
//                  salePrice: bookData.salePrice,
//                  deliveryCharges: bookData.deliveryCharges
//             });
//             console.log(newBook.name)
//             newBook.save();
//         }
//     } catch(error){
//         console.log("Error in seeding the data", error);
//     }
// }

// seedData();


// get all books by booksData from the db.

async function readAllBooks(){
    try{
        const allBooks = await BooksData.find()
        // console.log("All Books: ", allBooks)
        return allBooks
    } catch(error){
        console.log(error)
    }
}

app.get("/books", async(req, res) => {
    try{
        const booksAll = await readAllBooks()
        if(booksAll){
            res.json(booksAll)
        } else{
            res.status(404).json({error: "Books not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books."})
    }
})

// get booksData by bookId from the db.
async function getBooksById(bookId){
    try{
        const getBook = await BooksData.findById(bookId)
        console.log(getBook)
        return getBook
    } catch(error){
        throw error
    }
}
// getBooksById("68a9e1b504166310e55326c2")

app.get("/books/getBooks/:bookId", async(req, res) => {
    try{
        const BookById = await getBooksById(req.params.bookId)
        console.log(BookById)

        if(BookById){
            res.json(BookById)
        } else{
            res.json({error: "Books not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch book."})
    }
})

// get booksData by categories from the db.

async function getBooksCategories(booksByCategory){
    try{
        const categoryBooks = await BooksData.find({category: booksByCategory})
        // console.log(categoryBooks)
        return categoryBooks

    } catch(error){
        throw error
    }
}
// getBooksCategories("Fiction")



app.get("/books/:booksByCategory", async(req, res) => {
    try{
        const booksCategory =  await getBooksCategories(req.params.booksByCategory)
        console.log("checking book category", booksCategory)
        if(booksCategory){
            res.json(booksCategory)
        } else{
            res.json({error: "Book not found."})
        }

    } catch(error){
        res.status(500).json({error: "Failed to fetch book."})
    }
})


// async function deleteBook(BookId){
//     try{
//         const deleteBook = await BooksData.findByIdAndDelete(BookId)
//         console.log(deleteBook)
//         return deleteBook

//     } catch(error){
//         throw error
//     }
// }
// deleteBook("68a9e1b504166310e55326c0")



// async function deleteBooks(category){
//     try{
//         const deleteBook = await BooksData.deleteMany({category: category})
//         console.log(deleteBook)
//         return deleteBook

//     } catch(error){
//         throw error
//     }
// }
// deleteBooks("Young Adult")


const PORT = 2000
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})






