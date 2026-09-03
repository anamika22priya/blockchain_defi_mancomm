//transition from main page to game-page
let startScreen = document.getElementById("start-screen");

let gameScreen = document.getElementById("game-screen");

let startButton = document.getElementById("start-button");


startButton.addEventListener("click", function() {

    startScreen.style.display = "none"; //hide first screen

    gameScreen.style.display = "block"; //show secodn screen 

});


// designing incoming car-incoming trsnasaction info- 
//step 1: create trasnactions array 
let transactions = [

    {
        sender: "Alice",
        receiver: "Dave",
        amount: 0.5,
        type: "ETH Transfer",
        gasRequired: 21000,
        baseFee: 20, // fixed for now 
        priorityFee: 2,
        signatureAmount: 0.5,
        balance: 1.0,
    },

    {
        sender: "Bob",
        receiver: "Eve",
        amount: 1.2,
        type: "Token Swap",
        gasRequired: 85000,
        baseFee: 20,
        priorityFee: 3,
        signatureAmount: 1.2,
        balance: 0.5,
    },

    {
        sender: "Maya",
        receiver: "Noah",
        amount: 0.8,
        type: "Token Swap",
        gasRequired: 85000,
        baseFee: 20,
        priorityFee: 2,
        signatureAmount: 1.3,
        balance: 2.0,
    },

    {
    sender: "Alice",
    receiver: "Eve",
    amount: 0.3,
    type: "ETH Transfer",
    gasRequired: 21000,
    baseFee: 20,
    priorityFee: 2,
    signatureAmount: 0.3,
    balance: 1.0,
    },

    {
    sender: "Bob",
    receiver: "DEX Pool",
    amount: 0.4,
    type: "Token Swap",
    gasRequired: 85000,
    baseFee: 20,
    priorityFee: 3,
    signatureAmount: 0.4,
    balance: 1.0,
    },

    {
    sender: "Maya",
    receiver: "Dave",
    amount: 0.6,
    type: "ETH Transfer",
    gasRequired: 21000,
    baseFee: 20,
    priorityFee: 2,
    signatureAmount: 0.9,
    balance: 1.5,
    },

    {
    sender: "Alice",
    receiver: "DEX Pool",
    amount: 0.7,
    type: "Token Swap",
    gasRequired: 85000,
    baseFee: 20,
    priorityFee: 3,
    signatureAmount: 0.7,
    balance: 2.0,
    },

    {
    sender: "Bob",
    receiver: "Dave",
    amount: 0.8,
    type: "ETH Transfer",
    gasRequired: 21000,
    baseFee: 20,
    priorityFee: 2,
    signatureAmount: 0.8,
    balance: 1.2,
    },

    {
    sender: "Maya",
    receiver: "Eve",
    amount: 1.0,
    type: "Token Swap",
    gasRequired: 85000,
    baseFee: 20,
    priorityFee: 2,
    signatureAmount: 1.0,
    balance: 1.5,
    },

    {
    sender: "Alice",
    receiver: "Noah",
    amount: 0.2,
    type: "ETH Transfer",
    gasRequired: 21000,
    baseFee: 20,
    priorityFee: 2,
    signatureAmount: 0.2,
    balance: 1.0,
    }

];

// step 2: now game is aware that these many transactiosn exist....but doesnt know which one the player is currently inspecting 
//so we require a counter 

let currentTransactionIndex = 0; 
let currentTransaction =
    transactions[currentTransactionIndex];

// how to show these transactions on the game page..update it to the transaction panel placheolder 
// connect the level status 
let ETH = 1.00;
let reputation = 100;
let processedTransaction=0;

let Reputationboost=5;
let Reputationpenalty=10;
let gameOver = false;

let queueLength=0;
let congestionWarningShown = false;

