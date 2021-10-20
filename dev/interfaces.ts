export interface IWordStateOptions {
  sortString : string;
  minimumLength : number;
  cbOnNewWord : ( word: string ) => void;
}

export interface IStateOfWords {
  order ? : number ,
  word ? : string ,
  number ? : number ,
  length ? : number
}

export interface IStateOfWordsObject {
  [ key: string ]: { 
    order ? : number , 
    number ? : number , 
    length ? : number 
  }
}

export interface IDictionary {
  [ key: string ]: number;
}

export interface ICandidate {
  dictionary : IDictionary ,
  length : number ,
  currentWord : string[] ,
  options : IWordStateOptions
}
