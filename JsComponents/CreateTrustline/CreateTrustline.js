<script>
    document.getElementById('trustlineForm').addEventListener('submit', function (event) {
        event.preventDefault();

    const assetCode = document.getElementById('assetCode').value;
    const issuerAccount = document.getElementById('issuerAccount').value;
    const destinationAccount = document.getElementById('destinationAccount').value;
    const secretKey = document.getElementById('secretKey').value;

    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

    const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);

    server.loadAccount(sourceKeys.publicKey())
                .then(account => {
                    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
                    })
    .addOperation(StellarSdk.Operation.changeTrust({
        asset: new StellarSdk.Asset(assetCode, issuerAccount),
    source: destinationAccount  // Set the destination account for the trustline
                        }))
    .setTimeout(30)
    .build();

    transaction.sign(sourceKeys);

    return server.submitTransaction(transaction);
                })
                .then(result => {
        console.log('Trustline created successfully:', result);
    document.getElementById('message').textContent = `Trustline for asset "${assetCode}" created successfully.`;
                })
                .catch(error => {
        console.error('Error creating trustline:', error);
    document.getElementById('message').textContent = 'Failed to create trustline. Please try again.';
                });
        });
</script>