<script language="javascript">

    var statusArea;
    var keyPair = null;

    document.addEventListener("DOMContentLoaded", async function () {
        statusArea = document.getElementById('trustlineStatus');

    // Define the loadAccountData function
    async function loadAccountData(accountId) {
            try {
                const account = await horizonServer.loadAccount(accountId);
    return account;
            } catch (error) {
        console.error('Error loading account data:', error);
    throw error;
            }
        }

    // Function to load account data with delay
    async function loadAccountWithDelay(accountId, maxAttempts = 10, interval = 1000) {
        let attempts = 0;
    let account;

    while (attempts < maxAttempts) {
        // Wait for a short interval before the next attempt
        await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;

    try {
        // Attempt to load the account
        account = await loadAccountData(accountId);

    // Exit the loop if successful
    if (account) {
                        break;
                    }
                } catch (loadError) {
        console.warn('Error loading account data (attempt ' + (attempts + 1) + '):', loadError);
                }
            }

    return account;
        }

    async function establishTrustline(secretKey, publicKey) {
        console.log('Attempting to establish trustline for public key:', publicKey);

    // Check if the wallet address is generated
    if (publicKey) {
                try {
        // Fund the wallet with Friendbot if not funded already
        await fundWithFriendbot(publicKey);

    // Attempt to load the account with a delay
    const account = await loadAccountWithDelay(publicKey);

    // Log the loaded account data
    console.log('Loaded account data:', account);

                    // Ensure that the account has a balance
                    if (account.balances && account.balances.length > 0) {
                        // Trustline operation
                        const trustlineOperation = StellarSdk.Operation.changeTrust({
        asset: new StellarSdk.Asset(assetCode, distributionWalletPk),
                        });

    // Get the current sequence from the loaded account
    const sequence = account.sequence;

    // Transaction
    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
    sequence: sequence // Ensure sequence is used correctly
                        })
    .addOperation(trustlineOperation)
    .setTimeout(0)
    .build();

    // Sign the transaction
    transaction.sign(StellarSdk.Keypair.fromSecret(secretKey));

    // Submit the transaction
    const result = await horizonServer.submitTransaction(transaction);

    console.log('Trustline established successfully:', result);

    try {
                            if (null != hostTargetElement) {
        hostTargetElement.style.display = "block";
                            }
                        } catch (error) {
        console.error('hostTargetElement not defined ', error);
                        }

                    } else {
        console.error('Account does not have a balance. Unable to establish trustline.');
                    }
                } catch (error) {
        console.error('Error establishing trustline:', error);

    if (error.response && error.response.data) {
        console.log('Trustline response data:', error.response.data);

    if (error.response.data.extras) {
        console.log('Trustline extras:', error.response.data.extras);
                        }
                    }
                }
            } else {
        // Prompt the user to sign to establish the trustline
        // You can implement the logic for user interaction or use a modal/popup
        console.log('User needs to sign to establish trustline');
                // Add your code for user interaction here
            }
        }

    // Event listener for the Generate Wallet Button
    document.getElementById('generateWalletBtn').addEventListener('click', async function () {
            // disable the hosting form's submit button if defined
            try {
                if (null != hostTargetElement) {
        hostTargetElement.style.display = "none";
                }
                } catch (error) {
        console.error('hostTargetElement not defined ', error);
                }

    // Use the Stellar SDK to generate a new key pair
    keyPair = await generateKeypair();

    // Display the generated keys to the user
    document.getElementById('WalletAddress').value = keyPair.publicKey;
    document.getElementById('GeneratedSecretKey').value = keyPair.secret;

    // Show the new wallet info section
    document.getElementById('newWalletInfo').style.display = 'block';

    // Check if the wallet address is generated and establish trustline accordingly
    if (keyPair) {
        await establishTrustline(keyPair.secret, keyPair.publicKey);
            }

                
        });

        
    });
</script>