async function solve(){
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const buttonSubmit = document.getElementById('submit');
    const table = document.querySelector('#results tbody');

    const response = await fetch(url);
    const data  = await response.json();
console.log(Object.values(data));
    Object.values(data).forEach(s=> {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facNum = s.facultyNumber;
        const grade = Number(s.grade);

        const tr = document.createElement('tr');
      

const firstCell = tr.insertCell();
firstCell.innerText = firstName;

const lastCell = tr.insertCell();
lastCell.innerText = lastName;

const facNumCell = tr.insertCell();
facNumCell.innerText = facNum;

const gradeCell = tr.insertCell();
gradeCell.innerText = grade;

        table.appendChild(tr);
       
    })

    buttonSubmit.addEventListener('click',onClickSubmit);

    async function onClickSubmit(e){
        e.preventDefault();
        const firstNameEl = document.getElementsByName('firstName')[0];
        const lastNameEl = document.getElementsByName('lastName')[0];
        const facNumEl = document.getElementsByName('facultyNumber')[0];
        const gradeEl = document.getElementsByName('grade')[0];

const response = await fetch(url,{
    method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({

            "firstName": `${firstNameEl.value}`,
            
            "lastName": `${lastNameEl.value}`,

            "facultyNumber": `${facNumEl.value}`,
            "grade": `${gradeEl.value}`


            
            })

            
})
const tr = document.createElement('tr');
const firstCell = tr.insertCell();
firstCell.innerText = firstNameEl.value;

const lastCell = tr.insertCell();
lastCell.innerText = lastNameEl.value;

const facNumCell = tr.insertCell();
facNumCell.innerText = facNumEl.value;

const gradeCell = tr.insertCell();
gradeCell.innerText = gradeEl.value;

table.appendChild(tr);

firstNameEl.value = '';
lastNameEl.value = '';
gradeEl.value = '';
facNumCell.value='';

    }
}

solve();