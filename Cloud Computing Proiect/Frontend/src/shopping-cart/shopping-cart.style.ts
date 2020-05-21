import { BOX_SHADOW_CSS } from '../shared/home-page.style';
import styled from 'styled-components';

export const CartContainer: any = styled.div`
    min-height: 100%;
    width: 100%;
    overflow-x: hidden;
    background-color: #000000;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    flex-direction: column;
background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
`;

export const Product: any = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: white;
`;

export const Image: any = styled.img`
    width: 250px;
    height: 200px;
    background-color: blue;
`;

export const ProductBody = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 200px);
    padding: 15px 30px 30px 25px;
    height: 100%;
`;

export const ProductTitle = styled.p`
font-size: 26px;
margin: 0px;
padding: 0px;
`;

export const ProductDescription = styled.p`
color: black;
margin: 0px;
padding-top: 20px;
`;

export const FontAndPrice = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

`;

export const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    bottom: 0px;
    align-items: center;
    justify-content: space-between;
`;

export const Price = styled.p`
margin: 0px;
padding: 0px;
margin-left: 30px;
margin-right: 30px;
`;

export const FontAws = styled.div`
`;

export const Cart: any = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin-top: 30px;
`;

export const ShoppingCartHeader: any = styled.div`
    width: 90%;
    height: 60px;
    margin-bottom: -45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const CartHeaderClearAll: any = styled.div`
cursor: pointer;
`;

export const ClearAllText = styled.p`
    font-size: 16px;
    color: white;
    margin: 0;
    padding: 0;
`;

export const Proceed: any = styled.div`
cursor: pointer;
`;

export const ProceedText = styled.p`
    font-size: 20px;
    color: white;
    margin: 0;
    padding: 0;
`;


export const ShoppingCartBody: any = styled.div`
    width: 100%;
`;

export const DashBoardContainer2: any = styled.div`
    width: auto;
    height: 100%;
    display :flex;
    flex-direction: column;
    overflow-x: hidden;
    background-color: #000000;
    background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
`;

export const DashBoardButtonsContainer: any = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`;

export const DashBoardButton1: any = styled.div`
    width: 150px;
    text-align: center;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    color: white;
    flex-direction: column;
    cursor: pointer;
     font-weight: ${(props: any) => props.myReservationHover ? 600 : 100};
     ${(props: any) => props.myReservationHover && BOX_SHADOW_CSS}
     `;

export const DashboardButton2: any = styled.div`
    width: 150px;
    text-align: center;
    height: 100%;
    color: white;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-weight: ${(props: any) => props.historyHover ? 600 : 100};
    ${(props: any) => props.historyHover && BOX_SHADOW_CSS}
`;

export const DashboardButton3: any = styled.div`
    width: 150px;
    text-align: center;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: white;
    display: flex;
    flex-direction: column;
    cursor: pointer;
     font-weight: ${(props: any) => props.logoutHover ? 600 : 100};
     ${(props: any) => props.logoutHover && BOX_SHADOW_CSS}
`;

export const Wrapper: any = styled.div`
    margin: 0 auto;
    height: auto;
    width: 1200px;
`;

export const Restaurant: any = styled.div`
    margin: 50px auto;
    width: 100%;
    height: 350px;
    box-shadow: 6px 9px 22px -8px rgba(0,0,0,0.75);
    display: flex;
    flex-direction: row;
    border-radius: 30px;   
    background-color: white;  
`;

export const RestaurantImage: any = styled.div`
    width: 40%;
    height: 350px;
`;

export const RestaurantData: any = styled.div`
    float: right;
    height: 100%;
    width: 60%;
    display:flex;
    flex-direction: column;
`;

export const RestaurantName: any = styled.div`
    height: 20%;
    text-align: center;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: x-large;
    font-family: 'New Century Schoolbook, TeX Gyre Schola, serif';
`;

export const RestaurantDescription: any = styled.div`
    height: 60%;
    text-align: left;
    padding: 20px;
    font-size: large;
    font-family:  'Open Sans';
`;

export const RestaurantDetailsButtonContainer: any = styled.div`
    height: 20%;
`;

export const RestaurantDetailsButton: any = styled.button`
    width: 150px;
    height: 50px;
    float: right;
    margin: 10px;
    border: none;
    color: white;
    border-radius: 30px;
    background-color: #000000;
    background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
    outline-style:none;
    cursor: pointer;
`;

export const PlaceOrder: any = styled.div`
    font-size: 16px;
    color: white;
    margin: 0;
    width: 100px;
    padding: 0;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
`