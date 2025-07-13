# Portfolio API

A robust backend API for portfolio management built with Express.js, TypeScript, MongoDB, and Cloudinary.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with admin middleware
- 📝 **Profile Management** - Complete profile CRUD with avatar upload
- 🎯 **Projects Management** - Projects with thumbnail uploads
- 📚 **Blog Management** - Blog posts with featured images
- 🏆 **Showcase Management** - Portfolio showcase items
- 💼 **Experience Management** - Work experience tracking
- 🛠️ **Skills Management** - Technical skills organization
- 📧 **Contact Management** - Message handling and email notifications
- 📊 **Analytics** - Basic analytics for portfolio insights
- 📄 **Resume Management** - PDF resume upload and download
- 🖼️ **File Uploads** - Cloudinary integration for images and documents
- 📖 **API Documentation** - Swagger/OpenAPI documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI
- **Validation**: Zod
- **Logging**: Winston
- **Email**: Nodemailer

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB database
- Cloudinary account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Other Commands
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build directory
npm run clean
```

## API Documentation

Once the server is running, you can access the API documentation at:
- **Swagger UI**: http://localhost:5000/api-docs
- **OpenAPI Spec**: http://localhost:5000/api-docs.json

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/profile` - Get admin profile
- `PUT /api/auth/profile` - Update admin profile

### Public Endpoints
- `GET /api/profile` - Get public profile
- `GET /api/profile/resume/download` - Download resume
- `GET /api/projects` - Get public projects
- `GET /api/blogs` - Get public blogs
- `GET /api/showcase` - Get public showcase items
- `GET /api/skills` - Get public skills
- `GET /api/experience` - Get public experience
- `POST /api/contact` - Send contact message

### Admin Endpoints (Require Authentication)
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update profile with avatar
- `POST /api/admin/profile/resume` - Upload resume
- `GET /api/admin/profile/resume/download` - Download resume (admin)

#### Projects Management
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create project with thumbnail
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/admin/projects/:id/thumbnail` - Upload project thumbnail

#### Blogs Management
- `GET /api/admin/blogs` - Get all blogs
- `POST /api/admin/blogs` - Create blog with featured image
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog

#### Showcase Management
- `GET /api/admin/showcase` - Get all showcase items
- `POST /api/admin/showcase` - Create showcase item with thumbnail
- `PUT /api/admin/showcase/:id` - Update showcase item
- `DELETE /api/admin/showcase/:id` - Delete showcase item
- `POST /api/admin/showcase/:id/thumbnail` - Upload showcase thumbnail
- `POST /api/admin/showcase/:id/upload` - Upload showcase media

## File Upload Features

### Supported File Types
- **Images**: JPG, PNG, GIF, WebP
- **Documents**: PDF, DOC, DOCX
- **Videos**: MP4, MOV, AVI

### Upload Endpoints
- Profile avatar: `PUT /api/admin/profile`
- Project thumbnails: `POST /api/admin/projects/:id/thumbnail`
- Blog featured images: `POST /api/admin/blogs`
- Showcase thumbnails: `POST /api/admin/showcase/:id/thumbnail`
- Resume upload: `POST /api/admin/profile/resume`

## Security Features

- **Rate Limiting** - Prevents abuse
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Zod schema validation
- **Authentication** - JWT-based auth
- **Authorization** - Role-based access control

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | - |
| `EMAIL_HOST` | SMTP host | No | - |
| `EMAIL_PORT` | SMTP port | No | 587 |
| `EMAIL_USER` | SMTP username | No | - |
| `EMAIL_PASS` | SMTP password | No | - |

## Project Structure

```
src/
├── controllers/          # Route controllers
│   ├── admin/           # Admin controllers
│   └── ...              # Public controllers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API routes
│   ├── admin/           # Admin routes
│   └── ...              # Public routes
├── utils/               # Utility functions
└── index.ts             # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository or contact the maintainers. 