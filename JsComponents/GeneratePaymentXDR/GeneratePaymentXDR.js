<script>
async function generateEnvelope() {
    try {
        console.log('Generating XDR envelope...');
        const senderSecretKey =
            document.getElementById('senderSecretKey').value.trim();
        const receiverPublicKey =
            document.getElementById('receiverPublicKey').value.trim();
        const amount = document.getElementById('amount').value.trim();
        console.log('Sender secret key:', senderSecretKey);
        console.log('Receiver public key:', receiverPublicKey);
        console.log('Amount:', amount);
        // Validate inputs
        if (!StellarSdk.StrKey.isValidEd25519SecretSeed(senderSecretKey)) {
            alert('Invalid sender secret key!');
            return;
        }
        if (!receiverPublicKey) {
            alert('Receiver public key is required!');
            return;
        }
        if (!StellarSdk.StrKey.isValidEd25519PublicKey(receiverPublicKey)) {
            alert('Invalid receiver public key!');
            return;
        }
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Invalid amount!');
            return;
        }
        // Stellar keypair of sending account
        const senderKeypair =
            StellarSdk.Keypair.fromSecret(senderSecretKey);
        const server = new StellarSdk.Horizon.Server('https://horizontestnet.stellar.org');
        // Load sender account details from the server
        const account = await server.loadAccount(senderKeypair.publicKey());
        // Calculate current time and set time bounds for the transaction (1 
        hour from now)
        const currentTime = Math.floor(Date.now() / 1000);
        const maxTime = currentTime + 3600; // 1 hour in seconds
        // Create a new transaction for payment operation with time bounds
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
            timebounds: {
                minTime: currentTime,
                maxTime: maxTime
            }
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                asset: StellarSdk.Asset.native(),
                amount: amount.toString() // Convert amount to string
            }))
            .build();
        // Sign the transaction
        transaction.sign(senderKeypair);
        // Get the XDR string of the transaction
        const xdrString = transaction.toEnvelope().toXDR('base64');
        // Display the XDR string
        document.getElementById('xdrTextArea').value = xdrString;
        document.getElementById('xdrDisplay').style.display = 'block';
    } catch (error) {
        console.error('Error generating XDR envelope:', error);
        alert('Error generating XDR envelope: ' + error.message);
    }
}
// Function to copy XDR string to clipboard
function copyXdr() {
    const xdrTextArea = document.getElementById('xdrTextArea');
    xdrTextArea.select();
    document.execCommand('copy');
    document.getElementById('copyStatus').innerText = 'Copied!';
}
// Attach click event listener to the button
const generateButton = document.getElementById('generateButton');
if (generateButton) {
    generateButton.addEventListener('click', generateEnvelope);
} else {
    console.error('Button element not found!');
}
</script >