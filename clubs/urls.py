from django.urls import path
from .views import MyClubsListView, ClubDetailView, ClubListView

urlpatterns = [
    path('', ClubListView.as_view()),
    path('myclubs/', MyClubsListView.as_view()),
    path('<int:pk>/', ClubDetailView.as_view())
]