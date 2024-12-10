import React, { useState } from "react";
import "./ActionForm.css";
import { useLogin } from "hooks/auth/useLogin";
import { useRegister } from "hooks/auth/useRegister";
import { EyeOutlined, EyeInvisibleOutlined, LoadingOutlined } from "@ant-design/icons";

function ActionForm() {
    const { 
        onLoginSubmit: handleLoginSubmit,
        value: loginEmailFieldValue, setEmail: setLoginEmailField, 
        password: loginPasswordFieldValue, setPassword: setLoginPasswordFieldValue, 
    } = useLogin();
    
    const { 
        onRegisterSubmit: handleRegisterSubmit,
        username: registerUsernameFieldValue, setUsername: setRegisterUsernameFieldValue, 
        email: registerEmailFieldValue, setEmail: setRegisterEmailField, 
        password: registerPasswordFieldValue, setPassword: setRegisterPasswordFieldValue, 
        retypePassword: registerRetypePasswordFieldValue, setRetypePassword: setRegisterRetypePasswordField,
    } = useRegister();

    const [signInPasswordVisible, setSignInPasswordVisible] = useState(false);
    const [signUpPasswordVisible, setSignUpPasswordVisible] = useState(false);
    const [signUpRetypePasswordVisible, setSignUpRetypePasswordVisible] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');

    function closeForms() {
        document.querySelector('.overlay').style.display = 'none';
        document.body.classList.remove('no-scroll');

        const signinForm = document.querySelector('.signin-form');
        const signupForm = document.querySelector('.signup-form');
        const emailLogin = document.querySelector('.email-login');
        const emailLogup = document.querySelector('.email-logup');

        signinForm.classList.remove('showSign');
        signupForm.classList.remove('showSign');
        emailLogin.classList.remove('showEmail');
        emailLogup.classList.remove('showEmail');

        setTimeout(() => {
            signinForm.style.display = 'none';
            signupForm.style.display = 'none';
        }, 300);

        emailLogin.style.display = 'none';
        emailLogup.style.display = 'none';
    }

    function openSignin() {
        document.querySelector('.overlay').style.display = 'block';
        const signinForm = document.querySelector('.signin-form');
        const signupForm = document.querySelector('.signup-form');
        const emailLogin = document.querySelector('.email-login');
        const emailLogup = document.querySelector('.email-logup');

        signupForm.style.display = 'none';
        emailLogin.style.display = 'none';
        signinForm.style.display = 'flex';
        emailLogup.style.display = 'none';

        signinForm.classList.add("showSign");

        document.body.classList.add('no-scroll');
    }



    function openSignup() {
        document.querySelector('.overlay').style.display = 'block';
        const signupForm = document.querySelector('.signup-form');
        const signinForm = document.querySelector('.signin-form');
        const emailLogin = document.querySelector('.email-login');

        signinForm.style.display = 'none';
        emailLogin.style.display = 'none';
        signupForm.style.display = 'flex';

        signupForm.classList.add("showSign");

        document.body.classList.add('no-scroll');
    }

    function openEmailLogin() {
        const emailLogin = document.querySelector('.email-login');
        const signinForm = document.querySelector('.signin-form');

        signinForm.classList.remove('showSign');
        signinForm.style.display = 'none';
        emailLogin.style.display = 'flex';
        emailLogin.classList.add('showEmail');
    }

    function backToSignin() {
        const emailLogin = document.querySelector('.email-login');
        const signinForm = document.querySelector('.signin-form');

        emailLogin.classList.remove('showEmail');
        emailLogin.style.display = 'none';
        signinForm.style.display = 'flex';
        signinForm.classList.add('showSign');
    }

    function openEmailLogup() {
        const emailLogup = document.querySelector('.email-logup');
        const signupForm = document.querySelector('.signup-form');

        signupForm.classList.remove('showSign');
        signupForm.style.display = 'none';
        emailLogup.style.display = 'flex';
        emailLogup.classList.add('showEmail');
    }

    function backToSignup() {
        const emailLogup = document.querySelector('.email-logup');
        const signupForm = document.querySelector('.signup-form');

        emailLogup.classList.remove('showEmail');
        emailLogup.style.display = 'none';
        signupForm.style.display = 'flex';
        signupForm.classList.add('showSign');
    }

    const onLoginSubmit = async (e) => {
        setIsLoggingIn(true);
        setLoginError('');
        try {
            const result = await handleLoginSubmit(e);
            if (result?.success) {
                closeForms();
            } else {
                setLoginError(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setLoginError(error.message || 'An unexpected error occurred.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const onRegisterSubmit = async (e) => {
        setIsRegistering(true);
        setRegisterError('');
        try {
            const result = await handleRegisterSubmit(e);
            if (result.success) {
                openSignin();
            } else {
                setRegisterError(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setRegisterError(error.message || 'An unexpected error occurred.');
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="main-actions-container">
            <div className="overlay" onClick={closeForms}></div>
            <div className="signin-form login-options" id="login-options">
                <button className="close-btn" onClick={closeForms}><span>×</span></button>
                <a href="#">
                    <img className="logo" src="img/LOGO.png" alt="Besnik." />
                </a>
                <h2 className="signin-title">Sign in Into QAirline</h2>
                <div className="main-signin">
                    <button className="common-btn google">
                        <img
                            src="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20transform=''%3e%3cg%20fill-rule='evenodd'%3e%3cpath%20d='m17.64%209.2a10.341%2010.341%200%200%200%20-.164-1.841h-8.476v3.481h4.844a4.14%204.14%200%200%201%20-1.8%202.716v2.264h2.909a8.777%208.777%200%200%200%202.687-6.62z'%20fill='%234285f4'/%3e%3cpath%20d='m9%2018a8.592%208.592%200%200%200%205.956-2.18l-2.909-2.258a5.43%205.43%200%200%201%20-8.083-2.852h-3.007v2.332a9%209%200%200%200%208.043%204.958z'%20fill='%2334a853'/%3e%3cpath%20d='m3.964%2010.71a5.321%205.321%200%200%201%200-3.42v-2.332h-3.007a9.011%209.011%200%200%200%200%208.084z'%20fill='%23fbbc05'/%3e%3cpath%20d='m9%203.58a4.862%204.862%200%200%201%203.44%201.346l2.581-2.581a8.649%208.649%200%200%200%20-6.021-2.345%209%209%200%200%200%20-8.043%204.958l3.007%202.332a5.364%205.364%200%200%201%205.036-3.71z'%20fill='%23ea4335'/%3e%3c/g%3e%3cpath%20d='m0%200h18v18h-18z'%20fill='none'/%3e%3c/g%3e%3c/svg%3e"
                            alt=""
                        />
                        <span>Sign in with Google</span>
                    </button>
                    <button className="common-btn facebook">
                        <img
                            src="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m17.007%200h-16.014a.993.993%200%200%200%20-.993.993v16.014a.993.993%200%200%200%20.993.993h8.628v-6.961h-2.343v-2.725h2.343v-2a3.274%203.274%200%200%201%203.494-3.591%2019.925%2019.925%200%200%201%202.092.106v2.43h-1.428c-1.13%200-1.35.534-1.35%201.322v1.73h2.7l-.351%202.725h-2.364v6.964h4.593a.993.993%200%200%200%20.993-.993v-16.014a.993.993%200%200%200%20-.993-.993z'%20fill='%234267b2'%20/%3e%3cpath%20d='m28.586%2024.041v-6.961h2.349l.351-2.725h-2.7v-1.734c0-.788.22-1.322%201.35-1.322h1.443v-2.434a19.924%2019.924%200%200%200%20-2.095-.106%203.27%203.27%200%200%200%20-3.491%203.591v2h-2.343v2.73h2.343v6.961z'%20fill='%23fff'%20transform='translate(-16.172%20-6.041)'%20/%3e%3c/svg%3e"
                            alt=""
                        />
                        <span>Sign in with Facebook</span>
                    </button>
                    <button className="common-btn emailphone-btn" onClick={openEmailLogin}>
                        <img
                            src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%2011c-2.67%200-8%201.34-8%204v3h16v-3c0-2.66-5.33-4-8-4m0-9C7.79%202%206%203.79%206%206s1.79%204%204%204%204-1.79%204-4-1.79-4-4-4m0%2010.9c2.97%200%206.1%201.46%206.1%202.1v1.1H3.9V15c0-.64%203.13-2.1%206.1-2.1m0-9a2.1%202.1%200%20110%204.2%202.1%202.1%200%20010-4.2'%20fill-opacity='.54'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e"
                            alt=""
                        />
                        <span>Use email / smartphone</span>
                    </button>
                </div>
                <div className="actions-container">
                    <p>
                        Don't you have an account? <a href="#" className="action-link-mobile" onClick={openSignup}>Sign up</a>
                    </p>
                    <a href="#" className="forget-pw">Forget password</a>
                </div>
            </div>

            <div className="email-login hidden-login">
                <a href="#">
                    <img className="logo newlogo" src="img/LOGO.png" alt="Besnik." />
                </a>
                <h2>Sign in Into QAirline</h2>
                <form id="email-formlogin" onSubmit={onLoginSubmit}>
                    <input
                        type="text"
                        placeholder="Type email or smartphone"
                        value={loginEmailFieldValue}
                        onChange={(e) => setLoginEmailField(e.target)}
                        required />
                    <div className="password-container">
                        <input
                            type={signInPasswordVisible ? "text" : "password"}
                            placeholder="Type password"
                            value={loginPasswordFieldValue}
                            onChange={(e) => setLoginPasswordFieldValue(e.target.value)}
                            required />
                        <div className="eye-icon" onClick={() => setSignInPasswordVisible(!signInPasswordVisible)}>                            
                            {signInPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </div>
                    </div>
                </form>
                <div className="form-group remember-me">
                    <input type="checkbox" id="remember" name="remember" />
                    <label for="remember">Remember me for later sign in</label>
                </div>
                {loginError && (
                    <div className="error-message">
                        {loginError}
                    </div>
                )}
                <button 
                    type="submit" 
                    className="login-btn" 
                    form="email-formlogin"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? (
                        <>
                            <LoadingOutlined style={{ marginRight: '8px' }} />
                            Signing in...
                        </>
                    ) : (
                        'Sign in'
                    )}
                </button>
                <button className="backlogin-btn" onClick={backToSignin}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" className="svg-inline--fa fa-chevron-left " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>Back</button>
                <div className="actions-container">
                    <p>
                        Don't you have an account? <a href="#" className="action-link-mobile" onClick={openSignup}>Sign up</a>
                    </p>
                    <a href="#" className="forget-pw">Forget password</a>
                </div>
            </div>

            <div className="email-logup hidden-logup">
                <a href="#">
                    <img className="logo newlogo" src="img/LOGO.png" alt="Besnik." />
                </a>
                <h2>Sign up Into QAirline</h2>
                <form id="email-formlogup" onSubmit={onRegisterSubmit}>
                    <input type="text" placeholder="Type your name" value={registerUsernameFieldValue} onChange={(e) => setRegisterUsernameFieldValue(e.target.value)} required />
                    <input type="text" placeholder="Type email or smartphone" value={registerEmailFieldValue} onChange={(e) => setRegisterEmailField(e.target)} required />
                    <div className="password-container">
                        <input type={signUpPasswordVisible ? "text" : "password"} placeholder="Type password" value={registerPasswordFieldValue} onChange={(e) => setRegisterPasswordFieldValue(e.target.value)} required />
                        <div className="eye-icon" onClick={() => setSignUpPasswordVisible(!signUpPasswordVisible)}>                            
                            {signUpPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </div>
                    </div>
                    <div className="password-container">
                        <input type={signUpRetypePasswordVisible ? "text" : "password"} placeholder="Retype password" value={registerRetypePasswordFieldValue} onChange={(e) => setRegisterRetypePasswordField(e.target)} required />
                        <div className="eye-icon" onClick={() => setSignUpRetypePasswordVisible(!signUpRetypePasswordVisible)}>                            
                            {signUpRetypePasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </div>
                    </div>
                </form>
                {registerError && (
                    <div className="error-message">
                        {registerError}
                    </div>
                )}
                <button 
                    type="submit" 
                    className="logup-btn" 
                    form="email-formlogup"
                    disabled={isRegistering}
                >
                    {isRegistering ? (
                        <>
                            <LoadingOutlined style={{ marginRight: '8px' }} />
                            Signing up...
                        </>
                    ) : (
                        'Sign up'
                    )}
                </button>
                <button className="backlogup-btn" onClick={backToSignup}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" className="svg-inline--fa fa-chevron-left " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>Back</button>
                <div className="actions-container difference">
                    <p>
                        Do you have an account? <a href="#" className="action-link-mobile" onClick={openSignin}> Sign in</a>
                    </p>
                    <a href="#" className="forget-pw">Forget password</a>
                </div>
            </div>

            <div className="signup-form">
                <button className="close-btn" onClick={closeForms}><span>×</span></button>
                <a href="#">
                    <img className="logo" src="img/LOGO.png" alt="Besnik." />
                </a>
                <h2 className="signup-title">Sign up Into QAirline</h2>
                <div className="main-signup">
                    <button className="common-btn google">
                        <img
                            src="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20transform=''%3e%3cg%20fill-rule='evenodd'%3e%3cpath%20d='m17.64%209.2a10.341%2010.341%200%200%200%20-.164-1.841h-8.476v3.481h4.844a4.14%204.14%200%200%201%20-1.8%202.716v2.264h2.909a8.777%208.777%200%200%200%202.687-6.62z'%20fill='%234285f4'/%3e%3cpath%20d='m9%2018a8.592%208.592%200%200%200%205.956-2.18l-2.909-2.258a5.43%205.43%200%200%201%20-8.083-2.852h-3.007v2.332a9%209%200%200%200%208.043%204.958z'%20fill='%2334a853'/%3e%3cpath%20d='m3.964%2010.71a5.321%205.321%200%200%201%200-3.42v-2.332h-3.007a9.011%209.011%200%200%200%200%208.084z'%20fill='%23fbbc05'/%3e%3cpath%20d='m9%203.58a4.862%204.862%200%200%201%203.44%201.346l2.581-2.581a8.649%208.649%200%200%200%20-6.021-2.345%209%209%200%200%200%20-8.043%204.958l3.007%202.332a5.364%205.364%200%200%201%205.036-3.71z'%20fill='%23ea4335'/%3e%3c/g%3e%3cpath%20d='m0%200h18v18h-18z'%20fill='none'/%3e%3c/g%3e%3c/svg%3e"
                            alt=""
                        />
                        <span>Sign up with Google</span>
                    </button>
                    <button className="common-btn facebook">
                        <img
                            src="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m17.007%200h-16.014a.993.993%200%200%200%20-.993.993v16.014a.993.993%200%200%200%20.993.993h8.628v-6.961h-2.343v-2.725h2.343v-2a3.274%203.274%200%200%201%203.494-3.591%2019.925%2019.925%200%200%201%202.092.106v2.43h-1.428c-1.13%200-1.35.534-1.35%201.322v1.73h2.7l-.351%202.725h-2.364v6.964h4.593a.993.993%200%200%200%20.993-.993v-16.014a.993.993%200%200%200%20-.993-.993z'%20fill='%234267b2'%20/%3e%3cpath%20d='m28.586%2024.041v-6.961h2.349l.351-2.725h-2.7v-1.734c0-.788.22-1.322%201.35-1.322h1.443v-2.434a19.924%2019.924%200%200%200%20-2.095-.106%203.27%203.27%200%200%200%20-3.491%203.591v2h-2.343v2.73h2.343v6.961z'%20fill='%23fff'%20transform='translate(-16.172%20-6.041)'%20/%3e%3c/svg%3e"
                            alt=""
                        />
                        <span>Sign up with Facebook</span>
                    </button>
                    <button className="common-btn emailphone-btn" onClick={openEmailLogup}>
                        <img
                            src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%2011c-2.67%200-8%201.34-8%204v3h16v-3c0-2.66-5.33-4-8-4m0-9C7.79%202%206%203.79%206%206s1.79%204%204%204%204-1.79%204-4-1.79-4-4-4m0%2010.9c2.97%200%206.1%201.46%206.1%202.1v1.1H3.9V15c0-.64%203.13-2.1%206.1-2.1m0-9a2.1%202.1%200%20110%204.2%202.1%202.1%200%20010-4.2'%20fill-opacity='.54'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e"
                            alt=""
                        />
                        <span>Use email / smartphone</span>
                    </button>
                </div>
                <div className="actions-container">
                    <p>
                        Do you have an account? <a href="#" className="action-btn" onClick={openSignin}>Sign in</a>
                    </p>
                    <a href="#" className="forget-pw">Forget password</a>
                </div>
            </div>
        </div>
    )
}

export default ActionForm;