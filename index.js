'use strict';

const Promise = require('bluebird');
const request = require('request');
const _ = require('lodash');

/**
 * Jusibe API base url
 */
const apiBaseUrl = 'https://jusibe.com/smsapi';

/**
 * Class constructor
 * @param {string} publicKey 
 * @param {string} accessToken 
 */
function Jusibe (publicKey, accessToken) {

    if(!(publicKey || accessToken)) 
        throw new Error('Invalid constructor arguments. publicKey or accessToken is defined');
    
    this.options = {
        auth: {
            user: publicKey,
            pass: accessToken
        },
        json: true
    }
}

/**
 * Merge objects
 * @param {object} obj1 
 * @param {object} obj2 
 * @return {object}
 */
function mergeOptions (obj1, obj2) {
    return _.merge(obj1, obj2);
}

/**
 * Make http request
 * @param {object} options
 * @param {function} callback
 */
Jusibe.prototype.makeRequest = function (options, callback) {
    
    let requestOptions = mergeOptions(this.options, options);
    request(requestOptions, callback)
}

/**
 * Send SMS via Jusibe API
 * @param {object} params
 * @return {Promise}
 */
Jusibe.prototype.sendMessage = function (params) {

    let self = this;

    return new Promise(function (resolve, reject) {

        if(!params) reject(new Error('Invalid argument. params not defined'));

        if(!params.hasOwnProperty('to')) reject(new Error('to property not defined'));
        if(!params.hasOwnProperty('from')) reject(new Error('from property not defined'));
        if(!params.hasOwnProperty('message')) reject(new Error('message property not defined'));

        let options = {
            url: apiBaseUrl + '/send_sms',
            method: 'POST',
            form: params
        }

        self.makeRequest(options, function (error, response) {
            if(error) reject(error);

            resolve(response.body)
        })
    })
}

/**
 * Get Jubibe credit balance
 * @return {Promise}
 */
Jusibe.prototype.getCredits = function() {

    let self = this;

    return new Promise(function (resolve, reject) {

        let options = {
            url: apiBaseUrl + '/get_credits/',
            method: 'GET',
        }

        self.makeRequest(options, function (error, response) {
            if(error) reject(error);

            resolve(response.body)
        })
    })
}

/**
 * Get delivery status of message
 * @param {string} id
 * @return {Promise}
 */
Jusibe.prototype.messageStatus = function(id) {

    let self = this;

    return new Promise(function (resolve, reject) {

        if(typeof id !== "string") reject(new Error("Invalid argument. id must be a string"))

        let options = {
            url: apiBaseUrl + '/delivery_status/' + '?message_id=' + id,
            method: 'GET'
        }

        self.makeRequest(options, function (error, response) {
            if(error) reject(error);

            resolve(response.body)
        })
    })
}

module.exports = Jusibe;