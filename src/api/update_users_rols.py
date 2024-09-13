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
        # Print the database URI for debugging
        print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
        users = User.query.all()
        print(f"Total users found: {len(users)}")  # Print the total number of users found
        for user in users:
            # Print user details for debugging
            print(f"Processing user: {user.username}, current role: {user.rol}")
            # Print the number of breweries associated with the user
            breweries_count = len(user.brewery) if user.brewery else 0
            print(f"User {user.username} has {breweries_count} breweries.")
            # Update the role based on the presence of associated breweries
            if breweries_count > 0:  # Check if the user has any associated breweries
                user.rol = "Fabricante"
                print(f"Updated role to Fabricante for user: {user.username}")
            else:
                user.rol = "Consumidor"
                print(f"Updated role to Consumidor for user: {user.username}")
            db.session.add(user)
            db.session.commit()  # Commit after each user update
        print("User roles updated successfully!")

if __name__ == "__main__":
    update_user_roles()