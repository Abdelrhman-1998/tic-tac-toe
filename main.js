let newGameContainer=document.querySelector(".newGameMenu");
let startingButtons=document.querySelectorAll(".gameMenuFooter button");
let gameBoard=document.querySelector(".gameBoard");
let restartButton=document.querySelector(".restartGame");
let cancelRestart=document.querySelector(".restartMessage div button:first-child");
let confirmRestart=document.querySelector(".restartMessage div button:last-child");
let restartModal=document.querySelector(".restartModal");
let winningModal=document.querySelector(".winningModal");
let drawModal=document.querySelector(".drawModal");
let choices=document.querySelectorAll(".playerTurnContainer div");
let gameCards=document.querySelectorAll(".gameCard");
let playerTurnImg=document.querySelector(".playerTurn img");
let player_x_score=document.querySelectorAll(".score")[0];
let player_o_score=document.querySelectorAll(".score")[2];
let drawScore=document.querySelectorAll(".score")[1];
let playerTurnValue=document.querySelector(".playerTurn input");
let winQuitButton=document.querySelector(".winningModal .quit");
let drawQuitButton=document.querySelector(".drawModal .quit");
let winNextRoundButton=document.querySelector(".winningModal .nextRound");
let drawNextRoundButton=document.querySelector(".drawModal .nextRound");

let winStatus=false;
let drawStatus=false;
let turn="x";
let roundNumber=1;
let gameMode="";
let player1,player2;
let ties=0;
let x_score=0;
let o_score=0;

if(document.querySelector(".playerTurnContainer .selected").classList.toString().includes("x")){
    player1="x";
    player2="o";
}
else{
    player1="o";
    player2="x";
}


choices.forEach(function(ele){
    ele.addEventListener("click",function(e){
        if(!ele.classList.toString().includes("selected")){
            choices.forEach(function(ele){
                ele.classList.remove("selected");
            })
            ele.classList.add("selected");
            if(ele.classList.toString().includes("x")){
                    player1="x";
                    player2="o";
                   
            }
            else{
                player1="o";
                player2="x";
               
            }
        }
    })
})
startingButtons.forEach(function(ele){
    ele.addEventListener("click",function(e){
        if(ele.innerText.includes("CPU")){
            gameMode="solo";
            if(player1==="x"){
                player_x_score.querySelector(".playerName").querySelector("span").innerText="YOU";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="CPU";
            }
            else{
                player_x_score.querySelector(".playerName").querySelector("span").innerText="CPU";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="YOU";
            }
            if(player1!==turn){
                cpuTurn();
            }
        }
        else{
            gameMode="multi";
            if(player1==="x"){
                player_x_score.querySelector(".playerName").querySelector("span").innerText="P1";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="P2";
            }
            else{
                player_x_score.querySelector(".playerName").querySelector("span").innerText="P2";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="P1";
            }

        }
        console.log(gameMode)
        let container=ele.parentElement.parentElement;
        container.classList.add("d-none");
        gameBoard.classList.remove("d-none");
    })
})

gameCards.forEach(function(ele,index){
        ele.addEventListener("click",function(e){
            let myele=ele;
            if(!ele.classList.toString().includes("selected")){
                setGameCard(ele,myele); 
                if(turn==="x"){
                    turn="o";
                    playerTurnImg.setAttribute("src","./assets/icon-o-silver.svg");
                 
                }
                else{
                    turn="x";
                    playerTurnImg.setAttribute("src","./assets/icon-x.svg")
                }       
            }
            if(gameMode==="solo"){
              if((winStatus===false)&& (drawStatus===false)){
                cpuTurn();
              }
               
            }
            else{
                toggleTurnImg();
            }
    
            
        })
    
    
})

restartButton.addEventListener("click",function(e){
    restartModal.classList.remove("d-none");
    restartModal.classList.add("show");
})
cancelRestart.addEventListener("click",function(e){
    restartModal.classList.add("d-none");
})
confirmRestart.addEventListener("click",function(e){
    restart();

    restartModal.classList.add("d-none");
})

winQuitButton.addEventListener("click",function(e){
    winningModal.classList.remove("show");
    winningModal.classList.add("d-none");
    gameBoard.classList.add("d-none");
    newGameContainer.classList.remove("d-none");
    quit();
    
})
drawQuitButton.addEventListener("click",function(e){
    drawModal.classList.remove("show");
    drawModal.classList.add("d-none");
    gameBoard.classList.add("d-none");
    newGameContainer.classList.remove("d-none");
    quit();
    
})
winNextRoundButton.addEventListener("click",function(e){
    winningModal.classList.remove("show");
    winningModal.classList.add("d-none");
    restart();
})
drawNextRoundButton.addEventListener("click",function(e){
    drawModal.classList.remove("show");
    drawModal.classList.add("d-none");
   restart();

})


function randomGame(){
    let notSelectedFields=[];
    gameCards.forEach(function(ele,index){
        if(!ele.classList.toString().includes("selected")){
            notSelectedFields.push(index)
        }
    })
    let randomElementIndex=Math.floor(Math.random(0,1)*notSelectedFields.length);
    let randomElement=document.querySelectorAll(".gameCard")[notSelectedFields[randomElementIndex]];
    setGameCard(randomElement,randomElement); 
    if(turn==="x"){
        turn="o";
    }
    else{
        turn="x";
    }
    toggleTurnImg();
}
function setGameCard(element1,element2){
 
        if(turn==="x"){
            element1.classList.add("x-selected");
            gameCards.forEach(function(ele){
            if(element2!=ele){
                ele.classList.add("toggleHover");
            }
            
            })
        }
        else{
            element1.classList.add("o-selected");
            gameCards.forEach(function(ele){
                if(element2!=ele){
                    ele.classList.remove("toggleHover");
                }
                
                })
        }
    
        checkWinStatus()   
  
    
}

