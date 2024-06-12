import { ApiPromise } from '@polkadot/api';
import { BN, BN_ONE } from '@polkadot/util';
import type { WeightV2 } from '@polkadot/types/interfaces';

export const APP_NAME = 'Aleph Zero Reclaim';

export const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

// For read-only queries we don't need the exact gas limit
// as the account will not be charged for making the call.
export function readOnlyGasLimit(api: ApiPromise): WeightV2 {
  return api.registry.createType('WeightV2', {
    refTime: new BN(1_000_000_000_000),
    proofSize: MAX_CALL_WEIGHT,
  }) as WeightV2;
}

export enum ErrorToastMessages {
  NO_WALLET = "You haven't connected your wallet. Your posts will NOT be saved.",
  NO_EXTENSION = 'Your browser does NOT HAVE the required plugin.',
  NO_ACCOUNT = 'You DO NOT possess an account tied to your wallet. Please create a new account or import an existing one.',
  ERROR_FETCHING_DATA = 'Error during fetching data.',
  ERROR_API_CONN = 'Error occured with API connection.',
  ERROR_CONTRACT_DATA = 'Error occured when setting up a contract.',
  CUSTOM = 'An error occured: ',
}

export const SMOKE_PROOF = {
  identifier: '0x9ec8f9f52623234433ce5ea0cc0f5aac0dfbeef553e68d2d403633bd9192e365',
  claimData: {
    provider: 'http',
    parameters:
      '{"body":"","geoLocation":"in","method":"GET","paramValues":{"CLAIM_DATA":"76561199614512180"},"responseMatches":[{"type":"contains","value":"_steamid\\">Steam ID: {{CLAIM_DATA}}</div>"}],"responseRedactions":[{"jsonPath":"","regex":"_steamid\\">Steam ID: (.*)</div>","xPath":"id(\\"responsive_page_template_content\\")/div[@class=\\"page_header_ctn\\"]/div[@class=\\"page_content\\"]/div[@class=\\"youraccount_steamid\\"]"}],"url":"https://store.steampowered.com/account/"}',
    owner: '0xa1b6e6ffb85df5bdf78e6558d3224ab87f7cc4c7',
    timestampS: 1717053708,
    context:
      '{"contextAddress":"user\'s address","contextMessage":"for acmecorp.com on 1st january","extractedParameters":{"CLAIM_DATA":"76561199614512180"},"providerHash":"0x5f5312e27124dc7605f70a7d884e169049679b93f91c137b4d18a8569d825900"}',
    identifier: '0x9ec8f9f52623234433ce5ea0cc0f5aac0dfbeef553e68d2d403633bd9192e365',
    epoch: 1,
  },
  signatures: [
    '0xcbad077154cc5c8e494576d4336f57972f7412058c1a637e05832c6bdabd018f4da18ad973f29553921d7d030370032addac1159146b77ec6cc5dab4133ffec01c',
  ],
  witnesses: [
    {
      id: '0x244897572368eadf65bfbc5aec98d8e5443a9072',
      url: 'https://reclaim-node.questbook.app',
    },
  ],
  extractedParameterValues: '',
};
