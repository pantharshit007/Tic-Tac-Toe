//Define
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const dialog = document.getElementById("winnerDialog");
const winnerMessageElement = document.getElementById("winnerMessage");
const closeDialogButton = document.getElementById("closeDialog");


// Define game Variable
let yourTurn = true; //playerX and playerO
// let visited = [];
const winPtn = [    //winning patterns
    [0,1,2], 
    [3,4,5], 
    [6,7,8],
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8], 
    [2,4,6]
]
let count = 0;

resetBtn.addEventListener("click", reset);

boxes.forEach((box,index)=> {
    box.addEventListener('click', ()=> mark(index));
});

function mark(idx) 
{
    if (yourTurn && boxes[idx].textContent === "") {
        boxes[idx].textContent = "X";
        boxes[idx].style.color = 'tomato';
        yourTurn = !yourTurn;
        boxes[idx].disabled = true;
        count++;    
    } else if (!yourTurn && boxes[idx].textContent === "") {
        boxes[idx].textContent = "O";
        boxes[idx].style.color = 'green';
        yourTurn = !yourTurn;
        boxes[idx].disabled = true;
        count++;
    }

    let winner = checkWinner();

    if (count >= 9 && !winner) { 
        draw();
    }
}


///// A different Method \\\\\
// function mark(idx) {
//     if (!visited.includes(idx)) {   //to prevent re-marking of box
//         visited.push(idx);
//         if (yourTurn) {
//             boxes[idx].textContent = "X";
//             yourTurn = !yourTurn;
//         } else {
//             boxes[idx].textContent = "O";
//             yourTurn = !yourTurn;
//         }
//         boxes[idx].disabled = true;
//     }
// }

function checkWinner() {
    for (let pattern of winPtn) {
        let pos1 = boxes[pattern[0]].textContent;
        let pos2 = boxes[pattern[1]].textContent;
        let pos3 = boxes[pattern[2]].textContent;
        
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                if (pos1 === "X") { var win = "Player 1"; }
                else if (pos1 === "O") { var win = "Player 2"; }

                showWinner(win);
            }
        }
    }
}

function showWinner(win){
    const winnerMessage = `🎊 Congratulation Winner is ${win} 🫵🏽`;

    winnerMessageElement.textContent = winnerMessage;
    dialog.showModal();
    // console.log(winnerMessage);    
}

function draw(){
    const winnerMessage = `We have No winner This Time 🤝. Try Again! `
    // location.reload();
    // console.log(winnerMessage);

    winnerMessageElement.textContent = winnerMessage;
    dialog.showModal();
}

// Closing the dialog when the "Close" button is clicked
closeDialogButton.addEventListener("click", () => {
    dialog.close();
    reset();
});

function reset(){
    boxes.forEach((box)=> {
        box.textContent = "";
        box.disabled = false;
        yourTurn = true;
        count=0;
    })
}