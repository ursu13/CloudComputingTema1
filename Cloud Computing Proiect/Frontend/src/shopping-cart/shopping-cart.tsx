import * as div from './shopping-cart.style';
import { Restaurant_ts } from '../interfaces/interfaces';
import { AppHeader } from '../shared/app-header';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import swal from 'sweetalert';

interface Props {
    callback?: (product: any) => void;
    cart?: any[];
}

interface State {
    shoppingCart: any[];
}


export class ShoppingCart extends React.Component<Props, State> {
    public a = localStorage.getItem('cart')
        public cart = !this.a ? [] : JSON.parse(this.a);

    constructor(props: Props) {
        super(props);

        this.state = {
            shoppingCart: this.cart,
        } as State;
    }



    public render() {
        const { callback } = this.props;

        var displayPlaceOrder = this.state.shoppingCart.length ? true : false;
        console.log(this.state.shoppingCart)
        return (
            <div.CartContainer>
                <AppHeader />
                <div.Cart>
                    {
                        !!this.state.shoppingCart &&
                        <div.ShoppingCartHeader>
                            <div.CartHeaderClearAll onClick={() => { this.setState({ shoppingCart: [] }); localStorage.setItem('cart', '') }}>
                                <div.ClearAllText>
                                    {this.state.shoppingCart.length ? 'Clear All' : ' Your Cart is Empty! Choose one of our products'}
                                </div.ClearAllText>
                            </div.CartHeaderClearAll>
                            {

                            }
                            <div.Proceed onClick={() => console.log('SA MA CAC PE CC')}>
                                <div.ProceedText>
                                    {!!this.getTotal() && `Proceed - Total: ${this.getTotal()} lei`}
                                </div.ProceedText>
                            </div.Proceed>
                        </div.ShoppingCartHeader>
                    }

                    <div.ShoppingCartBody>
                        {
                            !! this.state.shoppingCart && this.state.shoppingCart.map((product: any) => {
                                return (
                                    <div.Product>
                                        <div.Image src={product.image_source}/>

                                        <div.ProductBody>

                                            <div.TitleWrapper>
                                                <div.ProductTitle>
                                                    {product.product_name}
                                                </div.ProductTitle>

                                                <div.FontAndPrice>
                                                    <div.Price>
                                                        {product.price} lei
                                                </div.Price>

                                                    <div.FontAws onClick={() => {!!callback && this.deleteFromShoppingCart(product)}}>
                                                        <FontAwesomeIcon icon={faWindowClose} color={'rgb(50,50,50)'} />
                                                    </div.FontAws>
                                                </div.FontAndPrice>

                                            </div.TitleWrapper>


                                            <div.ProductDescription>
                                                {product.description}
                                            </div.ProductDescription>


                                        </div.ProductBody>
                                    </div.Product>
                                )
                            })
                        }

                    </div.ShoppingCartBody >

                    {displayPlaceOrder
                        ? <div.PlaceOrder onClick={() => this.placeOrder()}>Place Order</div.PlaceOrder>
                        : ""
                    }
                </div.Cart>

            </div.CartContainer>
        );
    }

    private placeOrder(){
        swal({
        title: "Place order",
        text: "Are you sure?",
        icon: "warning",
        buttons: ['Cancel', "Yes"],
        dangerMode: true,
      })
      .then((placeOrder) => {
        if (placeOrder) {
            this.placeOrderCloud();
            return true;
        }
        return false;
      }).then((result) => {
          if(result){
            swal("Order placed!", {
                icon: "success",
            });
            this.setState({
                shoppingCart: []
            })
            localStorage.setItem('cart', '')
          }else{
            swal("Order not placed!", {
                icon: "error",
            });
          }
      });
    }

    private placeOrderCloud(){
        let productsArray = this.state.shoppingCart.map(item => item.name)
        fetch("https://artsales.ew.r.appspot.com/order", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": '*', "Cache-Control": "no-cache" },
            body: JSON.stringify({
                'username': localStorage.getItem('user'),
                'cart': productsArray
            })
        })
        .then((res) => {
                console.log(res)
            }
        )
    }

    private getTotal() {
        const { shoppingCart } = this.state;

        let total = 0;

        !!shoppingCart && shoppingCart.map(item => {
            total = total + item.price;
        })

        return total
    }

    private deleteFromShoppingCart(elem: any) {
        const { shoppingCart } = this.state;
        const { callback } = this.props
        console.log(elem)
        let newArray = shoppingCart.filter(item => item.product_name.toString() !== elem.product_name.toString())

        this.setState({
            shoppingCart: newArray,
        })

        !!callback && callback(elem);
    }

    public async componentDidMount() { }
}