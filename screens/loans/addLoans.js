import { db } from "../../services/firebase.js";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    const readersContainer = document.getElementById("readersList");
    if (!readersContainer) return;

    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("bookId");
    const bookTitle = params.get("bookTitle")

    const readersRef = collection(db, "readers");

    onSnapshot(readersRef, (snapshot) => {
        readersContainer.innerHTML = "";

        snapshot.forEach((readerDoc) => {

            const reader = readerDoc.data();
            const readerId = readerDoc.id;
            const readerFullName = reader.name + " " + reader.lastName;

            readersContainer.innerHTML += `
                <p>${readerFullName}</p>
                <button onclick="selectReader('${readerId}', '${readerFullName}')">
                    Selecionar
                </button>
            `;
        });
    });

    window.selectReader = async (readerId, readerFullName) => {

        // Atualizar Livro
        const bookRef = doc(db, "books", bookId);

        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 7);
        returnDate.setHours(23, 59, 59, 59);

        await updateDoc(bookRef, {
            loanFor: readerFullName,
            lenderId: readerId,
            borrowDate: new Date(),
            returnDate: returnDate,
            status: "borrowed",
        });

        // Atualizar Leitor
        const readerRef = doc(db, "readers", readerId);

        await updateDoc(readerRef, {
            borrowedBooksId: [bookId],
            boworredBooksTitle: [bookTitle]
        });

        alert("Empréstimo realizado com sucesso!");

        const loanRef = collection(db, "loans");
        setDoc(loanRef, {
            readerId: readerId,
            readerName: reader,
            bookId: bookId,
            bookTitle: bookTitle
        });
    };
});