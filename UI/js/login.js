// import { loginUser } from "../../server/Controller";

window.onload = function(){
    openMenu();
    closeMenuBar();
}
let closeMenuBar = () =>{
    document.getElementById('closeMenu').addEventListener('click', (e)=> {
        e.stopPropagation();
       closeNav()
    })
    loginEventListener();
}
let loginEventListener = () => {
    Array.from(document.getElementsByClassName('btn-login')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            loginUser()
        })
    })
    Array.from(document.getElementsByClassName('btn-signup')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            signupUser()
        })

    })
}
let signupUser = () => {
    blockUi();
    let firstname = '',lastname='',email='',phonenumber = '',password = '',status=-1;
    if( window.innerWidth < 768){
        firstname = document.getElementById('fname-signup-2').value
        lastname = document.getElementById('lname-signup-2').value
        email = document.getElementById('email-signup-2').value
        phonenumber = document.getElementById('phonenumber-signup-2').value
        password = document.getElementById('pwd-signup-2').value
        cpassword = document.getElementById('cpwd-signup-2').value
    }else{
        firstname = document.getElementById('fname-signup-1').value
        lastname = document.getElementById('lname-signup-1').value
        email = document.getElementById('email-signup-1').value
        phonenumber = document.getElementById('phonenumber-signup-1').value
        password = document.getElementById('pwd-signup-1').value
        cpassword = document.getElementById('cpwd-signup-1').value
    }
    if( password === cpassword){
        fetch(`/api/v1/auth/signup`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({firstname,lastname,email,phonenumber,password})
        })
        .then(res => { status = res.status; return res.json()})
        .then(res => {
            if(status == 201){
                unBlockUI();
                console.log(res)
                localStorage.setItem('token',res.token);
                localStorage.setItem('roleid',res.roleid);
                localStorage.setItem('userid', res.userid);
                window.location = window.origin;
            }else{
                alert('an error occurred')

            }
        })
        .catch(err => console.log(err))
    }else{
        alert('password dont match')
    }
}
let loginUser = () => {
    let email='',password='', status = -1;
    blockUi();
    if(isMobile()){
         email = document.getElementById('email-login-2').value.trim()
         password = document.getElementById('pwd-login-2').value.trim()
    }else{
         email = document.getElementById('email-login-1').value.trim()
         password = document.getElementById('pwd-login-1').value.trim()
    }
    
    let user = {email,password}
    console.log(JSON.stringify(user))
    fetch('/api/v1/auth/login',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(user) 

    })
    .then(res => { status = res.status; return res.json()})
    .then((res) => {
        unBlockUI()
        if(status == 200){
            localStorage.setItem('token',res.token);
            localStorage.setItem('roleid',res.roleid);
            localStorage.setItem('userid', res.userid);
            window.location = window.origin;
        }
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
let isMobile =  () => {
    if(window.innerWidth < 768){
        return true;
    }
    return false;
}

let openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}
let closeNav = () => {
    
    document.getElementById("mySidenav").style.width = "0";
        
}