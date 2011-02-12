from django.conf.urls.defaults import *
from django.contrib import admin
from django.conf import settings

admin.autodiscover()

urlpatterns = patterns('',
    # api

    # html webpages
    (r'^', include('hailpixel.ichooseyou.views.home')),
    
    # administration 
    (r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/Users/devin/Code/ichooseyou/media/'}),
    )