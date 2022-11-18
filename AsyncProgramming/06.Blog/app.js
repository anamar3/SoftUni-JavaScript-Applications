function attachEvents() {
    const buttonLoad = document.getElementById('btnLoadPosts');
    const buttonView = document.getElementById('btnViewPost');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const comments = document.getElementById('post-comments');

    const urlPosts = `http://localhost:3030/jsonstore/blog/posts`;
    const urlComments = `http://localhost:3030/jsonstore/blog/comments/`;
    const allPosts = document.getElementById('posts');


    buttonLoad.addEventListener('click', async (e) => {
        const res = await fetch(urlPosts);
        const data = await res.json();
          Object.entries(data).forEach(a => {
       
            allPosts.appendChild(createElement('option', `${a[1].title}`, ['value', `${a[0]}`]));

        });

        buttonView.addEventListener('click', async (e) => {
            let key = allPosts.value;
            let text = allPosts.options[allPosts.selectedIndex].text.toUpperCase();
            let body = data[key].body;

            const res2 = await fetch(urlComments);
            const data2 = await res2.json();


            comments.innerHTML = '';     
        Object.entries(data2).forEach(x => {
            if (x[1].postId == key) {
console.log(x[1].postId);
                postTitle.textContent = text;
                postBody.textContent = body;
                comments.appendChild(createElement('li', `${x[1].text}`, ['id', `${x[1].id}`]));
            }
        })
        })

    });

function createElement(tag, text, attributes = []) {
    let el = document.createElement(tag);
    if (text) {
        el.textContent = text;
    }
    if (attributes.length != 0) {
        for (let i = 0; i < attributes.length; i += 2) {
            el.setAttribute(attributes[i], attributes[i + 1]);

        }
    }
    return el;
}
}

attachEvents();