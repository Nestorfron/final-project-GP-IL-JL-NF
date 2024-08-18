import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Add_Brewery from "./pages/add_brewery.jsx";
import injectContext from "./store/appContext";
import { Ticker } from "./component/ticker.jsx";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Add_Beer from "./pages/add_beer.jsx";
import Add_Event from "./pages/add_event.jsx";
import MyAccount from "./pages/my_account.jsx";
import { BeerDetails } from "./pages/beer_details.jsx";
import { BreweryDetails } from "./pages/brewery.jsx";
import { Styles_View } from "./pages/style_view.jsx";
import SearchBar from "./component/SearchBar.jsx";
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
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Add_Brewery />} path="/add_brewery" />
            <Route element={<Add_Beer />} path="/add_beer" />
            <Route element={<Add_Event />} path="/add_event" />
            <Route element={<SearchBar />} path="/SearchBar" />
            <Route element={<MyAccount />} path="/my_account" />
            <Route element={<BeerDetails />} path="/beer/:id" />
            <Route element={<BreweryDetails />} path="/brewery/:breweryId" />
            <Route element={<Styles_View />} path="/styles/:styleName" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
