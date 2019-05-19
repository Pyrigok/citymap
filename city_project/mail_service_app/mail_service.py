from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template


class SendMail():
    """send mail service"""

    def __init__(self, subject, user_text, from_email, recipient, from_name='CityMap Team'):
        self.subject = subject
        self.user_text = user_text
        self.from_email = from_email
        self.recipient = recipient
        self.from_name = from_name

    def send_letter(self):

        recipient_list = list()
        recipient_list.append(self.recipient)
        message = EmailMultiAlternatives(self.subject, self.user_text, self.from_email, recipient_list)
        html_template = get_template('contact_app/contact_us_letter.html').render(
            {'user': self.from_name, 'user_text': self.user_text, 'from_email': self.from_email})
        message.attach_alternative(html_template, 'text/html')
        message.send()
