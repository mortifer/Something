import { Map } from 'immutable'
import { defineReducer } from 'reelm/composition'
import { spoiled } from 'reelm'
import { call, put } from 'reelm/effects'

import reportReducer from './Layout/Content/Report/Report.reducer' ;

export const Report = 'Report';

export default defineReducer(Map())
    .scopeTo(Report, ['report'], reportReducer)
