//First project: grab API data from Google Books API
// There MUST be input values for title and author */
//Get index of the one I want, display book title, author name, genres, description.
require("dotenv").config();

/* Helper functions */
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
    let author = book.volumeInfo.authors.join(', ');
    let genres = book.volumeInfo.categories == undefined? undefined : book.volumeInfo.categories.join(', ');
    let description = book.volumeInfo.description;
    return new Book(title, author, genres, description);
  });
};

/* Variables */
let mockTitle = 'Onyx';
let mockAuthor = 'Rebecca Yarros';
let key = process.env.API_KEY;
let url = `https://www.googleapis.com/books/v1/volumes?q=${titleSearchTerms(mockTitle)}+${authorSearchTerms(mockAuthor)}&key=${key}`;

/* GET request */
fetch(url)
.then(rawResponse => {
  if(!rawResponse.ok){
    throw new Error(`code: ${rawResponse.status}, status text: ${rawResponse.statusText}`);
  }
  return rawResponse.json();
})
.then(jsonifiedResponse => searchResults(jsonifiedResponse))
.catch(error => console.log(error));

/* Book class */
// Not super sure if I want to keep this in THIS file but we shall see
class Book {
  constructor(title, author, genres, description){
    this.title = title;
    this.author = author;
    this.genres = genres;
    this.description = description;
  }
};


