# Django E-commerce Backend

## Setup Instructions

1. Clone the repository
   git clone https://github.com/<your-username>/django-ecommerce-task.git

2. Go to backend folder
   cd backend

3. Create virtual environment
   python -m venv venv

4. Activate virtual environment
   source venv/Scripts/activate

5. Install dependencies
   pip install -r requirements.txt

6. Setup environment variables
   cp example.env .env

7. Run migrations
   python manage.py migrate

8. Create superuser
   python manage.py createsuperuser

9. Run server
   python manage.py runserver

## API Documentation
Swagger: http://127.0.0.1:8000/swagger/

## Features
- JWT Authentication
- Product Management
- Cart Functionality
- Order Management
# django-ecommerce-task
