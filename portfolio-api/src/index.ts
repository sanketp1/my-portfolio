import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env file
config({ path: path.resolve(process.cwd(), '.env') });

// Debug: Check if environment variables are loaded
console.log('🔍 Main index.ts - Environment check:');
console.log('DATABASE_URL loaded:', process.env.DATABASE_URL ? 'YES' : 'NO');
console.log('Current working directory:', process.cwd());
console.log('Env file path:', path.resolve(process.cwd(), '.env'));

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './utils/db';
import apiRoutes from './routes';
import { apiLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/logger';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {seed} from './seed';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : '*';

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "https://unpkg.com"],
      },
    },
  })
);
app.use(requestLogger);
app.use(apiLimiter as any);
app.use('/api', apiRoutes);

// Swagger JSDoc setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'A comprehensive portfolio API with authentication, content management, and analytics',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Portfolio API Documentation',
}));

// Serve OpenAPI spec as JSON
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' });
});

(async () => {
  await connectDB();
  
  // // Seed the database with initial data
  // try {
  //   await seed();
  //   console.log('✅ Database seeded successfully');
  // } catch (error) {
  //   console.log('⚠️  Database seeding failed:', error);
  // }

  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    console.log(`🔗 OpenAPI spec available at http://localhost:${PORT}/api-docs.json`);
  });
})(); 