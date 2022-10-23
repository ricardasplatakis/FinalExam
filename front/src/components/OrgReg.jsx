import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrgReg.css";

export function OrgReg() {

    const [info, setInfo] = useState(false);
    const navigate = useNavigate();
    
    return(
        <div className="RegMain">
            <h1>Sukurti administratorių</h1>

            <form onSubmit={(e) => {
                    e.preventDefault();
                    
                    fetch("http://localhost:8080/v1/organizer/register", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userName: e.target.name.value,
                            password: e.target.password.value
                        })
                    })
                    .then(res => res.json())
                    .then(res => {
                        if( res.err ) {
                            setInfo(res.err)
                            return ;
                        } else {
                            setInfo('Created!')
                            setTimeout(() => {
                                navigate('/login')
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
                    <button type="submit">Sukurti</button>
                </div>
            </form>
            <div className='info'>
                {info && info}
            </div>
        </div>
    )
}


