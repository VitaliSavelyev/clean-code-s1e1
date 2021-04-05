//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementsByClassName("section__input_size");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementsByClassName("section__list_actions");//ul of #incompleteTasks
var completedTasksHolder=document.getElementsByClassName("section__list_checked");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image
    listItem.className="list__item";
    label.innerText=taskString;
    label.className="section__label";

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="section__input_chekbox"
    editInput.type="text";
    editInput.className="section__input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="section__button section__button_change";

    deleteButton.innerText="Delete";
    deleteButton.className="section__button section__button_color_r";
    deleteButtonImg.src="./remove.svg";
    deleteButtonImg.alt="";
    deleteButtonImg.className="button__img";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput[0].value) return;
    var listItem=createNewTaskElement(taskInput[0].value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder[0].appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput[0].value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector(".section__input");
    var chekboxInput=listItem.querySelector(".section__input_chekbox");
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".section__button_change");
    var containsClass=listItem.querySelector(".section__input_position");
    //If class of the parent is .editmode
    console.log(chekboxInput.checked);
    console.log(containsClass);
    if(chekboxInput.checked){
        if(containsClass){
            console.log(1)
            //switch to .editmode
            //label becomes the inputs value.
            label.innerText=editInput.value;
            label.className="section__label section__label_text";
            editInput.className="section__input";
            editBtn.innerText="Edit";
        }else{
            console.log(2)
            editInput.value=label.innerText;
            label.className="section__label section__label_visible";
            editInput.className="section__input section__input_position section__input_text";
            editBtn.innerText="Save";
        }    
    } else {
        if(containsClass){

            //switch to .editmode
            //label becomes the inputs value.
            label.innerText=editInput.value;
            label.className="section__label";
            editInput.className="section__input";
            editBtn.innerText="Edit";
        }else{
            editInput.value=label.innerText;
            label.className="section__label section__label_visible";
            editInput.className="section__input section__input_position";
            editBtn.innerText="Save";
        }
    }


    //toggle .editmode on the parent.
    //containsClass.classList.toggle(".section__input_position");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder[0].appendChild(listItem);
    console.log(completedTasksHolder[0]);
    //var editInput=listItem.querySelector(".section__input");
    //editInput.className="section__input section__input_position";
    var label=listItem.querySelector("label");
    label.className="section__label section__label_text";
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder[0].appendChild(listItem);
    //console.log(incompleteTaskHolder[0]);
    //var editInput=listItem.querySelector(".section__input");
    //editInput.className="section__input";
    var label=listItem.querySelector("label");
    label.className="section__label";
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.section__button_change");
    var deleteButton=taskListItem.querySelector("button.section__button_color_r");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder[0].children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder[0].children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder[0].children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder[0].children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.