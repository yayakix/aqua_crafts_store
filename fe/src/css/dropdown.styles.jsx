import styled from "styled-components";

export const CartDropContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 3px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  button {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
  
`;
export const CartItems = styled.div`
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  
  
`;
