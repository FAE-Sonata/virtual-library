function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let hasCheckout = books.filter(obj => {
    let borrowsArr = obj['borrows'];
    return borrowsArr.some(transaction => !transaction['returned']);
  });
  return hasCheckout.length;
}

/*
  @arr an array of objects with the format {key, count}; the "count" key must be
  named as such
*/
function topFive(arr) {
  // reverse sort
  arr.sort((x, y) => x['count'] < y['count'] ? 1: -1);
  let arrTopFive = arr.slice(0, 5);
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
  let borrowedCountByTitle = books.map(obj => {
    let name = obj['title'];
    let count = obj['borrows'].length;
    return {name, count};
  });
  return topFive(borrowedCountByTitle);
}

function getMostPopularAuthors(books, authors) {
  let borrowedCountWithAuthor = books.map(obj => {
    let authorId = `${obj['authorId']}`;
    let count = obj['borrows'].length;
    return {authorId, count};
  });
  let countsObj = {};
  for(let k = 0; k < borrowedCountWithAuthor.length; k++) {
    let thisObj = borrowedCountWithAuthor[k];
    let thisAuthorId = thisObj['authorId'];
    if(Object.keys(countsObj).includes(thisAuthorId))
      countsObj[thisAuthorId] += thisObj['count'];
    else
      countsObj[thisAuthorId] = thisObj['count'];
  }
  let countsArr = [];
  for(let authorId in countsObj)
    countsArr.push({authorId, count: countsObj[authorId]});

  let topFiveAuthorIds = topFive(countsArr);
  let res = topFiveAuthorIds.map(obj => {
    let thisAuthorId = parseInt(obj['authorId']);
    let matchingAuthorArr = authors.filter(authorObj => authorObj['id'] ===
      thisAuthorId);
    if(matchingAuthorArr.length === 0)
      return {};
    let matchingAuthorObj = matchingAuthorArr[0];
    let name = `${matchingAuthorObj['name']['first']} ${matchingAuthorObj['name']['last']}`;
    let count = obj['count'];
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
