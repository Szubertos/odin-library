const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = self.crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("apaflasasdas", "adaaflkasfsd", 20, false);
addBookToLibrary("aspafaslasas", "adadssdssd", 70, true);
addBookToLibrary("apaflasdas", "aaflkasfdssd", 500, false);
addBookToLibrary("asadsasdas", "adadssdssd", 90, true);
addBookToLibrary("apaflasdas", "aflkasfsdssd", 40, true);

function displayLibrary(library) {
    const table = document.querySelector("#table");

    for (let i=0; i<library.length; i++) {
        console.log(library[i].title);
        const book = library[i];

        const title =  document.createElement("td");
        title.textContent = book.title;

        const author =  document.createElement("td");
        author.textContent = book.author;

        const pages =  document.createElement("td");
        pages.textContent = book.pages;

        const read =  document.createElement("td");
        if (book.read) {
            read.textContent = "Yes";
        } else {
            read.textContent = "No";
        }

        const tableRow = document.createElement("tr");
        tableRow.appendChild(title);
        tableRow.appendChild(author);
        tableRow.appendChild(pages);
        tableRow.appendChild(read);

        table.appendChild(tableRow);
    }
}

const btn = document.getElementById("addBtn");
btn.addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("dialog").show();
})

displayLibrary(myLibrary);

