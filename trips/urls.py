from django.urls import path
from .views import ClubTripsListView, TripsListView, TripDetailView

urlpatterns = [
    path('', TripsListView.as_view()),
    path('trips/', ClubTripsListView.as_view()),
    path('<int:pk>/', TripDetailView.as_view()),
    path('trips/<int:pk>/', TripDetailView.as_view())
]