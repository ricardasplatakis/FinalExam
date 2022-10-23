import { Link } from "react-router-dom";
import "./Wrap.css";

export function Wrap({ children }) {
    return (
        <div className="mainWrap">
            <nav>
                <div className="logo">Projektas.lt</div>
                <div className="links">
                    <Link to="/register" >Registracija</Link>
                    <Link to="/login" >Prisijungimas</Link>
                    <Link to="/myUsers" >Dalyviai</Link>
                </div>
            </nav>
            {children}
            <footer>
                Copyright © Ričardas.
            </footer>
        </div>
    )
}