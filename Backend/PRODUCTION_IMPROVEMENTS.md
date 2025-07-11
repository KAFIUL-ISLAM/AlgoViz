# Production Improvements for Reset Password

## Security Enhancements

1. **Email Integration**
   ```python
   # In forgot_password view, replace return with:
   send_mail(
       'Password Reset',
       f'Your reset token is: {token}',
       settings.DEFAULT_FROM_EMAIL,
       [email],
       fail_silently=False,
   )
   return Response({"message": "Reset instructions sent to your email"})
   ```

2. **Rate Limiting**
   ```python
   # Add to views.py
   from django.core.cache import cache
   from django.utils import timezone
   
   # In forgot_password view, add:
   rate_limit_key = f"reset_attempts_{request.META.get('REMOTE_ADDR')}"
   attempts = cache.get(rate_limit_key, 0)
   if attempts >= 5:
       return Response({"error": "Too many requests. Try again later."}, 
                      status=status.HTTP_429_TOO_MANY_REQUESTS)
   cache.set(rate_limit_key, attempts + 1, timeout=3600)  # 1 hour
   ```

3. **Token Storage in Database**
   ```python
   # Create a PasswordResetToken model for better persistence
   class PasswordResetToken(models.Model):
       user = models.ForeignKey(User, on_delete=models.CASCADE)
       token = models.CharField(max_length=100, unique=True)
       created_at = models.DateTimeField(auto_now_add=True)
       expires_at = models.DateTimeField()
       used = models.BooleanField(default=False)
   ```

## Frontend Improvements

1. **Environment Variables**
   ```javascript
   // Replace hardcoded URL with:
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
   ```

2. **Better Error Handling**
   ```javascript
   // Add network error detection:
   catch (err) {
     if (err.name === 'TypeError' && err.message.includes('fetch')) {
       setError("Cannot connect to server. Please try again later.");
     } else {
       setError("Network error: " + err.message);
     }
   }
   ```
