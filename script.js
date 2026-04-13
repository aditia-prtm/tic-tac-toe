// VARIABEL
let btn1 = document.getElementById("first");
let btn2 = document.getElementById("second");
let btn3 = document.getElementById("third");
let btn4 = document.getElementById("fourth");
let btn5 = document.getElementById("fifth");
let btn6 = document.getElementById("sixth");
let btn7 = document.getElementById("seventh");
let btn8 = document.getElementById("eighth");
let btn9 = document.getElementById("nineth");
let reset = document.getElementById("reset");
let result = document.getElementById("result");

btn1.addEventListener("click", () => insertX(btn1, 1));
btn2.addEventListener("click", () => insertX(btn2, 2));
btn3.addEventListener("click", () => insertX(btn3, 3));
btn4.addEventListener("click", () => insertX(btn4, 4));
btn5.addEventListener("click", () => insertX(btn5, 5));
btn6.addEventListener("click", () => insertX(btn6, 6));
btn7.addEventListener("click", () => insertX(btn7, 7));
btn8.addEventListener("click", () => insertX(btn8, 8));
btn9.addEventListener("click", () => insertX(btn9, 9));
reset.addEventListener("click", () => resetBoard());

let grid = Array(9).fill("");
let numLet = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "nineth"];
let filled = Array(9).fill(false);
let cntFill = 0;
let isDone = false;

// FUNCTION
function getRandomNum(){
    return parseInt(Math.random() * 9);
}

function insertX(userBtn, idx){
    if(cntFill < 9 && filled[idx-1] == false && isDone == false){
        userBtn.textContent = "X";
    
        filled[idx-1] = true;
        grid[idx-1] = "X";
        cntFill++;

        periksa();

        if(cntFill < 9 && isDone == false){
            setTimeout(() => {
                insertO();
                cntFill++;
                periksa();
            }, 500);

        }else if(isDone == false){
            result.textContent = "Imbang!";
        }
    }else if(cntFill == 9 && isDone == false){        
        result.textContent = "Imbang!";
    }
}

function insertO(){
    let randomNum = 0;
    do{
        randomNum = getRandomNum();
    }while(filled[randomNum] == true);

    filled[randomNum] = true;

    let x = numLet[randomNum];
    let a = document.getElementById(x);
    a.textContent = "O";
    grid[randomNum] = "O";
}

function resetBoard(){
    numLet.forEach((val, i) => {
        let x = document.getElementById(val);
        x.textContent = "";
        x.classList.remove("win");
        x.classList.remove("lose");
        console.log(x.textContent);
        filled[i] = false;
        grid[i] = "";
    });
    isDone = false;
    cntFill = 0;
    result.textContent = "";
}


// PERIKSA ARRAY
// 1 2 3 
// 4 5 6 
// 7 8 9 
// 1 4 7 
// 2 5 8 
// 3 6 9 
// 1 5 9 
// 3 5 7

const arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]];

function periksa(){
    for(let i = 0; i < 8; i++){
        if(grid[arr[i][0]] != "" && grid[arr[i][0]] == grid[arr[i][1]] && grid[arr[i][1]] == grid[arr[i][2]]){
            let p = document.getElementById(numLet[arr[i][0]]);
            let q = document.getElementById(numLet[arr[i][1]]);
            let r = document.getElementById(numLet[arr[i][2]]);

            if(grid[arr[i][0]] == "X"){
                result.textContent = "Anda Menang!";
                p.classList.toggle("win");
                q.classList.toggle("win");
                r.classList.toggle("win");
            }else{
                result.textContent = "Anda Kalah!";
                p.classList.toggle("lose");
                q.classList.toggle("lose");
                r.classList.toggle("lose");
            }
            isDone = true;
        }
    }
}