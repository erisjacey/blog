const capitaliseWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const capitalisePhrase = (phrase) => phrase.split(' ').map(capitaliseWord).join(' ');

const idArrToStr = (id) => id.join('/');

const idStrToArr = (id) => id.split('/');

const getBlogTypeFromIdArr = (id) => id[0];

export { 
  capitaliseWord,
  capitalisePhrase,
  idArrToStr, 
  idStrToArr,
  getBlogTypeFromIdArr,
};
