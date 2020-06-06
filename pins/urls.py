from django.urls import path
from .views import PinListView, PinDetailView

urlpatterns = [
    path('', PinListView.as_view()),
    path('<int:pk>/', PinDetailView.as_view())
]