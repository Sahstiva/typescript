import { Book } from './book.js';
import { books } from './book-collection.js';

function findSuitableBook (genre:string, pagesLimit:number, multipleRecomendations = true):Book | Book[] {
  const findAlgorithm = (book) => {
    return book.genre === genre && book.pageAmount <= pagesLimit;
  }
  if(multipleRecomendations)
    return books.filter(findAlgorithm);
  else
    return books.find(findAlgorithm);
}

const recommendedBook = findSuitableBook('fantasy', 1000)

if (recommendedBook instanceof Book) {
  console.log(recommendedBook.name)
} else {
  console.log(recommendedBook[0].name)
}


