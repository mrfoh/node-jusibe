# node-jusibe [![NPM version](https://badge.fury.io/js/node-jusibe.svg)](https://npmjs.org/package/node-jusibe) [![Build Status](https://travis-ci.org/mrfoh/node-jusibe.svg?branch=master)](https://travis-ci.org/mrfoh/node-jusibe)

> A node package for jusibe.com API

## Installation

```sh
$ npm install node-jusibe
```

## Usage

```js
var Jusibe = require('node-jusibe');
var jusibeSDK = new Jusibe('YOUR_JUSIBE_PUBLIC_KEY', 'YOUR_JUSIBE_ACCESS_TOKEN')
```

### Send message
```js
let params = {
    to: '0803xxxxxx',
    from: 'John Doe',
    message: 'Take me to your leader'
}
jusibeSDK.sendMessage(params)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(response)
    })
```

### Get credit balance
```js
jusibeSDK.getCredits()
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(response)
    })
```

### Get message status
```js
jusibeSDK.messageStatus('dafnl3gle')
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(response)
    })
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.