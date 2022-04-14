from django.urls import path
from auth.views import ChangePasswordView, LogoutAllView, LogoutView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


urlpatterns = [
  path('login/', TokenObtainPairView.as_view(), name='auth_login'),
  path('login/refresh/', TokenRefreshView.as_view(), name='auth_login_refresh'),
  path('register/', RegisterView.as_view(), name='auth_register'),
  path('change-password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
  path('logout/', LogoutView.as_view(), name='auth_logout'),
  path('logout-all/', LogoutAllView.as_view(), name='auth_logout_all')
]