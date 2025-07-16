# Deployment Guide

This guide covers deploying PrivacyGuard to various platforms.

## 🚀 Replit Deployment (Recommended)

### Automatic Deployment
1. Import the GitHub repository to Replit
2. Replit will automatically detect the configuration
3. Set up environment variables in Replit Secrets
4. Run `npm install` to install dependencies
5. Start with `npm run dev`

### Environment Variables
Configure these in Replit Secrets:
- `DATABASE_URL`: Your PostgreSQL connection string
- `SESSION_SECRET`: Random string for session encryption
- `REPL_ID`: Your Replit app ID
- `REPLIT_DOMAINS`: Your Replit domain (e.g., `your-app.replit.app`)

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/privacyguard
      - SESSION_SECRET=your-secret-key
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=privacyguard
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## ☁️ Cloud Deployment

### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables in Netlify dashboard

### Railway
1. Connect GitHub repository
2. Railway will auto-detect Node.js project
3. Set environment variables
4. Deploy with automatic builds

## 🗄️ Database Setup

### Neon (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create new database
3. Copy connection string to `DATABASE_URL`
4. Run `npm run db:push` to create tables

### PostgreSQL Self-Hosted
1. Install PostgreSQL
2. Create database: `createdb privacyguard`
3. Set DATABASE_URL environment variable
4. Run `npm run db:push` to create tables

## 🔐 Security Configuration

### Production Environment
- Use strong `SESSION_SECRET` (minimum 32 characters)
- Enable SSL in production
- Set secure cookie flags
- Configure CORS properly
- Use environment-specific database URLs

### Environment Variables
```bash
# Production
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/db
SESSION_SECRET=your-super-secret-key-here
REPL_ID=your-replit-app-id
REPLIT_DOMAINS=your-domain.com,www.your-domain.com

# Development
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/privacyguard_dev
SESSION_SECRET=dev-secret-key
REPL_ID=dev-replit-id
REPLIT_DOMAINS=localhost:5000
```

## 🚦 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Build process completes successfully
- [ ] All tests pass
- [ ] SSL/TLS configured
- [ ] Error logging enabled
- [ ] Backup strategy in place
- [ ] Security headers configured
- [ ] CORS policy set
- [ ] Rate limiting enabled

## 📊 Monitoring

### Health Checks
The application includes built-in health check endpoints:
- `GET /health` - Basic health check
- `GET /api/health` - Database connectivity check

### Logging
- Application logs to console
- Database queries logged in development
- Error tracking recommended (Sentry, etc.)

### Performance Monitoring
- Monitor response times
- Track database query performance
- Monitor memory usage
- Set up alerts for errors

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to production
      run: |
        # Add your deployment commands here
        echo "Deploying to production..."
```

## 🛠️ Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify DATABASE_URL format
- Check network connectivity
- Ensure database exists
- Verify credentials

**Authentication Issues**
- Check REPL_ID and REPLIT_DOMAINS
- Verify Replit Auth configuration
- Ensure session secret is set
- Check cookie settings

**Build Failures**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check TypeScript configuration

**Performance Issues**
- Monitor database query performance
- Check memory usage
- Optimize Three.js rendering
- Enable compression middleware

### Support
For deployment issues, contact:
- Email: jasonclarkagain@gmail.com
- GitHub Issues: [Report deployment problems](https://github.com/jasonclarkagain/privacyguard/issues)