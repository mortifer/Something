import { Map, fromJS } from "immutable"
import { defineReducer, perform } from "reelm/fluent"
import { select, call, put } from "reelm/effects"

export const Enter = "Enter";
export const StoreOrganizationId = "StoreOrganizationId";

export default defineReducer(Map({}))
    .on(StoreOrganizationId, (state, {organizationId}) => state.merge({ organizationId: organizationId, error: null}))
    .on(Enter, perform(function* ({organizationId}) {
        yield put({type: StoreOrganizationId, organizationId: organizationId});
    }));
