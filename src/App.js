import Home from "./Routes/Home/Home.component";
import Navigation from "./Routes/Navigation/Navigation.component";
import {Route, Routes } from "react-router-dom";
import Authentication from "./Routes/Authentication/Authentication.component";
import Shop from "./Routes/Shop/Shop.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />

      </Route>
    </Routes> 
  );
};

export default App;
