const myLibrary = [];
const content = document.querySelector('#content');

const newBookButton = document.querySelector('#new-book');
const dialog = document.querySelector('#book-dialog');

newBookButton.addEventListener('click', () => {
    dialog.showModal();
});

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


/* TEST SUITE 
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
console.log(book1.info()); // "The Hobbit by J.R.R. Tolkien, 310 pages, read"

console.log(book1.id); // Unique identifier for book1
/* END TEST SUITE */

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
addBookToLibrary("Mockingbird", "Harper Lee", 281, true);


function renderBooks() {
    for (let book of myLibrary) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('bookCard');

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        bookDiv.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `by ${book.author}`;
        bookDiv.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = `${book.pages} pages`;
        bookDiv.appendChild(bookPages);

        const buttonDiv = document.createElement('div'); // Wrap the two buttons in a div so they appear on the same line
        buttonDiv.className = 'button-container';

        const bookRead = document.createElement('button');
        bookRead.textContent = book.read ? 'Read' : 'Not Read Yet';
        buttonDiv.appendChild(bookRead); // Append to child div

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.bookId = book.id; // Store the book's unique ID in a data attribute
        deleteButton.className = 'delete-button';
        buttonDiv.appendChild(deleteButton); // Append to child div

        bookDiv.appendChild(buttonDiv); // Append container div to parent div

        content.append(bookDiv);
    }
}

renderBooks();

const closeDialogButton = document.querySelector('#close-dialog');
closeDialogButton.addEventListener('click', () => {
    dialog.requestClose();
});

const newBookForm = document.querySelector('#book-form');
newBookForm.addEventListener('submit', (event) => {

    // Read form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    // Create new book from form values and add to library
    addBookToLibrary(title, author, pages, read);

    dialog.requestClose(); // Close the dialog after adding the book

    content.innerHTML = ''; // Clear existing book cards
    renderBooks(); // Re-render the book cards

    event.preventDefault(); // Prevent the default form submission behavior

    newBookForm.reset(); // Reset the form fields
})