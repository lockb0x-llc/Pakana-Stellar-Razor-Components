// Log when the Stellar SDK is loaded
console.log("Stellar Sdk Loaded: ", StellarSdk);

document.addEventListener('DOMContentLoaded', function () {
    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

    window.getTokenInformation = function (tokenCodemin, issuerAccountmin) {
        // Encode the parameters to ensure they are correctly formatted for the URL
        const encodedTokenCode = encodeURIComponent(tokenCodemin);
        const encodedIssuerAccount = encodeURIComponent(issuerAccountmin);

        server.assets()
            .forCode(encodedTokenCode)
            .forIssuer(encodedIssuerAccount)
            .call()
            .then(assetRecords => {
                if (assetRecords.records.length > 0) {
                    const asset = assetRecords.records[0];
                    const tokenInfoHtml = `
                        <p><strong>Total Supply:</strong> ${asset.amount}</p>
                        <p><strong>First Transaction:</strong> ${asset.paging_tokens ? new Date(asset.paging_tokens.start_time).toUTCString() : 'N/A'}</p>
                        <p><strong>Trustlines:</strong> ${asset.num_accounts} total / ${asset.num_accounts_funded} funded</p>
                        <p><strong>Total Payments Count:</strong> ${asset.num_payments}</p>
                        <p><strong>Overall Payments Volume:</strong> ${asset.amount} ${tokenCodemin}</p>
                        <p><strong>Total Trades Count:</strong> ${asset.num_trades}</p>
                        <p><strong>Overall Traded Volume:</strong> ${asset.amount} USD</p>
                        <p><strong>Asset Authorization Flags:</strong> ${asset.flags.toString()}</p>
                        <p><strong>Issuer Account Lock Status:</strong> ${asset.flags.auth_required ? 'locked' : 'unlocked'}</p>
                    `;
                    document.getElementById('tokenInfo').innerHTML = tokenInfoHtml;
                    document.getElementById('messageS').textContent = '';
                } else {
                    document.getElementById('tokenInfo').innerHTML = '';
                    document.getElementById('messageS').textContent = 'Token not found.';
                }
            })
            .catch(error => {
                console.error('Error fetching token information:', error);
                document.getElementById('tokenInfo').innerHTML = '';
                document.getElementById('messageS').textContent = 'Failed to fetch token information. Please try again.';
            });
    };
});
