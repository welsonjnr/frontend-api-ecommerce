import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './components/Dashboard'
import Pedidos from './components/Pedidos'
import Produtos from './components/Produto'
import Pedido from './components/Pedido'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App /> 
      <Routes>
        <Route path="/" element={ <Dashboard/> }/>
        <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path="/pedidos" element={ <Pedidos/> }/>
        <Route path="/produtos" element={ <Produtos/> }/>
        <Route path="/dashboard/pedido/:id" element={ <Pedido/> }/>
        <Route path="/pedido/:id" element={ <Pedido/> }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
