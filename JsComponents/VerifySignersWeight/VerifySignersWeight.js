<script>
    async function fetchAccountDetails() {
            const publicAddress = document.getElementById('publicAddressInput').value.trim();

    try {
                const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    const account = await server.loadAccount(publicAddress);

    const {thresholds, signers} = account;

    document.getElementById('publicAddress').textContent = publicAddress;
    document.getElementById('highThreshold').textContent = thresholds.high_threshold;

    const signersList = document.getElementById('signersList');
    signersList.innerHTML = ''; // Clear previous signers

                signers.forEach(signer => {
                    const listItem = document.createElement('li');
    listItem.textContent = `${signer.key} (${signer.weight})`;
    signersList.appendChild(listItem);
                });

    document.getElementById('accountDetails').style.display = 'block';
            } catch (error) {
        console.error('Error fetching account details:', error);
    alert('Error fetching account details. Please check the public address.');
            }
        }
</script>