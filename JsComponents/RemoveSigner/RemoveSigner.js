<script>
    function removeSigner() {
 const accountSecret = document.getElementById('accountSecret').value;
    if (!accountSecret) {
        alert('Please enter a valid secret key.');
    return;
 }
    const signerPublicKey =
    document.getElementById('signerPublicKey').value;
    const StellarSdk = window.StellarSdk;
    const server = new StellarSdk.Horizon.Server('https://horizontestnet.stellar.org');
    const sourceKeys = StellarSdk.Keypair.fromSecret(accountSecret);
    server.loadAccount(sourceKeys.publicKey())
 .then(account => {
 const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
 })
    .addOperation(StellarSdk.Operation.setOptions({
        signer: {
        ed25519PublicKey: signerPublicKey,
    weight: 0 // Setting the weight to 0 removes the
    signer
 }
 }))
    .setTimeout(180)
    .build();
    transaction.sign(sourceKeys);
    return server.submitTransaction(transaction);
 })
 .then(result => {
        console.log('Success! Results:', result);
    alert('Signer removed successfully!');
 })
 .catch(error => {
        console.error('Something went wrong!', error);
    alert('Failed to remove signer. Error: ' + error.message);
 });
 }
</script>