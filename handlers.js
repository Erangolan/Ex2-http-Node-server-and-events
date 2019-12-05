const ordersJson = require('./data.json');
const orders = require('./ordersRepository');


const getAllOrders = (req, res) => {
    if (req.headers.authorization != '1234') {
        res.writeHeader(404);
        res.write('you are not authorized, only admin!');
        res.end();
    } else {      
        const allOrders = orders.getAllOrders();
        res.writeHeader(200);
        res.end(JSON.stringify(allOrders));
    }     
};

const getSingleOrder = (req, res, urlObj) => {
    const id = urlObj.query.id;
    if (!Number.isNaN(id) && id < ordersJson.length) {
      const order = orders.getOrderById(id);
      if (order) {
        res.writeHeader(200);
        res.end(JSON.stringify(order));
      } else {
            res.writeHeader(404);         
            res.write(`${order} not found`);         
            res.end();  
      }
    } else {
        res.writeHeader(404);         
        res.write(`${id} isNaN or not exist in orders list`); 
        res.end();
    }
};

const insertNewData = (req, res, urlObj) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); 
    });
    req.on('end', () => {
        const newDataItem = JSON.parse(body);
        if (counter() + newDataItem.numOfTickets > 10) {
            res.writeHeader(404);         
            res.write(`sorry, only ${10 - counter()} tickets available`);         
            res.end();
        } else {
            orders.insertNewOrder(newDataItem);
            res.writeHeader(200)
            res.end(`${newDataItem.name} inserted successfuly to orders list`);
        }
    });
    req.on('error', (err) => {
        console.error(err.stack);
    });
};

const updateData = (req, res) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const newDataItem = JSON.parse(body);
        if (newDataItem.id < ordersJson.length) {
            if (counter() + newDataItem.numOfTickets - ordersJson[newDataItem.id].numOfTickets > 10) {
                res.writeHeader(404);  
                res.write(`sorry, only ${10 - counter()} tickets available, updated failed`);                 
                res.end();
            } else {
                orders.updateOrder(newDataItem);
                res.writeHeader(200);
                res.end('data updated successfuly');
            }
        } else {
            res.writeHeader(404); 
            res.write(`there is not such ${newDataItem.id} in the list`);            
            res.end();
        }
    });
    req.on('error', (err) => {
        console.error(err.stack);
    });
};

const deleteAllData = (req, res) => {
    if (req.headers.authorization != '1234'){
        res.writeHeader(404);
        res.write('you are not authorized, only admin!'); 
        res.end();
    } else {
        res.writeHeader(200); 
        orders.deleteAllOrders();
        res.end('all data deleted successfuly');
    }
};

const deleteSingleData = (req, res, urlObj) => {
    const id = urlObj.query.id;
    if (!Number.isNaN(id) && id < ordersJson.length) {
        orders.deleteOrderById(id);
        orders.updateIds(id);
        res.writeHeader(200);
        res.end('the order deleted successfully');
    } else {
        res.writeHeader(404);         
        res.write(`${id} isNaN or not exist in orders list`);         
        res.end();
    }
};

const getAllLogs = (req, res) => {
    if (req.headers.authorization != '1234') {
        res.writeHeader(404);
        res.write('you are not authorized, only admin!');
        res.end();
    } else {      
        const allConsols = orders.getAllConsolLogs();
        console.log(allConsols);
        res.writeHeader(200);
        res.end(JSON.stringify(allConsols));
    }
}

const counter = () => {
    let count = 0;
    for(let i = 0; i < ordersJson.length; i++){
        count += ordersJson[i].numOfTickets;
    }
    return count;
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    insertNewData,
    updateData,
    deleteAllData,
    deleteSingleData,
    getAllLogs
  };