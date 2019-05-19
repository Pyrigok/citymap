import localize from 'fronto-localize';

const en = {
    sign_up: 'Sign Up',
    username: 'Username...',
    first_name: "First Name...",
    last_name: "Last Name...",
    email: "Email...",
    password: "Password...",
    confirm_password: "Confirm Password...",
    add_photo: 'Photo',
    register: "Register"
}

const ua = {
    sign_up: 'Реєстрація...',
    username: 'Псевдонім...',
    first_name: "Ім'я...",
    last_name: "Прізвище...",
    email: "Пошта...",
    password: "Пароль...",
    confirm_password: "Повторити Пароль...",
    add_photo: 'Фото',
    register: "Зареєструватися"
}

export default localize({en, ua});