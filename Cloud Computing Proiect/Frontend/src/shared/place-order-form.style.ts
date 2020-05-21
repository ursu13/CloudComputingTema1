import styled from 'styled-components'

export const PlaceOrderForm = styled.div`
    width: 400px;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const Input: any = styled.input`
    width: 220px;
    height: 20px;
    border-radius: 4px;
    font-family: 'Gotham SSm A', 'Gotham SSm B';
    font-size: 14px;
    line-height: normal;
    background-color: transparent;
    color: #282828;
    outline: none;
    -webkit-appearance: none;
    padding: 5px;
`;


export const CloseModal: any = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
`;

export const StyledInput: any = styled.div`
    align-self: center;
    width: 220px;
    height: 25px;
    border-radius: 4px;
    background-color: rgba(255,255,255,0.3);
    transition: 0.3s all;
    margin-top: 25px;
`;

export const Inputs: any = styled.div`


`;


export const StyledButton: any = styled.button`
    color: white;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    margin-top: 30px;
    transition: all 0.4s ease 0s;
    width: 120px;
    height: 40px;
    background-color: #000000;
    background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
    cursor: pointer;
    `;