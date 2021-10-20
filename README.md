# <img id="module-logo" src="https://raw.githubusercontent.com/ManuUseGitHub/module-template/master/logo.svg"> <br/>[![npm version](https://badge.fury.io/js/rehookt.svg)](https://badge.fury.io/js/rehookt) [![Build Status](https://travis-ci.com/ManuUseGitHub/Rehookt.svg?branch=master)](https://travis-ci.com/ManuUseGitHub/Rehookt) [![Coverage Status](https://coveralls.io/repos/github/ManuUseGitHub/Rehookt/badge.svg?branch=master)](https://coveralls.io/github/ManuUseGitHub/Rehookt?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-61dafb.svg)](https://github.com/ManuUseGitHub/Rehookt/blob/master/LICENSE)

React has introduced the hooks system to manage states in react applications. It is handy, tho it can be repetitive to use them. Some may want to not include store systems in their application because of the amount of boilerplate code to make everything work.

by understanding the main purpose of hooks, I created a module that can create hooks even on the fly and make them more intuitive to use.

**** 
## Getting started
See the [NPM page](https://www.npmjs.com/package/rehookt) for details.

## Code 
Get it [Here](https://github.com/ManuUseGitHub/Rehookt/blob/master/rehookt/index.js).

## Demo
Here is a [demo](https://rehookt-demo.herokuapp.com/) project to see how you can use Rehookt how it can perform with **auto generated** hooks.

## With Rehookt
```jsx
// --- Parent component ---


// Creating hooks one by one.
// rehookt is using React.useState under the hood.

const hooks = useStates(
    ["person",  { name : "John doe", height : 1.80 }],
    ["address", { city : "NewYork", zip : 10111, /*...*/ }],
    ["job",     { name : "Fullstack dev" }],
    "comment"   //default value : undefined
);

return ( <ChildComponent hooks={hooks}/> );
```

## With the old way

You may presently create hooks and pass every mutator and getter into child components like this?
```jsx
// --- Parent component ---


// Creating hooks one by one.

const [ getPerson, setPerson ]   = useState( { name : "John doe", height : 1.80 } );
const [ getAddress, setAddress ] = useState( { city : "NewYork", zip : 10111, /*...*/ } );
const [ getJob, setJob ]         = useState( { name : "Fullstack dev" } );
const [ getComment, setComment ] = useState( null );


// Quite a horrible method of passing hooks in the ChildComponent ...

return (
<ChildComponent 
    getPerson={getPerson} setPerson={setPerson} 
    getAddress={getAddress} setAddress={setAddress} 
    getJob={getJob} setJob={setJob} 
    getComment={getComment} setComment={setComment} 
/> );
```
**NOTE :** As stated, That way is for me a bad direction. It can lead to so much troubles !

Here is a way of passing hooks in a child component. 
```jsx
// --- Parent component ---


// Creating hooks one by one.
const [ getPerson, setPerson ]   = useState( { name : "John doe", height : 1.80 } );
const [ getAddress, setAddress ] = useState( { city : "NewYork", zip : 10111, /*...*/ } );
const [ getJob, setJob ]         = useState( { name : "Fullstack dev" } );
const [ getComment, setComment ] = useState( null );


// Quite ok method of passing hooks in the ChildComponent ...

const hooks { 
    person :    { val : getPerson, set : setPerson },
    address :   { val : getAddress, set : setAddress },
    job :       { val : getJob, set : setJob },
    comment :   { val : getComment, set : setComment }
}

return ( <ChildComponent hooks={hooks}/> );
```
This one inspired me ... because you don't repeat yourself as much once you are in child components. All hooks are passed in one shot.
