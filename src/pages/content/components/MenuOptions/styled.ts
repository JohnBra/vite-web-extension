import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectedOption = styled.div`
  padding: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  text-transform: capitalize;
`;

export const OptionsList = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1;
  width: 100%;
`;

export const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  text-transform: capitalize;
`;
