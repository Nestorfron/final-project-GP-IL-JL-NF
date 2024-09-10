import sys
import os

# Add the src directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

# Print the current Python path for debugging
print("Current Python path:", sys.path)

try:
    from api import db
    from api.models import User
    from api import create_app  # Import the create_app function to set up the Flask app
    print("Successfully imported 'api' package and 'User' model.")
except ModuleNotFoundError as e:
    print(f"Error: {e}")

def update_user_roles():
    app = create_app()  # Create the Flask app
    with app.app_context():  # Set up the application context
        users = User.query.all()
        for user in users:
            # Update the role based on your new logic
            if user.brewery:  # Assuming a user with a brewery is a brewer
                user.rol = "Fabricante"
            else:
                user.rol = "Consumidor"
            db.session.add(user)
        db.session.commit()

if __name__ == "__main__":
    update_user_roles()
    print("User roles updated successfully!")