import { db } from "../../services/firebase.js";
import {
    doc,
    collection,
    onSnapshot,
    updateDoc
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
        const itsPending = book.dataStatus === "pending";

        if (isBorrowed === true) {
            booksList.innerHTML += `

            <p>${book.title} <i>(${book.autor})</i></p>
            <p>${book.loanFor}</p>
            <p>${itsPending ? "Pendente" : "No Prazo"}</p>
            <button class="btn-return" data-id="${book.id}">
                Devolver
            </button>
            <hr>
        `;
        }

        document.querySelectorAll(".btn-return").forEach((button) => {
            button.addEventListener("click", () => {
                const bookId = button.dataset.id;
                confirmDevolution(bookId);
            });
        });
    });
}

async function confirmDevolution(bookId) {
    const confirmar = confirm("Tem certeza que deseja devolver este livro?");

    if (!confirmar) return;

    const bookRef = doc(db, "books", bookId);

    await updateDoc(bookRef, {
        borrowDate: "",
        returnDate: "",
        loanFor: "",
        status: "available",
        dataStatus: "",
        lenderId: ""
    });

    const book = books.find(book => book.id === bookId);
}