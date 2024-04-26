function submitXdrtwo() {
    const xdrString = document.getElementById('xdrInputanother').value;
    const serverUrl = 'https://horizon-testnet.stellar.org/transactions';
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'tx=' + encodeURIComponent(xdrString)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Transaction submitted:', data);
            document.getElementById('submissionResult').textContent =
                'Transaction submitted successfully!';
        })
        .catch(error => {
            console.error('Error submitting transaction:', error);
            document.getElementById('submissionResult').textContent =
                'Failed to submit transaction. Error: ' + error.message;
        });
}