let snakes = {16:6, 47:26, 62:18, 88:24};
let ladders = {3:22, 8:30, 28:84, 58:77};

let colors = ["red","blue","green","yellow","purple","orange"];
let positions = {};

function startGame(){
  createBoard();
  createPlayers();
}

function createBoard(){
  const board = document.getElementById("board");
  board.innerHTML="";

  for(let row=9; row>=0; row--){
    let cells=[];
    for(let col=1; col<=10; col++){
      let num=row*10+col;
      cells.push(num);
    }
    if(row%2===1) cells.reverse();

    cells.forEach(num=>{
      let cell=document.createElement("div");
      cell.className="cell";
      cell.id="cell-"+num;
      cell.innerText=num;

      if(snakes[num]) cell.style.background="#ff6b6b";
      if(ladders[num]) cell.style.background="#51cf66";

      board.appendChild(cell);
    });
  }
}

function createPlayers(){
  const container=document.getElementById("players");
  container.innerHTML="";
  positions={};

  colors.forEach(color=>{
    positions[color]=1;

    let btn=document.createElement("button");
    btn.innerText=color.toUpperCase();
    btn.style.background=color;
    btn.style.color="white";
    btn.onclick=()=>rollDice(color);

    container.appendChild(btn);
  });

  updateBoard();
}

function rollDice(color){
  let dice=document.getElementById("diceNumber");
  dice.innerText="🎲";

  let rollInterval=setInterval(()=>{
    dice.innerText=Math.floor(Math.random()*6)+1;
  },100);

  setTimeout(()=>{
    clearInterval(rollInterval);
    let roll=parseInt(dice.innerText);

    positions[color]+=roll;
    if(positions[color]>100) positions[color]=100;

    if(snakes[positions[color]]) positions[color]=snakes[positions[color]];
    if(ladders[positions[color]]) positions[color]=ladders[positions[color]];

    updateBoard();

    if(positions[color]===100){
      alert(color.toUpperCase()+" WINS 🏆");
    }

  },800);
}

function updateBoard(){
  document.querySelectorAll(".cell").forEach(cell=>{
    cell.querySelectorAll(".token").forEach(t=>t.remove());
  });

  for(let color in positions){
    let pos=positions[color];
    let cell=document.getElementById("cell-"+pos);
    if(cell){
      let token=document.createElement("div");
      token.className="token";
      token.style.background=color;
      token.style.left=(Math.random()*25)+"px";
      cell.appendChild(token);
    }
  }
}
