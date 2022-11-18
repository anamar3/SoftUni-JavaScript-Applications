console.log('TODO:// Implement Login functionality');
let logoutButton = document.getElementById('logout');
let spanGuest = document.getElementsByTagName('span')[0];
let home = document.getElementById('home');
let form = document.getElementsByTagName('form')[0];
document.querySelectorAll("a").forEach(x=>x.classList.remove('active'));
document.getElementById("login").classList.add('active');
const urlLog = `http://localhost:3030/users/login`;
console.log(form);
form.addEventListener('submit',onSubmitLog);
let guest = sessionStorage.getItem('email')
if(guest != null){
    spanGuest.textContent = guest;
    logoutButton.style.display = 'inline';
}else{
    logoutButton.style.display = 'none';
    spanGuest.textContent = 'guest';

}

async function onSubmitLog(e){
    e.preventDefault();
   
       let formData = new FormData(form); 
       
       let {email,password} = Object.fromEntries(formData);
   try {
    
    if(email=='' || password == ''){
        throw new Error();
    }
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
   home.click();
  
   } catch (err) {
    const errorP = document.querySelector('p.notification');
    
    errorP.textContent = 'Error';
    setTimeout(()=>{
        errorP.textContent = ''
    },1000)  
   }
   
    }