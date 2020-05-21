import * as React from 'react';
import { HomePageContainer, BoxContainer, LoginContent, LogoContainer, StyledInput, Input, InputsContainer, StyledButton, SwitchButtonContainer, SwitchButton, SignUpInputsContainer, BackgroundImage } from './home-page.style';

interface Props {

}

interface State {
    status: number;
    loginUsername: string;
    loginPassword: string;
    signUpFN: string;
    signUpLN: string;
    signUpEmail: string;
    signUpPassword: string;
    signUpRepeat: string;
    res: any;
}


export class HomePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            status: 0,
            loginUsername: '',
            loginPassword: '',
            signUpFN: '',
            signUpLN: '',
            signUpUser: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpRepeat: '',
            res: '',
        } as State;
    }




    public render() {
        console.log('+++ this.state', this.state);
        const { status } = this.state;
        return (
            <HomePageContainer>
                <BackgroundImage />
                {/* <DarkBackgroundOverlay/> */}
                <BoxContainer>
                    <LoginContent>
                        <>
                           
                            {
                                status === 0 ?
                                    <InputsContainer>
                                        <StyledInput>
                                            <Input
                                                onChange={(event: Event) => this.handleTextChange(event, 'loginUsername')}
                                                placeholder={'Username'}
                                                type="text"
                                                value={this.state.loginUsername}

                                            />
                                        </StyledInput>

                                        <StyledInput>
                                            <Input
                                                onChange={(event: Event) => this.handleTextChange(event, 'loginPassword')}
                                                placeholder={'Password'}
                                                type="password"
                                                value={this.state.loginPassword}
                                            />
                                        </StyledInput>
                                    </InputsContainer>
                                    :
                                    <SignUpInputsContainer>
                                        <StyledInput>
                                            <Input
                                                onChange={(event: Event) => this.handleTextChange(event, 'signUpFN')}
                                                placeholder='First Name'
                                                type="text"
                                                value={this.state.signUpFN}
                                            />
                                        </StyledInput>

                                        <StyledInput>
                                            <Input
                                                onChange={(event: Event) => this.handleTextChange(event, 'signUpLN')}
                                                placeholder='Last Name'
                                                type="text"
                                                value={this.state.signUpLN}
                                            />
                                        </StyledInput>
                                        <StyledInput>
                                            <Input
                                                onChange={(event: Event) => this.handleTextChange(event, 'signUpEmail')}
                                                placeholder={'Email'}
                                                type="text"
                                                value={this.state.signUpEmail}
                                            />
                                        </StyledInput>

                                        <StyledInput>
                                            <Input
                                                onChange={(event: Event) => this.handleTextChange(event, 'signUpPassword')}
                                                placeholder={'Password'}
                                                type="password"
                                                value={this.state.signUpPassword}
                                            />
                                        </StyledInput>
                                        <StyledInput>
                                            <Input
                                                onChange={(event: Event) => this.handleTextChange(event, 'signUpRepeat')}
                                                placeholder={'Repeat Password'}
                                                type="password"
                                                value={this.state.signUpRepeat}
                                            />
                                        </StyledInput>
                                    </SignUpInputsContainer>

                            }


                            <StyledButton
                                onClick={() => this.extecuteAuthAction()}
                            >
                                {
                                    status === 0 ?
                                        'Login' :
                                        'Sign Up'
                                }
                            </StyledButton>

                        </>
                        <SwitchButtonContainer>
                            <SwitchButton
                                status={this.state.status}
                                onClick={() => this.onSignInPress()}
                                direction='left'>
                                Sign In
                        </SwitchButton>
                            <SwitchButton
                                status={this.state.status}
                                onClick={() => this.onSignOutPress()}
                                direction='right'>
                                Sign Up
                        </SwitchButton>
                        </SwitchButtonContainer>
                    </LoginContent>

                </BoxContainer>
            </HomePageContainer>
        )
    }

    public async componentDidMount() {
        this.setState({
            status: 0,
        })

    }

    private async extecuteAuthAction() {
        const { status } = this.state;

        if (status === 1) {
                const registerObj = {
                    username: this.state.signUpFN,
                    password: this.state.signUpPassword,
                    email: this.state.signUpEmail,
                    fullname: this.state.signUpLN,
                }

            fetch("https://artsales.ew.r.appspot.com/register", {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": '*', 'Accept': 'application/json', "Cache-Control": "no-cache" },
                body: JSON.stringify(registerObj)
            })
                .then((res) => {
                    console.log(res)
                }
                )
        } else if (status === 0) {
            const loginObj = {
                username: this.state.loginUsername,
                password: this.state.loginPassword
            }

            fetch("https://artsales.ew.r.appspot.com/login", {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json','Accept': 'text/plain', "Access-Control-Allow-Origin": '*', "Cache-Control": "no-cache", 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' },
                body: JSON.stringify(loginObj)
            })
                .then((res) => { console.log(res.headers); console.log(res.body); console.log(res.headers.values()); console.log(res.type); return res.text();}
                ).then(json => { localStorage.setItem('user', this.state.loginUsername); window.location.replace('http://localhost:3000/dashboard')})
        }
    }

    private onSignInPress() {
        this.setState({
            status: 0
        })
    }

    private onSignOutPress() {
        this.setState({
            status: 1
        })
    }

    handleTextChange(event: any, type: string) {
        this.setState({
            ...this.state,
            [type]: event.target.value
        });
    }
}