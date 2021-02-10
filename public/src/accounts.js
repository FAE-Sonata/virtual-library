function findAccountById(accounts, id) {
  return accounts.find(acct => acct['id'] === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((x, y) => x['name']['last'] > y['name']['last'] ? 1 : -1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account['id'];
  /* filter books 2 levels down to Borrow arrays that have any matching
  transactions, regardless of whether the book is returned in the transaction
  */
 const matchingBooks = books.filter(bookObj => {
    const borrowsArr = bookObj['borrows'];
    return borrowsArr.some(borrowObj => borrowObj['id'] === accountId);
  });
  return matchingBooks.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account['id'];
  /* filter books 2 levels down to Borrow arrays that have any matching
  transactions, ALSO factoring whether the book is returned in the transaction
  */
  let matchingBooks = books.filter(bookObj => {
    const borrowsArr = bookObj['borrows'];
    return borrowsArr.some(borrowObj => !borrowObj['returned'] &&
      borrowObj['id'] === accountId);
  });
  // add author object
  matchingBooks.map(bookObj => {
    let thisAuthorId = bookObj['authorId'];
    bookObj['author'] = authors.find(author => author['id'] === thisAuthorId);
    return bookObj;
  })
  return matchingBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
