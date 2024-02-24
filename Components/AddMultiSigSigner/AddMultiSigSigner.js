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

    async function agentAddsSigners() {
        try {
            // Prompt the agent (owner) for the public address of the multisig account
            const organizationAccountPublicKey = prompt('Enter the public key of the multisig account:');

    // Prompt the agent for the public address of the new organization signer
    const newSignerPublicKey = prompt('Enter the public key of the new signer:');

    // Prompt the agent(owner) for their secret key
    const agentPrivateKey = prompt('Enter the private key of the agent:');

    // Load the multisig account
    const organizationAccount = await horizonServer.loadAccount(organizationAccountPublicKey);

            // Get the agent's current signature weight
            const agentSigner = organizationAccount.signers.reduce((prev, current) => {
                return (prev.weight > current.weight) ? prev : current;
            }, { });

    // Check if the agent's signature is found
    if (agentSigner) {
                // Increase the agent's weight by 1
                const newAgentWeight = agentSigner.weight + 1;

    // Build the transaction with Add Signer operation for the multi-sig account
    const updateAgentOperation = StellarSdk.Operation.setOptions({
        signer: {
        ed25519PublicKey: agentSigner.key,
    weight: newAgentWeight,
                    },
                });

    // Add the Update Agent operation to the transaction
    const updateAgentTransaction = new StellarSdk.TransactionBuilder(organizationAccount, {
        fee: await horizonServer.fetchBaseFee(),
    networkPassphrase: StellarSdk.Networks.TESTNET,
                    })
    .addOperation(updateAgentOperation)
    .setTimeout(30)
    .build();

    // Sign the transaction with the Agents Secret key
    updateAgentTransaction.sign(StellarSdk.Keypair.fromSecret(agentPrivateKey));

    // Submit the Update Agent transaction
    const updateAgentResult = await horizonServer.submitTransaction(updateAgentTransaction);
    console.log('Update Agent successful:', updateAgentResult);

    // Increase the thresholds by 1
    const newLowThreshold = organizationAccount.thresholds.low_threshold + 1;
    const newMedThreshold = organizationAccount.thresholds.med_threshold + 1;
    const newHighThreshold = organizationAccount.thresholds.high_threshold + 1;

    // Build the transaction with Add Signer operation
    const addSignerTransaction = new StellarSdk.TransactionBuilder(organizationAccount, {
        fee: await horizonServer.fetchBaseFee(),
    networkPassphrase: StellarSdk.Networks.TESTNET,
                    })
    .addOperation(
    StellarSdk.Operation.setOptions({
        signer: {
        ed25519PublicKey: newSignerPublicKey,
    weight: 1, // Set the weight to 1 for the new signer
                            },
    lowThreshold: newLowThreshold,
    medThreshold: newMedThreshold,
    highThreshold: newHighThreshold,
                        })
    )
    .setTimeout(30)
    .build();

    // Sign the transaction with the agent's secret key
    addSignerTransaction.sign(StellarSdk.Keypair.fromSecret(agentPrivateKey));

    // Submit the Add Signer transaction
    const addSignerResult = await horizonServer.submitTransaction(addSignerTransaction);
    console.log('Add Signer transaction submitted successfully:', addSignerResult);

            } else {
        console.error('Error: Unable to determine the agent signer or agent weight is undefined.');
            }

        } catch (error) {
        console.error('Error adding new signer and updating thresholds:', error);

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