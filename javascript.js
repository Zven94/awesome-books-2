const bookList = document.getElementById('bookList');
const addBtn = document.querySelector('.add');

// Create a collection to store books
let books = [];

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Function to display all books
function displayBooks() {
  // Clear the book list to not repeat the code twice
  bookList.innerHTML = '';

  // Display each book in the collection
  books.forEach((book, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${book.title} <br> ${book.author}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButtonStyle');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      // Remove the book from the collection
      books.splice(index, 1);

      // Save collection to localStorage
      saveBooks();

      // Display the updated books
      displayBooks();
    });

    listItem.appendChild(removeButton);
    // Insert everything before the input fields
    bookList.insertBefore(listItem, bookList.firstChild);
  });
}

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
    title,
    author,
  };

  // Add to the collection
  books.push(book);

  saveBooks();

  titleInput.value = '';
  authorInput.value = '';

  displayBooks();
}

// Function to save the collection to localStorage

// Function to load the collection from localStorage
function loadBooks() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    displayBooks();
  }
}

addBtn.addEventListener('click', addBook);

// Load the books from localStorage on page load
loadBooks();
