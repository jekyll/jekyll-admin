import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import { intlReducer } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import trLocaleData from 'react-intl/locale-data/tr';
import * as reducers from './ducks';
import * as translations from './translations';

addLocaleData([...enLocaleData, ...trLocaleData]);

const loggerMiddleware = createLogger();
const rootReducers = combineReducers({
  ...reducers,
  form: formReducer,
  intl: intlReducer
});

function configureStore() {
  let store = createStore(
    rootReducers,
    {
      intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: translations.en
      }
    },
    compose(
      applyMiddleware(thunkMiddleware, loggerMiddleware),
      typeof global.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? global.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  return { store };
}

export default configureStore().store;
