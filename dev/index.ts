/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
const { sort } = require( "bystr-sort" );

import {
	ICandidate ,
	IWordStateOptions as IWordStatsOptions ,
	IDictionary ,
	IStateOfWords as IStatsOfWord ,
	IStateOfWordsObject as IStatsOfWordsObject ,
} from "./interfaces";

const addNewWord = ( candidate: ICandidate ): void => {
	const { dictionary , length , currentWord , options } = candidate;

	// If the candidate has a decent length,
	if ( length && length >= options.minimumLength ) {

		// add an entry to the dictionary lowercased
		const word: string = currentWord.join( "" ).toLowerCase();

		// If the word is never heard from the dictionary,
		if ( dictionary[ word ] === undefined ) {

			// trigger the callback
			options.cbOnNewWord( word );
		}

		// Count from zero or get the actual count of the word occurence 
		// since the begining of the analysis
		const c = dictionary[ word ] || 0;

		// update the count
		dictionary[ word ] = c + 1;
	}
};

const isRomanNumerals = ( word: string ): boolean => {
	
	// INFO: Roman numeral pattern
	const pattern =
		/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[a-z]?$/i;
	
	// whe discard "Le" out of the result because , it is a word rather than a period
	return pattern.test( word ) && !/^L[e]$/i.test( word );
};

const bufferizeWordChar = (
	text: string ,
	currentWord: string[] ,
	char: string ,
	i: number
): boolean => {

	// INFO: enumerate a maximum of special characters
	const spetialChars =
		/[�\d\s\\[\]\x20-\x40\-`{-~\xA0-\xBF×Ø÷øʹ͵ͺ;！？♪╚-╬┘-▀\uFF3B\uFF40\uFF5B-\uFF65￥・（）]/;

	// When we do not deal with a special character
	if ( ! spetialChars.test( char ) ) {

		// push it to the buffer
		currentWord.push( text[ i ] );

		// return the positive sign that we added the new character to the buffer
		return true;
	}

	// we may have encounter a special character
	return false;
};

/**
 * Whill loop over the whole text and define either the succession of characts
 * defines a word or not
 * @param text the text to analyse
 * @param options options
 * @returns
 */
const fillDictionnary = (
	text: string ,
	options: IWordStatsOptions
): IDictionary => {
	const dictionary: IDictionary = {};
	let l = 0;
	let currentWord: string []= [];

	// INFO: Loop over the whole text and take every character.
	for ( let i = 0; i < text.length; i++ ) {

		// the character at pos i
		const char = text[ i ];

		// buffer the current char to the potential current word
		//then return true or false
		const isBuffered = bufferizeWordChar( text , currentWord , char , i );

		// if we cannot buffer the next character for a word
		if ( !isBuffered ) {
			l = currentWord.length;

			// add a word to the dictionary
			addNewWord( { dictionary , length : l , currentWord , options } );
			currentWord = [];
		}

		// the current value of l is carried out of this loop
	}

	// add the last potential word to the dictionary
	addNewWord( { dictionary , length : l , currentWord , options } );

	return dictionary;
};

// INFO:  fix default values for options
/**
 * Fix a default value to given options when these are undefined.
 * @param opt options
 * @returns
 */
const fixOptions = ( opt: IWordStatsOptions ): IWordStatsOptions => {
	const {

		// she string to do the sorting of words based on critierias (fields) available
		sortString = "" ,

		// the length of the words
		minimumLength = 2 ,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		cbOnNewWord = ( word: string ) => {} ,
	} = opt;

	return { sortString , minimumLength , cbOnNewWord };
};

/**
 * Gives a list of words and their stats. Records are sorted by the sortString option
 * @param text input text
 * @param opt options for the generation
 * @returns
 */
const getWStatsList = ( text: string , opt: any = {} ): IStatsOfWord[] => {
	const options = fixOptions( opt );

	// the order of apparition in the text
	let ord = 0;

	// get the dictionary of all words
	const words = fillDictionnary( text , options );

	// map over all words in the dictionary and give away
	// an list of objects that represents stats of words
	const listOfWords: IStatsOfWord[] = Object.keys( words ).map( ( e ) => {
		return { order : ord++ , word : e , number : words[ e ] , length : e.length };
	} );

	const sortString = options.sortString;

	// Returns stats sorted by the defined sortString
	return (

		// sort if there is a sortString defined or just return the unsorted
		( sortString ? sort( listOfWords , sortString ) : listOfWords )

			// Filter romanNumerals out of the result
			.filter( ( s: any ) => {
				return s.word ? !isRomanNumerals( s.word ) : false;
			} )
	);
};

/**
 * Gives an object of words with stats. Records are sorted by the sortString option
 * @param text input text
 * @param opt options for the generation
 * @returns
 */
const getWStatsObj = ( text: string , opt: any = {} ): IStatsOfWordsObject => {

	// Get the object stats list (call the existant format result)
	const listOfWords = getWStatsList( text , opt );

	// Prepare an empty object
	const result: IStatsOfWordsObject = {};

	listOfWords.map( ( s : any ) => {

		// Add a key (which is the name of the word) + value (which is the stats)
		result[ s.word ] = { order : s.order , number : s.number , length : s.length };
	} );

	return result;
};

/**
 * Gives a simple list of words that is sorted by the sortString option
 * @param text input text
 * @param opt options for the generation
 * @returns
 */
const getWordList = ( text: string , opt: any = {} ): string[] => {

	// Get the object stats list (call the existant format result)
	const listOfWords = getWStatsList( text , opt );

	// Just return an array of words ( string[] )
	return listOfWords.map( ( s : any ) => s.word );
};

export { getWStatsList , getWStatsObj , getWordList };
