
class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
constructor(){
    this.head = null;
    this.size = 0;
}

isEmpty(){
    return this.size === 0; 
}

prepend(element){
    debugger
    const node = new Node(element);
    if(this.head == null){
        this.next= null;
        
    }else{
        node.next = this.head;
        
    }
    this.head = node;
    this.size++;

}
printList(){
    
    let curr = this.head;
   
    let str = '';
    while(curr){
        
str += curr.value + ' ';
curr = curr.next;
    }
    console.log(str);
}
// prints the list items


}
const list = new LinkedList();
list.prepend(4);
list.prepend(4);
list.prepend(3);

console.log(list.isEmpty())
list.printList();
