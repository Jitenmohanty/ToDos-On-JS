 
console.log("Welcome to notes app. This is app.js");
showNotes();//after relod it also call it.

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addtitle = document.getElementById("addtitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];//if we get an array.and convert to string.
  } else {
    notesObj = JSON.parse(notes);//if any string find then pass on screen.
  }
  let myobj = {
    title:addtitle.value,
    text:addTxt.value
  }
  notesObj.push(myobj);//push the item inside notes.
  localStorage.setItem("notes", JSON.stringify(notesObj));//why stringify?---bcz in local storage always shows in  string.  update.
  addTxt.value = "";//after add note then blank the text area.
  addtitle.value="";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements read from localStorage,this function for shownotes();
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div  class="noteCard" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <hr>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn">Delete Note</button>
                    </div>
                </div>`;
  });//onclick is use to click event .
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = ` Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note  //index use bcz array index delete.
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);//remove 1 by 1
  localStorage.setItem("notes", JSON.stringify(notesObj));//it is to update in local storage after delete.
  showNotes();
}

//use in sreach function.6
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    //convert any case.
     //console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 
