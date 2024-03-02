"use strict"

let lclusername = document.querySelector(".right");
console.log(localStorage.getItem("userName"));
lclusername.innerHTML += localStorage.getItem("userName");
let JSONpath = "../store/items.json"


fetch(JSONpath).then((res) =>{
    if(!res.ok){
        throw new ERROR(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
}).then((data)=>{
    console.log("Able to get data");
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
        price.innerHTML = i["price"];
        addtoCart.innerHTML = "Add to Cart";

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