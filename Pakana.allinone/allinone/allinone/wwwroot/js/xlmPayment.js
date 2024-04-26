function makePaymentinone() {
    const senderSecretinone = document.getElementById('senderSecretinone').value;
    const receiverPublicKeyinone = document.getElementById('receiverPublicKeyinone').value;
    const amountinone = document.getElementById('amountinone').value;
    const StellarSdk = window.StellarSdk;
    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    const sourceKeys = StellarSdk.Keypair.fromSecret(senderSecretinone);
    server.loadAccount(sourceKeys.publicKey())
        .then(account => {
            const transaction = new StellarSdk.TransactionBuilder(account, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
                .addOperation(StellarSdk.Operation.payment({
                    destination: receiverPublicKeyinone,
                    asset: StellarSdk.Asset.native(),
                    amount: amountinone.toString()
                }))
                .setTimeout(180)
                .build();
            transaction.sign(sourceKeys);
            return server.submitTransaction(transaction);
        })
        .then(result => {
            console.log('Payment successful! Results:', result);
            alert('Payment sent successfully!');
        })
        .catch(error => {
            console.error('Payment failed!', error);
            alert('Failed to send payment. Error: ' + error.message);
        });
}