"use strict"
//prevent.default when button click
let buttonPress = document.querySelector("#button");
let username = document.querySelector(".username");
let password = document.querySelector(".password");
let errorSection = document.querySelector(".error");
let JSONpath = "../database/user.json";
//some sanity checks

let preventEvent = (event)=>{
    event.preventDefault();

    if(username.value == "" || password.value == ""){
        console.log("Username and/or password left empty");
        errorSection.innerHTML = "<p>Can not leaver username and/or password empty</p>";
    }
    else{
        console.log("Not blank")
        errorSection.innerHTML = "";

        //next lets get out database (i.e. our json file)
    /*
    There are several ways to read JSON files, here we will use fetch

    https://www.geeksforgeeks.org/read-json-file-using-javascript/

    */

        fetch(JSONpath).then((res) =>{
            if(!res.ok){
                throw new ERROR(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        }).then((data)=>{
            console.log("Able to get data");
            for(let i of data){
                //check if the username and password match
                if((username.value === i["userName"]) && (password.value === i["password"])){
                    console.log("Able to log into application");
                    errorSection = ""
                    //actually, we can use cookies to store user data
                    
                    //we can store used data in local storage, and then get it after
                    //window.localStorage.setItem("userName",username.value);
                    //window.localStorage.setItem("password",password.value);
                    document.cookie = `username=${username.value}`;
                    document.cookie = `password=${password.value}`;
                    
                    window.location.href = "http://127.0.0.1:5500/src/html/main.html?";
                }
                else{
                    errorSection.innerHTML = "<p>Wrong username and/or password</p>";
                    console.log("Wrong username and/or password");
                    /*
                    Some testing
                    console.log(i["userName"]);
                    console.log(i["password"]);
                    console.log(username.value);
                    console.log(password.value);
                    */
                }
            }
        }
            ).catch((error)=> //data
                console.error("Unable to fetch data:", error));

    //Next we are going to compare if the stuff is right

    /*
        To do such a task, we have to loop through the size of the database
    */


    }

}

buttonPress.addEventListener("click",preventEvent);