<script language="javascript">

    let horizonServer;

    document.addEventListener("DOMContentLoaded", async function () {
        try {
        horizonServer = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    console.log("Stellar SDK Server instance created:", horizonServer);
        } catch (e) {
        console.error("Error creating StellarSdk.Server instance:", e);
    return;
        }
    $("#agentAddsSignersButton").click(async function (event) {
        event.preventDefault();
    // Call the function for adding signers
    agentAddsSigners();
        });

    $("#createFundAndOperateButton").on("click", function (e) {
        e.preventDefault();
    console.log('Create Button clicked');
    createFundAndOperateMultiSigWallet();
        });

    async function createFundAndOperateMultiSigWallet() {
            try {

    // Define and replace the fundingAccount, agentsAccount and their secret keys

    const fundingAccountKeyPair = StellarSdk.Keypair.fromSecret('FUNDING ACCOUNT SECRET KEY');
    const agentsAccountKeyPair = StellarSdk.Keypair.fromSecret('AGENT OR OWNER/OPERATOR SECRET KEY');
    const fundingAccountPublicKey = fundingAccountKeyPair.publicKey();
    const AgentsAccountPublicKey = agentsAccountKeyPair.publicKey();

    // Load the funding account
    let fundingAccount;
    while (true) {
                    try {
        fundingAccount = await horizonServer.loadAccount(fundingAccountPublicKey);
    break; // Exit the loop if the account is successfully loaded
                    } catch (error) {
                        if (error instanceof StellarSdk.NotFoundError) {
        // Account not found, wait for a moment and retry
        await new Promise(resolve => setTimeout(resolve, 2000));
                        } else {
        // Other errors, log and break the loop
        console.error('Error loading funding account:', error);
    break;
                        }
                    }
                }

    // 2. Create the Organizations Source Account (Funded by Agency)
    const sourceAccountKeyPair = StellarSdk.Keypair.random();
    const sourceAccountPublicKey = sourceAccountKeyPair.publicKey();

                // Introduce a delay (e.g., 2 seconds) before loading the source account
                await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Fund the Source Account
    const fundSourceAccountTransaction = new StellarSdk.TransactionBuilder(fundingAccount, {
        fee: await horizonServer.fetchBaseFee(),
    networkPassphrase: StellarSdk.Networks.TESTNET,
                })
    .addOperation(StellarSdk.Operation.createAccount({
        destination: sourceAccountPublicKey,
    startingBalance: '100', // Fund with XLM
                    }))
    .setTimeout(30)
    .build();

    // 4. Sign the transaction with the funding account's key
    fundSourceAccountTransaction.sign(fundingAccountKeyPair);

    // 5. Submit the transaction to fund the source account
    const fundSourceAccountResult = await horizonServer.submitTransaction(fundSourceAccountTransaction);

    console.log('Fund Source Account Result:', fundSourceAccountResult);

    // Load the source account after funding
    let sourceAccount;
    while (true) {
                    try {
        sourceAccount = await horizonServer.loadAccount(sourceAccountPublicKey);
    break; // Exit the loop if the account is successfully loaded
                    } catch (error) {
                        if (error instanceof StellarSdk.NotFoundError) {
        // Account not found, wait for a moment and retry
        await new Promise(resolve => setTimeout(resolve, 2000));
                        } else {
        // Other errors, log and break the loop
        console.error('Error loading source account:', error);
    break;
                        }
                    }
                }

    // Build the transaction with Add Signer operation for the new account (Make agents account (The Owner) the only signer)
    const addSignerOperation = StellarSdk.Operation.setOptions({
        signer: {
        ed25519PublicKey: AgentsAccountPublicKey, // Use the public key of the agents account
    weight: 1, // Set the weight to 1 for the agents account signature
                    },
    masterWeight: 0, // Set the weight to 0 for the source account key, voiding the masterkey
    lowThreshold: 1,
    medThreshold: 1,
    highThreshold: 1,
                });

    // Add the Add Signer operation to the transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: await horizonServer.fetchBaseFee(),
    networkPassphrase: StellarSdk.Networks.TESTNET,
                })
    .addOperation(addSignerOperation)
    .setTimeout(30)
    .build();

    // Log transaction details
    console.log('Transaction XDR:', transaction.toEnvelope().toXDR('base64'));
    console.log('Transaction Operations:', transaction.operations);

    // Sign the transaction with the source account's key
    transaction.sign(sourceAccountKeyPair);

    // Submit the transaction
    const transactionResult = await horizonServer.submitTransaction(transaction);
    console.log('Multi-Signature Wallet created and funded successfully:', transactionResult);

    // Update the content of HTML elements with generated keys
    $("#sourceAccountPublicKey").text('Source Account Public Key: ' + sourceAccountPublicKey);

            } catch (error) {
        console.error('Error creating or funding Multi-Signature Wallet:', error);

    if (error.response && error.response.data) {
        console.log('Response data:', error.response.data);

    if (error.response.data.extras) {
        console.log('Extras:', error.response.data.extras);
                    }
                }
            }
        }
    });
</script>