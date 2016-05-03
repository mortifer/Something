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
                this.organizationId + "/statistics/cashreceipt?from="+ 
                (from.toISOString().split("T"))[0] +
                "&to="+ (to.toISOString().split("T"))[0]);
            return response.data;
        });
    }

    async getCashreceiptsBySalesPoint(from, to, salesPointId)  {
        await delay(2000);
        return [
            {
                timestamp: new Date(),
                total: 100,
                fiscalDocumentNumber: "1231231",
                isReturn: true,
                href: "#"
            },
            {
                timestamp: new Date(),
                total: 200,
                fiscalDocumentNumber: "11111111",
                isReturn: false,
                href: "#"
            }
        ];
    }

    async getCashreceipts(from, to)  {
        await delay(2000);
        return [
            {
                timestamp: new Date(),
                total: 100,
                fiscalDocumentNumber: "2222222222",
                isReturn: false,
                href: "#"
            },
            {
                timestamp: new Date(),
                total: 100,
                fiscalDocumentNumber: "1231231",
                isReturn: true,
                href: "#"
            },
            {
                timestamp: new Date(),
                total: 200,
                fiscalDocumentNumber: "11111111",
                isReturn: false,
                href: "#"
            }
        ];
    }

    async getSalesPoints(from, to) {
        await delay(2000);
        return [ 
            { 
                "organizationId": "3c3dc287-e0b2-4142-a6b8-de0f6ccd8dbe", 
                "id": "90e851c3-13ae-4db7-850f-1520a8cad026", 
                "name": "Магазин на Московской" 
            }, 
            { 
                "organizationId": "3c3dc287-e0b2-4142-a6b8-de0f6ccd8dbe", 
                "id": "6ffdd051-58d3-4886-9184-e9822cf65e81", 
                "name": "Магазин на Малышева" 
            }, 
            { 
                "organizationId": "3c3dc287-e0b2-4142-a6b8-de0f6ccd8dbe", 
                "id": "86fdfcfe-b0d6-4e80-962c-3cb10f3fd5ca", 
                "name": "Магазин на Малышева" 
            } 
        ];
    }
    
    async getTasks() {
        return await this.catchError(async () => {
            var response = await axios.get(window.apiURLfake + "/getModel/Report/Tasks");
            return response.data;
        });
    }

    async getNotifications() {
        return await this.catchError(async () => {
            var response = await axios.get(window.apiURLfake + "/getModel/Report/Notifications");
            return response.data;
        });
    }
}