//fucntion to update the game status:
function updateLevelStatus(){
    document.getElementById("eth").textContent=ETH.toFixed(3)+ " ETH";
    document.getElementById("reputation").textContent=reputation;
    document.getElementById("quota").textContent=processedTransaction + " /8";

}
function updateResult(isCorrect){
    if(isCorrect){
        reputation += Reputationboost ;
        ETH+= currentTransaction.priorityFee;
    } else {
        reputation -= Reputationpenalty;
            if (reputation <=0){
                gameOver=true;
                resultPopup.style.display="flex";
                resultTitle.textContent="GAME OVER!";
                resultReasons.textContent="Reputation fell too low. Replay the Level";

                continueButton.style.display = "none";
                restartButton.style.display = "inline-block";

        }
    }

    processedTransaction++;

    updateLevelStatus();
};
function showTransaction() {

    let panel = document.getElementById("transaction-details");

    panel.innerHTML = `
    <p>Sender: ${currentTransaction.sender}</p>
    <p>Receiver: ${currentTransaction.receiver}</p>
    <p>Amount: ${currentTransaction.amount} ETH</p>
    <p>Type: ${currentTransaction.type}</p>


    <p>Gas Required: ${currentTransaction.gasRequired}</p>
    <p>Base Fee: ${currentTransaction.baseFee} GWEI</p>
    <p>Priority Fee: ${currentTransaction.priorityFee} GWEI</p>

    <p>Signature History: ${currentTransaction.signatureAmount} ETH</p>
    <p>Transaction Amount: ${currentTransaction.amount} ETH</p>

    <p>Sender Balance: ${currentTransaction.balance} ETH</p>
    <p>Amount + Gas Required: ${totalRequired.toFixed(6)} ETH</p>

     `; // everything between ` and the inner panel tempalte si trwates as html text 

    document.getElementById("contract-sender-receiver").textContent =
        currentTransaction.sender + " → " + currentTransaction.receiver;

    document.getElementById("contract-type").textContent =
        currentTransaction.type;

    document.getElementById("signed-amount").textContent =
        currentTransaction.signatureAmount + " ETH";

    document.getElementById("claimed-amount").textContent =
        currentTransaction.amount + " ETH";

    document.getElementById("sender-balance").textContent =
        currentTransaction.balance + " ETH";

    document.getElementById("total-cost").textContent =
        totalRequired.toFixed(6) + " ETH";




   

};



// seperate contract rules because contract rules belong to that level not to every transaction
let contractRules = {

    allowedSenders: [
        "Alice",
        "Bob",
        "Maya"
    ],

    allowedReceivers: [
        "Dave",
        "Eve",
        "DEX Pool"
    ],

    allowedTypes: [
        "ETH Transfer",
        "Token Swap"
    ]
};
// build game logic 
//javascript has to check if the current sender is in the allowed sender list
let gasPrice; //declare all of them outside the calculateValdiation function becasue they are used by other functions also
let gasFee;
let totalRequired;
let senderAllowed;
let receiverAllowed;
let typeAllowed;
let contractvalid;
let signaturevalid;
let balancesufficient;
let transactionvalid;
function calculateValidation(){
    gasPrice =
        currentTransaction.baseFee +
        currentTransaction.priorityFee; // gas price is a function of congestion because baseFee is a fucntion of congesiton percent 

    gasFee =
        currentTransaction.gasRequired *
        gasPrice /
        1000000000;

    totalRequired =
        currentTransaction.amount +
        gasFee;


    senderAllowed =
        contractRules.allowedSenders.includes(
        currentTransaction.sender
    );
    receiverAllowed =
        contractRules.allowedReceivers.includes(
        currentTransaction.receiver
    );

    typeAllowed =
        contractRules.allowedTypes.includes(
        currentTransaction.type
    );

    contractvalid =
        senderAllowed &&
        receiverAllowed &&
        typeAllowed;

    signaturevalid=
        currentTransaction.signatureAmount===currentTransaction.amount; //== allows type conversion; === is true only if its exactly same...useful for decimal level balances 
// now create space for player's answer

    balancesufficient=
        currentTransaction.balance>=totalRequired;

    transactionvalid=balancesufficient&&contractvalid&&signaturevalid;

};


calculateValidation();
showTransaction();
updateLevelStatus();

// build fucntion to show in pop-up the reason 
function getTransactionReason(){

      let reasons = [];//if we have multiple reasons...we need to push it to the reasons array...so not just return


    if (!signaturevalid) {
        reasons.push("Signature is invalid: the signed amount does not match the transaction amount.");
    }

    if (!balancesufficient) {
        reasons.push("Balance is insufficient to cover the transaction amount and gas fee.");
    }

    if (!contractvalid) {
         if (!senderAllowed) 
        {
            reasons.push("Contract violation: sender is not allowed.");
        }

        if (!receiverAllowed) 
        {
             reasons.push("Contract violation: receiver is not allowed.");
        }

        if (!typeAllowed) 
        {
            reasons.push( "Contract violation: transaction type is not allowed.");
        }
    }
return reasons; //return the reasons array to the game
};
// design the result pop-up
let resultPopup = document.getElementById("result-popup");
let resultTitle = document.getElementById("result-title");
let resultReasons = document.getElementById("result-reasons");
let continueButton = document.getElementById("continue-button");
let restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", function() {
    restartLevel();
});

