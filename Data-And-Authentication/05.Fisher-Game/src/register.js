console.log('TODO:// Implement Register functionality');
let logoutButton = document.getElementById('logout');
let spanGuest = document.getElementsByTagName('span')[0];
let formReg = document.getElementsByTagName('form')[0];
let home = document.getElementById('home');
document.querySelectorAll("a").forEach(x=>x.classList.remove('active'));
document.getElementById("register").classList.add('active');
let guest = sessionStorage.getItem('email')

if(guest != null){
    spanGuest.textContent = guest;
    logoutButton.style.display = 'inline';
}else{
    logoutButton.style.display = 'none';
    spanGuest.textContent = 'guest';

}
const urlReg = `http://localhost:3030/users/register`;

formReg.addEventListener('submit',onSubmitReg);

async function onSubmitReg(e){
    e.preventDefault();
    let formData = new FormData(formReg); 
    
   
    console.log(errorP);
    let {email,password,rePass} = Object.fromEntries(formData);

    
    try {
        if(password !== rePass ){

throw new Error();
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
window.location = `./index.html`;
}catch (err) {
    errorP.textContent = 'Error';
setTimeout(()=>{
    errorP.textContent = ''
},1000)
}

}