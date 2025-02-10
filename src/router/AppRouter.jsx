import { Routes, Route } from "react-router-dom";

import { HomePage, LegendCreatePage, LegendPage, LegendUpdatePage, LegendSearchPage } from "../legends/pages";
import { Navbar } from "../components/Navbar";

export const AppRouter = () => {
  return (
    <>
        <Navbar/>

        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="create" element={<LegendCreatePage />} />
            <Route path="update/:id" element={<LegendUpdatePage />} />
            <Route path="legend/:id" element={<LegendPage />} />
            <Route path="search" element={<LegendSearchPage />} />
        </Routes>
    </>
  )
}
