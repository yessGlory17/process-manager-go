import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Detail from "./views/detail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process/detail/:pid" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
