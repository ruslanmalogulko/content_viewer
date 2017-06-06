var express = require('express');
var mock = require('./mock.js');
var app = express();

var MENUS = ['products', 'customers', 'orders', 'news'];
var TABS = ['general', 'adresses', 'orders'];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:menu/:tab', function (req, res) {
    var data = mock.data;
    var collapse = req.query.collapse ? req.query.collapse.split(','): [];

    data.menu = req.params.menu;
    data.tab = req.params.tab;
    data.collapse = collapse;

    if (MENUS.indexOf(data.menu) > -1 && TABS.indexOf(data.tab) > -1) {
        var mockData = mock.data[data.menu][data.tab];
        mockData.menu = data.menu;
        mockData.tab = data.tab;
        res.json(mockData);
    } else {
        res.send('No data to show.');
    }

});

app.listen(3000, function () {
    console.log('Listening on port 3000...');
});
