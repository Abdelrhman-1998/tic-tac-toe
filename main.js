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
let gameBoardBody= document.querySelector(".gameBoardBody");
let winStatus=false;
let drawStatus=false;
let turn="x";
let roundNumber=1;
let gameMode="";
let player1,player2;
let ties=0;
let x_score=0;
let o_score=0;
let playedGames=[];
// localStorage
if(localStorage.gameMode===undefined){

    newGameContainer.classList.remove("d-none");
}
else{
    if(localStorage.gameMode!=="" ){
        gameBoard.classList.remove("d-none");
        if(document.querySelector(".playerTurnContainer .selected").classList.toString().includes("x")){
            player1="x";
            player2="o";
        }
        else{
            player1="o";
            player2="x";
        }        
        getLocalStorage();
        console.log("player1",localStorage.player1,"player2",localStorage.player2)
        // console.log(playedGames)
        if(turn==="x"){
            playerTurnImg.setAttribute("src","./assets/icon-x.svg");

        }
        else{
            playerTurnImg.setAttribute("src","./assets/icon-o-silver.svg");
        }
        player_x_score.querySelector(".scoreValue").innerText=x_score;
        player_o_score.querySelector(".scoreValue").innerText=o_score;
        drawScore.querySelector(".scoreValue").innerText=ties;
        fillData();
  
        if(winStatus){
            if(localStorage.winner==="o"){
                winningModal.querySelector(".winMessage").style.color="rgba(242, 177, 55, 1)";
                winningModal.querySelector(".winMessage").querySelector("img").setAttribute("src","./assets/icon-o.svg");
            }
            else if(localStorage.winner==="x"){
    
                winningModal.querySelector(".winMessage").style.color="rgba(49, 195, 189, 1)";
                winningModal.querySelector(".winMessage").querySelector("img").setAttribute("src","./assets/icon-x.svg");
            }
            if(gameMode==="solo"){
                    if(localStorage.winner===player1){
                        winningModal.querySelector(".winner").innerText="YOU WON!";
                    }
                    else{
                        winningModal.querySelector(".winner").innerText="OH NO, YOU LOST…";
                    }

            }
            else{
                    if(localStorage.winner===player1){
                        winningModal.querySelector(".winner").innerText="PLAYER 1 WINS!"
                    }
                    else{
                        winningModal.querySelector(".winner").innerText="PLAYER 2 WINS!"
                    }
            }
       
            winningModal.classList.remove("d-none");
            winningModal.classList.add("show");
        }
        if(drawStatus){
           drawModal.classList.remove("d-none");
           drawModal.classList.add("show");
        }
        if(gameMode==="solo"){
            if(player1==="x"){
                player_x_score.querySelector(".playerName").querySelector("span").innerText="YOU";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="CPU";
            }
            else{
                player_x_score.querySelector(".playerName").querySelector("span").innerText="CPU";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="YOU";
            }
            if((winStatus===false)&& (drawStatus===false)){
                // if(player1!==turn){
                //     cpuTurn();
                // }
             
            }
        }
        else{
            if(player1==="x"){
                player_x_score.querySelector(".playerName").querySelector("span").innerText="P1";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="P2";
            }
            else{
                player_x_score.querySelector(".playerName").querySelector("span").innerText="P2";
                player_o_score.querySelector(".playerName").querySelector("span").innerText="P1";
            }
        }
      
    }
    else{
        if(localStorage.player1==="x"){
            choices[0].classList.add("selected");
            choices[1].classList.remove("selected");
        }
        else{
            choices[1].classList.add("selected");
            choices[0].classList.remove("selected");
        }
        newGameContainer.classList.remove("d-none");
    }
    

}
// End localStorage


