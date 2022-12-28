const capitaliseWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const capitalisePhrase = (phrase) => phrase.split(' ').map(capitaliseWord).join(' ');

const idArrToStr = (id) => id.join('/');

const idStrToArr = (id) => id.split('/');

const getBlogType1FromIdArr = (id) => id[0];

const getBlogType2FromIdArr = (id) => id[1];

export { 
  capitaliseWord,
  capitalisePhrase,
  idArrToStr, 
  idStrToArr,
  getBlogType1FromIdArr,
  getBlogType2FromIdArr,
};
