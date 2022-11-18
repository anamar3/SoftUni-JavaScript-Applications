let logoutButton = document.getElementById('logout');
let spanGuest = document.getElementsByTagName('span')[0];
if(sessionStorage.length>1){
    spanGuest.textContent = sessionStorage.getItem('email');

    logoutButton.style.display = 'inline';
}else{
    logoutButton.style.display = 'none';
}


let allviews = document.getElementById('views');
let loginView = document.getElementById('login-view');
let registerView = document.getElementById('register-view');
let homeView = document.getElementById('home-view');
let form = document.getElementsByTagName('form')[1];
let formReg = document.getElementsByTagName('form')[0];
formReg.addEventListener('submit',onSubmitReg);
form.addEventListener('submit',onSubmitLog);
let additionalCatches = document.getElementById('main');
additionalCatches.style.display = 'none';

// let buttonLogin = document.getElementsByTagName('button')[1].addEventListener('click',onLogin);



let buttonLoad = document.getElementsByClassName('load')[0];
let fieldSetCatches = document.getElementsByTagName('fieldset')[0];
let buttonAdd = document.getElementsByClassName('add')[0];
let formForAddingNewCatch = document.getElementById('addForm');
let allCatches = document.getElementById('catches');
let buttonsUpdate = document.getElementsByClassName('update');
let buttonsDelete = document.getElementsByClassName('delete');


let section = document.getElementsByTagName('section')[0];
let main = document.getElementsByTagName('main')[0];


let nav = document.getElementsByTagName('nav')[0].addEventListener('click',onNav);

const urlLog = `http://localhost:3030/users/login`;
const urlReg = `http://localhost:3030/users/register`;
const urlOut = `http://localhost:3030/users/logout`;
const urlCreateNewCatch = `http://localhost:3030/data/catches`;
registerView.style.display = 'none';
loginView.style.display = 'none';
main.appendChild(homeView);

allCatches.addEventListener('click',async (e)=>{
  
      if(e.target.tagName == 'LABEL' ){
        let inputs = Array.from(e.target.parentElement.children).filter(x=>x.tagName =='INPUT');
        inputs.forEach(i=>i.disabled = false);
    }
    if(e.target.tagName == 'BUTTON' && e.target.disabled == false && e.target.textContent == 'Delete'){
     
let id = e.target.dataset.id;
let res = await fetch(`http://localhost:3030/data/catches/${id}`,{
    method: 'delete',
    headers: {'Content-Type': 'application/json',
    'X-Authorization': sessionStorage.getItem('accessToken')}
});
e.target.parentElement.remove();
    }else if(e.target.tagName == 'BUTTON' && e.target.disabled == false && e.target.textContent == 'Update'){
        let id = e.target.dataset.id;
        let inputs = Array.from(e.target.parentElement.children).filter(x=>x.tagName =='INPUT');
        inputs.forEach(i=>i.disabled = false);
        let angler = inputs[0].value;
        let weight = inputs[1].value;
        let species = inputs[2].value;
        let location = inputs[3].value;
        let bait = inputs[4].value;
        let captureTime = inputs[5].value;


       

        let res = await fetch(`http://localhost:3030/data/catches/${id}`,{
    method: 'put',
    headers: {'Content-Type': 'application/json',
    'X-Authorization': sessionStorage.getItem('accessToken')},
    body: JSON.stringify({angler,weight,species,location,bait,captureTime})
});
let data = res.json();
inputs.forEach(i=>i.disabled = true);
console.log(data);
    }
})
async function onAdding(e){
    e.preventDefault();
   

    if(sessionStorage.length >1){
        fieldSetCatches.style.display = 'inline';
        let formData = new FormData(formForAddingNewCatch);
        console.log(formData);
        let {angler,weight,species,location,bait,captureTime} = Object.fromEntries(formData);
        if(angler==''||weight == '' || species == ''|| location == '' || bait =='' || captureTime ==''){
            return;
        }
        
        let res = await fetch(urlCreateNewCatch,{
            method:'post',
            headers: {'Content-Type': 'application/json',
             'X-Authorization': sessionStorage.getItem('accessToken')},
            body: JSON.stringify({angler,weight,species,location,bait,captureTime})
        })
        let data = await res.json();
        console.log(data);
        let div = document.createElement('div');
        div.classList.add('catch');
        div.innerHTML = `<label>Angler</label>
        <input type="text" class="angler" value="${angler}" disabled>
        <label>Weight</label>
        <input type="text" class="weight" value="${weight}" disabled>
        <label>Species</label>
        <input type="text" class="species" value="${species}" disabled>
        <label>Location</label>
        <input type="text" class="location" value="${location}" disabled>
        <label>Bait</label>
        <input type="text" class="bait" value="${bait}" disabled>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${captureTime}" disabled>
        <button class="update" data-id="${data._id}" >Update</button>
        <button class="delete" data-id="${data._id}" >Delete</button>`
   allCatches.appendChild(div);
formForAddingNewCatch.reset();
        

    }
}


