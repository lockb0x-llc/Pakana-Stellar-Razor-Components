window.loadStellarSdk = () => {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/11.3.0/stellar-sdk.min.js';
    script.onload = () => {
        console.log('Stellar SDK loaded');
        window.StellarSdk = StellarSdk;
    };
    document.head.appendChild(script);
};

window.fetchAccountDetailsFromStellar = async (publicAddress) => {
    if (typeof StellarSdk === 'undefined') {
        throw new Error('Stellar SDK is not loaded.');
    }
    try {
        const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
        const account = await server.loadAccount(publicAddress);
        return {
            highThreshold: account.thresholds.high_threshold,
            signers: account.signers.map(s => ({ key: s.key, weight: s.weight }))
        };
    } catch (error) {
        console.error('Failed to fetch account details:', error);
        return null;
    }
};
