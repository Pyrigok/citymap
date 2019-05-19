import localize from 'fronto-localize';

const en = {
	reset_password: 'Reset-password',
	enter_your_email: 'Enter your email...',
	the_password_has_been_changed: 'The password has been changed',
	sign_in_again: 'Sign in again',
	enter_and_confirm_new_password: 'Please enter (and confirm) your new password',
	new_password: 'New Password...',
	repeat_password: 'Reset-password...',
	change_password: 'Change Password',
	we_send_instruction: 'We\'ve send you instructions for setting your password. If they haven\'t arrived in a few minutes, check your spam folder.'
}

const ua = {
	reset_password: 'Скинути пароль',
	enter_your_email: 'Введіть адресу електронної пошти...',
	the_password_has_been_changed: 'Пароль було змінено',
	sign_in_again: 'Увійти знову',
	enter_and_confirm_new_password: 'Введіть (та підтвердіть) новий пароль',
	new_password: 'Новий пароль...',
	repeat_password: 'Повторити пароль...',
	change_password: 'Змінити пароль',
	we_send_instruction: 'Ми надіслали вам інструкції для встановлення пароля. Якщо ви не отримаєте їх через кілька хвилин, перевірте папку зі спамом'
}

export default localize({en, ua});