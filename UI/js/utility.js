window.ArrayId = [];
window.cartArray = [];
window.orderCount = 0;

window.blockUi = () => {
    document.getElementById('blockUI').style.display = 'flex';
}
window.unBlockUI = () => {
    document.getElementById('blockUI').style.display = 'none';
}
if(localStorage.getItem('token')){
    Array.from(document.getElementsByClassName('login')).forEach( link => {
        link.style.display = 'none'
        
    })
    Array.from(document.getElementsByClassName('logout')).forEach( link => {
        link.style.display = 'flex'
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            localStorage.removeItem('roleid');
        })
    })
}



if(localStorage.getItem("cart")){
    let cart = JSON.parse(localStorage.getItem("cart"))
    if(cart.length > 0){
        cart.forEach(item => {
            ArrayId.push(item.itemid)
        })
        cartArray = [...cart]
    }
}
if(localStorage.getItem('token')){
    Array.from(document.getElementsByClassName('login')).forEach( link => {
        link.style.display = 'none'
    })
    Array.from(document.getElementsByClassName('logout')).forEach( link => {
        link.style.display = 'flex'
    })
}