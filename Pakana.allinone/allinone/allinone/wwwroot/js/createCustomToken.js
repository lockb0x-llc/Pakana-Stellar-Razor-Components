console.log("Stellar SDK loaded:", StellarSdk);
document
    .getElementById("tokenForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const tokenName = document.getElementById("tokenName").value;
        const tokenSymbol = document.getElementById("tokenSymbol").value;
        const tokenAmount = document.getElementById(
            "tokenAmountinsecret"
        ).value; // Corrected from 'tokenAmount' to 'tokenAmountinsecret'
        const issuingSecretKey =
            document.getElementById("issuingSecretKey").value;
        const recipientPublicKey =
            document.getElementById("recipientPublicKey").value;
        const server = new StellarSdk.Horizon.Server(
            "https://horizon-testnet.stellar.org"
        );
        const issuingKeys = StellarSdk.Keypair.fromSecret(issuingSecretKey);

        server
            .loadAccount(issuingKeys.publicKey())
            .then((account) => {
                const customAsset = new StellarSdk.Asset(
                    tokenSymbol,
                    issuingKeys.publicKey()
                );
                const transaction = new StellarSdk.TransactionBuilder(account, {
                    fee: StellarSdk.BASE_FEE,
                    networkPassphrase: StellarSdk.Networks.TESTNET,
                })
                    .addOperation(
                        StellarSdk.Operation.payment({
                            destination: recipientPublicKey,
                            asset: customAsset,
                            amount: tokenAmount,
                        })
                    )
                    .setTimeout(30)
                    .build();
                transaction.sign(issuingKeys);
                return server.submitTransaction(transaction);
            })
            .then((result) => {
                console.log("Token creation successful:", result);
                document.getElementById("messagethree").textContent =
                    `Token "${tokenName} (${tokenSymbol})" created successfully with amount ${tokenAmount}.`;
            })
            .catch((error) => {
                console.error("Error creating token:", error);
                document.getElementById("messagethree").textContent =
                    "Failed to create token. Please try again.";
            });
    });
