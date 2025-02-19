//require('dotenv').config();

/* Variables */
let author = '';
let title = '';
//let key = process.env.API_KEY;
let url = '';
let clickedPlot = 0;
let bookSearchResults = [];
let usersBooks = [];

/* Book class */
class Book {
  constructor(title, author, genres, description, status, plot, rating){
    this.title = title;
    this.author = author;
    this.genres = genres;
    this.description = description;
    this.status = status;
    this.plot = plot;
    this.rating = 0;
  }
  setRating(num) {
    this.rating = num;
  }
};

/* DOM queries */
let plotButtons = document.querySelectorAll('#plot-btn');
let userSearch = document.getElementById('user-input');
let selectBtn = document.querySelectorAll('#select');
let displayDiv = document.getElementById('scroll-search-results');
let statusForm = document.getElementById('status');
let saveButton = document.getElementById('save-btn');
let deleteButton = document.getElementById('delete-btn');
let displayTitle = document.getElementById('title-output');
let displayAuthor = document.getElementById('author-output');
let displayGenre = document.getElementById('genre-output');
let displayDescription = document.getElementById('description-output');
let sign = document.getElementById('sign');
let stars = document.querySelectorAll('.stars');

let user = localStorage.getItem('userName') ||  prompt('Welcome to your literary garden! What name should we use for this plot?', 'Your');
if (user == null || user == "") {
  alert(`I didn't quite get that!`);
} else {
  alert(`Welcome, ${user}!`);
  sign.innerHTML = `${user}'s 2025 Literary Garden`;
}

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
  .catch(error => {
    alert(`Please check author and title, and search again!`);
    console.log(error);
  });
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
  if (usersBooks.length > 0) {
    displayTitle.innerHTML = displayBook.title;
    displayAuthor.innerHTML = displayBook.author;
    displayGenre.innerHTML = displayBook.genre;
    displayDescription.innerHTML = displayBook.description;
    stars.forEach((star, index) => {
      if(index < displayBook.rating) {
        star.id = 'fill';
      } else if(index >= displayBook.rating){
        star.id = '';
      }
    })
  }
}

saveButton.addEventListener('click', (target) => {
  for(let book of usersBooks){
    if(book.plot == clickedPlot){
      book.status = statusForm.value;
      break;
    }
  }
  displayPlot();
});

deleteButton.addEventListener('click', (target) => {
  for(let i=0; i < usersBooks.length; i++){
    if(usersBooks[i].plot == clickedPlot){
      usersBooks.splice(i, 1);
      plotButtons[clickedPlot].className = '';
      plotButtons[clickedPlot].innerHTML = '+';
      break;
    }
  }
  displayPlot();
});

let displayPlot = () => {
  usersBooks.forEach((book) => {
    book.status === 'Started' ? plotButtons[book.plot].className = 'sprout' : plotButtons[book.plot].className = 'flower'
    book.status === 'Started' ? plotButtons[book.plot].innerHTML = '' : plotButtons[book.plot].innerHTML = ''
  })
}

/* Save to local storage (refresh-proof) */
addEventListener('beforeunload', () => {
  localStorage.setItem('usersBooks', JSON.stringify(usersBooks));
  localStorage.setItem('userName', user);
});

/* Get from local storage (refresh-proof) */
if(localStorage.getItem('usersBooks')){
  const storedBooks = JSON.parse(localStorage.getItem('usersBooks'));
  usersBooks = storedBooks.map((book) => new Book(book.title, book.author, book.genres, book.description, book.status, book.plot, book.rating));
  let ratings = [];
  storedBooks.forEach((storedBook)=>{
    ratings.push(storedBook.rating);
  })
  usersBooks.forEach((userBook, index) => {
    userBook.setRating(ratings[index]);
  })
  displayPlot();
}

/* Star colors */
stars.forEach((star, index) => {
  star.addEventListener('click', (target) => {
    let rating = index + 1;
    for(let book of usersBooks){
      if(book.plot == clickedPlot){
        book.rating = rating;
        break;
      }
    };
    for(let book of usersBooks){
      if(book.plot == clickedPlot){
        displayDetails(usersBooks.indexOf(book));
        break;
      }
    }
  });
});