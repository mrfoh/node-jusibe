'use strict';

const request = require('request');
const Promise = require('bluebird');
const _ = require('lodash');

//jusibe base API url
const apiBaseUrl = "https://jusibe.com/smsapi/";

/**
 * Jusibe Constructor
 * @param {String} publicKey
 * @param {String} accessToken
 * @return {jusibe}
 */
function Jusibe (publicKey, accessToken) {
    if(!publicKey || !accessToken) 
        throw new Error('Invalid arguments: publicKey and accessToken not specified');
    
    this.requestOptions = {
        auth: {
            user: publicKey,
            pass: accessToken,
        },
        json: true
    }
}

Jusibe.prototype.sendMessage = function (payload) {
    return new Promise(function (resolve, reject) {   
        if(!payload) reject(new Error('Invalid arguments: payload not defined'));

        if(!_.has(payload, 'to')) reject(new Error('"to" is not defined'))
        if(!_.has(payload, 'from')) reject(new Error('"from" is not defined'))
        if(!_.has(payload, 'message')) reject(new Error('"message" is not defined'))
    })
}

Jusibe.prototype.getCredits = function() {

}

Jusibe.prototype.getDeliveryStatus = function (id) {

}

module.exports = Jusibe; 
