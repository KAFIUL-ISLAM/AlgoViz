from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import logout, authenticate
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.core.cache import cache
from django.core.mail import send_mail
from django.conf import settings
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signin(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def signout(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email__iexact=email)

        # Generate a random token
        token = get_random_string(length=32)

        # Store token temporarily (15 mins)
        cache.set(token, user.username, timeout=900)

        # Send token in response (or by email in production)
        return Response({
            "message": "Reset token generated.",
            "reset_token": token
        })
    except User.DoesNotExist:
        return Response({"error": "No account with this email"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def reset_password(request):
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    if not token or not new_password:
        return Response({"error": "Token and new password required"}, status=status.HTTP_400_BAD_REQUEST)

    username = cache.get(token)
    if not username:
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=username)
        user.set_password(new_password)
        user.save()
        cache.delete(token)
        return Response({"message": "Password has been reset successfully"})
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
