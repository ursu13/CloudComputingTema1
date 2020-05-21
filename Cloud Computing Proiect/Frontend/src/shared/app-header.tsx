import { AppHeaderStyle, LogoContainer } from './app-header.style';
import {
    DashBoardButton1,
    DashboardButton2,
    DashboardButton3,
    DashBoardButtonsContainer
} from '../dashboard/dashboard.style';
import * as React from 'react';
import Modal from 'react-modal';
import { PlaceOrderForm } from './place-order-form';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


interface Props {

}

interface State {
    myReservationsHover: boolean;
    addProduct: boolean;
    logoutHover: boolean;
    showModal: boolean;
}

export class AppHeader extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            myReservationsHover: false,
            addProduct: false,
            logoutHover: false,
            showModal: false,
        } as State;
    }

    public render() {
        return (
            <>
                <AppHeaderStyle>
                    <LogoContainer onClick={() => window.location.replace('/dashboard')}>
                        Home
                    </LogoContainer>
                    <DashBoardButtonsContainer>
                        <DashBoardButton1
                            onClick={() => window.location.replace('/shopping-cart')}
                            myReservationHover={this.state.myReservationsHover}
                            onMouseEnter={(e: any) => this.onMouseEnterAction(e)}
                            onMouseLeave={(e: any) => this.onMouseLeaveAction(e)}
                            value='shopping-cart'>
                            Cart
                    </DashBoardButton1>

                        <DashboardButton2
                            onClick={() => { this.setState({ showModal: true}) }}
                            historyHover={this.state.addProduct}
                            onMouseEnter={(e: any) => this.onMouseEnterHistory(e)}
                            onMouseLeave={(e: any) => this.onMouseLeaveHistory(e)}
                            value='add-product'>
                            Post Product
                    </DashboardButton2>

                        <DashboardButton3
                            onClick={() => { localStorage.clear(); window.location.reload() }}
                            logoutHover={this.state.logoutHover}
                            onMouseEnter={(e: any) => this.onMouseEnterLogout(e)}
                            onMouseLeave={(e: any) => this.onMouseLeaveLogout(e)}
                            value='logout'>
                            Logout
                    </DashboardButton3>
                    </DashBoardButtonsContainer>
                </AppHeaderStyle>

                {this.state.showModal &&
                    <Modal
                        isOpen={true}
                        //   onAfterOpen={afterOpenModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <PlaceOrderForm closeModal={() => this.closeModal()}/>

                    </Modal>
                }

            </>
        )
    }

    public componentDidMount() {

    }

    private closeModal() {
        this.setState({
            showModal: false,
        })
    }

    private onMouseEnterAction(_event: any) {
        this.setState({
            myReservationsHover: true,
        })

    }

    private onMouseLeaveAction(_event: any) {
        this.setState({
            myReservationsHover: false,
        })
    }

    private onMouseEnterHistory(_event: any) {
        this.setState({
            addProduct: true,
        })

    }

    private onMouseEnterLogout(_event: any) {
        this.setState({
            logoutHover: true,
        })
    }

    private onMouseLeaveLogout(_event: any) {
        this.setState({
            logoutHover: false,
        })

    }

    private onMouseLeaveHistory(_event: any) {
        this.setState({
            addProduct: false,
        })
    }

}
