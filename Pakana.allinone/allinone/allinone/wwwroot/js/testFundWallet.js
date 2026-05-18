function fundWallet() {
    const walletAddress =
        document.getElementById('walletAddress').value.trim();
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(walletAddress)) {
        displayResult('Invalid wallet address.');
        return;
    }
    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    // Call Friendbot to fund the wallet

    fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(walletAddress)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fund wallet');
            }
            displayResult(`Funded wallet successfully!`);
        })
        .catch(error => {
            console.error('Error funding wallet:', error);
            displayResult('Failed to fund wallet.');
        });
}
function displayResult(message) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
}