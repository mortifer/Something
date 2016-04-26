const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')  
const app = express()

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getModel/Report/Graph/Table', function (req, res) {
    const Table = [
        {
            dateDescription: { title: 'Сегодня', rangeDescription: '20 апреля, среда' },
            cashReceiptsTotal: 117111.78,
            cashReceiptsCount: 105,
            cashReceiptsMean: 1881.59 
        },
        {
            dateDescription: { title: 'Вчера', rangeDescription: '19 апреля, вторник' },
            cashReceiptsTotal: 283678.42,
            cashReceiptsCount: 143,
            cashReceiptsMean: 1983.76
        },
        {
            dateDescription: { title: '7 дней', rangeDescription: '14-20 апреля' },
            cashReceiptsTotal: 1987567.78,
            cashReceiptsCount: 749,
            cashReceiptsMean: 2653.62
        }
    ]    
    res.send(Table);    
});

app.get('/getModel/Report/Graph/Graph', function (req, res) {
    var Graph = {
        cols: [
            {
                cashReceiptsTotalValue: 350000.00,
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0
            },{
                cashReceiptsTotalValue: 280000.00,
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0
            },{
                cashReceiptsTotalValue: 300000.00,
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0
            },{
                cashReceiptsTotalValue: 324678.78,
                cashReceiptsCount: 143,
                cashReceiptsMiddleValue: 1983.76
            },{
                cashReceiptsTotalValue: 300000.00,
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0
            },{
                cashReceiptsTotalValue: 270000.00,
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0
            },{
                cashReceiptsTotalValue: 300000.00,
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0
            }
        ],
        maxValue: 350000.00
    }
    res.send(Graph);    
});

app.get('/getModel', function (req, res) {
    const Layout = {
            Header: {
                Title: ""
            },
            Navigation: {
                Title: ""
            },
            Content: {
                Report: {
                    Notifications: {
                        Title: "Уведомления"
                    },
                },
                Stat: {

                },
                CashReceipts: {
                    Title: "Чеки"
                },
                Cashbox: {
                    Title: "Кассы",
                    Registration: {
                        CashboxApplication: {
                            Title: "Заявление в ИФНС",
                            Form: {
                                IfnsCode: 0
                            }
                        },
                        CashboxOwner: {
                            Title: "Владелец кассы",
                            Form: {
                                
                            }
                        },
                        CashboxDevice: {
                            Title: "Кассовый аппарат",
                            Form: {
                                Input1: 0,
                                Date1: "2016-03-29T00:00:00.000Z"
                            }
                        },
                        FiscalStorage: {
                            Title: "",
                            Form: {
                                
                            }
                        }
                    }
                }
            }
    };
    res.send(Layout);
});

app.post('/setModel', function (req, res) {
    console.log(req.body);
    res.end();
});

app.listen(3001, function () {
  console.log('App listening on port 3001!')
});

