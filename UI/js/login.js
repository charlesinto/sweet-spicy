window.onload = function(){
    openMenu();
    closeMenuBar();
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