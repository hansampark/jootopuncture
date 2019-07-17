import styled, { css } from 'styled-components';

const getWidthString = span => {
  if (!span) return;

  let width = (span / 12) * 100;
  return `width: ${width}%;`;
};

const alignCss = css`
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'};
`;

export const Flexbox = styled.div`
  display: flex;
`;

export const Row = styled.div`
  display: flex;
  &::after {
    content: '';
    clear: both;
    display: table;
  }
  ${alignCss};
`;

export const Column = styled.div`
  display: flex;
  ${alignCss};

  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%')};

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }

  @media only screen and (min-width: 768px) {
    ${({ md }) => md && getWidthString(md)};
  }

  @media only screen and (min-width: 768px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;
