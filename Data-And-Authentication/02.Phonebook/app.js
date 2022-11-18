function attachEvents() {
  let ulPhoneBook = document.getElementById('phonebook');
  let loadButton = document.getElementById('btnLoad');

  const personEl = document.getElementById('person');
  const phoneEl = document.getElementById('phone');
const url = `http://localhost:3030/jsonstore/phonebook`;
let createBtn = document.getElementById('btnCreate');

createBtn.addEventListener('click',async(e)=>{
    const data = {

        "person": `${personEl.value}`,
        
        "phone": `${phoneEl.value}`
        
        }
    let res = await fetch(url,
        {method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        
            body: JSON.stringify(data)
          
        });
        let final  = await res.json();
            console.log(final);
         createLi(personEl.value,phoneEl.value,final._id);
            personEl.value = '';
            phoneEl.value = '';
            loadButton.click();
})

  loadButton.addEventListener('click', async(e)=>{
    ulPhoneBook.innerHTML= '';
let res = await fetch(url);
let data = await res.json();
console.log(Object.entries(data));
for (const item of Object.entries(data)) {
  
    createLi(item[1].person,item[1].phone,item[1]._id);
}
  })
function createLi(person,phone,id){
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click',onClickDelete);
    li.textContent = `${person}: ${phone}`;
    li.id = id;
    li.appendChild(deleteButton);
    ulPhoneBook.appendChild(li);

}
 async function onClickDelete(e){
let person = e.target.parentElement;
let res = await fetch(`http://localhost:3030/jsonstore/phonebook/${person.id}`,
{method: 'DELETE'});
person.remove();
return res.json();

  }
}

attachEvents();