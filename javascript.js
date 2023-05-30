class BookCollection {
  static initialize() {
    const bookCollection = new BookCollection();
    return bookCollection;
  }

  constructor() {
    this.bookList = document.getElementById('bookList');
    this.addBtn = document.querySelector('.add');
    this.books = [];
    this.loadBooks();
    this.addBtn.addEventListener('click', () => this.addBook());
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    this.bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const listItem = document.createElement('li');
      const listItemH2 = document.createElement('h2');
      listItem.appendChild(listItemH2);
      // create an specific css class to alternate the style of the list

      if (index % 2 !== 0) {
        listItem.classList.add('makeMeGrey');
      }
      listItem.innerHTML = `${book.title} <br> ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.classList.add('removeButtonStyle');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      listItem.appendChild(removeButton);
      this.bookList.insertBefore(listItem, this.bookList.firstChild);
    });
  }

  addBook() {
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const title = titleInput.value;
    const author = authorInput.value;

    if (title === '' || author === '') {
      alert('Please enter both the title and author.');
      return;
    }

    const book = {
      title,
      author,
    };

    this.books.push(book);

    this.saveBooks();

    titleInput.value = '';
    authorInput.value = '';

    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooks();
    this.displayBooks();
  }

  loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
      this.displayBooks();
    }
  }
}

BookCollection.initialize();