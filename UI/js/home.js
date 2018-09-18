// import { checkServerIdentity } from "tls";

let ArrayId = [];
let cartArray = [];
let orderCount = 0;

window.onload = function(){
    getCart();
}
let getCart = () => {
    if(localStorage.getItem("cart")){
        let cart = JSON.parse(localStorage.getItem("cart"))
        if(cart.length > 0){
            cart.forEach(item => {
                ArrayId.push(item.imageid)
            })
            cartArray = [...cart]
        }
    }
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

let getMenu = () => {
    return [
        {
            imageid: 2,
            url: "/asset/ice-cream.jpg",
            name: "ice cream",
            amount:"400"
        },
        {
            imageid: 3,
            url: "/asset/yam-sauace.jpg",
            name: "yam sauce",
            amount:"300"
        },
        {
            imageid: 4,
            url: "/asset/yam-porridge.jpg",
            name: "yam porridge",
            amount:"500"
        },
        {
            imageid: 5,
            url: "/asset/pepper-soup.jpg",
            name: "pepper soup",
            amount:"500"
        },
        {
            imageid: 6,
            url: "/asset/thai-food.jpg",
            name: "Thai rice",
            amount:"300"
        },
        {
            imageid: 7,
            url: "/asset/ewedu-soup.jpg",
            name: "ewedu soup",
            amount:"300"
        },
        {
            imageid: 8,
            url: "/asset/grilled-chicken.jpg",
            name: "grilled chicken",
            amount:"1000"
        },
        {
            imageid: 9,
            url: "/asset/fried-plantain-and-egg-sauce.jpg",
            name: "fried plaintain with egg sauce",
            amount:"300"
        },
        {
            imageid: 10,
            url: "/asset/golden-fried-chicken.jpg",
            name: "Fried chicken",
            amount:"500"
        },
        {
            imageid: 11,
            url: "/asset/rice-1.jpg",
            name: "Jellof Rice",
            amount:"300"
        },
        {
            imageid: 12,
            url: "/asset/african-salad-abacha.jpg",
            name: "african salad",
            amount:"700"
        },
        {
            imageid: 13,
            url: "/asset/Beans-porridge-and-fried-plantain.jpg",
            name: "Beans porridge",
            amount:"900"
        }
    
    
    
    ]
}


let displayFoodItems = () => {
   let menu = getMenu();
   menu.forEach( item => {
        listItem(item)
   })
   addEventToCheckoutButton(); 
   addEventToInput();
}

let listItem = (item ) => {
    foodItem = document.createElement('div');
        foodItem.className = "food-items make-it-slow";
        foodItem.id = item.imageid
        let image = document.createElement('div');
        image.className = "food-image"
        image.style.backgroundImage = `url(${item.url})`;
        foodItem.appendChild(image);
        let desciptionContainer = document.createElement('div')
        desciptionContainer.className = 'short-description'
        let span3 = document.createElement('span');
        span3.appendChild(document.createTextNode(item.name.toUpperCase()))
        span3.className = "item-name"
        desciptionContainer.appendChild(span3);
        let span2 = document.createElement('span');
        span2.appendChild(document.createTextNode(`\u20A6 ${item.amount}`))
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
}

let addEventToCheckoutButton = () => {
    Array.from(document.getElementsByClassName('checkout-button')).forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('dis btn', e)
            e.target.style.display = "none"
            e.target.nextSibling.style.display = "flex"
            let  itemId = parseInt(e.target.parentNode.parentNode.id);
            let selectedItem = getMenu().filter(item => item.imageid === itemId);
            
            addToCart(selectedItem)
        })
    })
    addEventToArrows();
}

let addToCart = (item) => {
    if(ArrayId.includes(item[0].imageid)){
        cartArray.forEach(order => {
            if(order.imageid === item[0].imageid){
                order.quantity++
                orderCount++
            }
        })
    }else{
        ArrayId.push(item[0].imageid);
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
            let order = cartArray.filter(item => item.imageid === id);
            orderCount -= order[0].quantity;
            newQuantity = parseInt(e.target.value);
            cartArray.forEach(item => {
                if(item.imageid === id){
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
                if(item.imageid == id){
                    item.quantity++;
                }
            })
            break;
        case 'SUBTRACT':
            cartArray.forEach(item => {
                if(item.imageid == id){
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