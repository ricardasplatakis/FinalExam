import { useState, useEffect } from "react";
import "./MyUsers.css";


export function MyUsers() {

    const tokenas = localStorage.getItem('tokenas');
    const organizatorId = localStorage.getItem('organizatoriaus_id');

    const [myUsers, setMyUsers] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/v1/users/${organizatorId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokenas}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setMyUsers(res)
                console.log(res)
            })
            .catch(error => console.log(error));
    }, [refresh, organizatorId, tokenas])

    return (
        <div className="myUsersMain">

            <h2>Renginio dalyvių sąrašas</h2>


            {myUsers && <table className="table">
                <thead>
                    <tr>
                        <th>Vardas</th>
                        <th>Pavardė</th>
                        <th>Paštas</th>
                        <th>Amžius</th>
                        <th>Pakeisti/ištrinti</th>
                    </tr>
                </thead>
                {myUsers && myUsers.map((user, num) => {
                    return (
                        <tbody key={num}>
                            <tr>
                                <td>{user.vardas}</td>
                                <td>{user.pavarde}</td>
                                <td>{user.pastas}</td>
                                <td>{user.amzius}</td>
                                <td>
                                    <button className="edit-delete" onClick={() => {

                                        if(document.querySelector(".pridetiWrap")) {
                                            document.querySelector(".pridetiWrap").remove()
                                        }

                                        const pridetiWrap = document.createElement("div");
                                        pridetiWrap.className = "pridetiWrap"
                                        document.querySelector(".edit-box").append(pridetiWrap)
                                        const h2 = document.createElement("h2");
                                        h2.textContent = "Pakeisti"
                                        const form = document.createElement("form");
                                        const labelVardas = document.createElement("label")
                                        labelVardas.textContent = "Vardas:"
                                        const vardasInp = document.createElement("input");
                                        const labelPavarde = document.createElement("label")
                                        labelPavarde.textContent = "Pavardė:"
                                        const pavardeInp = document.createElement("input");
                                        const labelPastas = document.createElement("label")
                                        labelPastas.textContent = "Paštas:"
                                        const pastasInp = document.createElement("input");
                                        const labelAmzius = document.createElement("label")
                                        labelAmzius.textContent = "Amžius:"
                                        const amziusInp = document.createElement("input");
                                        const buttonWrap = document.createElement("div");
                                        buttonWrap.className = "pakeistiWrapButton"
                                        const editButton = document.createElement("button")
                                        editButton.textContent = "Patvirtinti"

                                        buttonWrap.append(editButton)
                                        vardasInp.value = user.vardas
                                        pavardeInp.value = user.pavarde
                                        pastasInp.value = user.pastas
                                        amziusInp.value = user.amzius

                                        form.addEventListener("submit", (e) => {
                                            e.preventDefault();

                                            fetch(`http://localhost:8080/v1/users/update/${user.id}`, {
                                                method: "PATCH",
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                    "Authorization": `Bearer ${tokenas}`
                                                },
                                                body: JSON.stringify({
                                                    vardas: vardasInp.value,
                                                    pavarde: pavardeInp.value,
                                                    pastas: pastasInp.value,
                                                    amzius: Number(amziusInp.value),
                                                    organizatorId: Number(organizatorId)
                                                })
                                            })
                                                .then(res => res.json())
                                                .then(res => {
                                                    console.log(res)
                                                    setRefresh(refresh + 1)
                                                    document.querySelector(".pridetiWrap").remove()
                                                })
                                                .catch(error => console.log(error));
                                        });

                                        form.append(labelVardas, vardasInp, labelPavarde, pavardeInp, labelPastas, pastasInp, labelAmzius, amziusInp, buttonWrap);
                                        pridetiWrap.append(h2, form);
                                        
                                    }
                                    }>Pakeisti</button>

                                    <button className="edit-delete" onClick={() => {
                                        fetch(`http://localhost:8080/v1/users/${user.id}`, {
                                            method: "DELETE",
                                            headers: {
                                                "Authorization": `Bearer ${tokenas}`
                                            }
                                        })
                                            .then(res => res.json())
                                            .then(res => {
                                                setRefresh(refresh + 1);
                                                console.log(res);
                                            })
                                            .catch(error => console.log(error))
                                    }
                                    }>Ištrinti</button>
                                </td>
                            </tr>
                        </tbody>

                    )
                })}
            </table>
            }
            {myUsers && myUsers.length === 0 && <div className="empty">Neturite neivieno dalyvio ...</div>}

            <div className="edit-box"></div>

            <div className="addUserMain">
                <h2>Pridėti</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    fetch("http://localhost:8080/v1/users/register", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${tokenas}`
                        },
                        body: JSON.stringify({
                            vardas: e.target.vardas.value,
                            pavarde: e.target.pavarde.value,
                            pastas: e.target.pastas.value,
                            amzius: Number(e.target.amzius.value),
                            organizerId: Number(organizatorId)
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.error) {
                                setInfo(res.error)
                            } else {
                                console.log(res);
                                setRefresh(refresh + 1)
                                e.target.vardas.value = ""
                                e.target.pavarde.value = ""
                                e.target.pastas.value = ""
                                e.target.amzius.value = ""
                            }
                        })
                        .catch(error => console.log(error));
                }}>
                    <label>Vardas:</label>
                    <input type="text" name="vardas" required />
                    <label>Pavardė:</label>
                    <input type="text" name="pavarde" required />
                    <label>Paštas:</label>
                    <input type="text" name="pastas" required />
                    <label>Amžius:</label>
                    <input type="number" name="amzius" min={1} max='100' required />
                    <div className="prideti">
                        <button type="submit">Pridėti</button>
                    </div>
                </form>
                <div className="info">{info && info}</div>
            </div>




        </div>
    )
}