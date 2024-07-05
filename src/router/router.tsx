import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "../pages/home.page.tsx";
import Page from "../components/page.tsx";
import GamePage from "../pages/game.page.tsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page title="NYTathalon"><HomePage /></Page>} />
        <Route path="/game" element={<Page title="NYTathalon"><GamePage /></Page>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
