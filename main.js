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