function showResultPopup(isCorrect){ //isCorrect will take the value of true or false when we call the function
    if(isCorrect){
        resultTitle.textContent="CORRECT!";
    }else{
        resultTitle.textContent="WRONG!";
    }

    let reasons=getTransactionReason();

    resultReasons.innerHTML= ""; //lets javascript read html code...so allows us to change what's inside the box dynamically
    if(reasons.length==0){
        resultReasons.innerHTML="<p>All validation checks passed. This transaction is valid.</p>"
    }else {
        reasons.forEach(function(reason){//function(reason)is callback
            let reasonText =document.createElement("p");
            reasonText.textContent=". "+reason;
            resultReasons.appendChild(reasonText);
        }); //For every reason, create a paragraph, put the reason inside it, and add that paragraph to the results section
    }
    resultPopup.style.display="flex"; // earlier it was .display=none....therefore the popup was hidden now, it turns to flex so the popup is visible 

};

continueButton.addEventListener("click",function(){
    if(queueLength>0){
    queueLength--;
    updateQueue();
    removeQueueCar();}
    currentTransactionIndex++;
    if(currentTransactionIndex < transactions.length){
        currentTransaction=transactions[currentTransactionIndex];

        console.log("Next transaction:", currentTransaction);
        calculateValidation();
        showTransaction();

        resultPopup.style.display="none";
        startTimer(); //order in js matters for variable declarations not for fucntion declarations 

    }else {
        resultTitle.textContent="LEVEL COMPLETE!";

        resultReasons.innerHTML="<p>You have processed all transactions.</p>";
        continueButton.style.display="none";
    }
});

let timeLimit=25;
let timeRemaining=timeLimit;
let timer;

function startTimer(){
    timeRemaining=timeLimit; //because everytime a new trasnaction starts it needs to be reset. 

    document.getElementById("time-remaining").textContent=timeRemaining.toFixed(1) + "s";

    timer=setInterval(function(){ // setInterval() is an in-built function
        timeRemaining-=0.1;

        document.getElementById("time-remaining").textContent=
            timeRemaining.toFixed(1) + "s";
        let progress = timeRemaining / timeLimit;

        document.getElementById("timer-bar").style.width =
            Math.max(0, progress * progress * 100) + "%";   
        if(timeRemaining <= 0){
            clearInterval(timer);
            updateResult(false);
            resultTitle.textContent = "TIME RAN OUT!";
            resultReasons.innerHTML = "<p>You did not process this transaction in time.</p>";

            continueButton.style.display = "inline-block";
            restartButton.style.display = "none";

            resultPopup.style.display = "flex";

            console.log("Time's UP!");
        }
    },100); // means run the setInterval function every 100 milliseconds until we stop it wiht clearInterval(timer)
}// setInterval() and clearInterval() works as a pair. 

startTimer();
// now connect the player's answers


function updateQueue() {
    document.getElementById("queue-count").textContent =
        "Queue: " + queueLength + " waiting";

    updateCongestion();
}

function updateCongestion() {
    let maxQueue =8;

    let congestion =
        (queueLength / maxQueue) * 100;

    congestion = Math.min(congestion, 100);

    document.getElementById("congestion-level").style.width =
        congestion + "%";

    document.getElementById("congestion-percent").textContent =
        Math.round(congestion) + "%";

    if (congestion===100){
        gameOver=true;
        resultPopup.style.display="flex";
        resultTitle.textContent="Congestion HIGH! Game OVER!";
        resultReasons.textContent="Base Fee too high. All cars left! Replay the level ";
        continueButton.style.display = "none";
        restartButton.style.display = "inline-block";


    }
}


function addQueueCar() {
    let car = document.createElement("div");

    car.textContent = "🚗";
    car.classList.add("queue-car");

    car.style.left = (45 - queueLength * 5) + "%";

    document.getElementById("toll-road").appendChild(car);
}
function removeQueueCar() {
    let cars = document.querySelectorAll(".queue-car");

    if (cars.length > 0) {
        cars[0].remove();
    }
}

setInterval(function() {
    queueLength++;
    updateQueue();
    addQueueCar();

    if (queueLength >= 4 && !congestionWarningShown) {
        congestionWarningShown = true;

        resultPopup.style.display="flex";
        resultTitle.textContent="Congestion increasing !!"
        resultReasons.textContent="The base fee is increasing ! The customer's are annoyed!"

    }
}, 8000);




let approve=document.getElementById("approve");
approve.addEventListener("click",function(){

    if (transactionvalid) {
        updateResult(true);
       showResultPopup(true);
    } else {
        updateResult(false);
        if (!gameOver) {
            showResultPopup(false);
         }}
});

let reject =document.getElementById("reject");
reject.addEventListener("click",function(){

   
    if (!transactionvalid) {
        updateResult(true);
       showResultPopup(true);
    } else {
        updateResult(false);
        if (!gameOver) {
            showResultPopup(false);
                }
            }

});

function restartLevel() {
    location.reload();
}




