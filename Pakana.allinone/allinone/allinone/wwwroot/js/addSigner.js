function addSigner() {
    const accountSecret = document.getElementById("accountSecret").value;
    const signerPublicKey = document.getElementById("signerPublicKey").value;
    const signerWeight = document.getElementById("signerWeight").value;
    const StellarSdk = window.StellarSdk;
    const server = new StellarSdk.Horizon.Server(
        "https://horizon-testnet.stellar.org"
    );

    server
        .loadAccount(StellarSdk.Keypair.fromSecret(accountSecret).publicKey())
        .then((account) => {
            const transaction = new StellarSdk.TransactionBuilder(account, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET,
            })
                .addOperation(
                    StellarSdk.Operation.setOptions({
                        signer: {
                            ed25519PublicKey: signerPublicKey,
                            weight: signerWeight,
                        },
                    })
                )
                .setTimeout(180)
                .build();
            transaction.sign(StellarSdk.Keypair.fromSecret(accountSecret));
            return server.submitTransaction(transaction);
        })
        .then((result) => {
            console.log("Success! Results:", result);
            alert("Signer added successfully!");
        })
        .catch((error) => {
            console.error("Something went wrong!", error);
            alert("Failed to add signer. Error: " + error.message);
        });
}
