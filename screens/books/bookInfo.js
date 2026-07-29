import { db } from "../../services/firebase.js";
import {
    doc,
    collection,
    onSnapshot,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const infoBook = document.getElementById("infoBook");

const params = new URLSearchParams(window.location.search);
const bookId = params.get("bookId");

// Exibir infos na tela
document.addEventListener("DOMContentLoaded", async () => {
    const bookRef = doc(db, "books", bookId);
    const bookSnap = await getDoc(bookRef);

    if (!bookSnap.exists()) {
        infoBook.innerHTML = "<p>Livro não encontrado.</p>";
        return;
    };

    const book = bookSnap.data();

    const isBorrowed = book.status === "borrowed";

    infoBook.innerHTML += `
            <h1>${book.title} </br><i>${book.autor}</i></h1>
            <p>Ano: ${book.year}</p>
            <p>Gênero: ${book.category}</p>
            <p>Status: ${isBorrowed ? "Emprestado" : "Disponível"}</p>
        `;
}
);