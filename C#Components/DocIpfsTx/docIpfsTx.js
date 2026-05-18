async function pinFile() {
    try {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        const apiKeyInput = document.getElementById('apiKeyInput');
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            alert('Please enter your Pinata API key.');
            return;
        }
        if (!file) {
            alert('Please select a file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
        const response = await fetch(pinataEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });
        const data = await response.json();
        if (data && data.IpfsHash) {
            const ipfsHash = data.IpfsHash;
            const truncatedHash = ipfsHash.slice(0, 28);
            document.getElementById('ipfsHash').textContent = truncatedHash;
            // After pinning, send payment with truncated IPFS hash as memo
            await sendPayment(truncatedHash);
        } else {
            throw new Error('Failed to pin file to IPFS.');
        }
    } catch (error) {
        console.error('Error pinning file to IPFS:', error);
        alert('An error occurred while pinning the file to IPFS.');
    }
}

async function sendPayment(ipfsHash) {
    try {
        const senderPublicKey = document.getElementById('senderPublicKeyInput').value.trim();
        const senderSecretKey = document.getElementById('senderSecretKeyInput').value.trim();
        const destinationPublicKey = document.getElementById('destinationPublicKeyInput').value.trim();
        const paymentAmount = document.getElementById('paymentAmountInput').value.trim();
        if (!senderPublicKey || !senderSecretKey || !destinationPublicKey || !paymentAmount) {
            alert('Please enter all required transaction details.');
            return;
        }
        const serverUrl = 'https://horizon-testnet.stellar.org';
        const server = new StellarSdk.Horizon.Server(serverUrl);
        const sourceKeypair = StellarSdk.Keypair.fromSecret(senderSecretKey);
        const sourceAccount = await server.loadAccount(senderPublicKey);
        const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationPublicKey,
                asset: StellarSdk.Asset.native(),
                amount: paymentAmount
            }))
            .addMemo(StellarSdk.Memo.text(ipfsHash))
            .setTimeout(30)
            .build();
        transaction.sign(sourceKeypair);
        const transactionResult = await server.submitTransaction(transaction);
        console.log('Transaction successful:', transactionResult);
        alert('Payment sent successfully!');
    } catch (error) {
        console.error('Error sending payment:', error);
        if (error.response && error.response.data) {
            console.error('Server error details:', error.response.data);
            alert('Error sending payment: ' + error.response.data.detail);
        } else {
            alert('An error occurred while sending the payment.');
        }
    }
}
