# -*- coding: utf-8 -*-
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import FormView, TemplateView

from city_project.settings import EMAIL_HOST_USER

from user_info_app.permissions import NeedLogin
from contact_app.forms import ContactUsForm


class ContactUsView(NeedLogin, FormView):
    """CBV for sending letter to admin"""

    form = ContactUsForm
    template_name = 'contact_app/contact_us.html'
    success_url = 'contact/'

    def post(self, request, *args, **kwargs):
        self.form = ContactUsForm(data=request.POST)

        if self.form.is_valid():
            from_email = request.user.email
            from_name = '{0} {1}'.format(request.user.first_name, request.user.last_name)
            to_email = EMAIL_HOST_USER
            subject = self.form.cleaned_data.get('subject')
            user_text = self.form.cleaned_data.get('user_text')

            recipient_list = []
            recipient_list.append(to_email)

            try:

                message = EmailMultiAlternatives(subject, user_text, from_email, recipient_list)
                html_template = get_template('contact_app/contact_us_letter.html').render(
                    {'from_name': from_name, 'user': request.user.username, 'user_text': user_text,
                     'to_email': to_email})
                message.attach_alternative(html_template, 'text/html')
                message.send()

            except Exeption:
                message = 'Server does not respond. Please try again later!'

            else:
                message = 'Letter sent successfully!'

            return HttpResponseRedirect('%s?status_message=%s' % (reverse('contact_app:letter_sent'), message))

    def get(self, request):
        form = ContactUsForm()
        return render(request, 'contact_app/contact_us.html', {'form': form})


class LetterSentView(NeedLogin, TemplateView):
    """CBV for new page after success letter's sent"""

    template_name = 'contact_app/letter_sent.html'

    def get(self, request):
        return render(request, self.template_name, {})
