import { useState } from "react";
import Logo from "./assets/logo.svg";
import "./App.css";
import Input from "./Input";
import Swal from "sweetalert2";

function App() {
    const [enseigne, setEnseigne] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const esperooAPI = "https://api.esperoo.fr/v1/foire/insert";
        fetch(esperooAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                enseigne,
                nom,
                prenom,
                tel,
                email,
                comment,
            }),
        })
            .then(() => {
                Swal.fire({
                    title: "Succès!",
                    text: "Le formulaire a été soumis avec succès!",
                    icon: "success",
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Erreur!",
                    text: "Erreur!",
                    icon: "error",
                });
            });
    };
    return (
        <div className='esperoo-form-container'>
            <div>
                <a href='https://esperoo.fr/' target='_blank'>
                    <img src={Logo} className='logo' alt='Vite logo' />
                </a>
            </div>
            <form>
                <Input
                    captionText="Enseigne (Nom de l'entreprise):"
                    placeholder=''
                    inputWidth='auto'
                    style={{
                        inputStyle: {
                            border: "1px solid black",
                            marginBottom: "10px",
                        },
                    }}
                    borderColor='#ecf0f1'
                    borderWidth={1}
                    onChange={(data: any) => setEnseigne(data)}
                    value={enseigne}
                />
                <Input
                    captionText='Nom:'
                    placeholder=''
                    inputWidth='auto'
                    style={{
                        inputStyle: {
                            border: "1px solid black",
                            marginBottom: "10px",
                        },
                    }}
                    borderColor='#ecf0f1'
                    borderWidth={1}
                    onChange={(data: any) => setNom(data)}
                    value={nom}
                />
                <Input
                    captionText='Prénom:'
                    placeholder=''
                    inputWidth='auto'
                    style={{
                        inputStyle: {
                            border: "1px solid black",
                            marginBottom: "10px",
                        },
                    }}
                    borderColor='#ecf0f1'
                    borderWidth={1}
                    onChange={(data: any) => setPrenom(data)}
                    value={prenom}
                />
                <Input
                    captionText='Téléphone:'
                    placeholder=''
                    inputWidth='auto'
                    style={{
                        inputStyle: {
                            border: "1px solid black",
                            marginBottom: "10px",
                        },
                    }}
                    borderColor='#ecf0f1'
                    borderWidth={1}
                    onChange={(data: any) => setTel(data)}
                    value={tel}
                />
                <Input
                    captionText='Adresse e-mail:'
                    placeholder=''
                    inputWidth='auto'
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
                    captionText='Commentaire:'
                    placeholder=''
                    inputWidth='auto'
                    style={{
                        inputStyle: {
                            border: "1px solid black",
                            marginBottom: "10px",
                        },
                    }}
                    borderColor='#ecf0f1'
                    borderWidth={1}
                    onChange={(data: any) => setComment(data)}
                    value={comment}
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
            </form>
        </div>
    );
}

export default App;