buttonLoad.addEventListener('click',async (e)=>{
    allCatches.innerHTML = '';
    fieldSetCatches.style.display = 'inline';
    let id = sessionStorage.getItem('_id');
    Array.from(buttonsDelete).forEach(b=>b.disabled=true)
Array.from(buttonsUpdate).forEach(b=>b.disabled=true)

let res = await fetch(`http://localhost:3030/data/catches`);
let data  = await res.json();
    console.log(Object.values(data));
   for (const fish of Object.values(data)) {
    let opp='';
   if(id != fish._ownerId ){
opp='disabled';
   }

    let div = document.createElement('div')
    div.classList.add('catch');
    div.innerHTML =`<label>Angler</label>
    <input type="text" class="angler" value="${fish.angler}" disabled>
    <label>Weight</label>
    <input type="text" class="weight" value="${fish.weight}" disabled>
    <label>Species</label>
    <input type="text" class="species" value="${fish.species}" disabled>
    <label>Location</label>
    <input type="text" class="location" value="${fish.location}" disabled>
    <label>Bait</label>
    <input type="text" class="bait" value="${fish.bait}" disabled>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${fish.captureTime}" disabled>
    <button class="update" data-id="${fish._id}" ${opp}>Update</button>
    <button class="delete" data-id="${fish._id}" ${opp}>Delete</button>`
allCatches.appendChild(div);
   } 



if(sessionStorage.length == 0){
buttonAdd.disabled = true;

}else{
    buttonAdd.disabled = false;
    
}
buttonAdd.addEventListener('click',onAdding);
});

function onNav(e){
    if(main.children.length !=0){
        main.removeChild(main.children[0]);
        }
    if(e.target.tagName == 'A' && e.target.textContent == 'Login'){
        
        displayLoginView(e);
    }else if(e.target.tagName == 'A' && e.target.textContent == 'Register'){

        displayRegisterView(e);
    }else if(e.target.tagName == 'A' && e.target.textContent == 'Logout'){
onLogout(e);
    }else if(e.target.tagName == 'A' && e.target.textContent == 'Home'){
        homeView.style.display = 'block';
        main.appendChild(homeView);
    }
}
async function onLogout(e){
e.preventDefault();
try {
    let res = await fetch(urlOut,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')}
    });
  
if( res.status == '204'){
    sessionStorage.clear();
    main.appendChild(homeView);
    spanGuest.textContent = 'guest';
    logoutButton.style.display='none';

}

} catch (error) {
    alert(error.message);
}


}
function displayRegisterView(e){
    e.preventDefault();
    registerView.style.display = 'inline';
    main.appendChild(registerView);
}
 function displayLoginView(e){
    e.preventDefault();
    loginView.style.display = 'inline';
main.appendChild(loginView);

}
async function onSubmitReg(e){
    e.preventDefault();
    let formData = new FormData(formReg); 
    console.log(formData);
    
    let {email,password,rePass} = Object.fromEntries(formData);
    console.log(rePass);
    
    try {
        if(password !== rePass){
throw new Error('The passwords do not match!Try again.');
        }
        let res = await fetch(urlReg,
            {method: 'post',
            headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
        });
       if(res.ok != true){
        const error = await res.json();
        throw new Error(error.message);
       }
       const data = await res.json();
       sessionStorage.setItem('email', data.email)
       sessionStorage.setItem('_id', data._id)
       sessionStorage.setItem('accessToken', data.accessToken)
       logoutButton.style.display='inline';
spanGuest.textContent = data.email;
registerView.remove();
main.appendChild(homeView);
}catch (err) {
    alert(err.message);
}

}
 async function onSubmitLog(e){
 e.preventDefault();

    let formData = new FormData(form); 
    
    let {email,password} = Object.fromEntries(formData);
try {
    let res = await fetch(urlLog,
        {method: 'post',
        headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({email,password})
    });
   if(res.ok != true){
    const error = await res.json();
    throw new Error(error.message);
   }
   const data = await res.json();
   sessionStorage.setItem('email', data.email)
   sessionStorage.setItem('_id', data._id)
   sessionStorage.setItem('accessToken', data.accessToken)
logoutButton.style.display='inline';
spanGuest.textContent = data.email;
loginView.remove();
main.appendChild(homeView);
} catch (err) {
    alert(err.message);
}

 }


