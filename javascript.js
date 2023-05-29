const bookList = document.getElementById('bookList');
const addBtn = document.querySelector('.add');
const parent = document.querySelector('.parent');

// Create a collection to store books
let books = [];

// Function to add a new book to the collection
function addBook() {
  // Get the input values
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const title = titleInput.value;
  const author = authorInput.value;

  // Check if both inputs are filled
  if (title === '' || author === '') {
    alert('Please enter both the title and author.');
    return;
  }

  // Create a new book object
  const book = {
    title: title,
    author: author
  };

  // Add to the collection
  books.push(book);

  saveBooks();

  titleInput.value = '';
  authorInput.value = '';

  displayBooks();
}

function removeBook(index) {
  // Remove the book from the collection using the index
  books = books.filter((_, i) => i !== index);

  // Save collection to localStorage
  saveBooks();

  // Display the books
  displayBooks();
}

// Function to display all books
function displayBooks() {
  // Clear the book list to not reapet the code twice 
  bookList.innerHTML = '';

  // Display each book in the collection
  books.forEach((book, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${book.title} by ${book.author}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBook(index);
    });

      listItem.appendChild(removeButton);
        // insert evey thing befor the input fields
      bookList.insertBefore(listItem, bookList.firstChild);
  });
}

addBtn.addEventListener('click', addBook)

// Function to save the collection to localStorage
function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Function to load the collection from localStorage
function loadBooks() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    displayBooks();
  }
}

// Load the books from localStorage on page load
loadBooks();
