window.onload = () => {
    goToShop();
    loadCart();
}

let goToShop = () => {
    Array.from(document.getElementsByClassName('go-to-shop')).forEach(btn => {
        btn.addEventListener('click',(e)=> {
            e.stopPropagation();
            window.location.href = window.origin;
        })
    })
}
let empytCart = () => {
    Array.from(document.getElementsByClassName('empty-cart')).forEach(item => {
        item.style.display = "flex"
    })
    Array.from(document.getElementsByClassName('order-summary')).forEach(item => {
        item.className = 'hide-summary'

    })
    resetFormOnCartEmpty();
}
let loadCart = () => {
    window.cart = JSON.parse(localStorage.getItem("cart"));
    if(!cart){
        empytCart()
        

    }
    else if( cart.length > 0){

        
        let totalQuanity = 0;
        let totalAmount = 0;
        cart.forEach(item => {
            let orderItem = document.createElement('div');
            orderItem.className = "order-item"
            orderItem.id = item.imageid;
            let itemName = document.createElement('div');
            itemName.className = "item-name item"
            itemName.innerText = item.name;
            orderItem.appendChild(itemName);
            let range = document.createElement('div');
            range.className = "range"
            let arrow1 = document.createElement('div')
            arrow1.className = "back-arrow arrow";
            arrow1.appendChild(document.createTextNode('\u3008'));
            range.appendChild(arrow1);
            let orderQuantity = document.createElement('div');
            orderQuantity.className = "item-quantity"
            let itemQuantity = document.createElement('input');
            itemQuantity.name = "order-quantity"
            itemQuantity.value = item.quantity;
            itemQuantity.type ="number";
            itemQuantity.min = 1;
            orderQuantity.appendChild(itemQuantity);
            range.appendChild(orderQuantity);
            let arrow2 = document.createElement('div')
            arrow2.className = "front-arrow arrow";
            arrow2.appendChild(document.createTextNode('\u3009'));
            range.appendChild(arrow2);
            orderItem.appendChild(range);
            let itemAmount = document.createElement('div');
            itemAmount.className = "item-amount item";
            let span1 = document.createElement('span')
            span1.id = "amount-symbol"
            span1.innerText = "\u20A6";
            let span2 = document.createElement('span')
            span2.className = "price";
            span2.innerText = item.amount;
            itemAmount.appendChild(span1);
            itemAmount.appendChild(span2);
            orderItem.appendChild(itemAmount);
            let removeBtn = document.createElement('div');
            removeBtn.className = "remove-item";
            let btn = document.createElement('button');
            btn.innerText = "x";
            removeBtn.appendChild(btn);
            orderItem.appendChild(removeBtn);

            document.getElementsByClassName('orders')[0].appendChild(orderItem);
            totalQuanity += parseInt(item.quantity);
            totalAmount += parseInt(item.amount);
        })
        loadData() 
        userFucntions();
    }else{
        empytCart();
    }
}
let userFucntions = () => {
    removeItem();
    increaseQuantity();
    decreaseQuantity();
}
let decreaseQuantity = () => {
    Array.from(document.getElementsByClassName('front-arrow')).forEach(btn => {
        btn.addEventListener('click',(e)=>{
            e.stopPropagation();
            let input = e.target.parentNode.parentNode.children[1].children[1].children[0]
            let id = parseInt(e.target.parentNode.parentNode.id)
            let currentValue = parseInt(input.value);
            if(currentValue > 0){
                input.value = currentValue - 1;
                updateItemCount(currentValue,parseInt(input.value))
            }
            updateCart(id,"SUBTRACT")
            
        })
    })
}
let increaseQuantity = () => {
    Array.from(document.getElementsByClassName('back-arrow')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let currentValue = 0;
            let id = parseInt(e.target.parentNode.parentNode.id);
            Array.from(e.target.nextSibling.children).forEach(input => {
                let currentValue =parseInt(input.value)
                input.value = currentValue + 1
                updateItemCount(currentValue, parseInt(input.value) )
            })
            updateCart(id, "ADD")
        })
    })
}
let updateItemCount = (currentValue, nextValue) => {
    let value = document.getElementById('totalQuantity').innerText
    console.log('value',value)
    document.getElementById('totalQuantity').innerText = value - currentValue + nextValue
    console.log('next',document.getElementById('totalQuantity').innerText)
}
let updateCart = (id, action) => {
    switch(action){
        case 'ADD':
            cart.forEach(item => {
                if(item.imageid == id){
                    item.quantity++;
                }
            })
            break;
        case 'SUBTRACT':
            cart.forEach(item => {
                if(item.imageid == id){
                    if(item.quantity > 0){
                        item.quantity--
                    }
                }
            })
            break;
        default:

    }
    localStorage.setItem('cart',JSON.stringify(cart));
}

let resetFormOnCartEmpty = () => {
    document.getElementById('check-btn').className = 'remove-btn'
    document.getElementById('checkout').className = 'checkout-items resetCart-area'
    document.getElementById('shortInfo').className = 'remove-info'
    document.getElementsByClassName('orders')[0].style.display = "none";
}

let removeItem = () => {
    Array.from(document.getElementsByClassName('remove-item')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentNode.parentNode.id;
            e.target.parentNode.parentNode.style.display = "none";
            rebuildData(id)
        })
    })
}

let rebuildData = (id) => {
    let index = 0;
    for(i = 0; i < cart.length ; i++){
        index = i;
        if(cart[i].imageid === parseInt(id)){
            break;
        }
    }
    cart.splice(index, 1);
    localStorage.setItem('cart',JSON.stringify(cart));
    if(cart.length == 0){
        empytCart();
    }
    loadData();
}

let loadData = () => {
   let totalQuanity = 0;
   let totalAmount = 0;
   cart.forEach(item => {
       totalQuanity += parseInt(item.quantity);
       totalAmount += parseInt(item.amount);
   })
   document.getElementById('totalQuantity').innerText = totalQuanity;
    Array.from(document.getElementsByClassName('check')).forEach(btn => {
        btn.innerText = `Checkout \u20A6  ${totalAmount}`
    })
    Array.from(document.getElementsByClassName('totalAmount')).forEach(span => {
        span.innerText = ` ${totalAmount}`
    })
}