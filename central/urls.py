from django.conf.urls import url
from . import views
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

urlpatterns = [
	url(r'^qr/$', ensure_csrf_cookie(TemplateView.as_view(template_name='parking.html')), name='qr'),
	url(r'^sensorQR/$', ensure_csrf_cookie(TemplateView.as_view(template_name='parking.html')), name='sensorQR'),
	url(r'^areas/$', ensure_csrf_cookie(TemplateView.as_view(template_name='parking.html')), name='areas'),
	url(r'^area/(?P<pi>[0-9]+)/$', ensure_csrf_cookie(TemplateView.as_view(template_name='parking.html')), name='area'),
]
