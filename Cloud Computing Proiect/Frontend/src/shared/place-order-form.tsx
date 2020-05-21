import * as React from 'react';
import * as div from './place-order-form.style';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    closeModal: () => void;
}

interface State {
    file: any;
    product_name: string;
    description: string;
    stock: any;
    price: any;
    product_type: string;
}

export class PlaceOrderForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            file: null,
            product_name: '',
            stock: '',
            price: '',
            description: '',
            product_type: '',
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: any) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    public render() {
        const { closeModal } = this.props;

        console.log('---', this.state)
        return (
            <div.PlaceOrderForm >
                <div.CloseModal onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faDoorOpen} color={'rgb(50,50,50)'} />
                </div.CloseModal>


                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div.StyledInput>
                        <div.Input onChange={(event: Event) => this.handleTextChange(event, 'product_name')}
                            placeholder={'Product Name'}
                            type="text"
                            value={this.state.product_name} />
                    </div.StyledInput>

                    <div.StyledInput>
                        <div.Input onChange={(event: Event) => this.handleTextChange(event, 'description')}
                            placeholder={'Description'}
                            type="text"
                            value={this.state.description} />
                    </div.StyledInput>

                    <div.StyledInput>
                        <div.Input onChange={(event: Event) => this.handleTextChange(event, 'product_type')}
                            placeholder={'product_type'}
                            type="text"
                            value={this.state.product_type} />
                    </div.StyledInput>

                    <div.StyledInput>
                        <div.Input onChange={(event: Event) => this.handleTextChange(event, 'price')}
                            placeholder={'Price'}
                            type="number"
                            value={this.state.price} />
                    </div.StyledInput>

                    <div.StyledInput>
                        <div.Input onChange={(event: Event) => this.handleTextChange(event, 'stock')}
                            placeholder={'Stock'}
                            type="number"
                            value={this.state.stock} />
                    </div.StyledInput>

                    <div.Input type="file" accept="image/png, image/jpeg" onChange={this.handleChange} style={{ marginTop: 30 }} />
                    {
                        !!this.state.file &&
                        <img src={this.state.file} width={250} height={250} style={{ marginTop: 20 }} />
                    }
                </div>
                <div.StyledButton onClick={() => this.postProduct()}>Post Product</div.StyledButton>


            </div.PlaceOrderForm>
        )
    }

    handleTextChange(event: any, type: string) {
        this.setState({
            ...this.state,
            [type]: event.target.value
        });
    }

    private postProduct() {
        const { file, stock, description, product_name, product_type, price} = this.state;
        const username = localStorage.getItem('user');

        let formData = new FormData();

        formData.append('filePath', file);
        
        let product = {
            username: username,
            stock: stock,
            description: description,
            product_name: product_name,
            product_type: product_type,
            price
        }

        formData.append('product', JSON.stringify(product))

        console.log(formData);
        this.props.closeModal();
        fetch("https://artsales.ew.r.appspot.com/product", {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": '*', "Cache-Control": "no-cache" },
                body: formData,
            })
            .then((res) => { console.log(res.headers); console.log(res.body); console.log(res.headers.values()); console.log(res.type); return res.text();}
            ).then(json => { this.props.closeModal()})
    }
}