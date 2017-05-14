'use strict'

const Code = require('code')
const Lab = require('lab')
const Jusibe = require('../index');

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

describe('Jusibe', function() {

    it('Should throw an error if constructor arguments are not provided', function(done) {
        expect(function () {
            new Jusibe();
        }).to.throw(Error, 'Invalid arguments: publicKey and accessToken not specified')
        done()
    })

    it('To create an instance', function (done) {
        let instance = new Jusibe('a', 'b');
        expect(instance).to.be.an.instanceOf(Jusibe)
        done()
    })

    it('To have default options', function (done) {
        let instance = new Jusibe('a', 'b');
        expect(instance.requestOptions).to.not.be.undefined()
        done()
    })
})

describe('Jusibe methods', function() {

    it('have a sendMessage method', function (done) {
        let instance = new Jusibe('a', 'b');
        expect(instance.sendMessage).to.be.function()
        done()
    })

    it('have a getCredits method', function (done) {
        let instance = new Jusibe('a', 'b');
        expect(instance.getCredits).to.be.function()
        done();
    })

    it('have a getDeliveryStatus method', function (done) {
        let instance = new Jusibe('a', 'b');
        expect(instance.getDeliveryStatus).to.be.function()
        done();
    })
})

describe('sendMessage method', function() {
    it('should throw an error no payload argument is passed', function (done) {
        let instance = new Jusibe('a', 'b');
        
        instance.sendMessage()
            .then(function() {
                done()
            })
            .catch(function (error) {
                expect(error).to.an.error(Error);
                done()
            })
    })

    it('should throw an error if a payload property is not defined', function (done) {
        let instance = new Jusibe('a', 'b');

        instance.sendMessage({ to: 'a', from: 'v', message: 'v'})
            .then(function() {
                done()
            })
            .catch(function (error) {
                expect(error).to.an.error(Error);
                done()
            })
    })
})