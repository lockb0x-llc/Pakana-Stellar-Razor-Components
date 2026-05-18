# Document IPFS Hash Transaction Component

The "Doc Ipfs Tx" component allows users to upload a document to IPFS and attach the hash to a Stellar account payment.

## Features

- Uploads a document with XLM payment by attaching the IPFS Hash to the memo field of the transaction.
- Displays a success message with the IPFS hash when updated successfully.

## Usage

1. Choose a file.
2. Enter your Pinata JWT.
3. Sender Public and Secret Key.
4. Recipient Public Key.
5. Payment Amount (XLM).


/*check the documentation on thresholds at "enter stellar url"*/

## Configuration

1. Install the Stellar SDK Version required for your project. We are using and recommend the latest Protocol 20 supported SDK.

*Currently using CDNJS Horizon Stellar SDK v11.3.0 and Ipfs-http-client for instant testing*