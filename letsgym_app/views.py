from typing import Any
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, HttpResponse as HttpResponse
from . import models
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class Index(LoginRequiredMixin, TemplateView):
    template_name = 'letsgym_app/index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        return context

    def get(self, request, type_request=None, *args, **kwargs):
            context = self.get_context_data(**kwargs)
            print(context)
            return self.render_to_response(context)

    def post(self, request):
        print(request.POST)
        return render(request, 'letsgym_app/test.html')

class Gym(TemplateView):
    template_name = 'test.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        return context

    def get(self, request, type_request=None, *args, **kwargs):
            context = self.get_context_data(**kwargs)
            print(context)
            return self.render_to_response(context)

    def post(self, request):
        pass
