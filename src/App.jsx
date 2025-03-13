import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { ChessListPage } from "./ChessListPage";
import { ChessSinglePage } from "./ChessSinglePage";
import { ChessCreatePage } from "./ChessCreatePage";
import { ChessModPage } from "./ChessModPage";
import { ChessDelPage } from "./ChessDelPage";
import './App.css';

export const App=()=> {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Sakkozók</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/new-chess'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Új sakkozó</span>
              </NavLink>
              </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<ChessListPage />} />
        <Route path="/chess/:chessId" exact element={<ChessSinglePage />} />
        <Route path="/new-chess" exact element={<ChessCreatePage />} />
        <Route path="/mod-chess/:chessId" exact element={<ChessModPage />} />
        <Route path="/del-chess/:chessId" exact element={<ChessDelPage />} />
      </Routes>
    </Router>
  );
}

