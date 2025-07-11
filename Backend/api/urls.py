from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import forgot_password, reset_password

urlpatterns = [
<<<<<<< HEAD
    path('signup/', views.signup),
    path('signin/', views.signin),
    path('signout/', views.signout),
=======
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('openai/', openai_api_view, name='openai-api-view'),
>>>>>>> fc5caef7cf9f092632bebcecd0a2d337b5a3ed06
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/', reset_password, name='reset-password'),
<<<<<<< HEAD
]
=======
]
>>>>>>> fc5caef7cf9f092632bebcecd0a2d337b5a3ed06
