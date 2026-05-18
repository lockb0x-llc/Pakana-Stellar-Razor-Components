<script>
    function generateKeyPair() {
            // Check if StellarSdk is properly loaded
            if (typeof StellarSdk === 'undefined') {
        console.error('Stellar SDK not loaded.');
    return;
            }
    // Generate a new Stellar key pair
    const keyPair = StellarSdk.Keypair.random();
    // Display the key pair on the webpage
    const publicKey = keyPair.publicKey();
    const secretKey = keyPair.secret();
    const keyPairDisplay = document.getElementById('keyPairDisplay');
    keyPairDisplay.innerHTML = `
    <p><strong>Public Key:</strong> ${publicKey}</p>
    <p><strong>Secret Key:</strong> ${secretKey}</p>
    <p><strong>⚠️ Important:</strong> Keep your secret
        key secure and never share it!</p>
    `;
        }
</script>