import express from 'express';
import Helper from '../Helpers';
let router = express.Router();

let menu = [
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


router.get('/',(req,res, next)=>{
    res.sendFile(__dirname + '/index.html');
});

router.get('/api/v1/menu',(req,res, next)=>{
    res.statusCode = 201;
    res.setHeader('content-type', 'application/json');
    res.json({
        message:`menu items loaded`,
        order:menu
        
    })
});

export default router;