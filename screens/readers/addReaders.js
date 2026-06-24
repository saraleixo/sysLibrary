import { db } from "../../services/firebase.js";
import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form = document.getElementById("readerForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const name = document.getElementById("name").value;
        const lastName = document.getElementById("lastName").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const email = document.getElementById("email").value;
        const date = document.getElementById("date").value;

        await addDoc(collection(db, "readers"), {
            name,
            lastName,
            phoneNumber,
            email,
            date
        });

        alert("Leitor cadastrado com sucesso!");
        form.reset();

        window.location.href = "./readers.html"

    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar leitor.");
    }
});