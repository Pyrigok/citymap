import localize from 'fronto-localize';

const en = {
    username: 'Username...',
    password: 'Password...',
    sign_in: 'Sign In',
    remember_me: 'Remember me',
    login: 'Login',
    forgot_password: 'Forgot password'
}

const ua = {
    username: 'Псевдонім...',
    password: 'Пароль...',
    sign_in: 'Увійти на сайт',
    remember_me: "Запам'ятати мене",
    login: 'Увійти',
    forgot_password: 'Забули пароль'
}

export default localize({en, ua});