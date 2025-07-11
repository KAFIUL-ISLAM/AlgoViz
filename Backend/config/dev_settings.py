"""
Development toggle for reset password functionality
Set DEV_MODE = True to show tokens on website for testing
Set DEV_MODE = False for production email behavior
"""

DEV_MODE = True  # Change to False for production

# For development testing, you can override this in your environment
import os
DEV_MODE = os.getenv('RESET_PASSWORD_DEV_MODE', 'True').lower() == 'true'
