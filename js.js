//KARLOS LOUIS ANGELO GARCIA LIBRARY PROJECT 
//cc The Odin Project

const myLibrary = [];

//object constructor
function Book(id, name, author, pages) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read
}

function addBookToLibrary (bookName, bookAuthor, bookPages) {
    //used to generate a random id for the new book
    const uuid = window.crypto.randomUUID()
    const newBook = new Book(uuid ,bookName ,bookAuthor, bookPages)
    myLibrary.push(newBook)
}

const container = document.querySelector(".container")
container.setAttribute("style", "display: flex")

//displays initial book already within the database
function displayInitialBooksInLibrary (arr) {
    for (let i = 0; i < arr.length; i++) {
        const card = document.createElement("div");
        card.setAttribute("style", "height: 200px; width: 100px; border-style: solid; border-color: black; border-width: 5px;")
        
        const title = document.createElement("p")
        title.textContent = arr[i].name

        const author = document.createElement("p")
        author.textContent = arr[i].author

        card.appendChild(title)
        card.appendChild(author)
        container.appendChild(card)
    }
}

//displays book used by the add new book function
function displayBooksInLibrary (arr) {

    for (let i = arr.length - 1; i < arr.length; i++) {
        const card = document.createElement("div");
        card.setAttribute("style", "height: 200px; width: 100px; border-style: solid; border-color: black; border-width: 5px;")
        //assign dataset attribute to compare for book remove
        //you can set any data attribute starting with "data-" + random name
        card.setAttribute('data-id', arr[i].id)

        const title = document.createElement("p")
        title.textContent = arr[i].name

        const author = document.createElement("p")
        author.textContent = arr[i].author

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "delete"

        const toggleButton = document.createElement("button")
        toggleButton.textContent = "toggle"

        toggleButton.addEventListener("click", () => {
            arr[i].toggleRead()
            readStatus.textContent = arr[i].read ? "Read" : "Unread"

        })

        const readStatus = document.createElement("p")
        readStatus.textContent = arr[i].read ? "Read" : "Unread"

        deleteButton.addEventListener("click", () => {
            card.remove()
            //compare the card dataset attribute with the item id for removal
            for (let j = 0; j < arr.length; j++) {     
                if (card.dataset.id == arr[j].id) {
                    myLibrary.splice([j], 1)
            }
        }
        console.table(myLibrary)
    })
    
        card.appendChild(title)
        card.appendChild(author)
        card.appendChild(readStatus)
        card.appendChild(toggleButton)
        card.appendChild(deleteButton)

        container.appendChild(card)
    }    
}


const inputBook = document.querySelector("#input-book")
const inputAuthor = document.querySelector("#input-author")
const inputPages = document.querySelector("#input-pages")

//button click
const button = document.querySelector(".add-book")
button.addEventListener("click", () => {
    inputBook.value = "";
    inputAuthor.value = "";
    inputPages.value = ""; 
    dialog.showModal();
})

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", () => {
    dialog.close();
})

const dialog = document.querySelector("#book-form")

const form = document.querySelector("form")
form.addEventListener("submit", () => {
    event.preventDefault()
    const bookName = document.getElementsByName("input-book")
    const authorName = document.getElementsByName("input-author")
    const bookPages = document.getElementsByName("input-pages")

    addBookToLibrary(bookName[0].value, authorName[0].value, bookPages[0].value)
    displayBooksInLibrary(myLibrary)
    dialog.close()
})