# Stellar Wallet Generator

# Generate Key Pairs Component

The "Generate Key Pairs" component allows users to generate new Stellar Wallet key pairs.
The Wallet is funded by friendbot on the Stellar Testnet.
A trustline for a custom asset is established upon wallet generation.

The component includes fields for displaying the generated wallet address and secret key. 
Along with information on the status of the wallet creation and trustline establishment.

**Bonus: This component can establish a trustline for a custom asset upon wallet generation.**

## Features

- Generates new Stellar Wallet key pairs.
- Displays the generated wallet address and secret key.
- Establishes a trustline for a custom Stellar asset upon wallet generation.
- Provides a user-friendly interface for generating wallet key pairs and immediately establishing custom asset trustlines.

## Configuration

1. Install the Stellar SDK Version required for your project. We are using and recommend the latest Protocol 20 supported SDK.
2. Open the HorizonServer.js file and update the `assetCode` & `distributionWalletPk` variables with your custom assets information.