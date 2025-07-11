#!/usr/bin/env python3
"""
Script to update existing users with email addresses
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

def update_user_emails():
    """Update users that don't have emails"""
    print("🔧 Updating user emails...")
    print("=" * 50)
    
    users_without_email = User.objects.filter(email='')
    
    for user in users_without_email:
        # If username looks like an email, use it
        if '@' in user.username and '.' in user.username:
            user.email = user.username
            user.save()
            print(f"✅ Updated {user.username} - email set to: {user.email}")
        else:
            # Generate a default email
            user.email = f"{user.username}@example.com"
            user.save()
            print(f"✅ Updated {user.username} - email set to: {user.email}")
    
    print(f"\n📊 Updated {users_without_email.count()} users")

def list_users_with_emails():
    """List all users with their emails"""
    print("\n📋 Users with emails:")
    print("=" * 50)
    
    users = User.objects.exclude(email='')
    for user in users:
        print(f"👤 {user.username} → {user.email}")
    
    print(f"\nTotal users with emails: {users.count()}")

if __name__ == "__main__":
    print("📧 Email Update Tool")
    print("=" * 50)
    
    update_user_emails()
    list_users_with_emails()
    
    print("\n" + "=" * 50)
    print("✅ Now you can use reset password with these emails:")
    users_with_emails = User.objects.exclude(email='')
    for user in users_with_emails[:5]:  # Show first 5
        print(f"   📧 {user.email}")