/* a Very Long mocked response */
// let mockJsonifiedResponse = {
//   "kind": "books#volumes",
//   "totalItems": 14,
//   "items": [
//     {
//       "kind": "books#volume",
//       "id": "cYwdEQAAQBAJ",
//       "etag": "oPGfMWPf4Wc",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/cYwdEQAAQBAJ",
//       "volumeInfo": {
//         "title": "Onyx Storm",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "WSOY",
//         "publishedDate": "2025-01-21",
//         "description": "Brave the dark. Get ready to fly or die in the breathtaking follow-up to Fourth Wing and Iron Flame from the no. 1 Sunday Times and New York Times bestselling author Rebecca Yarros. Returning to the richly imagined world of Fourth Wing and Iron Flame, the third instalment of Rebecca Yarros' scintillating romantasy series finds Violet in deadlier peril than ever before. \"Rebecca Yarros has created some awesome dragons! Proud, beautiful, and full of unique magics.\" Christopher Paolini, #1 NYT bestselling author of the Inheritance Cycle. Rebecca Yarros is the #1 New York Times bestselling author of more than fifteen novels, with multiple starred Publishers Weekly reviews and a Kirkus Best Book of the Year.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9789510514993"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "9510514993"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": true
//         },
//         "pageCount": 626,
//         "printType": "BOOK",
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": true,
//         "contentVersion": "1.3.3.0.preview.3",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=cYwdEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=cYwdEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//         },
//         "language": "en",
//         "previewLink": "http://books.google.com/books?id=cYwdEQAAQBAJ&printsec=frontcover&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=1&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=cYwdEQAAQBAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/Onyx_Storm.html?hl=&id=cYwdEQAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "PARTIAL",
//         "embeddable": true,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": true,
//           "acsTokenLink": "http://books.google.com/books/download/Onyx_Storm-sample-epub.acsm?id=cYwdEQAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//         },
//         "pdf": {
//           "isAvailable": true,
//           "acsTokenLink": "http://books.google.com/books/download/Onyx_Storm-sample-pdf.acsm?id=cYwdEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=cYwdEQAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "SAMPLE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "Returning to the richly imagined world of Fourth Wing and Iron Flame, the third instalment of Rebecca Yarros&#39; scintillating romantasy series finds Violet in deadlier peril than ever before. &quot;Rebecca Yarros has created some awesome dragons!"
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "04HU0AEACAAJ",
//       "etag": "yoWUlUlVz4M",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/04HU0AEACAAJ",
//       "volumeInfo": {
//         "title": "Onyx Storm: Discover the Follow-Up to the Global Phenomenons, Fourth Wing and Iron Flame!",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publishedDate": "2025-01-21",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_10",
//             "identifier": "0349443777"
//           },
//           {
//             "type": "ISBN_13",
//             "identifier": "9780349443775"
//           }
//         ],
//         "readingModes": {
//           "text": false,
//           "image": false
//         },
//         "pageCount": 0,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": false,
//         "contentVersion": "preview-1.0.0",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=04HU0AEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=04HU0AEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
//         },
//         "language": "en",
//         "previewLink": "http://books.google.com/books?id=04HU0AEACAAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=2&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=04HU0AEACAAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/Onyx_Storm_Discover_the_Follow_Up_to_the.html?hl=&id=04HU0AEACAAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "NO_PAGES",
//         "embeddable": false,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": false
//         },
//         "pdf": {
//           "isAvailable": false
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=04HU0AEACAAJ&hl=&source=gbs_api",
//         "accessViewStatus": "NONE",
//         "quoteSharingAllowed": false
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "vUQG0QEACAAJ",
//       "etag": "SzgjOLB2A4c",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/vUQG0QEACAAJ",
//       "volumeInfo": {
//         "title": "The Empyrean Series, 3 Books Collection Set, Fourth Wing, Iron Flame, Onyx Storm, by Rebecca Yarros",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publishedDate": "2025-01-21",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_10",
//             "identifier": "1637997930"
//           },
//           {
//             "type": "ISBN_13",
//             "identifier": "9781637997932"
//           }
//         ],
//         "readingModes": {
//           "text": false,
//           "image": false
//         },
//         "pageCount": 0,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": false,
//         "contentVersion": "preview-1.0.0",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "language": "en",
//         "previewLink": "http://books.google.com/books?id=vUQG0QEACAAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=3&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=vUQG0QEACAAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/The_Empyrean_Series_3_Books_Collection_S.html?hl=&id=vUQG0QEACAAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "NO_PAGES",
//         "embeddable": false,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": false
//         },
//         "pdf": {
//           "isAvailable": false
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=vUQG0QEACAAJ&hl=&source=gbs_api",
//         "accessViewStatus": "NONE",
//         "quoteSharingAllowed": false
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "-yU9EQAAQBAJ",
//       "etag": "2j3wK6b7eSY",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/-yU9EQAAQBAJ",
//       "volumeInfo": {
//         "title": "The Empyrean - Tome 03",
//         "subtitle": "Onyx Storm",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "Hugo Roman",
//         "publishedDate": "2025-06-18",
//         "description": "La guerre prend un tournant massif mais le plus grand risque vient désormais de l'intérieur. Plus amoureuse que jamais, Violet est bien décidée à affronter les ténèbres.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9782755673104"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "2755673109"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": false
//         },
//         "pageCount": 0,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": false,
//         "contentVersion": "preview-1.0.0",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=-yU9EQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=-yU9EQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
//         },
//         "language": "fr",
//         "previewLink": "http://books.google.com/books?id=-yU9EQAAQBAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=4&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=-yU9EQAAQBAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/The_Empyrean_Tome_03.html?hl=&id=-yU9EQAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "NO_PAGES",
//         "embeddable": false,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": false
//         },
//         "pdf": {
//           "isAvailable": false
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=-yU9EQAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "NONE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "La guerre prend un tournant massif mais le plus grand risque vient désormais de l&#39;intérieur. Plus amoureuse que jamais, Violet est bien décidée à affronter les ténèbres."
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "x87w0AEACAAJ",
//       "etag": "iPyrLS1HbMc",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/x87w0AEACAAJ",
//       "volumeInfo": {
//         "title": "Alas de Ónix / Onyx Storm",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "Planeta Publishing",
//         "publishedDate": "2025-01-22",
//         "description": "Desafía la oscuridad Tras casi dieciocho meses en el Colegio de Guerra Basgiath, Violet Sorrengail tiene claro que no queda tiempo para entrenar. Hay que tomar decisiones. La batalla ha comenzado y, con enemigos acercándose a las murallas e infiltrados en sus propias filas, es imposible saber en quién confiar. Ahora Violet deberá emprender un viaje fuera de los límites de Aretia en busca de aliados de tierras desconocidas que acepten pelear por Navarre. La misión pondrá a prueba su suerte, y la obligará a usar todo su ingenio y fortaleza para salvar a quienes más ama: sus dragones, su familia, su hogar y a él. Aunque eso signifique tener que guardar un secreto tan peligroso que podría destruirlo todo. Navarre necesita un ejército. Necesita poder. Necesita magia. Y necesitará algo que solo Violet puede encontrar: la verdad. Pero una tormenta se aproxima... y no todos sobrevivirán a su furia. ENGLISH DESCRIPTION Brave The Dark After nearly eighteen months at Basgiath War College, Violet Sorrengail knows there's no more time for lessons. No more time for uncertainty. Because the battle has truly begun, and with enemies closing in from outside their walls and within their ranks, it's impossible to know who to trust. Now Violet must journey beyond the failing Aretian wards to seek allies from unfamiliar lands to stand with Navarre. The trip will test every bit of her wit, luck, and strength, but she will do anything to save what she loves--her dragons, her family, her home, and him. Even if it means keeping a secret so big, it could destroy everything. They need an army. They need power. They need magic. And they need the one thing only Violet can find--the truth. But a storm is coming...and not everyone can survive its wrath.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_10",
//             "identifier": "6073923163"
//           },
//           {
//             "type": "ISBN_13",
//             "identifier": "9786073923163"
//           }
//         ],
//         "readingModes": {
//           "text": false,
//           "image": false
//         },
//         "pageCount": 0,
//         "printType": "BOOK",
//         "categories": [
//           "Young Adult Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": false,
//         "contentVersion": "preview-1.0.0",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=x87w0AEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=x87w0AEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
//         },
//         "language": "es",
//         "previewLink": "http://books.google.com/books?id=x87w0AEACAAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=5&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=x87w0AEACAAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/Alas_de_%C3%93nix_Onyx_Storm.html?hl=&id=x87w0AEACAAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "NO_PAGES",
//         "embeddable": false,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": false
//         },
//         "pdf": {
//           "isAvailable": false
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=x87w0AEACAAJ&hl=&source=gbs_api",
//         "accessViewStatus": "NONE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "Desafía la oscuridad Tras casi dieciocho meses en el Colegio de Guerra Basgiath, Violet Sorrengail tiene claro que no queda tiempo para entrenar."
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "Vuv4EAAAQBAJ",
//       "etag": "YH9fS0fFrqs",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/Vuv4EAAAQBAJ",
//       "volumeInfo": {
//         "title": "Onyx Storm",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "Entangled: Red Tower Books",
//         "publishedDate": "2025-01-21",
//         "description": "Discover the instant #1 New York Times bestseller! TV series now in development at MGM Amazon Studios with Michael B. Jordan’s Outlier Society. Accolades for Fourth Wing Amazon Best Books of the Year, #4 • Apple Best Books of the Year 2023 • Barnes & Noble Best Fantasy Book of 2023 • NPR \"Books We Love\" 2023 • Audible Best Books of 2023 • Hudson Book of the Year • Google Play Best Books of 2023 • Indigo Best Books of 2023 • Waterstones Book of the Year finalist • Goodreads Choice Award Winner • Newsweek Staffers’ Favorite Books of 2023 • Paste Magazine’s Best Books of 2023 • TikTok Book Awards UK and Ireland Book of the Year (International) 2024 After nearly eighteen months at Basgiath War College, Violet Sorrengail knows there’s no more time for lessons. No more time for uncertainty. Because the battle has truly begun, and with enemies closing in from outside their walls and within their ranks, it’s impossible to know who to trust. Now Violet must journey beyond the failing Aretian wards to seek allies from unfamiliar lands to stand with Navarre. The trip will test every bit of her wit, luck, and strength, but she will do anything to save what she loves—her dragons, her family, her home, and him. Even if it means keeping a secret so big, it could destroy everything. They need an army. They need power. They need magic. And they need the one thing only Violet can find—the truth. But a storm is coming...and not everyone can survive its wrath. The Empyrean series is best enjoyed in order. Reading Order: Book #1 Fourth Wing Book #2 Iron Flame Book #3 Onyx Storm",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9781649376947"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "1649376944"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": false
//         },
//         "pageCount": 732,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": true,
//         "contentVersion": "2.8.7.0.preview.2",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=Vuv4EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=Vuv4EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//         },
//         "language": "en",
//         "previewLink": "http://books.google.com/books?id=Vuv4EAAAQBAJ&pg=PT150&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=6&source=gbs_api",
//         "infoLink": "https://play.google.com/store/books/details?id=Vuv4EAAAQBAJ&source=gbs_api",
//         "canonicalVolumeLink": "https://play.google.com/store/books/details?id=Vuv4EAAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "FOR_SALE",
//         "isEbook": true,
//         "listPrice": {
//           "amount": 14.99,
//           "currencyCode": "USD"
//         },
//         "retailPrice": {
//           "amount": 14.99,
//           "currencyCode": "USD"
//         },
//         "buyLink": "https://play.google.com/store/books/details?id=Vuv4EAAAQBAJ&rdid=book-Vuv4EAAAQBAJ&rdot=1&source=gbs_api",
//         "offers": [
//           {
//             "finskyOfferType": 1,
//             "listPrice": {
//               "amountInMicros": 14990000,
//               "currencyCode": "USD"
//             },
//             "retailPrice": {
//               "amountInMicros": 14990000,
//               "currencyCode": "USD"
//             },
//             "giftable": true
//           }
//         ]
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "PARTIAL",
//         "embeddable": true,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": true,
//           "acsTokenLink": "http://books.google.com/books/download/Onyx_Storm-sample-epub.acsm?id=Vuv4EAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//         },
//         "pdf": {
//           "isAvailable": false
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=Vuv4EAAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "SAMPLE",
//         "quoteSharingAllowed": false
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "gpZAEQAAQBAJ",
//       "etag": "hbWAWQiBjiQ",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/gpZAEQAAQBAJ",
//       "volumeInfo": {
//         "title": "Onyx Storm : Svensk utgåva",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "Gondol",
//         "publishedDate": "2025-01-21",
//         "description": "Det finns inte längre tid för undervisning och förberedelser på Basgiath. Striden är här, och den hotar att förgöra allt. Men hoten kommer inte bara utifrån – Violet bär på en hemlighet som kan påverka stridens riktning och i en värld där lojalitet är lika sällsynt som fred är det omöjligt att veta vem hon kan lita på. När Navarre står på randen till kollaps måste Violet ge sig ut på jakt efter räddningen. Där, i främmande land, finns en chans att samla de allierade som kan rädda det hon älskar mest av allt. De behöver kraft och en armé. Och de behöver något som bara Violet kan hitta, men att avslöja vad det är kan kosta henne allt. Och medan stormen rycker närmare står en sak klar: inte alla kommer att överleva.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9789189516250"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "9189516257"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": true
//         },
//         "pageCount": 691,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": false,
//         "contentVersion": "1.1.1.0.preview.3",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=gpZAEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=gpZAEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//         },
//         "language": "sv",
//         "previewLink": "http://books.google.com/books?id=gpZAEQAAQBAJ&pg=PT648&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=7&source=gbs_api",
//         "infoLink": "https://play.google.com/store/books/details?id=gpZAEQAAQBAJ&source=gbs_api",
//         "canonicalVolumeLink": "https://play.google.com/store/books/details?id=gpZAEQAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "FOR_SALE",
//         "isEbook": true,
//         "listPrice": {
//           "amount": 17.31,
//           "currencyCode": "USD"
//         },
//         "retailPrice": {
//           "amount": 9.99,
//           "currencyCode": "USD"
//         },
//         "buyLink": "https://play.google.com/store/books/details?id=gpZAEQAAQBAJ&rdid=book-gpZAEQAAQBAJ&rdot=1&source=gbs_api",
//         "offers": [
//           {
//             "finskyOfferType": 1,
//             "listPrice": {
//               "amountInMicros": 17310000,
//               "currencyCode": "USD"
//             },
//             "retailPrice": {
//               "amountInMicros": 9990000,
//               "currencyCode": "USD"
//             },
//             "giftable": true
//           }
//         ]
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "PARTIAL",
//         "embeddable": true,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": true
//         },
//         "pdf": {
//           "isAvailable": true
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=gpZAEQAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "SAMPLE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "... \u003cb\u003estormrådare\u003c/b\u003e . Hon kommer att försöka blåsa ner dig på marken . ” När fältet blir synligt greppar jag ledaren med vänsterhanden , slänger upp arkivdörren och låter kraftflödet växa till en störtflod . &quot; Hon får gärna försöka ” , morrar&nbsp;..."
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "TakOEQAAQBAJ",
//       "etag": "D8YcdMyjO+w",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/TakOEQAAQBAJ",
//       "volumeInfo": {
//         "title": "Door duisternis gesmeed",
//         "subtitle": "Onyx Storm",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "Z&K",
//         "publishedDate": "2025-01-21",
//         "description": "De strijd is begonnen in 'Door duisternis gesmeed' (Nederlandse editie van 'Onyx Storm'), het derde deel van de bestsellerserie Fourth Wing van Rebecca Yarros. Na bijna achttien maanden op het Basgiath Oorlogscollege weet Violet Sorrengail dat er geen tijd meer is voor lessen of onzekerheid. Nu de strijd echt is begonnen en de vijanden zowel van buitenaf als binnenuit aanvallen, weet Violet niet meer wie ze nog kan vertrouwen. Ze moet op zoek naar bondgenoten om Navarre te steunen. Dit zal elk beetje van haar verstand, geluk en kracht op de proef stellen, maar ze zal alles doen om te redden waar ze van houdt haar draken, haar familie, haar thuis, en hém. Zelfs als dat betekent dat ze een geheim moet bewaren dat alles zou kunnen vernietigen. Maar er komt een storm aan... en niet iedereen zal die overleven. 'Door duisternis gesmeed' van bestsellerauteur Rebecca Yarros is het derde deel in de populaire Fourth Wing-serie. Lees ook in de serie: 'In steen gebrand' en 'Een ijzeren vlam'.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9789020554137"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "9020554131"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": true
//         },
//         "pageCount": 861,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": true,
//         "contentVersion": "1.6.6.0.preview.3",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=TakOEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=TakOEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//         },
//         "language": "nl",
//         "previewLink": "http://books.google.com/books?id=TakOEQAAQBAJ&printsec=frontcover&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=8&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=TakOEQAAQBAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/Door_duisternis_gesmeed.html?hl=&id=TakOEQAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "PARTIAL",
//         "embeddable": true,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": true,
//           "acsTokenLink": "http://books.google.com/books/download/Door_duisternis_gesmeed-sample-epub.acsm?id=TakOEQAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//         },
//         "pdf": {
//           "isAvailable": true,
//           "acsTokenLink": "http://books.google.com/books/download/Door_duisternis_gesmeed-sample-pdf.acsm?id=TakOEQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=TakOEQAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "SAMPLE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "De strijd is begonnen in &#39;Door duisternis gesmeed&#39; (Nederlandse editie van &#39;Onyx Storm&#39;), het derde deel van de bestsellerserie Fourth Wing van Rebecca Yarros."
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "gpZAEQAAQBAJ",
//       "etag": "QqL/P0qGftw",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/gpZAEQAAQBAJ",
//       "volumeInfo": {
//         "title": "Onyx Storm : Svensk utgåva",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "Gondol",
//         "publishedDate": "2025-01-21",
//         "description": "Det finns inte längre tid för undervisning och förberedelser på Basgiath. Striden är här, och den hotar att förgöra allt. Men hoten kommer inte bara utifrån – Violet bär på en hemlighet som kan påverka stridens riktning och i en värld där lojalitet är lika sällsynt som fred är det omöjligt att veta vem hon kan lita på. När Navarre står på randen till kollaps måste Violet ge sig ut på jakt efter räddningen. Där, i främmande land, finns en chans att samla de allierade som kan rädda det hon älskar mest av allt. De behöver kraft och en armé. Och de behöver något som bara Violet kan hitta, men att avslöja vad det är kan kosta henne allt. Och medan stormen rycker närmare står en sak klar: inte alla kommer att överleva.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9789189516250"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "9189516257"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": true
//         },
//         "pageCount": 691,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": false,
//         "contentVersion": "1.1.1.0.preview.3",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=gpZAEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=gpZAEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//         },
//         "language": "sv",
//         "previewLink": "http://books.google.com/books?id=gpZAEQAAQBAJ&printsec=frontcover&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=9&source=gbs_api",
//         "infoLink": "https://play.google.com/store/books/details?id=gpZAEQAAQBAJ&source=gbs_api",
//         "canonicalVolumeLink": "https://play.google.com/store/books/details?id=gpZAEQAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "FOR_SALE",
//         "isEbook": true,
//         "listPrice": {
//           "amount": 17.31,
//           "currencyCode": "USD"
//         },
//         "retailPrice": {
//           "amount": 9.99,
//           "currencyCode": "USD"
//         },
//         "buyLink": "https://play.google.com/store/books/details?id=gpZAEQAAQBAJ&rdid=book-gpZAEQAAQBAJ&rdot=1&source=gbs_api",
//         "offers": [
//           {
//             "finskyOfferType": 1,
//             "listPrice": {
//               "amountInMicros": 17310000,
//               "currencyCode": "USD"
//             },
//             "retailPrice": {
//               "amountInMicros": 9990000,
//               "currencyCode": "USD"
//             },
//             "giftable": true
//           }
//         ]
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "PARTIAL",
//         "embeddable": true,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": true
//         },
//         "pdf": {
//           "isAvailable": true
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=gpZAEQAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "SAMPLE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "Det finns inte längre tid för undervisning och förberedelser på Basgiath."
//       }
//     },
//     {
//       "kind": "books#volume",
//       "id": "1xn-EAAAQBAJ",
//       "etag": "L6DejDPjXc8",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/1xn-EAAAQBAJ",
//       "volumeInfo": {
//         "title": "Onyx Storm - Edizione italiana",
//         "authors": [
//           "Rebecca Yarros"
//         ],
//         "publisher": "SPERLING & KUPFER",
//         "publishedDate": "2025-01-21",
//         "description": "Dopo aver trascorso quasi diciotto mesi nell’accademia militare di Basgiath, Violet Sorrengail sa che non c’è più tempo per le lezioni. O per l’incertezza. La guerra è davvero iniziata e, con i nemici in avvicinamento e ormai infiltrati all’interno dei loro ranghi, è impossibile sapere di chi fidarsi. Violet dovrà spingersi oltre le deboli difese di Aretia alla ricerca di alleati che possano schierarsi al fianco di Navarra. Il viaggio metterà a dura prova il suo spirito, la sua fortuna e la sua forza, ma è disposta a fare qualsiasi cosa per salvare ciò che ama – i suoi draghi, la sua famiglia, la casa che hanno ricostruito e lui. Anche se questo significa custodire un segreto così importante che potrebbe distruggere tutto. C’è bisogno di un esercito. Di Potere. Di Magia. E di una cosa che solo Violet è in grado di scovare… la verità. Ma una tempesta si sta preparando all’orizzonte e non tutti riusciranno a sopravvivere alla sua collera. In contemporanea mondiale il terzo attesissimo capitolo della saga Fourth Wing.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9788892746046"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "8892746049"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": true
//         },
//         "pageCount": 695,
//         "printType": "BOOK",
//         "categories": [
//           "Fiction"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": true,
//         "contentVersion": "1.7.4.0.preview.3",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=1xn-EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=1xn-EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//         },
//         "language": "it",
//         "previewLink": "http://books.google.com/books?id=1xn-EAAAQBAJ&printsec=frontcover&dq=intitle:onyx+storm+inauthor:yarros&hl=&cd=10&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=1xn-EAAAQBAJ&dq=intitle:onyx+storm+inauthor:yarros&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/Onyx_Storm_Edizione_italiana.html?hl=&id=1xn-EAAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "US",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "US",
//         "viewability": "PARTIAL",
//         "embeddable": true,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": true,
//           "acsTokenLink": "http://books.google.com/books/download/Onyx_Storm_Edizione_italiana-sample-epub.acsm?id=1xn-EAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//         },
//         "pdf": {
//           "isAvailable": true,
//           "acsTokenLink": "http://books.google.com/books/download/Onyx_Storm_Edizione_italiana-sample-pdf.acsm?id=1xn-EAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=1xn-EAAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "SAMPLE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "Dopo aver trascorso quasi diciotto mesi nell’accademia militare di Basgiath, Violet Sorrengail sa che non c’è più tempo per le lezioni."
//       }
//     }
//   ]
// }

