export default state => {
    state = state.toJS();
    return ({
        form: {
            ...state.form,
            salesPoints: (state.salesPoints || []).map(s => [s.id, s.name]),
            salesPointsUpdating: state.salesPointsUpdating
        },
        statistics: state.statistics || [],
        statisticsUpdating: state.statisticsUpdating,
        error: state.error
    })
}
