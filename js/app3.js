showNotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtitle = document.getElementById("addtitle");
    let addtxt = document.getElementById("addtxt");
    let titles = localStorage.getItem("titles");
    let notes = localStorage.getItem("notes");
    let titlesObj;
    let notesObj;
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    titlesObj.push(addtitle.value);
    notesObj.push(addtxt.value);
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtitle.value = "";
    addtxt.value = "";
    console.log(titlesObj);
    console.log(notesObj);
    showNotes();
})

function showNotes() {
    let titles = localStorage.getItem("titles");
    let notes = localStorage.getItem("notes");
    let notesObj;
    let titlesObj;
    let html = "";
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCards mx-2 my-2 card bg-dark" style="opacity: 0.8; color:white; width: 18rem;">
                <div class="card-body">
                    <input type="checkbox" class="importentcheck" name="" id="${index}">
                    <label for="${index}"><h6>Mark as important</h6></label>
                    <h5 class="card-title">${index + 1}. ${titlesObj[index]}</h5>
                    <p class="card-text"> ${element} </p>
                    <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete note</button>
                </div>
            </div>`
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "add a note" section to add notes`;
    }
}
function deleteNote(index) {
    let titles = localStorage.getItem("titles");
    let notes = localStorage.getItem("notes");
    let titlesObj;
    let notesObj;
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    titlesObj.splice(index, 1);
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value;//.toLowererCase();
    let noteCards = document.getElementsByClassName('noteCards');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})