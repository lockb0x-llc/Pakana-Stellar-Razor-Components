function addSignature() {
    const xdrInputro = document.getElementById('xdrInputro').value;
    const secretKeymine = document.getElementById('secretKeymine').value;
    const StellarSdk = window.StellarSdk;
    try {
        const transaction = new StellarSdk.Transaction(xdrInputro,
            StellarSdk.Networks.TESTNET);
        const keypair = StellarSdk.Keypair.fromSecret(secretKeymine);
        transaction.sign(keypair);
        const newXdr = transaction.toEnvelope().toXDR('base64');
        document.getElementById('newXdrOutput').textContent = 'New XDR with signature: ' + newXdr;
    } catch (e) {
        console.error('Error adding signature:', e);
        alert('Failed to add signature. Error: ' + e.message);
    }
}
function copyNewXdr() {
    const newXdrOutput = document.getElementById('newXdrOutput');
    const range = document.createRange();
    range.selectNode(newXdrOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Copied!');
}