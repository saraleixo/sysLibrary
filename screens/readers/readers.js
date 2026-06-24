import { db } from "../../services/firebase.js";
import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const readersContainer = document.getElementById("readersList");
const searchInput = document.getElementById("search");

let readers = [];

// Listar leitores
document.addEventListener("DOMContentLoaded", () => {
    const readersRef = collection(db, "readers");

    onSnapshot(readersRef, (snapshot) => {
        readers = [];

        snapshot.forEach((doc) => {
            readers.push({
                id: doc.id,
                ...doc.data()
            });
        });

        renderReaders(readers);
    });
});

// Pesquisar leitores
searchInput.addEventListener("input", (event) => {
    handleSearch(event.target.value);
});

function handleSearch(wordSearched) {
    const arrayFiltered = readers.filter((reader) =>
        removeAccents(reader.name).includes(
            removeAccents(wordSearched)
        )
    );

    renderReaders(arrayFiltered);
}

function removeAccents(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// Exibir leitores na tela
function renderReaders(lista) {
    readersContainer.innerHTML = "";

    lista.forEach((reader) => {

        readersContainer.innerHTML += `
            <p>${reader.name} ${reader.lastName}</p>

            <hr>
        `;
    });
}