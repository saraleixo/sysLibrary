import { db } from "./services/firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Setando as variáveis
const bookForm = document.getElementById("bookForm");
const readerForm = document.getElementById("readerForm");
const booksList = document.getElementById("booksList");

// Cadastro de Livros
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const autor = document.getElementById("autor").value;
  const category = document.getElementById("category").value;

  try {
    await addDoc(collection(db, "books"), {
      title: title,
      autor: autor,
      category: category,
      status: "available",
      loanFor: null,
      returnDate: null,
    });

    alert("Livro cadastrado com sucesso!");
    bookForm.reset();
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
  }
});

// Cadastro de Leitores
readerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  try {
    await addDoc(collection(db, "readers"), {
      name: name,
      lastName: lastName,
      number: phoneNumber,
    });

    alert("Leitor cadastrado com sucesso!");
    readerForm.reset();
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
  }
});

// Listar Leitores
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const readersRef = collection(db, "readers");

    onSnapshot(readersRef, (snapshot) => {
      const readersContainer = document.getElementById("readersList");
      readersContainer.innerHTML = "";

      snapshot.forEach((doc) => {
        const reader = doc.data();
        readersContainer.innerHTML += `
      <p>${reader.name + " " + reader.lastName}</p>
    `;
      });
    });
  } catch (error) {
    console.error("Erro ao buscar leitores:", error);
  }
});
