import { Application, Content, SafeArea } from './app.style';
import { DashBoard } from './dashboard/dashboard';
import { HomePage } from './shared/home-page';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import * as React from 'react';
import {
    Redirect,
    Route,
    Switch,
    withRouter
} from 'react-router';

interface Props {

}

interface State {
    cart: any[];
}


export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            cart: [],
        }
    }

    public render() {
        const { cart } = this.state;
        console.log('+++ cart', cart);

        return (
            <Application>
                <SafeArea>
                    {/* <AppHeader />  */}

                    <Content>
                        <Switch>
                            <Route exact={true} path='/' render={props => this.renderPage(props, false, '/dashboard', HomePage)} />
                            <Route exact={true} path='/dashboard' render={props => this.renderPage(props, true, '/', DashBoard, 'dashboard')} />
                            <Route exact={true} path='/shopping-cart' render={props => this.renderPage(props, true, '/', ShoppingCart, 'cart')} />
                        </Switch>
                    </Content>


                </SafeArea>
            </Application>

        );
    }

    public editCartByCartSide(product: any) {
        const cart = localStorage.getItem('cart')

        let b = !cart ? [] : JSON.parse(cart);

        let index = b.filter((item: any) => item.product_name !== product.product_name);

        localStorage.setItem('cart', JSON.stringify(index))
    }

    public editCartByDashboardSide(product: any) {

        const cart = localStorage.getItem('cart')

        let b = !cart ? [] : JSON.parse(cart);

        let ok = 0;

        b.forEach((prod: any) => { if(prod.product_name === product.product_name) { ok = 1} })

        if (ok === 0) {
            b.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(b))
    }

    public renderPage(
        props: any,
        shouldBeAuth: boolean,
        pathToRedirect: string,
        Component: React.ComponentClass,
        location?: string,
    ) {

        let isAuth = !!localStorage.getItem('user');
        console.log('+++ this.state.cart', this.state.cart);

        if (isAuth === shouldBeAuth) {

            if (location === 'cart') {
                return <ShoppingCart cart={this.state.cart} callback={(product: any) => this.editCartByCartSide(product)} />
            }

            if (location === 'dashboard') {
                return <DashBoard callback={(product: any) => this.editCartByDashboardSide(product)} />
            }

            return <Component {...props} />;
        } else {

            return <Redirect to={pathToRedirect} />
        }
    }
}

export default withRouter<any, any>(App);