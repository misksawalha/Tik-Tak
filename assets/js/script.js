var logIn=document.getElementById("logIn");
const hour = document.getElementById('clock-hour'),
      minutes = document.getElementById('clock-minutes'),
      seconds = document.getElementById('clock-seconds')

const clock = function(){
    let date = new Date()

    let hh = date.getHours() * 30,
        mm = date.getMinutes() * 6,
        ss = date.getSeconds() * 6
        
    // We add a rotation to the elements
    hour.style.transform = `rotateZ(${hh + mm / 12}deg)`
    minutes.style.transform = `rotateZ(${mm}deg)`
    seconds.style.transform = `rotateZ(${ss}deg)`
}
setInterval(clock, 1000) // 1000 = 1s

// sign 
let signSave =document.getElementById("signSave");
let signClose=document.getElementById("signClose");
let signName=document.getElementById("signName");
let signEmail=document.getElementById("signEmail");
let signPass=document.getElementById("signPass");
let signGender=document.getElementsByName("gender");
let textAlert=document.getElementById("textAlert");
let emailAlert=document.getElementById("emailAlert");
let passAlert=document.getElementById("passAlert");
let genderv;
// log in
let logName=document.getElementById("logName");
let logEmail=document.getElementById("logEmail");
let logPass=document.getElementById("logPass");
let logSubmit=document.getElementById("logSubmit");
let logBtn=document.getElementById("logIn")

let wrongAlert=document.getElementById("wrongAlert");
// to do listd
let saveTask=document.getElementById("saveTask")
let taskName=document.getElementById("taskName");
let taskDes=document.getElementById("taskDes");
let taskDate=document.getElementById("taskDate");
let newList=document.getElementById("newList");
let toDoBtn=document.getElementById("toDoBtn")
let toDoCard=document.getElementById("toDoCard")
//update to do list
let updateTask=document.getElementById("updateTask")
let updateName=document.getElementById("updateName");
let updateDes=document.getElementById("updateDes");
let updateDate=document.getElementById("updateDate");
let closeUpdateTask=document.getElementById("closeUpdateTask")

var persons=[];
var logIn=[];
var tasks=[];
$(".login").hide();
$(".toDo").hide();
toDoCard.classList.add("d-none");
$(".updatetoDo").hide();
$(".toDoBtn").hide();

if(localStorage.getItem("task")){
tasks=JSON.parse(localStorage.getItem("task"));
toDoCard.classList.remove("d-none");
}
if(localStorage.getItem("signUp")){
    logIn=JSON.parse(localStorage.getItem("signUp"));
    persons=JSON.parse(localStorage.getItem("signUp"));
    toDoCard.classList.remove("d-none");
  }
else{
   
}
// start sign up
signSave.addEventListener('click',function(){
        gender();
})
function gender(){
    for(var i=0;i<2;i++){
       
        if(signGender[i].checked)
        {
           genderv=signGender[i].value;
            create();
        }
    }
}

function create(){
    person={
        name:signName.value,
        email:signEmail.value,
        pass:signPass.value,
        gendervalue:genderv 
    }
    persons.push(person);
    localStorage.setItem("signUp",JSON.stringify(persons));
    signName.value="";
    signEmail.value="";
    signPass.value="";
    genderv ="";
    
    signName.classList.remove('is-valid');
    textAlert.classList.add('d-none');
    signEmail.classList.remove('is-valid');
    signPass.classList.remove('is-valid');

}
signName.onkeyup=function(){
  var pattern=/^[A-Z][a-z]{4,}/;
  console.log(pattern.test(signName.value));
  if(pattern.test(signName.value)){
    signName.classList.remove('is-invalid');
    signName.classList.add('is-valid');
    textAlert.classList.add('d-none');
  }
  else{
    textAlert.classList.remove('d-none');
    signName.classList.remove('is-valid');
    signName.classList.add('is-invalid');
    
  }
}


signEmail.onkeyup=function(){
  var pattern=/[a-z]+@/;
  console.log(pattern.test(signEmail.value));
  if(pattern.test(signEmail.value)){
    signEmail.classList.remove('is-invalid');
    signEmail.classList.add('is-valid');
    emailAlert.classList.add('d-none');
  }
  else{
    emailAlert.classList.remove('d-none');
    signEmail.classList.remove('is-valid');
    signEmail.classList.add('is-invalid');
  }
}

signPass.onkeyup=function(){
    var pattern=/[0-9]{4,}/;
    console.log(pattern.test(signPass.value));
    if(pattern.test(signPass.value)){
        signPass.classList.remove('is-invalid');
        signPass.classList.add('is-valid');
        passAlert.classList.add('d-none');
        }
    
    else{
        passAlert.classList.remove('d-none');
        signPass.classList.remove('is-valid');
        signPass.classList.add('is-invalid');
    }
  }
// start log in
logBtn.addEventListener('click',function(){
  $(".clock").hide();
  $(".myBtn").hide();
  $(".login").fadeIn(700);
})

logSubmit.addEventListener('click',function(){
    
    for(var i=0;i<logIn.length;i++){
        if((logIn[i].email==logEmail.value) && (logIn[i].pass==logPass.value)){
          wrongAlert.classList.add("d-none");
          $(".login").fadeOut(700,function(){
             displayClientPage();
          
           
          })
          console.log("hi")
          break;
                           }
       else {
           wrongAlert.classList.remove("d-none");
           }
    }  
})

function  displayClientPage(){
  $(".toDoBtn").show()
   displayTask();
}

saveTask.addEventListener('click',function(){
  task={
    taskName:taskName.value,
    taskDes:taskDes.value,
    taskDate:taskDate.value
  }
  tasks.push(task);
  localStorage.setItem("task",JSON.stringify(tasks));
  displayTask();
  taskName.value="";
  taskDes.value="";
  taskDate.value="";
})

function displayTask(){
   res=``;
   for(var i=0;i<tasks.length;i++){
     res+=`
     <div class="card text-bg-secondary   mb-3 my-2 mx-2 col-md-4" style="max-width: 18rem;">
                    <div class="card-header ">Task number: ${i+1}</div>
                    <div class="card-body">
                      <p class="card-text border fs-3">${tasks[i].taskName}</p>
                      <p class="card-text border fs-3">${tasks[i].taskDate}</p>
                      <p class="card-text border fs-3">${tasks[i].taskDes}</p>
                     
                    </div>
                    <div class="text-end">
                    <button class="btn" onclick="updateCard(${i})"> <i class="fa-solid fa-wrench"></i></button>
                    <button class="btn" onclick="deleteCard(${i})"> <i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
   }
   toDoCard.innerHTML=res;
  //  $(".toDoCard").show();
}
function updateCard(id){
  $(".updatetoDo").show();
  $(".toDo").hide();
  updateName.value=tasks[id].taskName;
  updateDate.value=tasks[id].taskDate;
  updateDes.value=tasks[id].taskDes;
  updateTask.addEventListener('click',function(){
    tasks[id].taskName=updateName.value;
    tasks[id].taskDate=updateDate.value;
    tasks[id].taskDes=updateDes.value;
    localStorage.setItem("task",JSON.stringify(tasks));
    displayTask();
    updateName.value="";
    updateDate.value="";
    updateDes.value="";
  })
  
}
closeUpdateTask.addEventListener('click',function(){
  $(".updatetoDo").fadeOut();
}) ;

function deleteCard(id){
  tasks.splice(id,1);
  localStorage.setItem("task",JSON.stringify(tasks));
  displayTask();
}
newList.addEventListener('click',function(){
  $(".toDo").fadeIn(200);
})
