let tbody = document.querySelector(".tbody");
let form = document.querySelector(".formAdd")
let formEdit = document.querySelector(".formEdit")
let div = document.querySelector(".div")
let divReadElem = document.querySelector(".divReadElem")
divReadElem.classList.add("flex")

// Get the modal
var modal = document.getElementById("myModal");
var modalAdd = document.getElementById("myModalAdd");
var modalEdit = document.getElementById("myModalEdit");
var modalRead = document.getElementById("myModalRead");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanAdd = document.getElementsByClassName("closeAdd")[0];
var spanEdit = document.getElementsByClassName("closeEdit")[0];
var spanRead = document.getElementsByClassName("closeRead")[0];




let getUsers = async () => {
  try {
    const { data } = await axios.get(
      `https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/department`
    );
    getData(data);
  } catch (error) {
    console.log(error);
  }
};

let deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(
        `https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/department/${id}`
    );
    console.log(data);
    getUsers();
  } catch (error) {
    console.log(error);
  }
};

let PostUser = async (newUser) => {
    try {
      const { data } = await axios.post(
        `https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/department`,newUser
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  
  let putUser = async (id,editUser) => {
    try {
      const { data } = await axios.put(
        `https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/department/${id}`,editUser
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

// When the user clicks on the button, open the modal
let idx = null
function openModal(id) {
  modal.style.display = "block";
  idx = id
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modalAdd) {
    modalAdd.style.display = "none";
  }
  if (event.target == modalEdit) {
    modalEdit.style.display = "none";
  }
  if (event.target == modalRead) {
    modalRead.style.display = "none";
  }
};

function openModalAdd() {
    modalAdd.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  spanAdd.onclick = function () {
    modalAdd.style.display = "none";
  };
  

  let idxEdit = null
  function openModalEdit(id) {
    modalEdit.style.display = "block";
    idxEdit = id
  }
  
  // When the user clicks on <span> (x), close the modal
  spanEdit.onclick = function () {
      modalEdit.style.display = "none";
    };


    let idxInfo = null
    // When the user clicks on the button, open the modal
function openModalRead(id) {
  idxInfo = id 
  modalRead.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
spanRead.onclick = function () {
  modalRead.style.display = "none";
};
  
    
    form.onsubmit=(event)=>{
        event.preventDefault();
        let newUser = {
            id:new Date().getTime(),
            name:event.target['name'].value,
            age:event.target['age'].value,
            phone:event.target['phone'].value,
            course:event.target['course'].value,
    }
    form.reset()
    PostUser(newUser)
    modalAdd.style.display="none"
}

formEdit.onsubmit=(event)=>{
    event.preventDefault();

    let editUser = {
        id: new Date().getTime(),
        name: event.target['name'].value,
        age: event.target['age'].value,
        phone: event.target['phone'].value,
        course: event.target['course'].value,
    }
    modalEdit.style.display="none"
    putUser(idxEdit,editUser)
  }

function getData(data) {
  tbody.innerHTML = "";
    console.log(data);
  data.forEach((elem) => {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    tdId.innerHTML = elem.id;
    let tdname = document.createElement("td");
    tdname.innerHTML = elem.name;
    let add = document.querySelector(".add")
    add.onclick=()=>{
        openModalAdd()
    }
    let yesDelete = document.querySelector(".yesDelete");
    yesDelete.onclick=()=>{
      deleteUser(idx)
      modal.style.display="none"
    }
    let noDelete = document.querySelector(".noDelete");
    noDelete.onclick=()=>{
        modal.style.display="none"
    }
    let tdage = document.createElement("td");
    tdage.innerHTML = elem.age;
    let tdphone = document.createElement("td");
    tdphone.innerHTML = elem.phone;
    let tdcourse = document.createElement("td");
    tdcourse.innerHTML = elem.course;

    let actionDelete = document.createElement("i");
    actionDelete.classList.add("fa-solid")
    actionDelete.classList.add("fa-trash-can")
    actionDelete.onclick = () => {
      openModal(elem.id);
    };


    let actionEdit = document.createElement("i");
    actionEdit.classList.add("fa-regular")
    actionEdit.classList.add("fa-pen-to-square")
    actionEdit.onclick=()=>{
        formEdit.name.value = elem.name
        formEdit.age.value = elem.age
        formEdit.phone.value = elem.phone
        formEdit.course.value = elem.course
        openModalEdit(elem.id)
    }
    let divname=document.createElement("div")
    let readname=document.createElement("p")
    let readElemName=document.createElement("h1")
    let divage=document.createElement("div")
    let readage=document.createElement("p")
    let readElemAge=document.createElement("h1")
    let divphone=document.createElement("div")
    let readphone=document.createElement("p")
    let readElemPhone=document.createElement("h1")
    let divcourse=document.createElement("div")
    let readcourse=document.createElement("p")
    let readElemCourse=document.createElement("h1")


    
    let actionRead = document.createElement("button");
    actionRead.classList.add("fa-solid")
    actionRead.classList.add("fa-info")
    actionRead.onclick=()=>{
      if(idxInfo != elem.id){
        readname.innerHTML=""
        readElemName.innerHTML=""
        readage.innerHTML=""
        readElemAge.innerHTML=""
        readphone.innerHTML=""
        readElemPhone.innerHTML=""
        readcourse.innerHTML=""
        readElemCourse.innerHTML=""
        div.innerHTML=""
        divReadElem.innerHTML=""
        divage.innerHTML=""
        divcourse.innerHTML=""
        divphone.innerHTML=""
        
      }
      readname.innerHTML="UserName"
      readElemName.innerHTML=elem.name

      readage.innerHTML="UserId"
      readElemAge.innerHTML=elem.id

      readphone.innerHTML="UserPhone"
      readElemPhone.innerHTML=elem.phone

      readcourse.innerHTML="UserCourse"
      readElemCourse.innerHTML=elem.course
      divname.appendChild(readname)
      divname.appendChild(readElemName)
      divage.appendChild(readage)
      divage.appendChild(readElemAge)
      divphone.appendChild(readphone)
      divphone.appendChild(readElemPhone)
      divcourse.appendChild(readcourse)
      divcourse.appendChild(readElemCourse)
      divReadElem.appendChild(divname)
      divReadElem.appendChild(divage)
      divReadElem.appendChild(divphone)
      divReadElem.appendChild(divcourse)
      div.appendChild(divReadElem)
      openModalRead(elem.id)
    }

    let action = document.createElement("td");
    action.classList.add("action")
    action.appendChild(actionDelete);
    action.appendChild(actionRead);
    action.appendChild(actionEdit);

    tr.appendChild(tdId);
    tr.appendChild(tdname);
    tr.appendChild(tdage);
    tr.appendChild(tdphone);
    tr.appendChild(tdcourse);
    tr.appendChild(action);
    tbody.appendChild(tr);
  });
}
getUsers();

