export default state => {
    state = state.toJS();
    return ({
        form: {
            ...state.form,
            salesPoints: (state.salesPoints || []).map(s => [s.id, s.name]),
            salesPointsUpdating: state.salesPointsUpdating
        },
        cashReceipts: state.cashreceipts || [],
        cashReceiptsUpdating: state.cashReceiptsUpdating
    })
}
