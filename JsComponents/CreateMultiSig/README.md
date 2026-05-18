# Create Multi-Signature Component

The "Create Multi-Signature" component allows users to establish a new Multi-Signature wallet.

## Features

- Generates a new Multi-Signature wallet.
- Collects the (The Owner of the Multi-Signature wallets) agents address.
- Sets the master key weight to 0. Voiding the Master key for the address.
- Sets the agents key weight to 1, making the agent the only signer of the wallet with their choosen wallet address.
- Provides a straightforward way of creating a multi-signature wallet and only needing one key to sign many wallets.

## Configuration

1. Install the Stellar SDK Version required for your project. We are using and recommend the latest Protocol 20 supported SDK.
2. Open the CreateMultiSig.js file and update the `FUNDING ACCOUNT SECRET KEY` & `AGENT OR OWNER/OPERATOR SECRET KEY` variables with your information.
 

		NOTE: IN PRODUCTION , YOU SHOULD NEVER HARDCODE YOUR SECRET KEYS IN YOUR CODE. USE ENVIRONMENT VARIABLES OR A SECURE VAULT.
