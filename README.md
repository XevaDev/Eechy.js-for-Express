<h1> Eechy.js for Express </h1>

<h2> What is Eechy.js? </h2>

Eechy.js is a little library that allow you to transform your local libraries into a express api.
It will take your libraries in the chosen folder, will get all the informations and do some tweeks
to put on server route.

If it isn't clear, next.

<h2> Import and How to use it. </h2>

Install it: `npm i --save express-eechy.js`
Import it in your code:

```js
const Eechy = require("express-eechy.js");
```

**/!\ Eechy needs special model**
Yes. In fact, to work well, Eechy needs some data.
Here is an example of Eechy library:
`libs/hello.js`

```js
// All libraries needed here...

module.exports.route = "/hello";
module.exports.run = async (name) => {
  console.log(`Hello ${name}`);
};
module.exports.params = ["name"];
```

**/!\ run() function is asynchrone because otherwise libraries that work asynchronously won't work**

If you will go to "/hello/world" then the server will print "Hello world".

**So let use Eechy, where is an example:**

```js
const express = require("express");
const Eechy = require("express-eechy.js");

const app = express();

let myEechy = new Eechy(
  app,
  `${__dirname}/libs`,
  /* logs connections or not*/ true
);

myEechy.runAllLibs();

// ->  hello/:name was added
// ->  hello/world was called -> Hello world
```

<h2> Documenation </h2>

<h3> Export = Class Eechy </h3>

<h4> Parameters: </h4>
<ul>
<li> [0] app: <a href="https://expressjs.com/fr/4x/api.html#express">Express</a></li>
<li> [1] libsFolder?: <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String"> string</a> (Default is ./libs) </li>
<li> [2] logs?:  <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Boolean"> boolean </a> (Default is false) </li>
</ul>

<h4> Methods </h4>

<h5> .runAllLibs() </h5>

<h6> Return: void </h6>

<h5> .run() </h5>

<h6> Parameters: </h6>
<ul>
<li> [0] route: <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String"> string</a> </li>
<li> [1] params:  <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String"> string[]</a></li>
<li> [2] run: (...args) => <a hef="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)">Promise<</a><a href="(https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object">object></a></li>
</ul>

<h5> .autorizeAccessControlAllowOrigin() </h5>

<h6> Parameters: </h6>
<ul>
<li> [0] value <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Boolean"> boolean </a> (Default is false) </li>
<li> [1] autorizedClientPath: <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>(Default is "./client")</li>
</ul>
