
//require('dotenv').config();

/* Variables */
let author = '';
let title = '';
//let key = process.env.API_KEY;
let url = '';
let clickedPlot = null;
let bookSearchResults = [];
let usersBooks = [];

/* Book class */
class Book {
  constructor(title, author, genres, description, status, plot){
    this.title = title;
    this.author = author;
    this.genres = genres;
    this.description = description;
    this.status = status;
    this.plot = plot;
  }
};

/* DOM queries */
let plotButtons = document.querySelectorAll('#plot-btn');
let userSearch = document.getElementById('user-input');
let selectBtn = document.querySelectorAll('#select');
let displayDiv = document.getElementById('scroll-search-results');

plotButtons.forEach((btn, index) => {
  btn.addEventListener('click', (event) => {
    clickedPlot = index;

    if(btn.className == 'sprout' || btn.className == 'flower') {
      for(let book of usersBooks){
        if(book.plot == index){
          displayDetails(usersBooks.indexOf(book));
          break;
        }
      }
    }

  })
});

/* Search Section */

let getSearchElements = (input) => {
  author = document.getElementById('author').value;
  title = document.getElementById('title').value;
  url =  `https://www.googleapis.com/books/v1/volumes?q=${titleSearchTerms(title)}+${authorSearchTerms(author)}&key=${key}`;
};

/* Capture form information on submission */
userSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  getSearchElements(event);
  /* GET request */
  fetch(url)
  .then(rawResponse => {
    if(!rawResponse.ok){
      throw new Error(`code: ${rawResponse.status}, status text: ${rawResponse.statusText}`);
    }
    return rawResponse.json();
  })
  .then(jsonifiedResponse => displayResults(searchResults(jsonifiedResponse)))
  .catch(error => console.log(error));
});

/* Search helper functions */
let titleSearchTerms = (inputTitle) => {
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

let authorSearchTerms = (inputAuthor) => {
  let authorKeyWords = inputAuthor.toLowerCase().split(" ");
  //convert author keywords into url friendly format
  return 'inauthor:' + authorKeyWords.reduce((final, elm) => final = final + '+' + elm);
};

let searchResults = (resultObj) => {
  return resultObj.items.map((book) => {
    let title = book.volumeInfo.title;
    let author = book.volumeInfo.authors == undefined ? undefined : book.volumeInfo.authors.join(', ');
    let genres = book.volumeInfo.categories == undefined? undefined : book.volumeInfo.categories.join(', ');
    let description = book.volumeInfo.description;
    return new Book(title, author, genres, description);
  });
};

let displayResults = (bookObjArray) => {
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

let getSelectBtnInfo = () => {
  selectBtn = document.querySelectorAll('#select');
  selectBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let selectedBook = bookSearchResults[index];
        usersBooks.push(new Book(selectedBook.title, selectedBook.author, selectedBook.genres, selectedBook.description, 'Started', clickedPlot));
        displayDetails(usersBooks.length - 1);
    });
  })
}

/* Details section */
let displayDetails = (index) => {
  let displayBook = usersBooks[index];
  let displayTitle = document.getElementById('title-output');
  let displayAuthor = document.getElementById('author-output');
  let displayGenre = document.getElementById('genre-output');
  let displayDescription = document.getElementById('description-output');
  let saveButton = document.getElementById('save-btn');

  if (usersBooks.length > 0) {
    displayTitle.innerHTML = displayBook.title;
    displayAuthor.innerHTML = displayBook.author;
    displayGenre.innerHTML = displayBook.genre;
    displayDescription.innerHTML = displayBook.description;
  }

  saveButton.addEventListener('click', (target) => {
    displayPlot();
  });
}

let displayPlot = () => {
  usersBooks.forEach((book) => {
    book.status == 'Started' ? plotButtons[clickedPlot].className = 'sprout' : plotButtons[clickedPlot].className = 'flower'
    book.status == 'Started' ? plotButtons[clickedPlot].innerHTML = 'sprout' : plotButtons[clickedPlot].innerHTML = 'flower'
  })
}