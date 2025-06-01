const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Please Enter Your Task!");
    }
    else{
        let li = document.createElement("li"); // creating new li tag
        li.innerHTML = inputBox.value;         // add current input value to li tag
        listContainer.appendChild(li);         // appending new li tag with value into HTML
        // For Deleting Task
        let span = document.createElement("span"); // creating new span tag
        span.innerHTML = "\u00d7";                 // add cross icon value to span tag
        li.appendChild(span);                      // appending created span tag with icon into HTML (li tag)
    }

    inputBox.value = '';                       // Clearing the input field after Adding task
    saveData();
}

// Check and Uncheck Task -- Delete the Task

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){  // if click on LI tag -> toggle checked (CSS)
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){  // if click on SPAN tag -> remove parent element (LI tag)
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save and Show Data 
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();