const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = self.crypto.randomUUID();
}

Book.prototype.changeRead = function() {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayLibrary(library) {
    const table = document.querySelector("#table");
    //getting all IDs of currently saved books
    const currentIDs = table.querySelectorAll("label");

    //first checking if such book is already displayed
    for (let i=0; i<library.length; i++) {
        let goAhead = true;
        for (let j=0; j<currentIDs.length; j++) {
            if (library[i].id == currentIDs[j].textContent) {
                goAhead = false;
            }
        }
        //if such book is not  already displayed
        if (goAhead){
            //getting book values
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
            read.setAttribute('id', 'readCell');

            //saving IDs of currently displayed books in invisible labels
            const id = document.createElement("label");
            id.textContent = book.id;

            //button for removing book in the display and in the array
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("deleteButton");
            deleteBtn.dataset.index = book.id;
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener("click", function(event){
                event.preventDefault();
                for (let j=0; j<myLibrary.length; j++) {
                    if (deleteBtn.dataset.index == myLibrary[j].id) {
                        myLibrary.splice(j, 1);
                    }
                }
                deleteBtn.parentElement.parentElement.remove();
            })

            //button for changing read status of a book
            const readBtn = document.createElement("button");
            readBtn.classList.add("readButton");
            readBtn.dataset.index = book.id;
            readBtn.textContent = "Read";
            readBtn.addEventListener("click", function(event){
                event.preventDefault();
                for (let j=0; j<myLibrary.length; j++) {
                    if (readBtn.dataset.index == myLibrary[j].id) {
                        /*if (myLibrary[j].read) {
                            myLibrary[j].read = false;
                        } else {
                            myLibrary[j].read = true;
                        }*/
                       myLibrary[j].changeRead();
                        if (myLibrary[j].read) {
                            readBtn.parentElement.parentElement.querySelector('#readCell').textContent = "Yes";
                        } else {
                            readBtn.parentElement.parentElement.querySelector('#readCell').textContent = "No";
                        }
                    }
                }
                
            })

            //creating table row and inputing values
            const btnDiv = document.createElement("div");
            btnDiv.classList.add("btnDiv");

            const tableRow = document.createElement("tr");
            tableRow.appendChild(title);
            tableRow.appendChild(author);
            tableRow.appendChild(pages);
            tableRow.appendChild(read);
            tableRow.appendChild(id);
            btnDiv.appendChild(deleteBtn);
            btnDiv.appendChild(readBtn);
            tableRow.appendChild(btnDiv);

            table.appendChild(tableRow);
        }
    }
}

// button for showing dialog allowing adding of a new book
const btn = document.getElementById("addBtn");
btn.addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("dialog").show();
})

//button in dialog for adding a new book
const submitBtn = document.getElementById("formSubmit");
submitBtn.addEventListener("click", function(event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    if (title == '' || author == '') {
        return;
    }
    const pages = document.getElementById("numberOfPages").value;
    const read = document.getElementById("radioYes").checked;

    addBookToLibrary(title, author, pages, read);
    displayLibrary(myLibrary);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("numberOfPages").value = "";
    document.getElementById("radioYes").checked = false;
    document.getElementById("radioNo").checked = false;
})

//display library on page load, in case some data is saved (currently not possible outside of testing, but maybe someday?)
displayLibrary(myLibrary);

