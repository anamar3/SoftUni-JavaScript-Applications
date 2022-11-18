console.log('TODO:// Implement Home functionality');


let logoutButton = document.getElementById('logout');
let spanGuest = document.getElementsByTagName('span')[0];
const urlOut = `http://localhost:3030/users/logout`;
document.querySelectorAll("a").forEach(x=>x.classList.remove('active'));
document.getElementById("home").classList.add('active');
let guest = sessionStorage.getItem('email')
if(guest != null){
    spanGuest.textContent = guest;
    logoutButton.style.display = 'inline';
}else{
    logoutButton.style.display = 'none';
    spanGuest.textContent = 'guest';

}
let main = document.getElementById('main');
let allCatches = document.getElementById('catches');
main.remove();
logoutButton.addEventListener('click',onLogout);

let fieldSetCatches = document.getElementsByTagName('fieldset')[0]; 
let homeView = document.getElementById('home-view');
let buttonsUpdate = document.getElementsByClassName('update');
let buttonsDelete = document.getElementsByClassName('delete');
let buttonAdd = document.getElementsByClassName('add')[0];
let formForAddingNewCatch = document.getElementById('addForm');
const urlCreateNewCatch = `http://localhost:3030/data/catches`;
let buttonLoad = document.getElementsByClassName('load')[0];

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
let data = await res.json();
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
    homeView.prepend(main);
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
      
        spanGuest.textContent = 'guest';
        logoutButton.style.display='none';
    
    }
    
    } catch (error) {
        alert(error.message);
    }
    
    
    }