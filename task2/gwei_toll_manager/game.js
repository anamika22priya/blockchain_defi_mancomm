// ========================================
// PLAYER'S ANSWERS
// ========================================

let playerChecks = {

    signature: null,

    balance: null,

    contract: null

};



// ========================================
// POSSIBLE SENDERS
// ========================================

let senders = [

    "Alice",
    "Bob",
    "Charlie",
    "Maya",
    "Noah"

];



// ========================================
// POSSIBLE RECEIVERS
// ========================================

let receivers = [

    "Alice",
    "Bob",
    "Charlie",
    "Store A",
    "Store B"

];



// ========================================
// CONTRACT RULES
// ========================================

let allowedSenders = [

    "Alice",
    "Bob",
    "Charlie"

];


let allowedReceivers = [

    "Bob",
    "Store A",
    "Store B"

];


let allowedTypes = [

    "ETH Transfer"

];



// ========================================
// RANDOM ITEM FUNCTION
// ========================================

function randomItem(array) {

    let index = Math.floor(

        Math.random() * array.length

    );

    return array[index];

}



// ========================================
// GENERATE TRANSACTION
// ========================================

function generateTransaction() {


    // ------------------------------------
    // 1. BASIC TRANSACTION INFORMATION
    // ------------------------------------

    let sender = randomItem(senders);

    let receiver = randomItem(receivers);


    let amount = Number(

        (Math.random() * 2 + 0.1).toFixed(3)

    );



    // ------------------------------------
    // 2. GAS INFORMATION
    // ------------------------------------

    let gasRequired = 21000;

    let baseFee = 20;

    let priorityFee = 2;



    // ------------------------------------
    // 3. GAS PRICE
    // ------------------------------------

    let gasPrice =

        baseFee + priorityFee;



    // ------------------------------------
    // 4. GAS FEE
    // ------------------------------------

    let gasFee =

        gasRequired *
        gasPrice /
        1000000000;



    // ------------------------------------
    // 5. SENDER BALANCE
    // ------------------------------------

    let balance = Number(

        (Math.random() * 3 + 0.1).toFixed(4)

    );



    // ------------------------------------
    // 6. SIGNATURE
    // ------------------------------------

    let signatureValid =

        Math.random() > 0.3;


    let signatureAmount;



    if (signatureValid) {

        signatureAmount = amount;

    }

    else {

        signatureAmount = Number(

            (amount + 0.5).toFixed(3)

        );

    }



    // ------------------------------------
    // 7. BALANCE VALIDATION
    // ------------------------------------

    let balanceSufficient =

        balance >= amount + gasFee;



    // ------------------------------------
    // 8. CONTRACT VALIDATION
    // ------------------------------------

    let contractValid =

        allowedSenders.includes(sender) &&

        allowedReceivers.includes(receiver) &&

        allowedTypes.includes("ETH Transfer");



    // ------------------------------------
    // 9. RETURN TRANSACTION
    // ------------------------------------

    return {

        sender: sender,

        receiver: receiver,

        amount: amount,

        signatureAmount: signatureAmount,

        balance: balance,

        type: "ETH Transfer",

        gasRequired: gasRequired,

        baseFee: baseFee,

        priorityFee: priorityFee,

        gasFee: gasFee,

        signatureValid: signatureValid,

        balanceSufficient: balanceSufficient,

        contractValid: contractValid

    };

}



// ========================================
// CREATE FIRST TRANSACTION
// ========================================

let transaction = generateTransaction();



// ========================================
// DISPLAY TRANSACTION
// ========================================

function showTransaction() {


    let panel =

        document.getElementById(
            "transaction-details"
        );



    panel.innerHTML = `

        <h3>🚗 Transaction</h3>


        <p>

            👤 Sender:

            ${transaction.sender}

        </p>


        <p>

            📥 Receiver:

            ${transaction.receiver}

        </p>


        <p>

            💰 Amount:

            ${transaction.amount} ETH

        </p>


        <p>

            📦 Transaction Type:

            ${transaction.type}

        </p>


        <p>

            ⛽ Gas Required:

            ${transaction.gasRequired}

        </p>


        <p>

            🔥 Base Fee:

            ${transaction.baseFee} gwei

        </p>


        <p>

            💵 Priority Fee:

            ${transaction.priorityFee} gwei

        </p>


        <p>

            💰 Sender Balance:

            ${transaction.balance} ETH

        </p>


        <hr>


        <h3>🔐 Signature History</h3>


        <p>

            ${transaction.sender}

            previously signed for:

            ${transaction.signatureAmount} ETH

        </p>


        <hr>


        <h3>📜 Contract Rules</h3>


        <p>

            <b>Allowed Senders:</b>

            ${allowedSenders.join(", ")}

        </p>


        <p>

            <b>Allowed Receivers:</b>

            ${allowedReceivers.join(", ")}

        </p>


        <p>

            <b>Allowed Transaction Types:</b>

            ${allowedTypes.join(", ")}

        </p>


        <p>

            🧮 Calculate whether the sender can cover:

            amount + gas fee.

        </p>

    `;

}



// ========================================
// DISPLAY FIRST TRANSACTION
// ========================================

showTransaction();



// ========================================
// SIGNATURE — VALID
// ========================================

document

    .getElementById("signature-valid")

    .addEventListener("click", function() {


        playerChecks.signature = true;



        document

            .getElementById("signature-valid")

            .classList.add("selected");



        document

            .getElementById("signature-invalid")

            .classList.remove("selected");

    });



// ========================================
// SIGNATURE — INVALID
// ========================================

