import configureStore from './configureStore';

export const { store, persistor } = configureStore();

export const dispatch = store.dispatch;
