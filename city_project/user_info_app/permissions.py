from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from abc import ABC


class NeedLogin(ABC):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(NeedLogin, self).dispatch(*args, **kwargs)
