let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Task cannot be blank";
    } else {
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};


  let data =[];

  let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
  }

  let createTasks = () => {
    tasks.innerHTML ="";
    data.map((x,y) => {
        return (tasks.innerHTML += `
        <div id="${y}">
            <span class="fw-bold">${x.text}<span>
            <br/>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
                <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });
    resetForm();
  };

  let resetForm = () => {
        textInput.value = "";
        dateInput.value = "";
        textarea.value = "";
  };

 // FUNCTION TO DELETE THE TASK 
 /* 
 1. First Line will delete the HTML element from the screen
 2. Second Line will remove the targetted Task from the data array
 3. THird line will update the local storage with the new data
 */ 

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id,1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};

//FUNCTION TO EDIT TASKS
/* 
1. Line 1 is targetting the task that we selected to edit.

2. Line 2,3 and 4 are targetting the values [task,data and description] 
   of the task that we selected to edit

3. Line 5 is running the delete function to remove the selected data 
   both fromthe local storage, HTml element, and data array
*/

let editTask = (e) =>{
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();
  

  