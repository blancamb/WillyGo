
from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/users/', include('jwt_auth.urls')),
    path('api/clubs/', include('clubs.urls')),
    path('api/myclubs/<int:pk>/', include('trips.urls')),
    path('api/mytrips/', include('trips.urls')),
    path('api/mytrips/<int:pk>/', include('pins.urls')),
    path('api/pins/', include('pins.urls')),
    path('api/messages/', include('messsages.urls')),
    path('api/chats/', include('chats.urls')),
    path('api/requests/', include('requests.urls')),
    re_path(r'^.*$', index)
    ]
