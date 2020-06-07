from django.urls import path
from .views import ChatListView, ChatDetailView

urlpatterns = [
    path('', ChatListView.as_view()),
    path('<int:pk>/', ChatDetailView.as_view())
]