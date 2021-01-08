import '../styles/global.css';
import { AppProps } from 'next/app';
import type { State } from 'types';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import strings from 'strings';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'appState/reducer';
import { useStore } from 'react-redux';
// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const enhancer = compose(
  applyMiddleware(),
);

const makeStore: MakeStore<State> = (): any => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return createStore(reducers, enhancer);
  }

  // eslint-disable-next-line global-require
  const { persistStore, persistReducer } = require('redux-persist');
  // eslint-disable-next-line global-require
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'nextjs',
    storage,
    blacklist: ['loadingIds'],
  };

  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = createStore(persistedReducer, enhancer);

  // @ts-ignore
  store.__persistor = persistStore(store); // Nasty hack

  return store;
};

const wrapper = createWrapper<State>(makeStore);

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  strings.setLocale();
  return (
    // @ts-ignore
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default wrapper.withRedux(App);
