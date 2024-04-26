<script>
    function verifyAndCheckBalance() {
 const publicKey = document.getElementById('publicKey').value.trim();
    const secretKey = document.getElementById('secretKey').value.trim();
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(publicKey)) {
        displayBalanceResult('Invalid public key.');
    return;
 }
    if (!StellarSdk.StrKey.isValidEd25519SecretSeed(secretKey)) {
        displayBalanceResult('Invalid secret key.');
    return;
 }
    const server = new StellarSdk.Horizon.Server('https://horizontestnet.stellar.org');
    // Use the secret key to sign transactions
    const keyPair = StellarSdk.Keypair.fromSecret(secretKey);
    // Check account balance
    server.loadAccount(publicKey)
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
    displayBalanceResult('Error loading account. Please check the
    keys and try again.');
 });
 }
    function displayBalanceResult(message) {
 const balanceResultElement = document.getElementById('balanceResult');
    balanceResultElement.textContent = message;
 }
</script>