# Frontend Example for the Reclaim Contract

## What kind of batteries are included?

The fronted is written using Aleph Zero branding (colors, icons, fonts), so that you can build your own contract with suggested UI elements from the get go.

In this repository, you will find:

1. How to connect frontend to a deployed contract.
2. How to integrate with PolkadotJS wallet extension. See `AccountSelector` and `WalletButton` components.
3. Popups - `WelcomePopup` component.
4. Footer - `Footer` component.
5. How to send signed transactions - `verifyProof.ts` file.

## How to run?

The fronted expects only one env variable to be set: `REACT_APP_PROVIDER_URL` - that is a websocket address of the node you wish to connect to:

- local development is usually `REACT_APP_PROVIDER_URL=ws://localhost:9944`.
- testnet: `REACT_APP_PROVIDER_URL=wss://ws.test.azero.dev`.
- at the time of writing this document, contracts pallet was not yet deployed to Aleph Zero Mainnet.

To run the server and connect to local node, simply execute:

```bash
export REACT_APP_PROVIDER_URL=ws://localhost:9944 && npm start
```
