import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import CommenLayout from "../pages/layouts/commenLayout";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <CommenLayout>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </CommenLayout>
    </BrowserRouter>
  );
};
export default AppRoutes;
