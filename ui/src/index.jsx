import ReactDOM from 'react-dom/client';
import App from './App';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createContext } from 'react';
import GeneralStore from './store/generalStore';
import { history } from './history/history';

export const generalStore = new GeneralStore();

export const Context = createContext({
	generalStore,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider
        value={{
            generalStore,
        }}
    >
		<HistoryRouter history={history}>
            <App />
        </HistoryRouter>
    </Context.Provider>
);
