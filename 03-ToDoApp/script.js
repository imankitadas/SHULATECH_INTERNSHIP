const addTask = document.getElementById('addtask');
const addBtn = document.getElementById('addbutton');
const todoList = document.getElementById('todoList');

let popup = document.getElementById("customAlert")

addBtn.addEventListener('click', addTodo);


function addTodo(){ 
   const inputText = addTask.value.trim();

   if(inputText.length<=0){ 
       popup.classList.add("open-popup");
   }else{ 
       const newList = document.createElement("li");

      // creating paragraph in task text
       const p = document.createElement("p");
       p.innerText = addTask.value;

       // creating Edit icon
       const editbtn = document.createElement("i")
       editbtn.className = "bi bi-pencil";
       editbtn.addEventListener('click', () => editTask(p))

      //creating Delete icon
      const deleteicon = document.createElement("i")
      deleteicon.className = "bi bi-trash3" 
      deleteicon.addEventListener('click', function(){ 
          remove(newList)
      });

      
      newList.appendChild(p);
      newList.appendChild(editbtn);
      newList.appendChild(deleteicon);
      todoList.appendChild(newList);

      addTask.value = "" ; //clear input field
      saveData(); // save to local storage
   }
};

function hideAlert(){ 
  popup.classList.remove("open-popup");
}

function editTask(p){ 
  const currentText = p.textContent;

 // creating input Field
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = currentText;
  
  p.replaceWith(inputField);
  inputField.focus();

 // Save edit on Enter key press or when input loses focus
 inputField.addEventListener('keypress',function(e){ 
   if(e.key === "Enter"){ 
      saveEdit(inputField);
   }
 });
 
 inputField.addEventListener('blur', function(){ 
   saveEdit(inputField);
 });
}

function saveEdit(inputField) { 
  const updatedText = inputField.value.trim();

  const newTask = document.createElement("p");
  newTask.textContent = updatedText || "Untitled Text";

   inputField.replaceWith(newTask);

   newTask.addEventListener('click', () => editTask(newTask));
   saveData();
}

function remove(taskElement) {
  taskElement.remove();
  saveData(); 
}

function saveData(){ 
   localStorage.setItem("data", todoList.innerHTML)
}

function showTask(){ 
  const saveData = localStorage.getItem("data");
  if(saveData){ 
    todoList.innerHTML = saveData
    const allEditBtns = todoList.querySelectorAll('.bi-pencil');
    const allDeleteBtns = todoList.querySelectorAll('.bi-trash3');
    allEditBtns.forEach(btn => btn.addEventListener('click', () => editTask(btn.previousElementSibling)));
    allDeleteBtns.forEach(btn => btn.addEventListener('click', function () {
       remove(btn.closest('li'));
    }));
  }
}

showTask();
