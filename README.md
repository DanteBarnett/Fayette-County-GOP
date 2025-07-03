# Fayette County Republican Party Website

A modern, accessible, and feature-rich website for the Fayette County Republican Party built with Django, Wagtail CMS, and cutting-edge web technologies.

## 🌟 Features

### Design & Visual Polish
- **Patriotic Color Scheme**: Rich navy blue (#1e3a8a), bright white (#ffffff), and accent red (#dc2626)
- **Typography**: Merriweather serif for headlines, Inter sans-serif for body text
- **Modern UI**: Clean institutional style inspired by WhiteHouse.gov with Gretchen Whitmer visual polish
- **WCAG-AA Accessible**: Full compliance with accessibility standards

### Animations & Interactions
- **Hero Section**: GSAP SplitText-style word drop-in animations with 3D rotation
- **Sticky CTAs**: Floating action pills that appear after 400px scroll
- **Loading Screen**: 1-second logo reveal with CSS spinner
- **Scroll Animations**: Parallax effects and scroll-triggered animations
- **Card Interactions**: 3D flip cards for issues section
- **Responsive Grid**: Alternating slide-in animations for event cards

### Technical Stack
- **Backend**: Django 5.0 + Wagtail 6.0 CMS
- **Frontend**: Modern vanilla JavaScript with GSAP animations
- **Styling**: Tailwind CSS 3.4 with custom patriotic theme
- **Performance**: Service Worker with caching, lazy loading, image optimization
- **Accessibility**: Screen reader support, keyboard navigation, focus management

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+ (for Tailwind CSS build process)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fayette-county-gop
```

2. **Set up Python environment**
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Run database migrations**
```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

6. **Create a superuser**
```bash
python manage.py createsuperuser
```

7. **Start the development server**
```bash
python manage.py runserver
```

Visit `http://localhost:8000` to see the website and `http://localhost:8000/admin` for the Wagtail admin.

## 🔧 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (Production)
DATABASE_URL=postgres://user:password@localhost:5432/fayette_gop

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=noreply@fayettecountygop.org

# Social Media
FACEBOOK_URL=https://facebook.com/fayettecountygop
TWITTER_URL=https://twitter.com/fayettecountygop
INSTAGRAM_URL=https://instagram.com/fayettecountygop
YOUTUBE_URL=https://youtube.com/c/fayettecountygop

# Analytics
GA_ID=G-XXXXXXXXXX

# Mailchimp (Newsletter)
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_AUDIENCE_ID=your-audience-id

# AWS S3 (Production Media)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=fayette-gop-media
AWS_S3_REGION_NAME=us-east-1

# Security (Production)
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
```

## 📁 Project Structure

```
fayette-county-gop/
├── fayette_gop/           # Django project settings
│   ├── settings.py        # Main settings file
│   ├── urls.py           # URL configuration
│   └── wsgi.py           # WSGI configuration
├── home/                  # Main Wagtail app
│   ├── models.py         # Page models and content types
│   ├── templates/        # Wagtail page templates
│   └── migrations/       # Database migrations
├── templates/             # Global templates
│   ├── base.html         # Base template with loading screen
│   └── partials/         # Reusable template components
├── static/               # Static files
│   ├── css/             # Compiled CSS
│   ├── js/              # JavaScript files
│   ├── img/             # Images and icons
│   └── dist/            # Built assets
├── frontend/             # Frontend build process
│   ├── src/             # Source files
│   ├── package.json     # Node.js dependencies
│   └── tailwind.config.js
├── requirements.txt      # Python dependencies
└── manage.py            # Django management script
```

## 🎨 Customizing the Design

### Color Scheme
The patriotic theme is defined in `tailwind.config.js`:

```javascript
colors: {
  navy: {
    50: '#eef2ff',
    // ... full navy scale
    950: '#172554'
  },
  patriot: {
    red: '#dc2626',
    white: '#ffffff',
    blue: '#1e3a8a'
  }
}
```

### Typography
- **Headlines**: Merriweather serif font (`font-serif`)
- **Body Text**: Inter sans-serif font (`font-sans`)
- **Sizing**: Responsive text scales from mobile to desktop

### Animations
GSAP animations are initialized in `static/js/main.js`:
- Hero text split and drop-in effects
- Scroll-triggered section animations
- Parallax background effects
- Card hover and flip interactions

## 🏗️ Content Management

### Page Types

1. **Home Page** (`HomePage`)
   - Hero section with title, subtitle, and CTAs
   - Mission statement
   - Dynamic content blocks

2. **Standard Page** (`StandardPage`)
   - Flexible content with StreamField
   - Rich text, images, and custom blocks

3. **Event Pages** (`EventPage`, `EventIndexPage`)
   - Event details with dates, locations
   - Registration links and flyers
   - Responsive grid layout

4. **Blog Posts** (`BlogPostPage`, `BlogIndexPage`)
   - News and updates
   - Author attribution and cover images

5. **Leadership Page** (`LeadershipPage`)
   - Team member profiles
   - Photos and biographies

6. **Gallery Page** (`GalleryPage`)
   - Masonry layout for photos/videos
   - Lightbox functionality

### Content Blocks
StreamField blocks available for flexible content:
- Rich text paragraphs
- Images with captions
- Call-to-action buttons
- Embedded videos
- Custom HTML blocks

## 🚀 Deployment

### AWS Amplify (Recommended)

1. **Connect your repository**
```bash
# Push to GitHub/GitLab
git push origin main
```

2. **Configure build settings**
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - pip install -r requirements.txt
        - cd frontend && npm install
    build:
      commands:
        - python manage.py collectstatic --noinput
        - cd frontend && npm run build
  artifacts:
    baseDirectory: static
    files:
      - '**/*'
```

3. **Environment variables**
Set all production environment variables in the Amplify console.

### AWS S3 + CloudFront

1. **Build static assets**
```bash
python manage.py collectstatic
cd frontend && npm run build
```

2. **Upload to S3**
```bash
aws s3 sync static/ s3://your-bucket-name/ --delete
```

3. **Configure CloudFront**
- Set up distribution with S3 origin
- Configure custom error pages
- Enable compression and caching

### Docker Deployment

```dockerfile
# Dockerfile included for container deployment
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "fayette_gop.wsgi:application"]
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test home

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### Test Categories
- **Unit Tests**: Model methods and utility functions
- **Integration Tests**: Page rendering and form submission
- **Accessibility Tests**: WCAG compliance verification
- **Performance Tests**: Page load times and animation smoothness

## 📊 Performance Optimization

### Lighthouse Scores
Target metrics for >= 95 score:
- **Performance**: Optimized images, lazy loading, service worker caching
- **Accessibility**: WCAG-AA compliance, proper ARIA labels
- **Best Practices**: Security headers, HTTPS, service worker
- **SEO**: Meta tags, structured data, sitemap

### Caching Strategy
- **Service Worker**: Precache static assets, runtime API caching
- **CDN**: CloudFront for global asset distribution
- **Database**: Redis for session and page caching (production)

## 🛠️ Development Workflow

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt
cd frontend && npm install

# Start development server
python manage.py runserver

# Watch for Tailwind changes
cd frontend && npm run dev
```

### Code Quality
- **Pre-commit hooks**: Black formatting, flake8 linting
- **Type checking**: mypy for static analysis
- **Security**: bandit for vulnerability scanning

```bash
# Set up pre-commit hooks
pre-commit install

# Run linting
flake8 .
black .
mypy .
```

## 📚 Documentation

### Wagtail Admin Guide
- Content editing tutorials
- SEO optimization tips
- Image management best practices

### API Documentation
- Wagtail API endpoints for headless usage
- Custom API views for mobile apps
- GraphQL schema (if enabled)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Run the test suite: `python manage.py test`
5. Submit a pull request

### Coding Standards
- Follow PEP 8 for Python code
- Use Prettier for JavaScript formatting
- Write descriptive commit messages
- Include tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions or issues:
- **Technical Issues**: Create a GitHub issue
- **Content Questions**: Contact the site administrator
- **Feature Requests**: Use the GitHub discussions

---

**Built with ❤️ for Fayette County Republicans**

*Defending conservative values through modern technology*
