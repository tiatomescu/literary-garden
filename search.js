require('dotenv').config();
import {Book, titleSearchTerms, authorSearchTerms, searchResults, displayResults, getSelectBtnInfo} from './helpers.js';

/* Variables */
let author = '';
let title = '';
let key = process.env.API_KEY;
let url = '';

/* HTML DOM element variables */
let userSearch = document.getElementById('user-input');

/* DOM manipulation */
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



