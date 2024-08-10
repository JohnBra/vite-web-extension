import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectedOption = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 10px;
  color: black;
`;

export const OptionsList = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ccc;
  z-index: 1;
`;

export const Option = styled.div`
  cursor: pointer;
  text-transform: capitalize;
  font-size: 10px;
  color: black;
`;
