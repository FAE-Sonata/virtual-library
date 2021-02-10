function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const hasCheckout = books.filter(bookObj => {
    const borrowsArr = bookObj['borrows'];
    return borrowsArr.some(transaction => !transaction['returned']);
  });
  return hasCheckout.length;
}

/**
 * 
 * @param {array} arr contains objects with the format {key, count};
 * the "count" key must be named as such
 */
function topFive(arr) {
  // reverse sort
  arr.sort((x, y) => x['count'] < y['count'] ? 1: -1);
  const arrTopFive = arr.slice(0, 5);
  return arrTopFive;
}

function getMostCommonGenres(books) {
  let genreCount = {};
  for(let k = 0; k < books.length; k++) {
    let thisGenre = books[k]['genre'];
    if(Object.keys(genreCount).includes(thisGenre))
      genreCount[thisGenre]++;
    else
      genreCount[thisGenre] = 1;
  }
  let allGenres = Object.keys(genreCount);
  // not memory efficient
  let arrGenreCount = allGenres.reduce((arr, name) => {
    arr.push({name, count: genreCount[name]});
    return arr;
  }, []);
  // for(let name in genreCount)
  //   arrGenreCount.push({name, count: genreCount[name]});
  return topFive(arrGenreCount);
}

function getMostPopularBooks(books) {
  const borrowedCountByTitle = books.map(bookObj => {
    let name = bookObj['title'];
    let count = bookObj['borrows'].length;
    return {name, count};
  });
  return topFive(borrowedCountByTitle);
}

/**
 * 
 * @param {array} books Contains book objects ascribing to the format
 * {id, title, genre, authorId, borrows}
 * @param {array} authors Contains author objects ascribing to the format
 * {id, picture, age, name, company, email, registered}
 */
function gatherAllAuthorBorrowCounts(books, authors)  {
  // initial array pairing of {authorId, borrowed count} for each book
  const borrowedCountWithAuthor = books.map(bookObj => {
    let authorId = `${bookObj['authorId']}`;
    let count = bookObj['borrows'].length;
    return {authorId, count};
  });
  // collate previous array into single "dictionary" / object
  let collatedDict = {};
  for(let k = 0; k < borrowedCountWithAuthor.length; k++) {
    const thisObj = borrowedCountWithAuthor[k];
    const thisAuthorId = thisObj['authorId'];
    if(Object.keys(collatedDict).includes(thisAuthorId))
      collatedDict[thisAuthorId] += thisObj['count'];
    else
      collatedDict[thisAuthorId] = thisObj['count'];
  }
  /* previous "dictionary" / object --> [{authorId, total borrowed counts
    across all books}] */
  let countsArr = [];
  for(let authorId in collatedDict)
    countsArr.push({authorId, count: collatedDict[authorId]});
  return countsArr;
}

function getMostPopularAuthors(books, authors) {
  const allCounts = gatherAllAuthorBorrowCounts(books, authors);
  let topFiveAuthorIds = topFive(allCounts);
  // convert authorId to author's name for each object in prior array
  const res = topFiveAuthorIds.map(metaSnippet => {
    const thisAuthorId = parseInt(metaSnippet['authorId']);
    const matchingAuthor = authors.find(authorObj => authorObj['id'] ===
      thisAuthorId);
    // if(matchingAuthorArr === 0)
    //   return {};
    const authorNameComplete = matchingAuthor['name'];
    const name = `${authorNameComplete['first']} ${authorNameComplete['last']}`;
    const count = metaSnippet['count'];
    return {name, count};
  })
  return res;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
