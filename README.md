# Pakana Stellar Components

## Description:

The Pakana.Stellar.Components project provides a set of powerful and customizable ASP.NET Razor components for integrating Stellar blockchain functionality seamlessly into your web applications. 
These components aim to simplify the integration process, offering a user-friendly interface for Stellar account creation, multisignature operations, and payments.

We invite you to fork and use this source-code in your own ASP.NET Razor projects. If you make improvements, please submit them via pull-request. 

Visit the <a href="https://www.pakanacomponents.com" target="_blank">PakanaComponents.com</a>
 website for documentation, installation, tutorials and resources.

If you would like to try out some of the components in a demonstration application we're developing, check-out [Lumenals.com](https://lumenals.com). 
It's our take on Ordinals and NFTs using the Stellar Blockchain. 
Note: The lumenals app is beta software, please use a new dedicated TestNet account as a sandbox before minting on the Mainnet. 

The development, distribution, and maintenance of these components is mad e possible, thanks to an award from 
<a href="https://dashboard.communityfund.stellar.org/scfawards/scf-25/activationawardreview/suggestion/853" target="_blank">The Stellar Community Foundation</a>

Additopnally, we make use of the <a href="https://github.com/stellar/js-stellar-sdk" target="_blank">Stellar Javascript SDK</a> to integrate with the Stellar Horizon API.

Thanks!
Pakana Team

## Features:

- Creating a new Stellar account.
- Funding a Stellar account from an existing account.
- Sending funds from one account to another. 
  - Native and custom assets are supported.
- Establishing a Trustline to the new Stellar account for custom assets.
- Creating a new multi-signature account.
- Adding a new signer to an existing multi-signature account with automatic threshold incrementing.
- Implement event handlers for transaction submission and signature collection.
- Seamlessly integrate Stellar transactions into your application workflow.

## NuGet Package Installation:

*.Net8.0 or greater is required.*
    
```csharp copy
dotnet add package Pakana.Stellar.Components --version 1.0.0
```

# Customization:

- Add the Pakana.Stellar.Components to your project.
- Download and Install the Stellar SDK or use the CDNJS to quickly get started.
- Configure the Stellar SDK with your network passphrase and other relevant details.
- Configure the Variables in the HorizonServer.js file to match your projects wallets and network details.
- Customize the components to fit your application requirements.
- Visit the <a href="https://www.pakanacomponents.com" target="_blank">PakanaComponents.com</a> website for documentation, installation, tutorials and resources.

## Integration:

- Embed the Send-Funds and Generate-Key-Pairs components into your Razor views.
- Customize component behavior based on your application requirements.

## Prerequisites

Ensure that your project includes the necessary dependencies:

- Stellar SDK
  	- <a href="https://github.com/stellar/js-stellar-sdk" target="_blank">stellar-sdk</a>
	- CDN: https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/{version}/stellar-sdk.js
    - [JavaScript]
    - [Razor Pages]

## Usage:

Here is an example of how to use Pakana Stellar Razor Components in your project.

```csharp
<!-- Razor View Using Pakana Stellar Razor Components -->
<PakanaSendFunds @ref="sendFundsComponent"/>

<button @onclick="SubmitTransaction">Submit Transaction</button>

@code { private async Task SubmitTransaction() {
        await sendFundsComponent.SubmitTransaction();
    }
}
```

## Contributing:

Interested in contributing or have ideas on expanding this resource?

We'd love to have your help! 

Submit a pull request or open an issue to get started.
Or
Contact us at the [Pakana.net](https://www.Pakana.net) for more information.

## License:

This project is licensed under the MIT License. 

## Project Structure:

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
 
Lockb0x LLC is a blockchain development company that specializes in building financial technology solutions using the Stellar blockchain. 

<a href="https://pakana.net" target="_blank">Pakana.net</a> is our flagship product and the primary platform that all of our DeFi use-cases are built on, offering:

-Payment Processing
-Contract and Document Management
-Fiat Bank Account Integration
-Quickbooks Integration

... and more, using the Stellar Development Foundation blockchain, Microsoft Azure, and other services.
Currently in beta testing and continuing refinement, many of the concepts used to implement this Component Suite were proven in Pakana. 

