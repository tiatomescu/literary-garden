export class Book {
  constructor(title, author, genres, description, status, plot){
    this.title = title;
    this.author = author;
    this.genres = genres;
    this.description = description;
    this.status = 'Started';
    this.plot = 0;
  }

  setPlot = (num) => {
    this.plot = num;
  }
};

let usersBooks = JSON.parse(localStorage.getItem("usersBooks")).map((book) => {
  return new Book(book.title, book.author, book.genre, book.description, book.status, book.plot);
}) || [];

export let titleSearchTerms = (inputTitle) => {
  let titleArr = inputTitle.toLowerCase().split(" ");
  //Remove common first word
  let commonFirstWords = [
    'it',    'once', 'in', 'the',   'a',    'when','on',
    'as',   'call', 'there', 'she',  'he', 'this',  'we',
    'was', 'to',    'all',  'for', 'now',   'many', 'through'
  ]
  let containsWord = commonFirstWords.find((elm) => elm == titleArr[0]);
  let titleKeyWords = containsWord == undefined ? titleArr : titleArr.splice(1);
  //convert title keywords into url friendly format
  return 'intitle:' + titleKeyWords.reduce((final, elm) => final = final + '+' + elm);
};

export let authorSearchTerms = (inputAuthor) => {
  let authorKeyWords = inputAuthor.toLowerCase().split(" ");
  //convert author keywords into url friendly format
  return 'inauthor:' + authorKeyWords.reduce((final, elm) => final = final + '+' + elm);
};

export let searchResults = (resultObj) => {
  return resultObj.items.map((book) => {
    let title = book.volumeInfo.title;
    let author = book.volumeInfo.authors == undefined ? undefined : book.volumeInfo.authors.join(', ');
    let genres = book.volumeInfo.categories == undefined? undefined : book.volumeInfo.categories.join(', ');
    let description = book.volumeInfo.description;
    return new Book(title, author, genres, description);
  });
};

let displayDiv = document.getElementById('scroll-search-results');
let bookSearchResults = [];

export let displayResults = (bookObjArray) => {
  bookSearchResults = bookObjArray;
  let bookList = '';
  bookObjArray.forEach((elm) => {
    let description = elm.description == undefined ? undefined : `${elm.description.slice(0, 100)}...`
    bookList +=
    `<ul>
      <p>Title: ${elm.title}<br>Author: ${elm.author}<br>Description: ${description}<br></p>
      <button id="select"> Select </button>
    </ul>`;
  })
  displayDiv.innerHTML = bookList;
  getSelectBtnInfo();
}

let selectBtn = document.querySelectorAll('#select');

export let getSelectBtnInfo = () => {
  selectBtn = document.querySelectorAll('#select');
  selectBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let selectedBook = bookSearchResults[index];
        addBook(new Book(selectedBook.title, selectedBook.author, selectedBook.genres, selectedBook.description));
        window.location = 'details.html';
    });
  })
}

export function addBook(book) {
  usersBooks.push(book);
  localStorage.setItem("usersBooks", JSON.stringify(usersBooks));
}

export function getUsersBooks() {
  JSON.parse(localStorage.getItem("usersBooks")).map((book) => {
    return new Book(book.title, book.author, book.genre, book.description, book.status, book.plot);
  }) || [];
}