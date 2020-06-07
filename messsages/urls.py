from django.urls import path
from .views import MessageListView, MessageDetailView

urlpatterns = [
    path('', MessageListView.as_view()),
    path('<int:pk>/', MessageDetailView.as_view())
]