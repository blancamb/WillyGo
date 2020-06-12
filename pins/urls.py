from django.urls import path
from .views import PinListView, PinDetailView, TripPinsListView

urlpatterns = [
    path('', PinListView.as_view()),
    path('<int:pk>/', PinDetailView.as_view()),
    path('pins/', TripPinsListView.as_view())
]