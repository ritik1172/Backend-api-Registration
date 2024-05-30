# Express Server for User Authentication

This Express.js server provides user authentication functionalities using JWT, bcrypt for password hashing, forgotten password feature, and form validation.

## Setup

1. **Clone the Repository:**

2. **Install Dependencies:**


3. **Environment Variables:**
Create a `.env` file in the root directory and add the following variables:
The server will run on http://localhost:3000 by default. Adjust the `PORT` variable in the `.env` file if needed.


4. **Start the Server:**

## Functionality

### JWT Authentication

- Route: `/auth/login`
- Method: POST
- Parameters: email, password
- Description: Handles user login, generates JWT token on successful authentication, and sets it as a cookie.

### Bcrypt Password Hashing

- Route: `/auth/signup`
- Method: POST
- Parameters: username, email, password
- Description: Registers a new user, hashes the password using bcrypt, and saves user data in the database.

### Forgotten Password

- Route: `/auth/forgot-password`
- Method: POST
- Parameters: email
- Description: Initiates the password reset process, sends a reset link with a JWT token to the user's email.

- Route: `/auth/reset-password/:token`
- Method: POST
- Parameters: token, password
- Description: Handles password reset using the JWT token received from the reset link.

### Form Validation

- Form validation is implemented in the frontend to ensure proper input handling before sending requests to the server.
- Client-side validation checks for empty fields, email format, password length, etc.

## Dependencies

- Express.js: Web framework for Node.js
- Mongoose: MongoDB object modeling tool
- bcryptjs: Library for hashing passwords
- jsonwebtoken (JWT): Authentication via JSON Web Tokens
- nodemailer: Email sending library for sending reset password emails
- dotenv: Loads environment variables from a .env file

## Contributing

Feel free to contribute by submitting pull requests or raising issues for any bugs or improvements.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
