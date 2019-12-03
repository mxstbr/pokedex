// Renders an animated ellipsis (...) as a loading state
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  to {
    width: 1em;
  }
`;

export default styled.span`
  font-size: inherit;
  color: inherit;

  &:after {
    content: "\\2026";
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${animation} steps(4, end) 900ms infinite;
    width: 0px;
  }
`;
