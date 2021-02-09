function findAccountById(accounts, id) {
  return accounts.filter(obj => obj['id'] === id)[0];
}

function sortAccountsByLastName(accounts) {
  accounts.sort((x, y) => x['name']['last'] > y['name']['last'] ? 1 : -1);
  return accounts;
}

/*
  @bookObj: a book object in the structure seen in data/books.js
  Given a book object, filter the borrow transactions to the current check-out
*/
function getCurrentBorrowed(bookObj)  {
  // return bookObj.map(obj => obj['borrows'][0]);
  return bookObj['borrows'].filter(obj => !obj['returned']);
}

function getTotalNumberOfBorrows(account, books) {
  let accountId = account['id'];
  /* filter books 2 levels down to Borrow arrays that have any matching
  transactions, regardless of whether the book is returned in the transaction
  */
  let matchingBooks = books.filter(obj => {
    let borrowsArr = obj['borrows'];
    return borrowsArr.some(borrowObj => borrowObj['id'] === accountId);
  });
  return matchingBooks.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let accountId = account['id'];
  /* filter books 2 levels down to Borrow arrays that have any matching
  transactions, ALSO factoring whether the book is returned in the transaction
  */
  let matchingBooks = books.filter(obj => {
    let borrowsArr = obj['borrows'];
    return borrowsArr.some(borrowObj => !borrowObj['returned'] &&
      borrowObj['id'] === accountId);
  });
  // add author object
  matchingBooks.map(obj => {
    let thisAuthorId = obj['authorId'];
    let author = authors.filter(obj => obj['id'] === thisAuthorId);
    obj['author'] = author[0];
    return obj;
  })
  return matchingBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
