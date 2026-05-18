function verifyAndCheckBalance() {
    const publicKeyverification = document.getElementById('publicKeyverification').value.trim();
    const secretKeyverification = document.getElementById('secretKeyverification').value.trim();
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(publicKeyverification)) {
        displayBalanceResult('Invalid public key.');
        return;
    }
    if (!StellarSdk.StrKey.isValidEd25519SecretSeed(secretKeyverification)) {
        displayBalanceResult('Invalid secret key.');
        return;
    }
    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    // Use the secret key to sign transactions
    const keyPair = StellarSdk.Keypair.fromSecret(secretKeyverification);
    // Check account balance
    server.loadAccount(publicKeyverification)
        .then(account => {
            const balance = account.balances.find(balance =>
                balance.asset_type === 'native');
            if (balance) {
                displayBalanceResult(`Account balance: ${balance.balance}`);
            } else {
                displayBalanceResult('Account has no balance.');
            }
        })
        .catch(error => {
            console.error('Error loading account:', error);
            displayBalanceResult('Error loading account. Please check the keys and try again.');
        });
}
function displayBalanceResult(message) {
    const balanceResultElement = document.getElementById('balanceResult');
    balanceResultElement.textContent = message;
}