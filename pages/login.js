import {getCsrfToken, signIn} from 'next-auth/client'
import CustomHead from "../components/shared/CustomHead";
import Container from "../components/LoginSignUp/Container";
import Wrapper from "../components/LoginSignUp/Wrapper";
import TextInput from "../components/LoginSignUp/TextInput";
import LoginWithSocialBtn from "../components/LoginSignUp/LoginWithSocialBtn";
import Link from "next/link";
import { useEffect, useState } from "react";
import Message from '../components/shared/Message';
import { Router, useRouter } from 'next/dist/client/router';
import Spinner from '../components/shared/Spinner';

const LoginPage = () => {
    const initInput = {
        email: '',
        password: ''
    }

    const errorQuery = useRouter().query.error
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState(initInput)
    const {email, password} = input

    const [csrfToken, setCsrfToken] = useState('')
    const [origin, setOrigin] = useState('')

    const handleChange = e => {
        const {value, name} = e.target
        setError(null)

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const getCsrfTokenFunc = async () => {
            const csrfToken = await getCsrfToken()
            setCsrfToken(csrfToken)
        }
        getCsrfTokenFunc()
    }, [])

    useEffect(() => {
        setError(errorQuery)
    }, [errorQuery])

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])
    
    return (
        <>
            <CustomHead
                title='Login - DeBut'
                description='Login to get information with fun'
                url='https://debut.vercel.app/login'
            />
            <Container>
                <Wrapper>
                    <h1 className='text-xl font-bold text-center mb-6'>Login to DeBut</h1>
                    <div className='my-6 flex flex-col gap-4'>
                        <LoginWithSocialBtn label='Continue with Google' icon='google' provider='google' callbackUrl={`${origin}/explore`} />
                        <LoginWithSocialBtn label='Continue with Facebook' icon='facebook' provider='facebook' callbackUrl={`${origin}/explore`} />
                        <LoginWithSocialBtn label='Continue with Twitter' icon='twitter' provider='twitter' callbackUrl={`${origin}/explore`} />
                    </div>
                    <p className='text-sm text-gray-400 text-center'>??? or ???</p>
                    <form className='my-6 flex flex-col gap-4' action={`${origin}/api/auth/callback/sanity-login`} method="POST" onSubmit={() => setLoading(true)}>
                        <input type="hidden" name="csrfToken" value={csrfToken} />
                        <TextInput id='email' type='email' name='email' label='Email' placeholder='mail@example.com' value={email} onChange={handleChange} required />
                        <TextInput id='password' type='password' name='password' label='Password' value={password} onChange={handleChange} required />
                        <button type='submit' className='w-full mt-2 bg-cust-purple text-white font-medium py-2 rounded'>
                            {loading ?
                                <Spinner width='24px' />
                                :
                                'Login'
                            }
                        </button>
                    </form>
                    <div className='text-center text-sm text-text-secondary'>
                        Don't have an account?
                        <Link href='/signup'><a className='font-medium text-cust-purple hover:underline ml-1'>Sign up</a></Link>
                    </div>
                </Wrapper>
            </Container>
            {error && <Message type='error' text={error} />}
        </>
    );
}
 
export default LoginPage;