window.onload = () => {
    openMenu();
    closeMenuBar();
    getUserOrder();
}

let getUserOrder = () => {
    if(localStorage.getItem('userid')){
        let userid = localStorage.getItem('userid');
        fetch(`/api/v1/users/${userid}/orders`,{
            method:'GET',
            headers: {
                'content-type':'application/json',
                'authorization': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message === `operation successful`){
                if(res.orders.length > 0){
                    buildTable(res.orders)
                }else{
                    document.getElementById('empty-orders').style.display = 'flex';
                }
            }
        })
    }else{
        unBlockUI();
        document.getElementById('empty-orders').style.display = 'flex'; 
    }
}
let buildTable = (orders) => {
    let table = document.getElementById('customers')
    for(i=0; i < orders.length ; i++){
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        cell1.innerHTML  = i + 1;
        cell2.innerHTML = orders[i].orderid
        cell3.innerHTML = orders[i].id
        cell4.innerHTML = orders[i].itemname;
        cell5.innerHTML = orders[i].quantity;
        cell6.innerHTML = orders[i].unit_price * orders[i].quantity;
        let div = document.createElement('div')
        switch(orders[i].status){
            case 'PENDING':
                div.className = 'status pending';
                break;
            case 'CANCELLED':
                div.className = 'status declined';
                break;
            case 'COMPLETE':
                div.className = 'status resolved';
                break;
        }
        div.innerHTML = orders[i].status;
        cell7.appendChild(div);
        let c = new Date(orders[i].dateordered.replace(' ', 'T'));
        cell8.innerHTML = c.toDateString();
    }
    document.getElementById('tbl-container').style.display = 'flex';
    unBlockUI();
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
