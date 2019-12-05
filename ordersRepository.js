const EventEmmiter = require('events');
const ordersJson = require('./data.json');
const moment = require('moment');


class ordersRepository extends EventEmmiter {
    constructor() {
        super()
        this.balance = 2;
        this.orders = ordersJson;
        this.logger = [];
    }

    getOrderById(id) {
        this.emit("singleOrder", this.orders[id]); // Fire event
        this.logger.push(`Get single order: ${JSON.stringify(this.orders[id])}`);
        return this.orders[id];
    }

    getAllOrders() {
        this.emit("AllOrders", this.orders); // Fire event
        this.logger.push(`all orders: ${JSON.stringify(this.orders)}`);
        return this.orders;
    }

    deleteOrderById(id) {
        this.emit("deleteSingleOrder", this.orders); // Fire event
        ordersJson.splice(id, 1);
        this.orders = ordersJson;
        this.balance--;
        this.logger.push('the order deleted successfully.');
    }

    deleteAllOrders() {
        this.emit("deleteAll", this.orders); // Fire event
        ordersJson.splice(0, ordersJson.length);
        this.orders = ordersJson;
        this.balance = 0;
        this.logger.push('all orders deleted successfully.');
    }

    updateIds(){
        this.emit("updateAfterDelete", this.orders)
        for (let i = 0; i < this.orders.length; i++) {
            ordersJson[i].id  = i;
        }
        this.orders = ordersJson;
    }

    insertNewOrder(newDataItem) {
        ordersJson.push(newDataItem);
        this.balance++;
        ordersJson[this.balance].date = `${moment().format('YYYY-MM-DD')}`;
        ordersJson[this.balance].id = this.balance;
        this.orders = ordersJson;
        this.emit("newUser", this.orders[this.balance]);
        this.logger.push(`${this.orders[this.balance].name} inserted successfuly to orders list`);
    }

    updateOrder(newDataItem){
        ordersJson.splice(newDataItem.id, 1, newDataItem);
        this.orders = ordersJson;
        this.emit("updateUser", this.orders[newDataItem.id]);
    }

    getAllConsolLogs(){
        this.emit("AllConsols", this.logger); // Fire event
        return this.logger;
    }
}


const ordersRepo = (new ordersRepository())
    .on('singleOrder', data => console.log(`Get single order: ${JSON.stringify(data)}`)) // Catch event
    .on('AllOrders', data => console.log(`all orders: ${JSON.stringify(data)}`)) // Catch event
    .on('deleteSingleOrder', data => console.log('the order deleted successfully.')) // Catch event
    .on('deleteAll', data => console.log('all orders deleted successfully.')) // Catch event
    .on('updateAfterDelete', data => console.log('ids updated successfully.')) // Catch event
    .on('newUser', data => console.log(`${data.name} inserted successfuly to orders list`)) // Catch event
    .on('updateUser', data => console.log(`${data.name} updated successfuly!`)) // Catch event
    .on('AllConsols', data => console.log(`all consols: ${JSON.stringify(data)}`)); // Catch event
    



module.exports = ordersRepo;