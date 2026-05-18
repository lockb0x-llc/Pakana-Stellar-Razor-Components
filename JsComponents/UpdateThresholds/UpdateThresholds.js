<script>
    async function updateThresholds() {
            try {
                const accountPublicKey = document.getElementById('accountInput').value.trim();
    const lowThreshold = parseInt(document.getElementById('lowThresholdInput').value, 10);
    const medThreshold = parseInt(document.getElementById('medThresholdInput').value, 10);
    const highThreshold = parseInt(document.getElementById('highThresholdInput').value, 10);
    const secretKey = document.getElementById('secretKeyInput').value.trim();

    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    const account = await server.loadAccount(accountPublicKey);

    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
                })
    .addOperation(StellarSdk.Operation.setOptions({
        lowThreshold: lowThreshold,
    medThreshold: medThreshold,
    highThreshold: highThreshold
                    }))
    .setTimeout(180)
    .build();

    // Sign the transaction with the account's secret key
    transaction.sign(StellarSdk.Keypair.fromSecret(secretKey));

    // Submit the transaction to the Stellar network
    const response = await server.submitTransaction(transaction);
    console.log('Transaction response:', response);
    document.getElementById('resultMessage').textContent = 'Thresholds updated successfully!';
            } catch (error) {
        console.error('Error updating thresholds:', error);

    // Check if error object and response property exist
    if (error && error.response && error.response.data) {
        console.error('Detailed error response:', error.response.data.extras.result_codes);
                }

    document.getElementById('resultMessage').textContent = 'Error updating thresholds. Please try again.';
            }
        }
</script>