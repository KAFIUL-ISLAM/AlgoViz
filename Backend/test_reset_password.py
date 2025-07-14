#!/usr/bin/env python3
"""
Test script for reset password functionality
"""
import requests
import json

BASE_URL = "https://algoviz-backend.up.railway.app/api"

def test_forgot_password():
    """Test the forgot password endpoint"""
    print("Testing forgot password endpoint...")
    
    # Test with valid email
    response = requests.post(
        f"{BASE_URL}/forgot-password/",
        json={"email": "admin@example.com"},
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success: {data['message']}")
        print(f"Reset token: {data['reset_token']}")
        return data['reset_token']
    else:
        print(f"❌ Error: {response.text}")
        return None

def test_reset_password(token):
    """Test the reset password endpoint"""
    print("\nTesting reset password endpoint...")
    
    response = requests.post(
        f"{BASE_URL}/reset-password/",
        json={"token": token, "new_password": "newtestpassword123"},
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success: {data['message']}")
        return True
    else:
        print(f"❌ Error: {response.text}")
        return False

def test_invalid_email():
    """Test forgot password with invalid email"""
    print("\nTesting forgot password with invalid email...")
    
    response = requests.post(
        f"{BASE_URL}/forgot-password/",
        json={"email": "nonexistent@example.com"},
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 404:
        data = response.json()
        print(f"✅ Expected error: {data['error']}")
    else:
        print(f"❌ Unexpected response: {response.text}")

def test_invalid_token():
    """Test reset password with invalid token"""
    print("\nTesting reset password with invalid token...")
    
    response = requests.post(
        f"{BASE_URL}/reset-password/",
        json={"token": "invalid_token", "new_password": "password123"},
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 400:
        data = response.json()
        print(f"✅ Expected error: {data['error']}")
    else:
        print(f"❌ Unexpected response: {response.text}")

if __name__ == "__main__":
    print("🧪 Testing Reset Password Functionality")
    print("=" * 50)
    
    try:
        # Test valid flow
        token = test_forgot_password()
        if token:
            test_reset_password(token)
        
        # Test error cases
        test_invalid_email()
        test_invalid_token()
        
        print("\n" + "=" * 50)
        print("🎉 All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to Django server")
        print("Make sure the Django server is running on localhost:8000")
