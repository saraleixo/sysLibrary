import { db } from "../../services/firebase.js";
import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const booksList = document.getElementById("booksList");
const searchInput = document.getElementById("search");

let books = [];

// Listar livros
document.addEventListener("DOMContentLoaded", () => {
    const booksRef = collection(db, "books");

    onSnapshot(booksRef, (snapshot) => {
        books = [];

        snapshot.forEach((doc) => {
            books.push({
                id: doc.id,
                ...doc.data()
            });
        });

        renderBooks(books);
    });
});

// Pesquisar livros
searchInput.addEventListener("input", (event) => {
    handleSearch(event.target.value);
});

function handleSearch(wordSearched) {
    const arrayFiltered = books.filter((book) =>
        removeAccents(book.title).includes(
            removeAccents(wordSearched)
        )
    );

    renderBooks(arrayFiltered);
}

function removeAccents(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// Exibir livros na tela
function renderBooks(lista) {
    booksList.innerHTML = "";

    lista.forEach((book) => {
        const isBorrowed = book.status === "borrowed";

        booksList.innerHTML += `
            <p>${book.title} <i>(${book.autor})</i></p>

            <a href="emprestimoLeitor.html?bookId=${book.id}&bookTitle=${encodeURIComponent(book.title)}">
                <button ${isBorrowed ? "disabled" : ""}>
                    Selecionar
                </button>
            </a>

            <p>Status: ${isBorrowed ? "Emprestado" : "Disponível"}</p>

            <hr>
        `;
    });
}