import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Layout from 'components/Layout';
import HeroHeading from 'components/HeroHeading';

import { queries } from 'shared/layout';
import { RootState } from 'redux/store';
import { verifyProof } from 'utils/verifyProof';

import { ApiPromiseType } from '../../App';

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



    const isButtonDisabled = (): boolean =>
        !(loggedAccount);

    const handleVerifyProof = (): void => {
        // if (!loggedAccount) return;
        // if (!proof) return;
        // if (api) verifyProof(proof, api, loggedAccount);
    };

    return (
        <Layout>
            <Wrapper className="wrapper">
                <HeroHeading variant="generate" />
                <div className="post-form">
                    <button type="button" disabled={isButtonDisabled()} onClick={handleVerifyProof}>
                        Verify Proof
                    </button>
                </div>
            </Wrapper>
        </Layout>
    );
};

export default GenerateProofPage;
