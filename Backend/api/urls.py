from django.urls import path
from .views import openai_api_view
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
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]



urlpatterns = [

    path('signup/', views.signup),
=======
   path('signup/', views.signup),
>>>>>>> 6589919014a48e9ea1da4f459883ac7b17128838
    path('signin/', views.signin),
    path('signout/', views.signout),
    path('openai/', openai_api_view, name='openai-api-view'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/', reset_password, name='reset-password'),


]