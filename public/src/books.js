function findAuthorById(authors, id) {
  let matchingAuthor = authors.filter(obj => obj['id'] === id);
  return matchingAuthor[0];
}

function findBookById(books, id) {
  let matchingBook = books.filter(obj => obj['id'] === id);
  return matchingBook[0];
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = books.filter(obj => {
    let borrowsArr = obj['borrows'];
    // does not assume the solitary checked out entry is first in the array
    return borrowsArr.some(borrowObj => !borrowObj['returned']);
  });
  let returned = books.filter(obj => {
    let borrowsArr = obj['borrows'];
    return borrowsArr.every(borrowObj => borrowObj['returned']);
  });
  let arrPartition = [checkedOut, returned];
  return arrPartition;
}

function getBorrowersForBook(book, accounts) {
  let borrowsArr = book['borrows'];
  // let returned = borrowsArr['returned'];
  let borrowersForThisBook = borrowsArr.map(obj => {
    let thisBorrowerId = obj['id'];
    let matchingAccountArr = accounts.filter(acct => acct['id'] ===
      thisBorrowerId);
    let matchingAccount = matchingAccountArr[0];
    matchingAccount['returned'] = obj['returned'];
    return matchingAccount;
  });
  return borrowersForThisBook.slice(0, 10); // limit to first 10
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
