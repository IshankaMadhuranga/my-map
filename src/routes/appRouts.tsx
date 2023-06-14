import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapWithSearchBox from "../pages/home";
import CommenLayout from "../pages/layouts/commenLayout";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <CommenLayout>
        <Routes>
          <Route index element={<MapWithSearchBox />} />
        </Routes>
      </CommenLayout>
    </BrowserRouter>
  );
};
export default AppRoutes;
