from django.conf.urls import url
from . import views
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

urlpatterns = [
	url(r'^qr/$', ensure_csrf_cookie(TemplateView.as_view(template_name='qr.html')), name='qr'),
]
