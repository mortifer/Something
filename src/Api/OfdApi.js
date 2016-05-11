import axios from "axios";

const delay = tm => new Promise(r => setTimeout(r, tm));

export default class OfdApi {
    constructor(prefix, organizationId) {
        this.prefix = prefix;
        this.organizationId = organizationId;
    }

    async catchError(promiseFunc) {
        try {
            return await promiseFunc();
        }
        catch(e) {
            if (typeof e.data === "string")
                throw new Error(e.data);
            if (e.data && (typeof e.data.message === "string"))
                throw new Error(e.data.message);
            throw e;
        }
    }

    async getCashreceiptsStatistics(from, to)  {
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" + 
                this.organizationId + "/statistics/cashReceipt?from="+
                (from.toISOString().split("T"))[0] +
                "&to="+ (to.toISOString().split("T"))[0]);
            return response.data;
        });
    }

    async getCashreceiptsStatisticsBySalesPoints(from, to)  {
        //await delay(500);
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" +
                this.organizationId + "/statistics/cashReceipt/salesPoints?from="+
                (from.toISOString().split("T"))[0] +
                "&to="+ (to.toISOString().split("T"))[0]);
            return response.data;
        });
    }

    async getStatisticsBySalesPoint(from, to, salesPointId)  {
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" +
                this.organizationId + "/statistics/cashReceipt/salesPoints/" + salesPointId + "?from=" +
                (from.toISOString().split("T"))[0] +
                "&to="+ (to.toISOString().split("T"))[0]);
            return response.data;
        });
    }

    async getCashreceiptsBySalesPoint(from, to, totalFrom, totalTo, isOnlyReturn, cashier, salesPointId, anchorId)  {
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" +
                this.organizationId + "/cashReceiptMetas/salesPoints/" + salesPointId +
                "?from="+(from.toISOString().split("T"))[0] +
                "&to="+ (to.toISOString().split("T"))[0] +
                "&count=20" +
                (isOnlyReturn ? `&isOnlyReturn=${isOnlyReturn}` : "") +
                (cashier && cashier != 'Все кассиры' ? `&cashier=${cashier}` : "") +
                (totalFrom ? `&totalFrom=${totalFrom}` : "") +
                (totalTo ? `&totalTo=${totalTo}` : "") +
                (anchorId ? `&anchor=${anchorId}` : "") );
            return response.data;
        });
    }

    async getCashreceipts(from, to, totalFrom, totalTo, isOnlyReturn, cashier, anchorId) {
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" +
                this.organizationId + "/cashReceiptMetas/" +
                "?from="+(from.toISOString().split("T"))[0] +
                "&to="+ (to.toISOString().split("T"))[0] +
                "&count=20" +
                (isOnlyReturn ? `&isOnlyReturn=${isOnlyReturn}` : "") +
                (cashier && cashier != 'Все кассиры' ? `&cashier=${cashier}` : "") +
                (totalFrom ? `&totalFrom=${totalFrom}` : "") +
                (totalTo ? `&totalTo=${totalTo}` : "") +
                (anchorId ? `&anchor=${anchorId}` : ""));
            return response.data;
        });
    }

    async getCashReceipt(fnSerialNumber, cashReceiptId) {
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" +
                this.organizationId + "/cashReceipts/" +
                fnSerialNumber + "/" +
                cashReceiptId);
            return response.data;
        });
    }

    async getSalesPoints() {
        const allSalesPoints = [{organizationId:"",id:"",name:"Все точки"}];
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" +
                this.organizationId + "/salesPoints");
            return allSalesPoints.concat(response.data);
        });
    }

    async getCashiers() {
        const allCashiers = [{organizationId:"",id:"",name:"Все кассиры"}];
        return await this.catchError(async () => {
            var response = await axios.get(
                this.prefix + "/v1/organizations/" +
                this.organizationId + "/cashiers");
            return allCashiers.concat(response.data);
        });
    }

    async getTasks() {
        return await this.catchError(async () => {
            //var response = await axios.get(window.apiURLfake + "/getModel/Report/Tasks");
            //return response.data;
            return Math.random() > 0.5 ?
                    [
                        { text: "Продлить обслуживание у оператора фискальных данных", tillDate: new Date(2016, 3, 15) },
                        { text: "Перерегистрировать кассу «Павильон на Сурикова»", tillDate: new Date(2016, 3, 27) },
                        { text: "Сделайте уже что-нибудь", tillDate: new Date(2016, 3, 30) }
                    ]
                    :
                    [
                        { text: "Продлить обслуживание у оператора фискальных данных", tillDate: new Date(2016, 3, 15) },
                        { text: "Перерегистрировать кассу «Павильон на Сурикова»", tillDate: new Date(2016, 3, 27) },
                    ]

        });
    }

    async getNotifications() {
        return await this.catchError(async () => {
            //var response = await axios.get(window.apiURLfake + "/getModel/Report/Notifications");
            //return response.data;

            return Math.random() > 0.5 ?
                    [
                        { text: "Касса «№ 2 на 8 марта»: получена регистрационная карта" }
                    ]
                    :
                    [
                        { text: "Касса «№ 2 на 8 марта»: получена регистрационная карта" },
                        { text: "Что-то произошло..." },
                        { text: "Тысяча уведомлений, сударь!" }
                    ]
        });
    }
}

