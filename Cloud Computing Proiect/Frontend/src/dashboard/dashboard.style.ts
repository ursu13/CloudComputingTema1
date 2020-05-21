import styled from 'styled-components';
import { BOX_SHADOW_CSS } from '../shared/home-page.style';

export const DashBoardContainer: any = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #000000;
background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
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
     ${(props: any) => props.myReservationHover && BOX_SHADOW_CSS  }
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
    ${(props: any) => props.historyHover && BOX_SHADOW_CSS  }
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
     ${(props: any) => props.logoutHover && BOX_SHADOW_CSS  }
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

export const ProductsList: any = styled.div`
    margin: 30px 100px;
    width: auto;
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    grid-template-columns: 1fr 1fr 1fr;
    padding-bottom: 30px;
`;

export const ProductCard = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(100,100,100, 0.8);
    height: auto;
    margin-top: 30px;
`;

export const CardImage = styled.div`
    width: 100%;
    height: 250px;
    background-color: white;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    resize-mode: cover;
`;

export const CardBody = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: space-between;
	padding: 15px;
`;

export const CardDescription = styled.p`
    color: white;
	margin-top: -10px;
    font-family: 'New Century Schoolbook, TeX Gyre Schola, serif';
`;

export const CardName = styled.p`
    padding: 0;
    margin-top: 10px;
    font-size: 22px;
    color: white;
    font-weight: 600;
    font-family: 'New Century Schoolbook, TeX Gyre Schola, serif';
`;

export const PriceAndIcon = styled.div`
	display: flex;
	flex-direction: row;
	padding: 15px;
	justify-content: space-between;
	align-items: center;
`;

export const Price = styled.p`
color: white;
    font-family: 'New Century Schoolbook, TeX Gyre Schola, serif';
`;

export const IconContainer = styled.div`
    cursor: pointer;
	width: 25px;
	height: 25px;
`;
