window.onload = function(){
    openMenu();
    closeMenuBar();
    displayFoodItems();
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

let getFoodMenu = () =>{
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
   let menuItem = getFoodMenu();
   
   menuItem.forEach( item => {
        foodItem = document.createElement('div');
        foodItem.className = "food-items make-it-slow";
        foodItem.id = item.imageid
        let image = document.createElement('div');
        image.className = "food-image"
        image.style.backgroundImage = `url(${item.url})`;
        foodItem.appendChild(image);
        let desciptionContainer = document.createElement('div')
        desciptionContainer.className = 'short-description'
        let span1 = document.createElement('span');
        span1.appendChild(document.createTextNode(item.name));
        desciptionContainer.appendChild(span1);
        let span2 = document.createElement('span');
        span2.appendChild(document.createTextNode(item.amount))
        desciptionContainer.appendChild(span2);
        foodItem.appendChild(desciptionContainer)
        console.log("imahe",image.style.backgroundImage)
        console.log('food-item', foodItem.style)
        document.getElementsByClassName('food-menu')[0].appendChild(foodItem);
   })
   

  
}


