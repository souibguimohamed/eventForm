import { useState, useEffect } from "react";
import "./App.css";
import Input from "./Input";
import Swal from "sweetalert2";

function App() {
    const [data, setdata] = useState([]);
    const [openData, setopenData] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const hasAccess = localStorage.getItem("hasAccess");
        if (hasAccess === "true") {
            setopenData(true);
        }
        if (openData) {
            const esperooAPI = "https://api.esperoo.fr/v1/foire/list";
            fetch(esperooAPI, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response: any) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok.");
                    }
                    return response.json(); // Return the promise here
                })
                .then((response: any) => {
                    console.log("response : ", response);
                    setdata(response);
                })
                .catch(() => {
                    Swal.fire({
                        title: "Erreur!",
                        text: "Erreur!",
                        icon: "error",
                    });
                });
        }
    }, [openData]);

    const handleSubmit = () => {
        if (
            email === "contact@esperoo.fr" &&
            password === "€sperooS€cr€tPassword!"
        ) {
            setopenData(true);
            localStorage.setItem("hasAccess", "true");
        }
    };
    const ShowData = () => {
        if (data.length > 0) {
            const elements = data.map((element, index) => {
                index += 1;
                const { time, enseigne, nom, prenom, tel, email, comment } =
                    element;
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#ecf0f1",
                            textAlign: "left",
                            padding: "15px",
                            borderRadius: "5px",
                            maxWidth: "400px",
                            width: "33vw",
                            gap: "5px",
                        }}
                    >
                        <div>ID: {index}</div>
                        <div>Date: {time}</div>
                        <div>Enseigne: {enseigne}</div>
                        <div>Nom: {nom}</div>
                        <div>Prenom: {prenom}</div>
                        <div>Tel: {tel}</div>
                        <div>Email: {email}</div>
                        <div>Commentaire: {comment}</div>
                    </div>
                );
            });
            return <>{elements}</>;
        } else
            return (
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "5px",
                        fontSize: "17px",
                    }}
                >
                    Pas de données en ce moment.
                </div>
            );
    };

    const downloadFile = () => {
        window.open(
            "https://scontent.esperoo.fr/eventForm/data.xlsx",
            "_blank"
        );
    };

    if (openData) {
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "left",
                    }}
                >
                    <ShowData />
                </div>
                <button
                    style={{
                        width: "200px",
                        backgroundColor: "#2980b9",
                        color: "white",
                        marginTop: "15px",
                    }}
                    onClick={downloadFile}
                >
                    Telecharger
                </button>
            </>
        );
    } else {
        return (
            <div className='esperoo-form-container'>
                <div>
                    <Input
                        captionText='Adresse e-mail:'
                        placeholder=''
                        inputWidth='100%'
                        style={{
                            inputStyle: {
                                border: "1px solid black",
                                marginBottom: "10px",
                            },
                        }}
                        borderColor='#ecf0f1'
                        borderWidth={1}
                        onChange={(data: any) => setEmail(data)}
                        value={email}
                    />
                    <Input
                        captionText='Password:'
                        placeholder=''
                        inputWidth='100%'
                        style={{
                            inputStyle: {
                                border: "1px solid black",
                                marginBottom: "10px",
                            },
                        }}
                        borderColor='#ecf0f1'
                        borderWidth={1}
                        onChange={(data: any) => setPassword(data)}
                        value={password}
                    />
                    <button
                        style={{
                            width: "200px",
                            backgroundColor: "#2980b9",
                            color: "white",
                            marginTop: "15px",
                        }}
                        onClick={handleSubmit}
                    >
                        Soumettre
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
