export default state => {
    state = state.toJS();
    return ({
        form: {
            ...state.form,
            salesPoints: (state.salesPoints || []).map(s => [s.id, s.name]),
            salesPointsUpdating: state.salesPointsUpdating,
            cashiers: (state.cashiers || []).map(s => [s.name, s.name]),
            cashiersUpdating: state.cashiersUpdating
        },
        cashReceipts: state.cashReceipts || [],
        cashReceiptsUpdating: state.cashReceiptsUpdating || false,
        error: state.error
    })
}
