const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')  
const app = express()

var cashReceiptsCounter = 0;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getModel/Report/Graph/Table', function (req, res) {
    cashReceiptsCounter = cashReceiptsCounter + Math.round(Math.random()*10)
    if ( cashReceiptsCounter > 500 ) cashReceiptsCounter = 0;
    const Table = [
        {
            dateDescription: { title: 'Сегодня', rangeDescription: '20 апреля, среда' },
            cashReceiptsTotal: 117111.78 + cashReceiptsCounter * 100,
            cashReceiptsCount: 105 + cashReceiptsCounter,
            cashReceiptsMean: ((117111.78 + cashReceiptsCounter * 100) / (105 + cashReceiptsCounter)).toFixed(2)
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

app.get('/getModel/Report/Tasks', function (req, res) {
    Math.random() > 0.5 ?
        (
            res.send([
                { text: "Продлить обслуживание у оператора фискальных данных", tillDate: new Date(2016, 3, 15) },
                { text: "Перерегистрировать кассу «Павильон на Сурикова»", tillDate: new Date(2016, 3, 27) },
                { text: "Сделайте уже что-нибудь", tillDate: new Date(2016, 3, 30) }
            ])
        ) : (
            res.send([
                { text: "Продлить обслуживание у оператора фискальных данных", tillDate: new Date(2016, 3, 15) },
                { text: "Перерегистрировать кассу «Павильон на Сурикова»", tillDate: new Date(2016, 3, 27) },
            ])
        )
});

app.get('/getModel/Report/Notifications', function (req, res) {

    Math.random() > 0.5 ?
        (
            res.send([
                { text: "Касса «№ 2 на 8 марта»: получена регистрационная карта" }
            ])
        ) : (
            res.send([
                { text: "Касса «№ 2 на 8 марта»: получена регистрационная карта" },
                { text: "Что-то произошло..." },
                { text: "Тысяча уведомлений, сударь!" }
            ])
        )
});

app.get('/getModel/Report/Graph/Chart', function (req, res) {
    var Graph = {
        cols: [
            {
                cashReceiptsTotalValue: (Math.random()*200000 + 100000).toFixed(2),
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0,
                date: new Date(2016, 4,14)
            },{
                cashReceiptsTotalValue: (Math.random()*200000 + 100000).toFixed(2),
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0,
                date: new Date(2016, 4,15)
            },{
                cashReceiptsTotalValue: (Math.random()*200000 + 100000).toFixed(2),
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0,
                date: new Date(2016, 4,16)
            },{
                cashReceiptsTotalValue: 324678.78,
                cashReceiptsCount: 143,
                cashReceiptsMiddleValue: 1983.76,
                date: new Date(2016, 4,17)
            },{
                cashReceiptsTotalValue: (Math.random()*200000 + 100000).toFixed(2),
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0,
                date: new Date(2016, 4,18)
            },{
                cashReceiptsTotalValue:  (Math.random()*200000 + 100000).toFixed(2),
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0,
                date: new Date(2016, 4,19)
            },{
                cashReceiptsTotalValue:  (Math.random()*200000 + 100000).toFixed(2),
                cashReceiptsCount: 0,
                cashReceiptsMiddleValue: 0,
                date: new Date(2016, 4,20)
            }
        ]
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

