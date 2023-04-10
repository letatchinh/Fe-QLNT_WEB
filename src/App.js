

import "antd/dist/reset.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes/allRoutes";
import LayoutMain from "./layout/LayoutMain";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes?.map((e, i) => (
          <Route
            key={i}
            path={e.path}
            element={<LayoutMain title={e.title}>{e.element}</LayoutMain>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
