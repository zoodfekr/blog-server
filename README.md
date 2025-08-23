# Blog Server Node.js TypeScript

A Node.js server for blog management with user authentication and file upload capabilities.

## Features

- User registration and authentication
- File upload (avatar images)
- User management (CRUD operations)
- Optional field updates for user editing
- Automatic old avatar deletion when new one is uploaded

## API Endpoints

### Users

- `GET /users` - Get all users
- `POST /users/adduser` - Register new user
- `GET /users/user/:username` - Get user by username
- `PUT /users/user/:username` - Update user by username
- `DELETE /users/user/:username` - Delete user by username

### User Update Features

The user update endpoint (`PUT /users/user/:username`) now supports:

- **Optional Fields**: All fields (username, email, password, avatar) are optional
- **Preserve Previous Values**: If a field is not provided, the previous value is kept
- **Automatic Avatar Management**: When a new avatar is uploaded, the old one is automatically deleted
- **Validation**: Only provided fields are validated and updated

#### Update Examples

1. **Update only email:**
   ```bash
   PUT /users/user/testuser
   Content-Type: application/x-www-form-urlencoded
   
   email=newemail@example.com
   ```

2. **Update username and password:**
   ```bash
   PUT /users/user/testuser
   Content-Type: application/x-www-form-urlencoded
   
   username=newusername&password=newpassword123
   ```

3. **Update with new avatar:**
   ```bash
   PUT /users/user/testuser
   Content-Type: multipart/form-data
   
   avatar=<file>&email=newemail@example.com
   ```

## Test Pages

- `/test-registration` - Test user registration
- `/test-update` - Test user updates with optional fields

## File Structure

```
blog-server-nodejs-ts/
├── controllers/          # Request handlers
├── models/              # Database models
├── routes/              # API routes
├── validation/          # Input validation schemas
├── config/              # Configuration files
├── utils/               # Utility functions
├── public/              # Static files and uploads
└── views/               # HTML test pages
```

## Dependencies

- Express.js - Web framework
- Mongoose - MongoDB ODM
- Multer - File upload middleware
- Yup - Input validation
- bcrypt - Password hashing
- Winston - Logging

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure database connection in `config/db.js`
4. Start the server: `npm start`

## Usage

1. Start the server
2. Access test pages at `/test-registration` and `/test-update`
3. Use the API endpoints for programmatic access

## Notes

- All file uploads are stored in `public/files/`
- Old avatar files are automatically deleted when new ones are uploaded
- Validation ensures data integrity while allowing partial updates

