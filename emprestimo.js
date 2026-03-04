import { db } from "./services/firebase.js";
import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Listar Livros
document.addEventListener("DOMContentLoaded", () => {
    const booksContainer = document.getElementById("booksList");
    if (!booksContainer) return;
    const booksRef = collection(db, "books");
    onSnapshot(booksRef, (snapshot) => {
        booksContainer.innerHTML = "";
        snapshot.forEach((doc) => {
            const book = doc.data();
            booksContainer.innerHTML += `
        <p>${book.title} - ${book.autor}</p>`;
        });
    });

});