document

    .getElementById("signature-invalid")

    .addEventListener("click", function() {


        playerChecks.signature = false;



        document

            .getElementById("signature-invalid")

            .classList.add("selected");



        document

            .getElementById("signature-valid")

            .classList.remove("selected");

    });



// ========================================
// BALANCE — SUFFICIENT
// ========================================

document

    .getElementById("balance-sufficient")

    .addEventListener("click", function() {


        playerChecks.balance = true;



        document

            .getElementById("balance-sufficient")

            .classList.add("selected");



        document

            .getElementById("balance-insufficient")

            .classList.remove("selected");

    });



// ========================================
// BALANCE — INSUFFICIENT
// ========================================

document

    .getElementById("balance-insufficient")

    .addEventListener("click", function() {


        playerChecks.balance = false;



        document

            .getElementById("balance-insufficient")

            .classList.add("selected");



        document

            .getElementById("balance-sufficient")

            .classList.remove("selected");

    });



// ========================================
// CONTRACT — VALID
// ========================================

document

    .getElementById("contract-valid")

    .addEventListener("click", function() {


        playerChecks.contract = true;



        document

            .getElementById("contract-valid")

            .classList.add("selected");



        document

            .getElementById("contract-invalid")

            .classList.remove("selected");

    });



// ========================================
// CONTRACT — INVALID
// ========================================

document

    .getElementById("contract-invalid")

    .addEventListener("click", function() {


        playerChecks.contract = false;



        document

            .getElementById("contract-invalid")

            .classList.add("selected");



        document

            .getElementById("contract-valid")

            .classList.remove("selected");

    });



// ========================================
// CHECK WHETHER PLAYER ANSWERED
// EVERYTHING
// ========================================

function allChecksCompleted() {


    return (

        playerChecks.signature !== null &&

        playerChecks.balance !== null &&

        playerChecks.contract !== null

    );

}



// ========================================
// CHECK PLAYER'S VALIDATION
// ========================================

function checkPlayerValidation() {


    if (!allChecksCompleted()) {

        return false;

    }


    return (

        playerChecks.signature ===
        transaction.signatureValid &&

        playerChecks.balance ===
        transaction.balanceSufficient &&

        playerChecks.contract ===
        transaction.contractValid

    );

}



// ========================================
// CHECK ACTUAL TRANSACTION VALIDITY
// ========================================

function transactionIsValid() {


    return (

        transaction.signatureValid &&

        transaction.balanceSufficient &&

        transaction.contractValid

    );

}



// ========================================
// APPROVE BUTTON
// ========================================

document

    .getElementById("approve")

    .addEventListener("click", function() {


        if (!allChecksCompleted()) {

            alert(
                "Complete all three validation checks first!"
            );

            return;

        }


        showValidationReport("approve");

    });



// ========================================
// REJECT BUTTON
// ========================================

document

    .getElementById("reject")

    .addEventListener("click", function() {


        if (!allChecksCompleted()) {

            alert(
                "Complete all three validation checks first!"
            );

            return;

        }


        showValidationReport("reject");

    });



// ========================================
// VALIDATION REPORT
// ========================================

function showValidationReport(playerDecision) {


    let report =

        document.getElementById(
            "validation-report"
        );



    let signatureCorrect =

        playerChecks.signature ===
        transaction.signatureValid;



    let balanceCorrect =

        playerChecks.balance ===
        transaction.balanceSufficient;



    let contractCorrect =

        playerChecks.contract ===
        transaction.contractValid;



    let transactionValid =

        transactionIsValid();



    let decisionCorrect =

        (playerDecision === "approve") ===
        transactionValid;



    report.innerHTML = `

        <h2>📋 VALIDATION REPORT</h2>


        <p>

            🔐 Signature Check:

            ${signatureCorrect
                ? "✓ Correct"
                : "✗ Incorrect"}

        </p>


        <p>

            💰 Balance Check:

            ${balanceCorrect
                ? "✓ Correct"
                : "✗ Incorrect"}

        </p>


        <p>

            📜 Contract Check:

            ${contractCorrect
                ? "✓ Correct"
                : "✗ Incorrect"}

        </p>


        <hr>


        <p>

            🚦 Your Decision:

            <b>
                ${playerDecision.toUpperCase()}
            </b>

        </p>


        <p>

            ${decisionCorrect
                ? "🎉 Correct Decision!"
                : "❌ Incorrect Decision!"}

        </p>

    `;

}

document
    .getElementById("next-transaction")
    .style.display = "inline-block";

    
function nextTransaction() {

    // Generate a new transaction

    transaction = generateTransaction();


    // Reset the player's answers

    playerChecks.signature = null;

    playerChecks.balance = null;

    playerChecks.contract = null;


    // Remove selected button styling

    document
        .getElementById("signature-valid")
        .classList.remove("selected");

    document
        .getElementById("signature-invalid")
        .classList.remove("selected");


    document
        .getElementById("balance-sufficient")
        .classList.remove("selected");

    document
        .getElementById("balance-insufficient")
        .classList.remove("selected");


    document
        .getElementById("contract-valid")
        .classList.remove("selected");

    document
        .getElementById("contract-invalid")
        .classList.remove("selected");


    // Display the new transaction

    showTransaction();


    // Clear the old report

    document
        .getElementById("validation-report")
        .innerHTML = "";


    // Hide the next button

    document
        .getElementById("next-transaction")
        .style.display = "none";

}

document
    .getElementById("next-transaction")
    .addEventListener("click", function() {

        nextTransaction();

    });

