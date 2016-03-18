import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./allSagas";

import rootReducer from "./rootReducer";

const includeDevTools = () => {
    if (process.env.NODE_ENV !== "production" && window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return f => f;
};

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, createSagaMiddleware(...sagas)),
    includeDevTools()
)(createStore);

export default (initialState = {}) => {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('./rootReducer', () =>
            store.replaceReducer(require('./rootReducer').default)
        );
    }

    return store;
};
