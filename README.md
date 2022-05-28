# Eechy.js for Express

## What is Eechy.js?

Eechy.js is a little library that allow you to transform your local libraries into a express api.
It will take your libraries in the chosen folder, will get all the informations and do some tweeks
to put on server route.

If it isn't clear, next.

## Import and How to use it.

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

## Documenation

### Export = Class Eechy

#### Parameters:

- [0] app: Express
- [1] libsFolder?: string (Default is ./libs)
- [2] logs?: boolean (Default is false)

#### Methods

##### .runAllLibs()

###### Return: void

##### .run()

###### Parameters:

- [0] route: string
- [1] params: string[]
- [2] run: (...args) => object