function toggleTurnImg(){
    if(turn==="x"){
        playerTurnImg.setAttribute("src","./assets/icon-x.svg")
    }
    else{
        playerTurnImg.setAttribute("src","./assets/icon-o-silver.svg")
    }
}
function cpuTurn(){
    gameCards.forEach(function(ele){
        ele.style="pointer-events:none;";
    })
    setTimeout(function(){
        randomGame();
        gameCards.forEach(function(ele){
            if(!ele.classList.toString().includes("selected")){
                ele.style="";
            }
        })
    },700)
}

function checkWinStatus(){
    checkWinner("x");
    if(!winStatus){
        checkWinner("o");
        if(!winStatus){
            let selectedElements=0;
            gameCards.forEach(function(ele){
               if(ele.classList.toString().includes("selected"))[
                ++selectedElements
               ] ;
               
            })
            if(selectedElements===9){
               drawStatus=true;
                ++ties;
                ++roundNumber;
                drawScore.querySelector(".scoreValue").innerText=ties;
               if(gameMode==="solo"){
                setTimeout(function(){
                    drawModal.classList.remove("d-none");
                    drawModal.classList.add("show");
                },700)
               }
               else{
                drawModal.classList.remove("d-none");
                drawModal.classList.add("show");
               }

               
            }
     
        }
    }

}
function checkWinner(game){
    let diagonalOneElements=document.querySelectorAll(`.${game}-selected.d1`);
    let diagonalTwoElements=document.querySelectorAll(`.${game}-selected.d2`);
    if((diagonalOneElements.length===3) || (diagonalTwoElements.length===3)){
        winStatus=true;    
      
    }
    else{
        for(let i=1;i<=3;i++){
            let rowElements=document.querySelectorAll(`.${game}-selected.r${i}`);
            let columnElements=document.querySelectorAll(`.${game}-selected.c${i}`);
            if((rowElements.length===3)|| (columnElements.length===3)){
                winStatus=true;
                
            }
        }
    }
    if(winStatus){
        if(game==="x"){
            ++x_score;
            ++roundNumber;
            if(gameMode==="solo"){
                setTimeout(function(){
                    player_x_score.querySelector(".scoreValue").innerText=x_score;
                },700)
            }
            else{
                player_x_score.querySelector(".scoreValue").innerText=x_score;
            }
            
            winningModal.querySelector(".winMessage").style.color="rgba(49, 195, 189, 1)";
            winningModal.querySelector(".winMessage").querySelector("img").setAttribute("src","./assets/icon-x.svg");
        }
        else{
            ++o_score;
            ++roundNumber;
            if(gameMode==="solo"){
                setTimeout(function(){
                    player_o_score.querySelector(".scoreValue").innerText=o_score;
                },700)
            }
            else{
                player_o_score.querySelector(".scoreValue").innerText=o_score;
            }
            winningModal.querySelector(".winMessage").style.color="rgba(242, 177, 55, 1)";
            winningModal.querySelector(".winMessage").querySelector("img").setAttribute("src","./assets/icon-o.svg");
        }

        if(gameMode==="solo"){
            if(player1===game){
                winningModal.querySelector(".winner").innerText="YOU WON!"
            }
            else{
                winningModal.querySelector(".winner").innerText="OH NO, YOU LOST…"
            }
            gameCards.forEach(function(ele){
                ele.style="pointer-events:none;"
            })
            setTimeout(function(){
                winningModal.classList.remove("d-none");
                winningModal.classList.add("show");
            },700)
    
        }
        else{
            if(player1===game){
                winningModal.querySelector(".winner").innerText="PLAYER 1 WINS!"
            }
            else{
                winningModal.querySelector(".winner").innerText="PLAYER 2 WINS!"
            }
            winningModal.classList.remove("d-none");
            winningModal.classList.add("show");
        }
    
        console.log(`the winner is ${game} player`)
    }


}
function restart(){
    winStatus=false;
    drawStatus=false;
    let class1="x-selected";
    let class2="o-selected";
    let class3="toggleHover";
    console.log(roundNumber)
    if(roundNumber%2===0){
        turn="o";
        playerTurnImg.setAttribute("src","./assets/icon-o-silver.svg");
    
    }else{
        turn="x"
        playerTurnImg.setAttribute("src","./assets/icon-x.svg");
    }
    gameCards.forEach(function(ele){
        ele.style="";
        if(ele.classList.toString().includes(class1)){
            ele.classList.remove(class1)
        }
        if(ele.classList.toString().includes(class2)){
            ele.classList.remove(class2)
        }
        if(ele.classList.toString().includes(class3)){
            ele.classList.remove(class3)
        }
        if(turn==="o"){
            ele.classList.add("toggleHover");
        }
    })
    if(gameMode==="solo"){
        if(player1!==turn){
            cpuTurn();
        }
    }

}
function quit(){
roundNumber=1;
gameMode="";
player1="",player2="";
ties=0;
x_score=0;
o_score=0;
player_x_score.querySelector(".scoreValue").innerText=0;
player_o_score.querySelector(".scoreValue").innerText=0;
drawScore.querySelector(".scoreValue").innerText=0;
restart();
}
// add bonus later