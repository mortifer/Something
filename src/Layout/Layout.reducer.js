import { Map, fromJS } from "immutable"
import { defineReducer, perform } from "reelm/fluent"
import { select, call, put } from "reelm/effects"

import { getOfdApi } from "../Effects";

export const Enter = "Enter";
export const DataRetrievingError = "DataRetrievingError";
export const StoreOrganizationId = "StoreOrganizationId";

export default defineReducer(Map({}))
    .on(DataRetrievingError,
        (state, { error }) => state.merge({ organizationId: "", error: error }))
    .on(StoreOrganizationId, (state, {organizationId}) => state.merge({ organizationId: organizationId, error: null}))
    .on(Enter, perform(function* ({organizationId}) {

        yield put({type: StoreOrganizationId, organizationId: organizationId});
        
        const api = yield getOfdApi();        

        try {
            yield call(() => api.verifyOrganizationId())
        }
        catch (e) {
            yield put({ type: DataRetrievingError, error: e.toString() });
        }

    }));
