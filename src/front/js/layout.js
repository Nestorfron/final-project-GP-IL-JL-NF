import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/BackendURL.jsx";

import { Home } from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddBrewery from "./pages/AddBrewery.jsx";
import AddBar from "./pages/AddBar.jsx";
import injectContext from "./store/appContext";
import { Ticker } from "./component/Ticker.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import AddBeer from "./pages/AddBeer.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import { BeerDetails } from "./pages/BeerDetails.jsx";
import { BreweryDetails } from "./pages/BreweryDetails.jsx";
import { StylesView } from "./pages/StyleView.jsx";
import SearchBar from "./component/SearchBar.jsx";
import { CountryHome } from "./pages/CountryHome.jsx";
import { BarDetails } from "./pages/BarDetails.jsx";
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Ticker />
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<CountryHome />} path="/:country_home" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<AddBrewery />} path="/add_brewery" />
            <Route element={<AddBeer />} path="/add_beer" />
            <Route element={<AddEvent />} path="/add_event" />
            <Route element={<AddBar />} path="/add_bar" />
            <Route element={<SearchBar />} path="/SearchBar" />
            <Route element={<MyAccount />} path="/my_account" />
            <Route element={<BeerDetails />} path="/beer/:id" />
            <Route element={<BreweryDetails />} path="/brewery/:breweryId" />
            <Route element={<BarDetails />} path="/bar/:barId" />
            <Route element={<StylesView />} path="/styles/:styleName" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
