import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { web3FromSource } from '@polkadot/extension-dapp';
import { Proof, Reclaim } from '@reclaimprotocol/js-sdk';
import { BN, BN_ONE } from '@polkadot/util';
import type { WeightV2 } from '@polkadot/types/interfaces';

import { displayErrorToast, displaySuccessToast } from 'components/NotificationToast';

import { InjectedAccountWithMeta } from 'redux/slices/walletAccountsSlice';
import { ErrorToastMessages } from 'shared/constants';

import reclaimMetadata from '../metadata/reclaim.json';
import addresses from '../metadata/addresses.json';
import { getGasLimit } from './dryRun';

const MAX_CALL_WEIGHT = new BN(35_000_000_000).isub(BN_ONE);

export const verifyProof = async (
  proof: Proof,
  api: ApiPromise,
  loggedUser: InjectedAccountWithMeta
): Promise<void> => {
  if (!loggedUser.meta.source) return;

  const contract = new ContractPromise(api, reclaimMetadata, addresses.reclaim_address);

  const injector = await web3FromSource(loggedUser.meta.source);

  const onChainProof = Reclaim.transformForOnchain(proof);
  const gasLimitResult = await getGasLimit(
    api,
    loggedUser.address,
    'verifyProof',
    contract,
    undefined,
    [onChainProof.claimInfo, onChainProof.signedClaim]
  );

  const readOnlyGasLimit = api.registry.createType('WeightV2', {
    refTime: new BN(9_000_000_000),
    proofSize: MAX_CALL_WEIGHT,
  }) as WeightV2;

  if (!gasLimitResult.ok) {
    console.log(gasLimitResult.error);
    return;
  }

  await contract.tx
    .verifyProof(
      {
        gasLimit: readOnlyGasLimit,
      },
      onChainProof.claimInfo,
      onChainProof.signedClaim
    )
    .signAndSend(loggedUser.address, { signer: injector.signer }, ({ events = [], status }) => {
      events.forEach(({ event }) => {
        const { method } = event;
        console.log('event', method, status, event.toHuman());
        if (method === 'ExtrinsicSuccess' && status.type === 'InBlock') {
          displaySuccessToast();
        } else if (method === 'ExtrinsicFailed') {
          displayErrorToast(`${ErrorToastMessages.CUSTOM} ${method}.`);
        }
      });
    })
    .catch((error) => {
      displayErrorToast(`${ErrorToastMessages.CUSTOM} ${error}.`);
    });
};
