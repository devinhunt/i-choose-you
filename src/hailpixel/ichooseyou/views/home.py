# -*- coding: utf-8 -*-

from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

def home(request):
    data = {}
        
    return render_to_response("home/home.html", data, context_instance=RequestContext(request))

from django.conf.urls.defaults import *

urlpatterns = patterns('',
    url(r'^$', home, name="home"),
)
