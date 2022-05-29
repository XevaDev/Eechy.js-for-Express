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
<li> [0] app: [Express](https://expressjs.com/fr/4x/api.html#express) </li>
<li> [1] libsFolder?: [string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String) (Default is ./libs) </li>
<li> [2] logs?: [boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Boolean) (Default is false) </li>
</ul>

<h4> Methods </h4>

<h5> .runAllLibs() </h5>

<h6> Return: void </h6>

<h5> .run() </h5>

<h6> Parameters: </h6>
<ul>
<li> [0] route: [string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String) </li>
<li> [1] params: [string[]](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String) </li>
<li> [2] run: (...args) => [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)[<object>](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) </li>
</ul>

<h5> .autorizeAccessControlAllowOrigin() </h5>

<h6> Parameters: </h6>
<ul>
<li> [0] value [boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Boolean) (Default is false) </li>
<li> [1] autorizedServerPath: [string](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String) (Default is "./client") </li>
</ul>
