import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App/>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>,
)