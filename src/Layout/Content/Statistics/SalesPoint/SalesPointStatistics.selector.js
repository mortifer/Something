export default state => {
    state = state.toJS();
    return ({
        form: {
            ...state.form,
        },
        salesPointStatistics: state.salesPointStatistics || [],
        salesPointStatisticsUpdating: state.salesPointStatisticsUpdating || false,
        error: state.error
    })
}

