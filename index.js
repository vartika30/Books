const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors());  // <-- IMPORTANT
app.use(express.json());
const {initializeDatabase} = require("./db/db.connect");
const fs = require("fs");
const Book = require("./models/book.models");

app.use(express.json())
initializeDatabase();

async function createBook(newBook){
  try{

    const res = new Book(newBook)
    const saveBook = await res.save();
    return saveBook
  }catch(error){
      throw error
  }
}

app.post("/book",async(req,res) => {
    try{
 const savedres = await createBook(req.body)
 res.status(200).json({message:"Book added",books:savedres})
    }catch(error){
        res.status(400).json({error:"Failed adding book"})
    }
})

async function readAllBook(){
    try{
const books = await Book.find();
return books
    }catch(error){
 throw error
    }
    
}

app.get("/book",async (req,res) => {
    try{
        const books = await readAllBook()
        res.send(books)

    }catch(error){
        res.status(500).json({error:"Data not found"})
    }
})

async function readAllBookByTitle(bookTitle){
    try{
const books = await Book.findOne({title:bookTitle});
return books
    }catch(error){
 throw error
    }
    
}

app.get("/book/:title",async (req,res) => {
    try{
        const books = await readAllBookByTitle(req.params.title)
        res.send(books)

    }catch(error){
        res.status(500).json({error:"Data not found"})
    }
})

async function readAllBookByAuthor(bookAuthor){
    try{
const books = await Book.findOne({author:bookAuthor});
return books
    }catch(error){
 throw error
    }
    
}

app.get("/book/author/:author",async (req,res) => {
    try{
        const books = await readAllBookByAuthor(req.params.author)
        res.send(books)

    }catch(error){
        res.status(500).json({error:"Data not found"})
    }
})

async function readAllBookByGenre(bookgrnre){
    try{
const books = await Book.findOne({genre:bookgrnre});
return books
    }catch(error){
 throw error
    }
    
}

app.get("/book/genre/:genre",async (req,res) => {
    try{
        const books = await readAllBookByGenre(req.params.genre)
        res.send(books)

    }catch(error){
        res.status(500).json({error:"Data not found"})
    }
})

async function readAllBookByYear(bookYear){
    try{
const books = await Book.findOne({publishedYear:bookYear});
return books
    }catch(error){
 throw error
    }
    
}

app.get("/book/year/:publishedYear",async (req,res) => {
    try{
        const books = await readAllBookByYear(req.params.publishedYear)
        res.send(books)

    }catch(error){
        res.status(500).json({error:"Data not found"})
    }
})

async function updateBook(bookId, dataUpdate){
    try{

        const updatedBook = await Book.findByIdAndUpdate(bookId,dataUpdate,{new:true});
        return updatedBook
    }catch(error){
      console.log("Error in updating Book rating", error)
    }
}

app.post("/book/:bookId",async(req,res) => {
    try{
          const updatedBook = await updateBook(req.params.bookId, req.body)
          if(updatedBook){
            res.status(200).json({message:"Book updated"})
          }else{
            res.status(400).json({error:"Book not found"})
          }
    }catch(error){
        res.status(500).json({error:"failed to update Book"})
           
    }
})

async function updateBookByTitle(booktitle, dataUpdate){
    try{

        const updatedBook = await Book.findOneAndUpdate({title:booktitle},dataUpdate,{new:true});
        return updatedBook
    }catch(error){
      console.log("Error in updating Book rating", error)
    }
}

app.post("/book/title/:title",async(req,res) => {
    try{
          const updatedBook = await updateBookByTitle(req.params.title, req.body)
          if(updatedBook){
            res.status(200).json({message:"Book updated"})
          }else{
            res.status(400).json({error:"Book not found"})
          }
    }catch(error){
        res.status(500).json({error:"failed to update Book"})
           
    }
})

async function deleteBook(bookId){
try{
 const deletedBook = await Book.findByIdAndDelete(bookId);
 return deletedBook;

}catch(error){
    console.log(error)
}
}

app.delete("/book/:bookId",async(req,res) => {
    try{
         const deleteMovie = await deleteBook(req.params.bookId)
        if(deleteMovie){
          res.status(200).json({message:"Book deleted"})
        }
        }catch(error){
        res.status(400).json({error:"Failed to delete Book"})
    }
})

module.exports = app;