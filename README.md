# Pakana Stellar Razor Components
[version 1.0.0]
[Pakana](https://www.pakana.net) is a blockchain development company that specializes in building Financial Technology solutions for the Stellar blockchain.

## Description

The Pakana Stellar Razor Components provide a set of powerful and customizable Razor Components for integrating Stellar blockchain functionality seamlessly into your web applications. These components simplify the integration process, offering a user-friendly interface for Stellar transactions and multisignature operations.

## Features

- Creating a new Stellar account.
- Funding a Stellar account from an existing account.
- Sending funds from one account to another. 
  - Native and custom assets are supported.
- Establishing a Trustline to the new Stellar account for custom assets.
- Creating a new multi-signature account.
- Adding a new signer to an existing multi-signature account with automatic threshold incrementing.
- Implement event handlers for transaction submission and signature collection.
- Seamlessly integrate Stellar transactions into your application workflow.

## Installation

- Add the Pakana Stellar Razor Components to your project.
- Download and Install the Stellar Sdk or Use the CDNJS to quickly get started.
- Configure the Stellar SDK with your network passphrase and other relevant details.
- Configure the Variables in the HorizonServer.js file to match your projects wallets and network details.
- Customize the components to fit your application requirements.

<strong>Integration:</strong>

- Embed the Send Funds and Generate Key Pairs components into your Razor views.
- Customize component behavior based on your application requirements.

## Prerequisites

Ensure that your project includes the necessary dependencies:

- Stellar SDK
	- [stellar-sdk](https://github.com/stellar/js-stellar-sdk)
	- [cdnjs](https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/{version}/stellar-sdk.js)
    - [JavaScript]
    - [Razor Pages]

## Usage

Example for how to use Pakana Stellar Razor Components in your project.

```csharp
<!-- Razor View Using Pakana Stellar Razor Components -->
<PakanaSendFunds @ref="sendFundsComponent" />

<button @onclick="SubmitTransaction">Submit Transaction</button>

@code {
    private async Task SubmitTransaction()
    {
        await sendFundsComponent.SubmitTransaction();
    }
}
```

## Contributing

Interested in contributing or have ideas on expanding this resource?

We'd love to have your help! 

Submit a pull request or open an issue to get started.
OR
Contact us at the [Pakana.net](https://www.Pakana.net) for more information.

## License

This project is licensed under the MIT License. 

## Project Structure

- **wwwroot/**
- **Components/**
  - **AddMultiSigSigner/**
    - AddMultiSigSigner.razor
    - AddMultiSigSigner.js
    - AddMultiSigSigner.css
    - [README.md](./Components/AddMultiSigSigner/README.md)
  - **CreateMultiSig/**
    - CreateMultiSig.razor
    - CreateMultiSig.js
    - CreateMultiSig.css
    - [README.md](./Components/CreateMultiSig/README.md)
  - **GenerateKeyPair/**
    - GenerateKeyPair.razor
    - GenerateKeyPair.js
    - GenerateKeyPair.css
    - [README.md](./Components/GenerateKeyPair/README.md)
  - **SendFunds/**
    - SendFunds.razor
    - SendFunds.js
    - SendFunds.css
    - [README.md](./Components/SendFunds/README.md)
- **Scripts/**
  - HorizonServer.js
  - jQuery.js
  - [README.md](./Scripts/README.md)
