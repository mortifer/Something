import React from "react";
import axios from "axios";

const DrawGraphs = () => {
    var MainGraph = {
        cols: [
            {
                cashReceiptsTotalValue: "350000,00",
                cashReceiptsCount: "0",
                cashReceiptsMiddleValue: "0"
            },{
                cashReceiptsTotalValue: "280000,00",
                cashReceiptsCount: "0",
                cashReceiptsMiddleValue: "0"
            },{
                cashReceiptsTotalValue: "300000,00",
                cashReceiptsCount: "0",
                cashReceiptsMiddleValue: "0"
            },{
                cashReceiptsTotalValue: "324678,78",
                cashReceiptsCount: "143",
                cashReceiptsMiddleValue: "1 983,76"
            },{
                cashReceiptsTotalValue: "300000,00",
                cashReceiptsCount: "0",
                cashReceiptsMiddleValue: "0"
            },{
                cashReceiptsTotalValue: "270000,00",
                cashReceiptsCount: "0",
                cashReceiptsMiddleValue: "0"
            },{
                cashReceiptsTotalValue: "300000,00",
                cashReceiptsCount: "0",
                cashReceiptsMiddleValue: "0"
            }
        ],
        maxValue: "350000,00"
    }
    $(".cols").each( function(){
        var data = eval($(this).attr("id"));
        $(this).find(".cols_col").each(function(index){

        })
    });
    // axios.get('http://mp04lr1z.dev.kontur:3001/getMainReportGraphs')
    //     .then(function (response) {
    //         console.log(response.data);
    //     })
    //     .catch(function (response) {
    //         console.log(response);
    //     });
};

class Graphs extends React.Component {

    componentDidMount() {
        DrawGraphs();
    }

    componentDidUpdate(){
        DrawGraphs();
    }

    componentWillUnmount() {
    }
    
    render() {
        const { } = this.props;
        
        return (
            <div className="graphs">
                <h2 className="graphs_title">По всей организации</h2>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Выручка, <span class="rur">₽</span></td>
                            <td>Чеки</td>
                            <td>Средний чек, <span class="rur">₽</span></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>Сегодня</div>
                                20 апреля, среда
                            </td>
                            <td>117 111<span>,78</span></td>
                            <td>105</td>
                            <td>1 881<span>,59</span></td>
                        </tr>
                        <tr>
                            <td>
                                <div>Вчера</div>
                                19 апреля, вторник
                            </td>
                            <td>283 678<span>,42</span></td>
                            <td>143</td>
                            <td>1 983<span>,76</span></td>
                        </tr>
                        <tr>
                            <td>
                                <div>7 дней</div>
                                14-20 апреля
                            </td>
                            <td>1 987 567<span>,78</span></td>
                            <td>749</td>
                            <td>2 653<span>,62</span></td>
                        </tr>
                    </tbody>
                </table>

                <div className="cols cols__week" id="MainGraph">
                    <div className="cols_col"></div>
                    <div className="cols_col"></div>
                    <div className="cols_col"></div>
                    <div className="cols_col"></div>
                    <div className="cols_col"></div>
                    <div className="cols_col"></div>
                    <div className="cols_col"></div>
                </div>
            </div>
        );
    }
}

export default Graphs;
