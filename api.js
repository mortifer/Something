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
                    }
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

