const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNTS = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}


// 01--------------
const deposit = () => {
    while(true){
        const depositeAmount = prompt("Enter Your Deposit Amount: ");
        const numDepositAmount = parseFloat(depositeAmount);
    
        if(isNaN(numDepositAmount) || numDepositAmount <= 0){
            console.log("Invalid Number ! Enter Again");
            
        }
        else{
            return numDepositAmount;
        }
    }
};


// 02--------------
const getNumberOfLine = () => {
    while(true){
        const Lines = prompt("Enter Your Number of Line (1-3): ");
        const numberOfLine = parseFloat(Lines);
    
        if(isNaN(numberOfLine) || numberOfLine <= 0 || numberOfLine > 3){
            console.log("Invalid Number ! Enter Again");
        }
        else{
            return numberOfLine;
        }
    }
};


// 03 ------------------
const getBetAmount = (Balance, numberOfLine) => {
    while(true){
        const getBetAmount = prompt("Enter Your Betting Amount: ");
        const BetAmount = parseFloat(getBetAmount);
    
        if(isNaN(BetAmount) || BetAmount <= 0){
            console.log("Invalid Number ! Enter Again");
            
        }
        else if(BetAmount*numberOfLine > Balance){
            console.log("insuficient Balance! \n"+"Current Balance: "+Balance)
        }
        else{
            
            return BetAmount*numberOfLine;
        }
    }
}

// 04 ------------------
const spin = () => {
    const symbols = [];

    for(const [symbol, count] of Object.entries(SYMBOLS_COUNTS)){
        // console.log(symbols, count);
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i=0; i<COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];

        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

// Transposing the reels array --------
const transpose = (reels) =>{
    const rows = [];

    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    
    return rows;
}


const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1){
                rowString += " | ";
            }
        }

        console.log(rowString);
    }
};


// Winning Check
const getWinnings = (rows, BetAmount, numberOfLine) =>{
    let winnings = 0;

    for(let row=0; row<numberOfLine; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){ // chose one compare with others, same of not
                allSame = false;
                break;
            }
        }

        if(allSame == true){
            winnings += BetAmount*SYMBOLS_VALUES[symbols[0]]; //Symbol Reward Multiply
        }
    }

    return winnings;
}



// Function Calls

// let Balance = deposit();
// console.log("Deposit Amount : " + Balance);

// const numberOfLine = getNumberOfLine();
// console.log("Lines : "+ numberOfLine);

// const BetAmount = getBetAmount(Balance, numberOfLine);
// Balance = Balance - BetAmount*numberOfLine; // Remaining Balance
// console.log("Bet Amount: " + BetAmount + "[Current Balance= "+Balance+"]");

// Spin the Wheel
// const reels = spin();
// console.log(reels);

// const rows = transpose(reels);
// console.log(rows);

// printRows(rows);

// const winnings = getWinnings(rows, BetAmount, numberOfLine);
// console.log("You Won 🪙 : ₹" + winnings);


const Spinzo = () =>{
    let Balance = deposit();

    while(true){
        console.log("You Have Balance Of : ₹" + Balance);

        const numberOfLine = getNumberOfLine();
        const BetAmount = getBetAmount(Balance, numberOfLine);
        Balance -= BetAmount;
        // Spin the Wheel
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows, BetAmount, numberOfLine);
        Balance += winnings;
        console.log("You Won 🪙 : ₹" + winnings.toString());
        console.log("Current Balance : ₹" + Balance);

        if(Balance <= 0){
            console.log("You ran out of Money‼️");
            break;
        }
        
        const playAgain = prompt("Do You Want To Play Again? (y/n) :");
        if(playAgain != 'y') break;
    }
}

Spinzo();