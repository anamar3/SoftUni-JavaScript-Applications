async function solution() {
    const mainElement = document.getElementById('main');
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        data.forEach(a => {
            let divAccordion = createElement('div',null,['class','accordion']);
            let divHead =createElement('div',null,['class','head']);
            let spanTitle = createElement('span',a.title);
            let button = createElement('button','More',['class','button','id',`${a._id}`]);

            divHead.appendChild(spanTitle);
            divHead.appendChild(button);
            let divExtra =createElement('div',null,['class','extra']);
            let p =createElement('p');

            divExtra.appendChild(p);

            divAccordion.appendChild(divHead);
            divAccordion.appendChild(divExtra);

            mainElement.appendChild(divAccordion);

            button.addEventListener('click',toggle);


        });
    } catch (error) {
        console.log(Error)
    }
async function toggle(event){
    let id = event.target.id;
    console.log(id);
    const url2 = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    try {
        const res = await fetch(url2);
        const data = await res.json();
        console.log(data);
        let contentP = event.target.parentElement.parentElement.children[1].firstChild;
      contentP.textContent = data.content;
     
     
      if(event.target.textContent == 'More'){
      contentP.parentElement.style.display = 'block';
      event.target.textContent = 'Less';
      }else if(event.target.textContent == 'Less'){
      contentP.parentElement.style.display = 'none';
      event.target.textContent = 'More';


      }
    } catch (error) {
        console.log(Error);
    }
   
}
    function createElement(tag,text,attributes=[]){
        let el = document.createElement(tag);
        if(text){
            el.textContent = text;
        }
        if(attributes.length !=0){
            for (let i = 0; i < attributes.length; i+=2) {
               el.setAttribute(attributes[i],attributes[i+1]);
                
            }
        }
        return el;
    }
}
solution();