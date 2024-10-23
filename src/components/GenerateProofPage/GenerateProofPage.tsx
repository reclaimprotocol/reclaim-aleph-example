import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'components/Layout';
import HeroHeading from 'components/HeroHeading';

import { queries } from 'shared/layout';
import { RootState } from 'redux/store';


import { Proof, Reclaim } from '@reclaimprotocol/js-sdk';
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

    const isButtonDisabled = (): boolean =>
        !(loggedAccount);


    const [url, setUrl] = useState("");
    const [ready, setReady] = useState(false);




    async function generateVerificationRequest() {
        const reclaimClient = new Reclaim.ProofRequest(""); // TODO: replace with your applicationId
        const providerId = ""; // TODO: replace with your provider ids you had selected while creating the application

        reclaimClient.addContext(
            `user's address`,
            "for acmecorp.com on 1st january"
        );

        await reclaimClient.buildProofRequest(providerId, true, "V2Linking");

        reclaimClient.setSignature(
            await reclaimClient.generateSignature(
                "" // TODO : replace with your APP_SECRET
            )
        );

        const { requestUrl, statusUrl } =
            await reclaimClient.createVerificationRequest();

        setUrl(requestUrl);

        await reclaimClient.startSession({
            onSuccessCallback: (proofs: Proof[]) => {
                console.log("Verification success", proofs);
                setReady(true);
                dispatch(setProof(proofs[0]));
                // Your business logic here
            },
            onFailureCallback: (error: Error) => {
                console.error("Verification failed", error);
                // Your business logic here to handle the error
            },
        });
    }

    return (
        <Layout>
            <Wrapper className="wrapper">
                <HeroHeading variant="generate" />
                <div className="post-form">
                    {!url && <button type="button" disabled={isButtonDisabled()} onClick={generateVerificationRequest}>
                        Generate Proof
                    </button>}
                    {url && <QRCode value={url} />}
                    {ready && <span> Proof is ready! Go to Verify Proof Page to verify it..</span>}
                </div>
            </Wrapper>
        </Layout>
    );
};

export default GenerateProofPage;
