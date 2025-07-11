#!/usr/bin/env python3
"""
Script to check users in the database and test reset password functionality
"""
import os
import django
import sys

# Add the project directory to the Python path
sys.path.append('C:/Users/user/Desktop/Nouveau dossier/AlgoViz/Backend')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

def list_users():
    """List all users in the database"""
    print("📋 Current Users in Database:")
    print("=" * 50)
    
    users = User.objects.all()
    if not users:
        print("❌ No users found in database")
        return
    
    for user in users:
        print(f"👤 Username: {user.username}")
        print(f"   Email: {user.email}")
        print(f"   Is Active: {user.is_active}")
        print(f"   Date Joined: {user.date_joined}")
        print("-" * 30)
    
    print(f"Total users: {users.count()}")

def create_test_user():
    """Create a test user for testing reset password"""
    email = "test@example.com"
    username = "testuser"
    password = "password123"
    
    if User.objects.filter(email=email).exists():
        print(f"✅ Test user with email {email} already exists")
        return
    
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    print(f"✅ Created test user: {email} / {username}")
    print(f"   Password: {password}")

if __name__ == "__main__":
    print("🔍 Database User Check Tool")
    print("=" * 50)
    
    list_users()
    
    print("\n" + "=" * 50)
    create_test_user()
    
    print("\n" + "=" * 50)
    print("📝 To test reset password:")
    print("1. Use email: test@example.com")
    print("2. Or register a new user through the frontend")
    print("3. Make sure to include email when registering")
