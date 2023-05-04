import React from "react";
import ReactDOM from "react-dom/client";

import Carts from "./pages/Carts/Carts";
import Detaill from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import HomeTemplate from "./templates/HomeTemplate";
//style
import "./assets/scss/style.scss";
//setup redux
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import Detail from "./pages/Detail/Detail";
//setup react router dom
import {
  unstable_HistoryRouter as HistoryBrowser,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
} from "react-router-dom";
import { history } from "./util/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryBrowser history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="carts" element={<Carts />}></Route>
          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </HistoryBrowser>
  </Provider>
);
