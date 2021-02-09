const {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
  } = require("../public/src/accounts.js");

const {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
} = require("../public/src/books.js");

const {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
} = require("../public/src/home.js");
  
const accountsFixture = require("./fixtures/accounts.fixture");
const authorsFixture = require("./fixtures/authors.fixture");
const booksFixture = require("./fixtures/books.fixture");

let accounts = accountsFixture.slice();
let authors = authorsFixture.slice();
let books = booksFixture.slice();

let account = accounts[4]; // "5f446f2ed3609b719568a415"
// console.log(getTotalNumberOfBorrows(account, books));
// console.log(getBooksPossessedByAccount(account, books, authors));

let book = books[3];
// console.log(books.length);
// let [first, second] = getBorrowersForBook(book, accounts);
// console.log(first);

let mostPopularAuthors = getMostPopularAuthors(books, authors);
// const [first, second] = [
//   { name: "Susanne Lawson", count: 11 },
//   { name: "Matthews Sanders", count: 5 },
// ];
console.log(mostPopularAuthors);