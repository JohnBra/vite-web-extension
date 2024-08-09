import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: row;
  z-index: 99999;
  padding: 4px;
  border-radius: 5px;
  background: #c3c4fd;
  gap: 7px;
  padding-left: 5px;
  padding-right: 5px;
`;

export const IaButton = styled.div`
  cursor: pointer;
  background: white;
  display: flex;
  flex-direction: row;
  gap: 2px;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  width: 13px;
  height: 13px;
`;

export const Label = styled.span`
  font-size: 10px;
  color: black;
`;

export const Screen = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;
