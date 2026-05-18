<script language="javascript">
    document.addEventListener("DOMContentLoaded", async function () {
    try {
        const horizonServer = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    console.log("Stellar SDK Server instance created:", horizonServer);
    } catch (e) {
        console.error("Error creating StellarSdk.Server instance:", e);
    return;
    }

    document.getElementById("stellarTransactionForm").addEventListener("submit", function (e) {
        e.preventDefault();

    // Set the TimeBounds for the transaction
    const timeBounds = {
        minTime: Math.floor(Date.now() / 1000) - 60, // Set minTime to now - 60 seconds (adjust as needed)
    maxTime: Math.floor(Date.now() / 1000) + 120, // Set maxTime to now + 120 seconds (adjust as needed)
        };

    const feeStroops = "100"; // Specify the fee in stroops as a string
    const senderAddress = document.getElementById("senderAddress").value;
    const secretKey = document.getElementById("secretKey").value;
    const receiverAddress = document.getElementById("receiverAddress").value;
    const amount = document.getElementById("amount").value;
    const memo = document.getElementById("memo").value;

    // Load the sender account
    horizonServer.loadAccount(senderAddress)
    .then(function (account) {
                // Build the transaction with TimeBounds
                const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: feeStroops,
    networkPassphrase: StellarSdk.Networks.TESTNET,
    timebounds: timeBounds, // Set the TimeBounds
                    })
    .addOperation(
    StellarSdk.Operation.payment({
        destination: receiverAddress,
    asset: StellarSdk.Asset.native(),
    amount: amount,
                        })
    )
    .addMemo(StellarSdk.Memo.text(memo))
    .build();

    // Sign the transaction
    transaction.sign(StellarSdk.Keypair.fromSecret(secretKey));

    // Submit the transaction to the network
    return horizonServer.submitTransaction(transaction);
            })
    .then(function (result) {
        console.log("Transaction Successful!", result);
                // Handle success, e.g., show a success message to the user
            })
    .catch(function (error) {
        console.error("Transaction Failed:", error);
                // Handle error, e.g., display an error message to the user
            });
    });
});
</script>
