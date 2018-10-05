// import { checkServerIdentity } from "tls";

window.onload = function(){
    getCart();
}
let getCart = () => {
    monitorQuantityToggleDisplay();
}
let closeMenuBar = () =>{
    document.getElementById('closeMenu').addEventListener('click', (e)=> {
        e.stopPropagation();
       closeNav()
    })
}
let openMenu = () => {
    document.getElementById('open-menu').addEventListener('click',(e)=>{
        e.stopPropagation();
        openNav();
    })
    document.getElementsByTagName('body')[0].addEventListener('click', ()=> {
        closeNav()
        
    })
}

let openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}
let closeNav = () => {
    
    document.getElementById("mySidenav").style.width = "0";
        
}

let  getMenu = async () => {
    return new Promise((resolve,reject) => {
        fetch('/api/v1/menu', {
            method: 'GET' 
         })
         .then(res => res.json())
         .then((res) => {
             if( res.message === `operation successful`){
                 resolve(res.menu);
             }
         })
         .catch((err) => reject(err)
        )
    })
}


let displayFoodItems = async () => {
   window.menu = await getMenu();
   try{
       await showMenu(menu);
       addEventToCheckoutButton(); 
        addEventToInput();
   }catch(e){
       console.log(e)
   }
   
}
let showMenu = async (menu) => {
    for(let i=0; i < menu.length ; i++){
        await listItem(menu[i])
        console.log(i)
    }
}
let listItem = async (item ) => {
    return new Promise((resolve,reject) => {
        try{
            foodItem = document.createElement('div');
            foodItem.className = "food-items make-it-slow";
            foodItem.id = item.itemid
            let image = document.createElement('div');
            image.className = "food-image"
            image.style.backgroundImage = `url(${item.url})`;
            foodItem.appendChild(image);
            let desciptionContainer = document.createElement('div')
            desciptionContainer.className = 'short-description'
            let span3 = document.createElement('span');
            span3.appendChild(document.createTextNode(item.itemname.toUpperCase()))
            span3.className = "item-name"
            desciptionContainer.appendChild(span3);
            let span2 = document.createElement('span');
            span2.appendChild(document.createTextNode(`\u20A6 ${item.unit_price}`))
            span2.className = "item-amount";
            let checkoutButton = document.createElement('button');
            checkoutButton.appendChild(document.createTextNode('Checkout'))
            checkoutButton.className = "checkout-button"
            let quantityContainer = document.createElement('div');
            quantityContainer.className = 'pick-quantity';
            let span4 = document.createElement('span')
            span4.appendChild(document.createTextNode(`\u3008`))
            let span5 = document.createElement('span')
            span5.appendChild(document.createTextNode(`\u3009`))
            span5.className = 'arrow right';
            span4.className = 'arrow left'
            let input = document.createElement('input')
            input.name = 'quantity';
            input.className = 'order-quantity'
            input.type = "number";
            input.placeholder = "1";
            input.min = 1
            quantityContainer.appendChild(span4);
            quantityContainer.appendChild(input);
            quantityContainer.appendChild(span5);
            desciptionContainer.appendChild(span2);
            desciptionContainer.appendChild(checkoutButton);
            desciptionContainer.appendChild(quantityContainer);
            foodItem.appendChild(desciptionContainer)
            console.log("imahe",image.style.backgroundImage)
            console.log('food-item', foodItem.style)
            document.getElementsByClassName('food-menu')[0].appendChild(foodItem);
            resolve(0)
        }catch(e){
            reject(e)
        }
    })
    
}

let addEventToCheckoutButton = async () => {
    Array.from(document.getElementsByClassName('checkout-button')).forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('dis btn', e)
            e.target.style.display = "none"
            e.target.nextSibling.style.display = "flex"
            let  itemId = parseInt(e.target.parentNode.parentNode.id);
            let selectedItem = menu.filter(item => item.itemid === itemId);
            
            addToCart(selectedItem)
        })
    })
    addEventToArrows();
}

