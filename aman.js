let c = 1;
let text = document.getElementById("floatingTextarea");
let label = document.getElementById("label1");
text.addEventListener('click', function () {
    label.style.visibility = "hidden";
});
text.addEventListener('blur', function () {
    label.style.visibility = "visible";
});

let button = document.getElementById("btn1");
let flexdiv = document.createElement('div');
flexdiv.id = "div3";
flexdiv.setAttribute("style", "max-width:60%;height:auto;min-height:400px;display:flex;align-items:flex-start;border:2px solid white;margin-left:20%;flex-wrap:wrap");
var body1 = document.getElementById("div0");
body1.appendChild(flexdiv);



function deleteContent(d) {
    console.log("I am deleting a node"+d);
    var content = localStorage.getItem('notes');
    array = JSON.parse(content);
    array.splice(d-2, 1);
      localStorage.setItem("notes", JSON.stringify(array));
      local();
}

function local() {
    var content = localStorage.getItem('notes');
    array = JSON.parse(content);
    while (flexdiv.firstChild) {
        flexdiv.removeChild(flexdiv.firstChild);
    }
    let d=1;
    array.forEach(e => {
        console.log(e);
        let elem1 = document.createElement('div');
        elem1.id = "note" + d.toString();
        elem1.className='noteCard'
        elem1.setAttribute("style", "width:auto;height:auto;min-width:200px;min-height:200px;padding:4px;border:2px solid whitesmoke;margin-left:1%;overflow:hidden");
        elem1.innerHTML = `<h3>`+e.substring(0,5)+`</h3><p style="overflow:hidden">` + e + `</p>`;
        flexdiv.appendChild(elem1);
        let elem2 = document.createElement('button');
        elem2.className = "btn btn-primary";
        elem2.id = "dbtn"+d.toString();
        elem2.setAttribute("style", "position:relative;bottom:-65px;left:10px;");
        elem2.textContent = "Delete Note"
        elem2.addEventListener('click', function() {
            deleteContent(d);
        });
        elem1.appendChild(elem2);
        d=d+1;
        

    });

}

local();

button.addEventListener('click', function () {
    c=c+1;
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(text.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    text.value = "";
    local(c);
});



let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
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


