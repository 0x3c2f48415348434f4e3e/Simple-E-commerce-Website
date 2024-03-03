"use strict"

let lclusername = document.querySelector(".right");
//console.log(localStorage.getItem("userName"));
//localStorage.getItem("userName");
let x = document.cookie;

//user a for loop since it seems to be a sting, and get the user name
let tmpstore = "";
for(let i=0; i<x.length; i++){
    if(x[i] == ";"){
        break;
    }
    else{
        tmpstore+=x[i];
    }
}

console.log(tmpstore);

//anothe for loop
let finalres = tmpstore.slice(9);
console.log(finalres)
lclusername.innerHTML += finalres;
let JSONpath = "../store/items.json"

fetch(JSONpath).then((res) =>{
    if(!res.ok){
        throw new ERROR(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
}).then((data)=>{
    //console.log("Able to get data");

    const ItemToCart = (ItemID)=>{ //find a way to pass info here
        console.log(`Adding ${ItemID}`);
    }
    for(let i of data){
        console.log(i);
        //for each i, we create a new div and append in the flex box
        let tmp1 = document.createElement("div");
        let tmp = document.createElement("div");
        let test = document.createElement("img");
        let textPart = document.createElement("div");
        let name = document.createElement("h2");
        let price = document.createElement("h2");
        let addtoCart = document.createElement("button");

        name.innerHTML = i["name"];
        price.innerHTML += `£${i["price"]}`;
        addtoCart.innerHTML = "Add to Cart";

        name.className="forName";
        price.className="forPrice";
        addtoCart.className="forButton";
        addtoCart.id = `${i["name"]}`
        addtoCart.onclick = ItemToCart;//(addtoCart.id);
        textPart.appendChild(name);
        textPart.appendChild(price)
        textPart.appendChild(addtoCart)
        

        tmp1.className = "makeFlex";

        test.src = i["item"];
        test.width='512'

        tmp.appendChild(test)

        tmp1.appendChild(tmp);
        tmp1.appendChild(textPart);
        document.querySelector(".flexarea").appendChild(tmp1);
    }
}
    ).catch((error)=> //data
        console.error("Unable to fetch data:", error));

