from simplify.views import SimplifyTextView
from django.urls import path


urlpatterns = [
  path('simplify/', SimplifyTextView.as_view(), name='simplify')
]