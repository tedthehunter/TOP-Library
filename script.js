const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); // Generate a unique identifier for each book

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // Boolean indicating if I have read the book

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read); // Create a new book object
    myLibrary.push(book); // Push it to the library array
}


/* TEST SUITE */
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
console.log(book1.info()); // "The Hobbit by J.R.R. Tolkien, 310 pages, read"

console.log(book1.id); // Unique identifier for book1
/* END TEST SUITE */