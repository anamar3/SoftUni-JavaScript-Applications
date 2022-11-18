const url = `http://localhost:3030/jsonstore/messenger`;
    const messages = document.getElementById('messages');

function attachEvents() {
    
    const postButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');

    postButton.addEventListener('click',PostMessage);
    refreshButton.addEventListener('click', loadAllMessages);
}

async function PostMessage(){
const authorEl = document.getElementsByName('author')[0];
const contentEl = document.getElementsByName('content')[0];
console.log(authorEl);
if(authorEl.value == '' || contentEl.value == ''){
    alert('Fields are required!!');
}
console.log(authorEl.value);
const author = authorEl.value;
const content = contentEl.value;

await request(url,{author:author,content:content});
contentEl.value ='';
authorEl.value = '';

}

async function loadAllMessages(){
    const data = await fetch(url);
    const res = await data.json();
    messages.value = Object.values(res).map(({author, content}) => `${author}: ${content}`).join(`\n`);
}

async function request(url,option){
if(option){
    option ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(option)
    };
    const response = await fetch(url,option);
    return response.json();
}
}
attachEvents();