const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory book list
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// ✅ Home route (optional)
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book Management API!');
});

// ✅ GET /books - Return all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// ✅ POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// ✅ PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// ✅ DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  const deletedBook = books.splice(index, 1);
  res.status(200).json(deletedBook[0]);
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
