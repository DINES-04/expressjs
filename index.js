const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

let books = [
  { id: 1, title: "1984", author: "George Orwell", year: 1949 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id == id);
  if (!book) {
    return res.status(404).json({ message: "BOOK ID NOT FOUND!" });
  }
  res.status(200).json(book);
});

app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  const newBook = { id: Date.now(), title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { year } = req.body;
  const book = books.find((b) => b.id == id);
  if (!book) {
    return res.status(404).json({ message: "BOOK ID NOT FOUND!" });
  }
  book.year = year;
  res.json("Successfully updated");
});

app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id == req.params.id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "BOOK ID NOT FOUND!" });
  }
  books.splice(bookIndex, 1);
  res.status(200).json("Successfully deleted");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
