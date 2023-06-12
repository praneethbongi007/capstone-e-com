import Home from "./Routes/Home/Home.component";
import Navigation from "./Routes/Navigation/Navigation.component";
import SignIn from "./Routes/Sign-In/Sign-in.component";
import {Route, Routes } from "react-router-dom";


const Shop = () => {
  return (
    <div>
      <div>
        <h1>I am Shop page</h1>
      </div>
    </div>
  );
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="Signin" element={<SignIn />} />

      </Route>
    </Routes>
  );
};

export default App;
