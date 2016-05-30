# Hazard

Producing UI with CSS in JavaScript! The next because-we-can thing :japanese_ogre:

## Installation

`npm i hazard`

## Simple usage

```js
var hazard = require('hazard')();
var result = hazard.fromJSON({
  header[title="My Title"]: {
    padding: '10px'
  }
});

console.log(result.css.text);
/*
.hd1{padding:10px;}
*/

console.log(result.html.text);
/*
<header class="hd1" title="My Title"></header>
*/
```
