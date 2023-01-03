import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRoutes} from "./common/RoutePage/Routes";
import Register from "./Pages/Register/Register";
import Header from "./Pages/Header/Header";
import Login from "./Pages/Login/Login";
import {PrivateRoute} from "./common/RoutePage/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={AppRoutes.register} element={<Register />} />
                <Route path={AppRoutes.login} element={<Login />} />

                <Route path={AppRoutes.home} element={
                    <PrivateRoute Component={Home}/>
                }/>

                <Route path={AppRoutes.notFound} element={<NotFound />} />
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
