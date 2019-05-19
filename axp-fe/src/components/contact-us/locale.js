import localize from 'fronto-localize';

const en = {
	email: 'Email...',
	subject: 'Letter subject...',
	username: 'Username...',
	message: 'Letter content...',
	write_us: 'Write Us',
	send: 'Send',
	cancel: 'Cancel',
	letter_sent_successfully: 'Letter sent successfully',
	one_more_letter: 'One more letter'
}

const ua = {
	email: 'Пошта...',
	subject: 'Тема листа...',
	username: "Ім'я...",
	message: 'Текст повідомлення...',
	write_us: 'Напишіть нам',
	send: 'Надіслати',
	cancel: 'Скасувати',
	letter_sent_successfully: 'Лист успішно надіслано',
	one_more_letter: 'Відправити ще один'
}

export default localize({en, ua});