import { db } from "../../services/firebase.js";
import {
    collection,
    addDoc,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const bookForm = document.getElementById("bookForm");

// Cadastro de Livros
bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const autor = document.getElementById("autor").value;
    const category = document.getElementById("category").value;
    const pageNumber = document.getElementById("pageNumber").value || " ";
    const year = document.getElementById("year").value || " ";
    const synopsis = document.getElementById("synopsis").value || " ";


    try {
        await addDoc(collection(db, "books"), {
            title: title,
            autor: autor,
            category: category,
            status: "available",
            loanFor: null,
            returnDate: null,
            borrowDate: null,
            lenderId: null,
            pageNumber: pageNumber,
            year: year,
            synopsis: synopsis,
            dataStatus: " ",
        });

        alert("Livro cadastrado com sucesso!");
        bookForm.reset();

        window.location.href = "./books.html"
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
    }
});