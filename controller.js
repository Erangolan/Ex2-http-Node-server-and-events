const url = require('url')
const { getAllOrders, getSingleOrder, insertNewData, updateData, deleteAllData, deleteSingleData, getAllLogs } = require('./handlers');


module.exports = (req, res) => {
    const urlObj = url.parse(req.url, true, false);
    
    switch (req.method) {
        case 'GET':
            if (urlObj.path === '/getAllData') 
                getAllOrders(req, res);
            if (urlObj.pathname === '/getSingleData' && urlObj.query)
                getSingleOrder(req, res, urlObj);
            if (urlObj.pathname === '/getAllLogs')
                getAllLogs(req, res);
            break;

        case 'POST':
            if (urlObj.pathname === '/insertNewData') 
                insertNewData(req, res)
            break;

        case 'PUT': 
            if (urlObj.pathname === '/updateData') 
                updateData(req, res)
            break;

        case 'DELETE':
            if (urlObj.path === '/deleteAllData') 
                deleteAllData(req, res);
            if (urlObj.pathname === '/deleteSingleData' && urlObj.query) 
                deleteSingleData(req, res, urlObj);
            break;
    }
}
