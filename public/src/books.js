function findAuthorById(authors, id) {
  return authors.find(authorObj => authorObj['id'] === id);
}

function findBookById(books, id) {
  return books.find(bookObj => bookObj['id'] === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter(bookObj => {
    const borrowsArr = bookObj['borrows'];
    // does not assume the solitary checked out entry is first in the array
    return borrowsArr.some(borrowObj => !borrowObj['returned']);
  });
  const returned = books.filter(bookObj => {
    const borrowsArr = bookObj['borrows'];
    return borrowsArr.every(borrowObj => borrowObj['returned']);
  });
  const arrPartition = [checkedOut, returned];
  return arrPartition;
}

function getBorrowersForBook(book, accounts) {
  let borrowsArr = book['borrows'];
  // let returned = borrowsArr['returned'];
  const borrowersForThisBook = borrowsArr.map(transaction => {
    const thisBorrowerId = transaction['id'];
    let matchingAccount = accounts.find(acct => acct['id'] ===
      thisBorrowerId);
    matchingAccount['returned'] = transaction['returned'];
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
