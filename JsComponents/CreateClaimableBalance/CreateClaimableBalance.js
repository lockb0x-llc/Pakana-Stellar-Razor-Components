<script>
    document.getElementById('claimableBalanceForm').addEventListener('submit', function (event) {
        event.preventDefault();

    const sourceSecretKey = document.getElementById('sourceSecretKey').value;
    const recipientAccount = document.getElementById('recipientAccount').value;
    const tokenCode = document.getElementById('tokenCode').value;
    const tokenIssuer = document.getElementById('tokenIssuer').value;
    const tokenAmount = document.getElementById('tokenAmount').value;

    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecretKey);

    server.loadAccount(sourceKeys.publicKey())
                .then(account => {
                    const asset = new StellarSdk.Asset(tokenCode, tokenIssuer);

    const claimableBalanceEntry = {
        asset: asset,
    amount: tokenAmount,
    claimants: [
    new StellarSdk.Claimant(recipientAccount, StellarSdk.Claimant.predicateUnconditional())
    ]
                    };

    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
                    })
    .addOperation(StellarSdk.Operation.createClaimableBalance(claimableBalanceEntry))
    .setTimeout(30)
    .build();

    transaction.sign(sourceKeys);

    return server.submitTransaction(transaction);
                })
                .then(result => {
        console.log('Claimable balance created successfully:', result);
    document.getElementById('message').textContent = `Claimable balance created successfully for ${tokenAmount} ${tokenCode}.`;
                })
                .catch(error => {
        console.error('Error creating claimable balance:', error);
    document.getElementById('message').textContent = 'Failed to create claimable balance. Please try again.';
                });
        });
</script>