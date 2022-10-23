import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrgLogin.css";

export function OrgLogin() {

    const [info, setInfo] = useState(false);
    const navigate = useNavigate();

    return(
        <div className="LogMain">
        <h1>Prisijungti</h1>

        <form onSubmit={(e) => {
                e.preventDefault();
                
                fetch("http://localhost:8080/v1/organizer/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: e.target.name.value,
                        password: e.target.password.value
                    })
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if( res.error ) {
                        setInfo(res.error)
                        return ;
                    } else {
                        setInfo("Logged In!")
                        localStorage.setItem("tokenas",res.tokenas);
                        localStorage.setItem("organizatoriaus_id",res.organizatoriaus_id);
                        setTimeout(() => {
                            navigate("/myUsers")
                        }, 2000)
                    }
                })
                .catch(error => console.log(error));
            }
        }>
            <label>Vardas:</label>
            <input type="text" name="name" required />
            <label>Slaptažodis:</label>
            <input type="password" name="password" required />
            <div>
                <button type="submit">Prisijungti</button>
            </div>
        </form>
        <div className="info">
            {info && info}
        </div>
    </div>
    )
}