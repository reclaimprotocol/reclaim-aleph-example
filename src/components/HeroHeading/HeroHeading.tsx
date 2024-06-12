import React from 'react';
import styled from 'styled-components';

import { queries } from 'shared/layout';

const HeroHeadingWrapper = styled.div`
  margin-bottom: 76px;
  width: 518px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  & > h2 {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
    font-size: 34px;
    line-height: 116%;
    letter-spacing: 0.025em;
  }

  & > p {
    color: ${({ theme }) => theme.colors.gray.medium};
    font-family: 'Karla';
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.04em;
    text-align: center;
  }

  ${queries.tiny} {
    width: 100%;
  }
`;

type Variant = 'verify' | 'generate';

const HeroHeading = ({ variant }: { variant: Variant }) => (
  <>
    {variant === 'verify' && (
      <HeroHeadingWrapper>
        <h2>Verify Proof</h2>
        <p>Here you can try out verifying reclaim proofs!</p>
        <p>You can use MOCK proof or go to Generate Proof to verify with your own proofs!</p>
      </HeroHeadingWrapper>
    )}
    {variant === 'generate' && (
      <HeroHeadingWrapper>
        <h2>Generate Proof</h2>
        <p>Here you can try out generating reclaim proofs!</p>
      </HeroHeadingWrapper>
    )}
  </>
);
export default HeroHeading;
