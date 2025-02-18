//If connected, set sprout or flower icon based on status selected
//import {getUsersBooks} from './helpers.js';
//import {getClickedPlot} from './main.js';

class Book {
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

let displayBook = usersBooks[usersBooks.length - 1];
let displayTitle = document.getElementById('title-output');
let displayAuthor = document.getElementById('author-output');
let displayGenre = document.getElementById('genre-output');
let displayDescription = document.getElementById('description-output');
let saveButton = document.getElementById('save-btn');

displayTitle.innerHTML += displayBook.title;
displayAuthor.innerHTML += displayBook.author;
displayGenre.innerHTML += displayBook.genre;
displayDescription.innerHTML += displayBook.description;

saveButton.addEventListener('click', (target) => {
  displayBook.setPlot(getClickedPlot());
});