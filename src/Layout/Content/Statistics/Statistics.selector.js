export default state => {
    state = state.toJS();
    var transformedStatistics =
        _(_.groupBy(state.statistics,"groupId")).toArray().map(
            function (c) {
                var tmp = c.reduce(
                    function(p,c){
                        return {
                            total: p.total + c.total,
                            count: p.count + c.count,
                            groupId: c.groupId,
                            groupName: c.groupName
                        }
                    },{
                        total: 0,
                        count: 0,
                        groupId: "",
                        groupName: ""
                    });

                return tmp;
            }
        );

    return ({
        form: {
            ...state.form//,
            //salesPoints: (state.salesPoints || []).map(s => [s.id, s.name]),
            //salesPointsUpdating: state.salesPointsUpdating
        },
        statistics: transformedStatistics || [],
        statisticsUpdating: state.statisticsUpdating || false,
        error: state.error
    })
}

