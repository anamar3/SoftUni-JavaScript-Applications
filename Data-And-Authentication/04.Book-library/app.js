console.log('My requests...')

const url = `http://localhost:3030/jsonstore/collections/books`;
let loadButton = document.getElementById('loadBooks');
let submitButton = document.getElementsByTagName('button')[5];
const form = document.getElementsByTagName('form')[0];
const formData = new FormData(form);
let nametitle = document.getElementsByName('title')[0];
let nameauthor = document.getElementsByName('author')[0];
nameauthor.value = '';
                nametitle.value = '';
let tbody = document.getElementsByTagName('tbody')[0];

tbody.addEventListener('click', async (e) => {

    if (e.target.tagName == 'BUTTON' && e.target.textContent == 'Edit') {
        let title = e.target.parentElement.parentElement.children[0];
        let author = e.target.parentElement.parentElement.children[1];
        let idBook = await getId(title);

        form.children[0].textContent = 'Edit FORM';
        nameauthor.value = author.textContent;
        nametitle.value = title.textContent;

        submitButton.textContent = 'Save';
        submitButton.addEventListener('click', async (e) => {

            if (submitButton.textContent == 'Save') {
           
                let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${idBook}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({

                            "author": `${nameauthor.value}`,

                            "title": `${nametitle.value}`,

                        })
                    })
                let final = await response.json();
                console.log(final);

                title.textContent = nametitle.value;
                author.textContent = nameauthor.value;
                nameauthor.value = '';
                nametitle.value = '';
                form.children[0].textContent = 'FORM';
                submitButton.textContent = 'Submit';
            }

        })

    } else if (e.target.tagName == 'BUTTON' && e.target.textContent == 'Delete') {
        let title = e.target.parentElement.parentElement.children[0];
        let idBook = await getId(title);
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${idBook}`,
            { method: 'DELETE' })
        let final = await response.json();
        console.log(final);
        e.target.parentElement.parentElement.remove();
        nameauthor.value = '';
        nametitle.value = '';
    }

})

loadButton.addEventListener('click', async (e) => {
    let res = await fetch(url);
    let data = await res.json();
    tbody.innerHTML = '';
    for (const item of Object.values(data)) {
        createBook(item.title, item.author);

    }
    nameauthor.value = '';
                nametitle.value = '';
})

form.addEventListener('submit', async (e) => {
e.preventDefault();
    if (submitButton.textContent == 'Submit') {   
        if (nameauthor.value == '' || nametitle.value == '') {
            return;
        }
        let data = {
            "author": `${nameauthor.value}`,
            "title": `${nametitle.value}`,
        }
        let res = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            })
        let final = await res.json();
        console.log(final);
        createBook(nameauthor.value, nametitle.value);
        form.reset();
        loadButton.click();
    }
})

function createBook(title, author) {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${title}</td>
    <td>${author}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>`
    tbody.appendChild(tr);
}


async function getId(title) {
    let res = await fetch(url);
    let data = await res.json();
    let array = Object.entries(data);
    let book = array.find(x => x[1].title == title.textContent);
    return book[0];
}