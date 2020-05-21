import { DashBoardContainer, ProductsList, CardName } from './dashboard.style';
import {
    CardBody,
    CardDescription,
    CardImage,
    IconContainer,
    Image,
    Price,
    PriceAndIcon,
    ProductCard
} from './dashboard.style';
import { MenuCardConfig, Restaurant_ts } from '../interfaces/interfaces';
import { AppHeader } from '../shared/app-header';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Toast } from 'react-toastify/dist/components';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
    callback?: (product: any) => void;
}

interface State {
    timepassed: boolean;
    pressedCard: string;
    products: any[];
}

export class DashBoard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            timepassed: false,
            pressedCard: '',
            products: [],
        } as State;
    }



    public render() {
        const { products } = this.state;

        return (
            <>
                {this.state.timepassed && <ToastContainer position='top-right'>
                    {toast(`${this.state.pressedCard} a fost adaugat!`)}
                </ToastContainer>}

                <DashBoardContainer>
                    <AppHeader />
                    <ProductsList>

                        {
                            products.map(card => {
                                return (
                                    <ProductCard>
                                        <CardBody>
                                            <CardImage>
                                                <Image src={card.image_source} />

                                            </CardImage>
                                            <CardName> {card.product_name}</CardName>
                                            <CardDescription> {card.description}</CardDescription>
                                        </CardBody>
                                        <PriceAndIcon>
                                            <Price>{card.price}</Price>
                                            <IconContainer onClick={() => { this.setState({ timepassed: true }); this.first(card, this.second.bind(this)) }}>
                                                <FontAwesomeIcon color={'white'} icon={faPlus} />
                                            </IconContainer>
                                        </PriceAndIcon>
                                    </ProductCard>
                                )
                            })
                        }

                    </ProductsList>
                </DashBoardContainer>
            </>
        );
    }

    public first(card: any, second: () => void) {
        this.setState({ timepassed: true })
        const { callback } = this.props;


        console.log(callback);

        console.log(card);

        !!callback && callback(card);

        this.setState({
            pressedCard: card.product_name,
        })
        setTimeout(function (context: DashBoard) { second() }.bind(this), 100);
        this.setState({ timepassed: false })



    }

    public second() {
        this.setState({
            timepassed: true
        })
    }


    private set(res: any) {
        this.setState({
            products: res,
        })
    }

    private getProducts() {
        fetch("https://artsales.ew.r.appspot.com/product", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": '*', 'Accept': '*', "Cache-Control": "no-cache" },
        })
            .then((res) => { return res.json(); }
            ).then(json => { this.set(json) })
    }

    public async componentDidMount() {
        this.getProducts();
    }

}