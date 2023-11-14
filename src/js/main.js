import "../css/style.css";

const form = document.querySelector(".form");
let bookLists = localStorage.getItem("bookList")
  ? JSON.parse(localStorage.getItem("bookList"))
  : [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const book = document.getElementById("book");
  const author = document.getElementById("author");
  const year = document.getElementById("year");
  const bookCompleted = document.getElementById("isCompleted");

  if (!book.value.trim() || !author.value.trim() || !year.value.trim()) {
    alert("wajib isi buku yang ada");
    return;
  }

  const newBook = {
    id: Date.now(),
    title: book.value.trim(),
    author: author.value.trim(),
    year: year.value.trim(),
    isCompleted: bookCompleted.checked,
  };
  bookLists.push(newBook);
  saveBook();
  form.reset();
});

const btnDelete = document.querySelector(".btn-delete");
btnDelete.addEventListener("click", () => {
  if (bookLists.length > 0) {
    const isConfirmed = confirm(
      "Apakah Anda yakin ingin menghapus semua buku?",
    );
    if (isConfirmed) {
      localStorage.removeItem("bookList");
      bookLists = [];
      loadBook();
    }
  } else {
    alert("Data sudah kosong.");
  }
});

const saveBook = () => {
  localStorage.setItem("bookList", JSON.stringify(bookLists));
  loadBook();
};

const loadBook = () => {
  const bookIsCompleted = document.getElementsByClassName("bookIsCompleted")[0];
  const bookUnCompleted = document.getElementsByClassName("bookUnCompleted")[0];

  bookIsCompleted.innerHTML = "";
  bookUnCompleted.innerHTML = "";
  bookLists.forEach((book) => {
    const Li = document.createElement("li");
    Li.classList.add(
      "flex",
      "justify-between",
      "border",
      "rounded",
      "p-2",
      "shadow-xl",
    );

    const liDetails = `<div><h4 class="text-2xl uppercase font-bold text-shadow-md text-secondary"> ${book.title}</h4>
        <p >Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p></div> 
        <div class="flex flex-col justify-end gap-2">
          <button class="editBook bg-green-400 p-1 rounded hover:bg-green-500 transition-all duration-500 font-semibold capitalize hover:text-shadow-md hover:text-white">edit</button>
          <button class="deleteBook bg-red-400 p-1 rounded hover:bg-red-500 transition-all duration-500 font-semibold capitalize hover:text-shadow-md hover:text-white">delete</button>
        </div>`;
    Li.innerHTML = liDetails;
    if (book.isCompleted) {
      bookIsCompleted.appendChild(Li);
    } else {
      bookUnCompleted.appendChild(Li);
    }

    const deleteButton = Li.querySelector(".deleteBook");
    deleteButton.addEventListener("click", () => {
      const isConfirmed = confirm(
        "Apakah Anda yakin ingin menghapus buku ini?",
      );
      if (isConfirmed) {
        bookLists = bookLists.filter((bookL) => bookL.id !== book.id);
        saveBook();
        loadBook();
      }
    });
  });
};

loadBook();
