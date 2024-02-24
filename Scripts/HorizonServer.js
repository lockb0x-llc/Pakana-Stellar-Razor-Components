<script>
    document.addEventListener("DOMContentLoaded", async function () {
    if (typeof StellarSdk === 'undefined') {
        console.error("Stellar SDK is not loaded");
    return;
    }

    let assetCode = ''; // Add the asset code here for Establishing Trustline During Wallet Creation
    let distributionWalletPk = ''; // Add the custom assets distribution wallet public key here for establishing the Trustline during wallet creation
    let horizonServer; // Declare horizonServer at a higher scope to make it accessible in the entire event listener function

    try {
        // Note: that the namespace for StellarSDK has been refactored for protocol 20.
        // Now there is StellarSDK., StellarSDK.Horizon., and StellarSDK.Soroban
        horizonServer = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org'); // Initialize horizonServer here
    console.log("Stellar SDK Server instance created:", horizonServer);
    } catch (e) {
        console.error("Error creating StellarSdk.Server instance:", e);
    return; // Exit if horizonServer cannot be initialized
    }

    async function fetchAccount(publicKey) {
        try {
            const account = await horizonServer.loadAccount(publicKey); // Use horizonServer here
    console.log(account.balances);
    return account.balances;
        } catch (error) {
        console.error("Error fetching account:", error);
        }
    }

    async function fetchRecentPayments(publicKey, limit = 10) {
        try {
            const payments = await horizonServer.payments()
    .forAccount(publicKey)
    .limit(limit)
    .order('desc')
    .call(); // Use horizonServer here
    console.log(payments.records);
    return payments.records;
        } catch (error) {
        console.error("Error fetching recent payments:", error);
        }
    }

    async function getWallet(publicKey) {
        try {
            var balances = await fetchAccount(publicKey);
    var recentPayments = await fetchRecentPayments(publicKey);

    return {
        publicKey,
        balances,
        recentPayments
    };
        } catch (error) {
            throw new Error(`Failed to fetch wallet: ${error.message}`);
        }
    }

    async function generateKeypair() {
        const pair = StellarSdk.Keypair.random();
    return {
        publicKey: pair.publicKey(),
    secret: pair.secret()
        };
    }

    async function fundWithFriendbot(publicKey) {
        try {
            const response = await fetch(`https://horizon-testnet.stellar.org/friendbot?addr=${publicKey}`);
            const responseJSON = await response.json();
            console.log("SUCCESS! You have a new account :)\n", responseJSON);
        } catch (error) {
            console.error("ERROR!", error);
        }
    }

    // Make functions globally accessible if needed
    window.getWallet = getWallet;
    window.generateKeypair = generateKeypair;
    window.fundWithFriendbot = fundWithFriendbot;
    window.pakanaAssetCode = assetCode;
    window.LbxDistributionWalletPk = distributionWalletPk;
    window.StellarSdk = StellarSdk;
    window.horizonServer = horizonServer;
    window.fetchAccount = fetchAccount;
    window.fetchRecentPayments = fetchRecentPayments;
});
</script>