choices.forEach(function(ele,index){
    ele.addEventListener("click",function(e){
        choices.forEach((ele)=>{
            ele.classList.remove("selected");
        })
        
        if(!ele.classList.toString().includes("selected")){
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
        updateLocalStorage();
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
        updateLocalStorage();
    })
})

gameCards.forEach(function(ele,index){
        ele.addEventListener("click",function(e){
            let myele=ele;
            if(!ele.classList.toString().includes("selected")){
                console.log("p1",localStorage.player1,"p2",localStorage.player2)
                setGameCard(ele,myele,index); 
                console.log("p1",localStorage.player1,"p2",localStorage.player2)
                let playedElement=new playedGame;
                playedElement.setClassList(ele.classList.toString());
                playedElement.setStyle(ele.style.pointerEvents);
                playedElement.setIndex(index);
                playedGames.push(playedElement);

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
    
            updateLocalStorage();
        })
    
    
})

restartButton.addEventListener("click",function(e){
    restartModal.classList.remove("d-none");
    restartModal.classList.add("show");
    updateLocalStorage();
})
cancelRestart.addEventListener("click",function(e){
    restartModal.classList.add("d-none");
    updateLocalStorage();
})
confirmRestart.addEventListener("click",function(e){
    ties=0;
    x_score=0;
    o_score=0;
    restart();
    player_x_score.querySelector(".scoreValue").innerText=x_score;
    player_o_score.querySelector(".scoreValue").innerText=o_score;
    drawScore.querySelector(".scoreValue").innerText=ties;
    restartModal.classList.add("d-none");
    updateLocalStorage();
})

winQuitButton.addEventListener("click",function(e){
    winningModal.classList.remove("show");
    winningModal.classList.add("d-none");
    gameBoard.classList.add("d-none");
    newGameContainer.classList.remove("d-none");
    quit();
    updateLocalStorage();
})
drawQuitButton.addEventListener("click",function(e){
    drawModal.classList.remove("show");
    drawModal.classList.add("d-none");
    gameBoard.classList.add("d-none");
    newGameContainer.classList.remove("d-none");
    quit();
    updateLocalStorage();
})
winNextRoundButton.addEventListener("click",function(e){
    winningModal.classList.remove("show");
    winningModal.classList.add("d-none");
    restart();
    updateLocalStorage();
})
drawNextRoundButton.addEventListener("click",function(e){
    drawModal.classList.remove("show");
    drawModal.classList.add("d-none");
   restart();
   updateLocalStorage();
})


function randomGame(){
    let notSelectedFields=[];
    gameCards.forEach(function(ele,index){
        if(!ele.classList.toString().includes("selected")){
            notSelectedFields.push(index)
        }
    })
    // select random element (easy mode)
    let randomElementIndex=Math.floor(Math.random(0,1)*notSelectedFields.length);
    let randomElement=document.querySelectorAll(".gameCard")[notSelectedFields[randomElementIndex]];
    let selectedIndex=notSelectedFields[randomElementIndex];
    if(notSelectedFields.length>=8){
        if(!gameCards[4].classList.toString().includes("selected")){
            randomElement=gameCards[4];
            selectedIndex=4;
        }
    }
    else{
        let data=hardMode(randomElement,selectedIndex);  // bonus 2
        randomElement=data[0];
        selectedIndex=data[1]
    }
    setGameCard(randomElement,randomElement,selectedIndex); 
    let playedElement=new playedGame;
    playedElement.setClassList(randomElement.classList.toString());
    playedElement.setStyle(randomElement.style.pointerEvents);
    playedElement.setIndex(selectedIndex);
    playedGames.push(playedElement);
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
        console.log(player1,player2)
        checkWinStatus();
    
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
        updateLocalStorage();
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
               if(gameMode==="solo"){
                setTimeout(function(){
                    drawScore.querySelector(".scoreValue").innerText=ties;
                    drawModal.classList.remove("d-none");
                    drawModal.classList.add("show");
                },700)
               }
               else{
                drawScore.querySelector(".scoreValue").innerText=ties;
                drawModal.classList.remove("d-none");
                drawModal.classList.add("show");
               }

               
            }
     
        }
    }

}
function checkWinner(game){
    let winner;
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
            winner=game;
            localStorage.winner=winner;
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
            winner=game;
            localStorage.winner=winner;
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
            if(player1===winner){
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
            if(player1===winner){
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
    localStorage.winner="";
    playedGames=[];
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
if(choices[0].classList.toString().includes("selected")){
    turn="x";
    player1=turn;
    updateLocalStorage();
}
else{
    turn="x";
    player1="o";
    updateLocalStorage();
}
}
// add bonus later
function updateLocalStorage(){
localStorage.winStatus=winStatus;
localStorage.drawStatus=drawStatus;
localStorage.turn=turn;
localStorage.roundNumber=roundNumber;
localStorage.gameMode=gameMode;
localStorage.player1=player1;
localStorage.player2=player2;
localStorage.ties=ties;
localStorage.x_score=x_score;
localStorage.o_score=o_score;
localStorage.data=JSON.stringify(playedGames);


}
function getLocalStorage(){
  player1=localStorage.player1;
  player2=localStorage.player2;
  (localStorage.winStatus==="true")?winStatus=true:winStatus=false;
  (localStorage.drawStatus==="true")?drawStatus=true:drawStatus=false;
  turn=localStorage.turn;
  gameMode=localStorage.gameMode;
  roundNumber=+localStorage.roundNumber;
  ties=+localStorage.ties;
  x_score=+localStorage.x_score;
  o_score=+localStorage.o_score;
  playedGames=JSON.parse(localStorage.data);

}

class playedGame{
    classList="";
    style="";
    index=0;
    setClassList(val){
        this.classList=val;
    }
    setStyle(val){
        this.style=val
    }
    setIndex(val){
        this.index=val
    }
}
function fillData(){
    if(turn==="x"){
        gameCards.forEach(function(ele){
            ele.classList.remove("toggleHover");
        })
    }
    else{
        gameCards.forEach(function(ele){
            ele.classList.add("toggleHover");
        })
    }

    playedGames.forEach(function(ele,index){
        // console.log(playedGames)
        gameCards[ele.index].setAttribute("class",ele.classList);
        if(ele.style==="none"){
            gameCards[ele.index].style="pointer-events:none;"
        }
        
})
}
function findIndex(row,col){
   
    if(row==1){                    
        selectedIndex=col-row;
    }
    else if(row==2){
 
        selectedIndex=col+row;
    }
    else{
        selectedIndex=col+row+2;

    }
    return selectedIndex
}
function hardMode(randomElement,selectedIndex){
    let data=[];
    let randomElement1=randomElement;
    let selectedIndex1=selectedIndex;
    let rowNumber;
    let columnNumber;
    let lastPlayedGameIndices=playedGames[playedGames.length-1].classList.split(" ").slice(1,4);
    let oppositePlayedGameIndices=playedGames[playedGames.length-2].classList.split(" ").slice(1,4);
    let lastPlayedGameType=playedGames[playedGames.length-1].classList.split(" ").pop();
    let oppositeGameType=playedGames[playedGames.length-2].classList.split(" ").pop();
    let breakStatus=false;
    for(let i=0;i<3;i++){
      if(!breakStatus){

            // search for 3 matching
            if(gameBoardBody.querySelectorAll(`.${oppositePlayedGameIndices[i]}.${oppositeGameType}`).length===2){
                let notSelectedField=gameBoardBody.querySelector(`.${oppositePlayedGameIndices[i]}:not(.${oppositeGameType})`);
              
                if(notSelectedField??false){
                    if(!notSelectedField.classList.toString().includes("selected")){
                        rowNumber=+notSelectedField.classList.toString().split(" ")[1][1];
                        columnNumber=+notSelectedField.classList.toString().split(" ")[2][1];
                        console.log(rowNumber,columnNumber)
                        randomElement1=notSelectedField;
                        selectedIndex1= findIndex(rowNumber,columnNumber);
                        console.log(selectedIndex1)
                        breakStatus=true;
                    }
                }
            
            }
            // decide to block game 
            else if(gameBoardBody.querySelectorAll(`.${lastPlayedGameIndices[i]}.${lastPlayedGameType}`).length===2){
                    let notSelectedField=gameBoardBody.querySelector(`.${lastPlayedGameIndices[i]}:not(.${lastPlayedGameType})`);
                    
                    if(notSelectedField??false){
                        if(!notSelectedField.classList.toString().includes("selected")){
                            rowNumber=+notSelectedField.classList.toString().split(" ")[1][1];
                            columnNumber=+notSelectedField.classList.toString().split(" ")[2][1];
                            randomElement1=notSelectedField;
                            selectedIndex1= findIndex(rowNumber,columnNumber);
                            breakStatus=true;
                         
                        }
                    }

     
            }
        




      }
      else{
        break;
      }
    }
    data.push(randomElement1,selectedIndex1)
    return data
}
