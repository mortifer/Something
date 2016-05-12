export default state => {
    state = state.toJS();
    return ({
        form: {
            ...state.form
        },
        cashReceipts: state.cashReceipts || [],
        cashReceiptsUpdating: state.cashReceiptsUpdating || false,
        error: state.error
    })
}
