/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getWStatsList , getWStatsObj , getWordList } = require( "../atext-wordz/index.js" );
const fs = require( "fs" );

fs.readFile( "./demo/demo.txt" , "utf8" , ( err , text ) => {
  if ( err ) {
    console.error( err );
    return;
  }

  const sortString = `
    by word of a greater than b's
` ;
  const minimumLength = 1;
  const format = "list";

  const prohibitedWords = [ "sexe" , "violence" , "data" , "graphie" , "corps" ];
  const cbOnNewWord = ( word ) => {

    if ( prohibitedWords.includes( word ) )
      console.log( "prohibited : " + word );
  };
  const options = { sortString , minimumLength , format , cbOnNewWord };
  const result = getWStatsList( text , options );

  const fileCallback = ( err , data ) => { };

  // write a list of all different words in demow.txt
  fs.writeFile( "./assets/demow.txt" , result.map( w => w.word ).join( "\n" ) , fileCallback );

  // write a the stats of words into demo.json
  fs.writeFile( "./assets/demo.json" , JSON.stringify( { wordsStats : result } , null , 2 ) , fileCallback );

  console.log( result );
} );