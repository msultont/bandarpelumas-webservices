# Car Service Landing Page - React

A modern, responsive React landing page for a car service website, inspired by bengkelpag.com layout.

## Features

- ✨ Responsive design that works on all devices
- 🚀 Fast performance with Vite
- 🎨 Modern and clean UI
- 📱 Mobile-first approach
- ⚡ Smooth animations and transitions
- 🔧 Easy to customize

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Hero.jsx            # Hero section with CTA
│   ├── Stats.jsx           # Statistics showcase
│   ├── Services.jsx        # Services offered
│   ├── Features.jsx        # Why choose us
│   ├── Testimonials.jsx    # Customer reviews
│   ├── Blog.jsx            # Latest articles
│   └── Footer.jsx          # Footer with links
├── App.jsx                 # Main app component
├── index.css              # Global styles
└── main.jsx               # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Update Company Information

Edit the footer and header components to update:

- Company name and contact details
- Social media links
- Navigation links

### Modify Services

Edit `src/components/Services.jsx` to change:

- Service titles and descriptions
- Icons (using emoji or custom icons)
- Number of services

### Change Colors

The primary color is red (#dc2626). Update this across:

- `src/components/Header.css`
- `src/components/Hero.css`
- `src/components/Services.css`
- And other component files

### Add Images

Create an `images` folder in `src/` and import images in components:

```jsx
import carImage from "../images/car.jpg";
<img src={carImage} alt="description" />;
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool
- **CSS3** - Styling with modern features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please contact: info@carservice.com
