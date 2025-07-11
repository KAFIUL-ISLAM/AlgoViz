from django.urls import path
from .views import openai_api_view
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import forgot_password, reset_password

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('openai/', openai_api_view, name='openai-api-view'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/', reset_password, name='reset-password'),
]