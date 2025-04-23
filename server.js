const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]; 

const express=require("express");
const morgan = require("morgan");
const validator=require("validator"); // easy validate 
const app=express();
app.use(morgan("dev")); // i like the terminal staff :)

app.listen(3000,()=>{
    console.log("listening on port 3000:");
})

app.get('/greetings/:name',(req,res)=>{
    const name=req.params.name;

    res.send(`<h1>Hello there, ${name}</h1>`);
})

app.get('/roll/:number',(req,res)=>{
    const number=req.params.number;
    if(!validator.isNumeric(number)){
        res.send(`<h1>You must specify a number</h1>`)
    }
    else{
        res.send(`<h1>You rolled a ${parseInt(Math.random()*number)}</h1>`);
    }
})

app.get('/collectibles/:index',(req,res)=>{
    const index=req.params.index;
    if(index>collectibles.length-1){
        
        res.send("<h1>This item is not yet in stock. Check back soon!</h1>");
    }
    else{
        res.send(`<h1>So, you want the ${collectibles[index].name} For ${collectibles[index].price}, it can be yours!</h1>`);
    }
});

app.get('/shoes',(req,res)=>{
    const minPrice=req.query['min-price'];
    const maxPrice=req.query['max-price'];
    const type=req.query.type;
    let html='';
    if(minPrice!==undefined && maxPrice!==undefined && type!==undefined){
        shoes.forEach((shoe)=>{
            if(shoe.price>=minPrice && shoe.price<=maxPrice && shoe.type==type){
                html+=`<h1>Name:${shoe.name}, price:${shoe.price} , type:${shoe.type}</h1>`;
            }
        });
        res.send(html);
    }
    else{
        shoes.forEach((shoe)=>{
            html+=`<h1>Name:${shoe.name}, price:${shoe.price} , type:${shoe.type}</h1>`;
        });
        res.send(html);
    }
});