let addToCart = (item) => {
    if(ArrayId.includes(item[0].itemid)){
        cartArray.forEach(order => {
            if(order.itemid === item[0].itemid){
                order.quantity++
                orderCount++
            }
        })
    }else{
        ArrayId.push(item[0].itemid);
        cartArray.push({...item[0], quantity: 1})
        orderCount++;
    }
    
    updateLabel(orderCount)
    console.log('ids',ArrayId);
    console.log('orders', cartArray);
}

let updateLabel = (count) => {
    Array.from(document.getElementsByClassName('counter')).forEach(label => {
        label.innerText = count;
    })
    Array.from(document.getElementsByClassName('label')).forEach(divLabel => {
        divLabel.style.display = 'flex'
    })
}
let addEventToInput = () => {
    Array.from(document.getElementsByClassName('order-quantity')).forEach( input => {
        input.addEventListener('change', (e) => {
            e.stopPropagation();
            console.log(e.target.parentNode.parentNode.parentNode.id);
            let id = parseInt(e.target.parentNode.parentNode.parentNode.id)
            let order = cartArray.filter(item => item.itemid === id);
            orderCount -= order[0].quantity;
            newQuantity = parseInt(e.target.value);
            cartArray.forEach(item => {
                if(item.itemid === id){
                    item.quantity = newQuantity;
                }
            })
            orderCount += newQuantity;
            updateLabel(orderCount);
        })
    })
    goToCartEventListener();
}
let addEventToArrows = () => {
    Array.from(document.getElementsByClassName('right')).forEach(arrow => {
        arrow.addEventListener('click',(e) => {
            e.stopPropagation();
            //e.target.parentNode.childNodes[1].value = parseInt(e.target.parentNode.childNodes[1].value) + 1
            if(e.target.parentNode.children[1].value == ''){
                e.target.parentNode.children[1].value = 2
                orderCount++;
                updateLabel(orderCount);
                let itemId = parseInt(e.target.offsetParent.id)
                updateCart(itemId, 'ADD')
            }else{
                e.target.parentNode.children[1].value = parseInt(e.target.parentNode.children[1].value) + 1;
                orderCount++;
                updateLabel(orderCount);
                let itemId = parseInt(e.target.offsetParent.id)
                updateCart(itemId, 'ADD')
            }
            console.log('e', e)
        })
    })
    Array.from(document.getElementsByClassName('left')).forEach(arrow => {
        arrow.addEventListener('click',(e) => {
            e.stopPropagation();
            if(parseInt(e.target.parentNode.children[1].value) > 1){
                e.target.parentNode.children[1].value = parseInt(e.target.parentNode.children[1].value) - 1
                orderCount--;
                updateLabel(orderCount);
                let itemId = parseInt(e.target.offsetParent.id)
                updateCart(itemId, 'SUBTRACT')
            } 
            console.log('e',e)
        })
    })
}
let updateCart = (id, action) => {
    switch(action){
        case 'ADD':
            cartArray.forEach(item => {
                if(item.itemid == id){
                    item.quantity++;
                }
            })
            break;
        case 'SUBTRACT':
            cartArray.forEach(item => {
                if(item.itemid == id){
                    item.quantity--;
                }
            })
            break;
        default:

    }
}

let monitorQuantityToggleDisplay = () => {
    let interval = setInterval(() => {
        if(orderCount === 0){
            Array.from(document.getElementsByClassName('label')).forEach(divLabel => {
                divLabel.style.display = 'none'
            })
        }
    }, 500)
    openMenu();
    closeMenuBar();
    displayFoodItems();
}

let goToCartEventListener = () => {
    Array.from(document.getElementsByClassName("cart-item")).forEach(cart => {
        cart.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.setItem('cart', JSON.stringify(cartArray));
            sessionStorage.setItem('cart', JSON.stringify(cartArray));
            window.location.href = window.origin + '/pages/cart.html'
        })
    })
}