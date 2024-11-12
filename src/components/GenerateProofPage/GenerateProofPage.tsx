import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/Layout';
import HeroHeading from 'components/HeroHeading';
import { queries } from 'shared/layout';
import { RootState } from 'redux/store';
import { Proof, ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { setProof } from 'redux/slices/proofSlice';
import QRCode from 'react-qr-code';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.white};

  .cards {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    justify-content: center;
    gap: 24px;

    ${queries.phone} {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
      gap: 12px;
    }
  }

  .post-form {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;

    label {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &.input-row {
        flex-direction: row;
      }
    }

    input {
      font-size: 16px;

      &#post-is-highlight {
        accent-color: ${({ theme }) => theme.colors.primary};
        width: 20px;
      }
    }

    input[type='text'],
    input[type='number'] {
      padding: 10px;
      border-radius: 10px;
    }

    p {
      margin-top: 20px;
    }

    button {
      height: 36px;
      width: max-content;
      color: ${({ theme }) => theme.colors.primaryDarker};
      background: ${({ theme }) => theme.colors.button.secondary};
      border-radius: 18px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 8.5px 16px;
      gap: 8px;
      justify-self: end;
      position: relative;
      transition: background-color 0.4s ease, opacity 0.4s ease;
      will-change: background-color, opacity;
      justify-self: center;
      align-self: center;

      &:hover {
        background: ${({ theme }) => theme.colors.button.secondaryHover};
      }
    }
  }
`;

const GenerateProofPage = (): JSX.Element => {
  const loggedAccount = useSelector((state: RootState) => state.walletAccounts.account);

  const dispatch = useDispatch();

  const isButtonDisabled = (): boolean => !loggedAccount;

  const [ready, setReady] = useState(false);
  const [reclaimProofRequest, setReclaimProofRequest] = useState(null);
  const [requestUrl, setRequestUrl] = useState('');
  const [statusUrl, setStatusUrl] = useState('');

  useEffect(() => {
    async function initializeReclaim() {
      const APP_ID = '0x6E0338a6D8594101Ea9e13840449242015d71B19'; // This is an example App Id Replace it with your App Id.
      const APP_SECRET = '0x1e0d6a6548b72286d747b4ac9f2ad6b07eba8ad6a99cb1191890ea3f77fae48f'; // This is an example App Secret Replace it with your App Secret.
      const PROVIDER_ID = '6d3f6753-7ee6-49ee-a545-62f1b1822ae5'; // This is GitHub Provider Id Replace it with the provider id you want to use.

      const proofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
      // @ts-ignore
      setReclaimProofRequest(proofRequest);
    }

    initializeReclaim();
  }, []);

  async function generateVerificationRequest() {
    if (!reclaimProofRequest) {
      console.error('Reclaim Proof Request not initialized');
      return;
    }
    // @ts-ignore
    reclaimProofRequest.addContext(`user's address`, 'for acmecorp.com on 1st january');

    // @ts-ignore
    const url = await reclaimProofRequest.getRequestUrl();
    setRequestUrl(url);
    // @ts-ignore
    const status = reclaimProofRequest.getStatusUrl();
    setStatusUrl(status);

    // @ts-ignore
    await reclaimProofRequest.startSession({
      onSuccessCallback: (proof: Proof) => {
        console.log('Verification success', proof);
        dispatch(setProof(proof));
        setReady(true);
        // Your business logic here
      },
      onFailureCallback: (error: Error) => {
        console.error('Verification failed', error);
        // Your business logic here to handle the error
      },
    });
  }

  return (
    <Layout>
      <Wrapper className="wrapper">
        <HeroHeading variant="generate" />
        <div className="post-form">
          {!requestUrl && (
            <button
              type="button"
              disabled={isButtonDisabled()}
              onClick={generateVerificationRequest}
            >
              Generate Proof
            </button>
          )}
          {requestUrl && <QRCode value={requestUrl} />}
          {ready && <span> Proof is ready! Go to Verify Proof Page to verify it..</span>}
        </div>
      </Wrapper>
    </Layout>
  );
};

export default GenerateProofPage;
