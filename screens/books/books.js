    import { db } from "../../services/firebase.js";
    import {
        doc,
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
                <div class="bookItem" data-id="${book.id}">
                    <div class="bookInfo">
                    <a href="${isBorrowed ? '#' : '../loans/addLoans.html?bookId=' + book.id + '&bookTitle=' + encodeURIComponent(book.title)}"
                        <span class="bookTitle">${book.title}</span>
                        </a>
                        <span class="bookAutor">${book.autor}</span>
                    </div>

                        <div class="${isBorrowed ? 'btn-borrowed' : 'btn-available'}">
                        ${isBorrowed ? 'Em uso' : 'Livre'}
                        </div>

                </div>

                <hr>
            `;
        });

        document.querySelectorAll(".bookItem").forEach((item) => {
            item.addEventListener("click", () => {
                const bookId = item.dataset.id;
                openInfos(bookId);
            });
        });
    }

    function openInfos(bookId) {
        const bookRef = doc(db, "books", bookId);
        const book = books.find(book => book.id === bookId);

        window.location.href =
            `bookInfo.html?bookId=${bookId}&bookTitle=${encodeURIComponent(book.title)}`;
    }