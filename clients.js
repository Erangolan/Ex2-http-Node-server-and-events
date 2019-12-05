const EventEmmiter = require('events');
var eventsConfig = require('./config').events;
const http = require('http');
const request = require('request')
const ordersJson = require('./data.json');
const { EventEmitter } = require('events')
const eventsConfig = require('./config').events
const http = require('http');
const ordersJson = require('./data.json');
const request = require('request');
const moment = require('moment');
const url = require('url')
var fs   = require('fs')


module.exports = class client extends EventEmmiter {
    constructor() {
        super()
        this.balance = 0
        this.list = []
    }
    insert(){
        this.emit('showAllOrders', this)
    }
    deleteAll() {
        this.emit('deleteAllOrders', this)
    }
}

async function reqToShowAll(){
    await request.get('http://localhost:3031/getAllData', { json: true, headers: {authorization: '1234'} }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log('Status Code for reqToShowAll:', res.statusCode);
        console.log(body);
    });
}

function reqToDeleteAllOrders(){
    request.delete('http://localhost:3031/deleteAllData', { json: true, headers: {authorization: '1234'} }, (err, res, data) => {
        if (err) {
            return console.log(err);
        }
        console.log('Status Code for reqToDeleteAllOrders:', res.statusCode);
    });
}


const Admin = require('./Admin');
const admin = new Admin()
admin.on('showAllOrders', reqToShowAll)
admin.on('deleteAllOrders', reqToDeleteAllOrders)
admin.showAll();
//admin.deleteAll();