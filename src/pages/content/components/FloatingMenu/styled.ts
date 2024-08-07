import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: row;
  z-index: 99999;
  padding: 4px;
  border-radius: 10px;
  background: red;
  gap: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Screen = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;
