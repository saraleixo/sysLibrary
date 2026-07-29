import { db } from "../../services/firebase.js";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const readersList = document.getElementById("readersList");
const searchInput = document.getElementById("search");

let readers = [];

const params = new URLSearchParams(window.location.search);
const bookId = params.get("bookId");

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
    readersList.innerHTML = "";

    lista.forEach((reader) => {

        readersList.innerHTML += `
            <p>${reader.name} ${reader.lastName}</p>
            <button onClick="addLoan('${reader.id}', '${reader.name}', '${reader.lastName}')">
                Selecionar
            </button>
            <hr>
        `;
    });
}

window.addLoan = async function (readerId, readerName, readerLastName) {
    const bookRef = doc(db, "books", bookId);

    const borrowDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 30);

    await updateDoc(bookRef, {
        borrowDate: borrowDate,
        returnDate: returnDate,
        loanFor: `${readerName} ${readerLastName}`,
        status: "borrowed",
        dataStatus: "onTime",
        lenderId: readerId
    });

    window.location.href =
        `../../../index.html?success=loan`;
}