function attachEvents() {
    const url  = `http://localhost:3030/jsonstore/phonebook`;
    const ul = document.getElementById('phonebook');
    const buttonLoad = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    
    const personEl = document.getElementById('person');
    const phoneEl = document.getElementById('phone');
 
    buttonLoad.addEventListener('click',onClickLoad);
    createBtn.addEventListener('click',onClickCreate);
 
    async function onClickCreate(){
 if(personEl.value != '' && phoneEl.value !=''){
 
     const res = await fetch(url,{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
 
         },
         body: JSON.stringify({
 
             "person": `${personEl.value}`,
             
             "phone": `${phoneEl.value}`
             
             })
     });
 
     personEl.value = '';
     phoneEl.value = '';
     ul.innerHTML='';
     buttonLoad.click();
     
 }
    }
    async function onClickLoad(){
     ul.innerHTML= '';
     const response = await fetch(url);
 const data = await response.json();
 console.log(data);
 // ul.innerText = Object.values(data).map(({person,phone})=> `${person}: ${phone}\n`).join(`\n`);
    
 Object.values(data).forEach(x=>{
     const{person,phone,_id} = x;
     const li = createElement('li',`${person}: ${phone}`,ul);
     li.setAttribute('id',_id);
     const deleteButton = createElement('button','Delete',li);
     deleteButton.setAttribute('id','btnDelete');
     deleteButton.addEventListener('click',onClickDelete);
 })
 
 
 }
 
 function createElement(type,text,appender){
 const result = document.createElement(type);
 result.textContent = text;
 appender.appendChild(result);
 return result;
 }
 async function onClickDelete(e){
 const id = e.target.parentNode.id;
  e.target.parentNode.remove();
 const deleteResponse = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`,
 {method: 'DELETE'});
 
 }
 }
 
 attachEvents();