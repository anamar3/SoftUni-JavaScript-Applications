async function lockedProfile() {
    const url = `http://localhost:3030/jsonstore/advanced/profiles`;
    const res = await fetch(url);
    const data = await res.json();
let profile = document.getElementsByClassName('profile')[0];
let main = document.getElementById('main');

profile.remove();

    console.log(Object.entries(data));
    let count =1;
for (const person of Object.entries(data)) {
    let divEl = document.createElement('div');
    divEl.classList.add('profile');
    divEl.innerHTML = `
    <img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user${count}Locked" value="lock" checked>
    <label>Unlock</label>
    <input type="radio" name="user${count}Locked" value="unlock"><br>
    <hr>
    <label>Username</label>
    <input type="text" name="user${count}Username" value="${person[1].username}" disabled readonly />
    <div id="user${count}HiddenFields">
        <hr>
        <label>Email:</label>
        <input type="email" name="user${count}Email" value="${person[1].email}" disabled readonly />
        <label>Age:</label>
        <input type="text" name="user${count}Age" value="${person[1].age}" disabled readonly />
    </div>
    
    <button>Show more</button>
`
console.log(divEl.children);
divEl.children[9].style.display = 'none';

    main.appendChild(divEl);
    count++;
}

main.addEventListener('click',(e)=>{
    let button = e.target;
    let div = e.target.parentElement;
    let unlockedEl = div.children[4];
    let hiddenEl = div.children[9];
    console.log(div);
    if(button.tagName == 'BUTTON'){
        if(button.textContent == 'Show more' && unlockedEl.checked ){
hiddenEl.style.display = 'block';
button.textContent = 'Show less';
        }else if(button.textContent == 'Hide it'&& unlockedEl.checked){
            hiddenEl.style.display = 'none';
            button.textContent = 'Hide it';
        }
    }
})
}