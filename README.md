# SHE IS AI - Global Welcome Guide Website

A fully responsive, accessible onboarding landing page for SHE IS AI, built with HTML, CSS, and vanilla JavaScript.

## 📁 Project Structure

```
sheisai-welcome/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Create this folder for images/logos
    └── images/
```

## 🚀 Quick Start

1. **Download all files** into a single folder
2. **Open `index.html`** in your browser
3. That's it! The site is ready to use

## 📝 Customization Guide

### Adding Your Logo

Replace the logo placeholders (2 locations):
1. **Navigation logo** (line ~20 in index.html)
2. **Footer logo** (line ~520 in index.html)

```html
<!-- Replace this: -->
<div class="logo-placeholder">LOGO PLACEHOLDER</div>

<!-- With this: -->
<img src="assets/images/sheisai-logo.png" alt="SHE IS AI Logo" style="height: 50px;">
```

### Adding Videos

Replace video placeholders (2 locations):
1. **Hero video** (line ~52 in index.html)
2. **Impact video** (line ~215 in index.html)

```html
<!-- Replace the video-placeholder div with: -->
<div style="max-width: 900px; margin: 3rem auto;">
    <iframe 
        width="100%" 
        height="506" 
        src="YOUR_VIDEO_URL" 
        title="Welcome Video"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>
```

### Adding Team Photos

Replace photo placeholders in the Team section (line ~380+ in index.html):

```html
<!-- Replace this: -->
<div class="team-photo">Photo<br>Placeholder</div>

<!-- With this: -->
<img src="assets/images/amanda-jeffs.jpg" alt="Amanda Jeffs" class="team-photo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
```

### Adding Your Name to Footer

Edit line ~540 in index.html:

```html
<p style="opacity:0.8;">Site Created By: [Your Name Here]</p>
```

Change to:

```html
<p style="opacity:0.8;">Site Created By: Your Actual Name</p>
```

### Integrating the SIA Chatbot (OpenAI Assistant)

The chatbot button is already in place. To integrate your OpenAI Assistant:

1. Create a new file called `chatbot.js`
2. Add your OpenAI integration code:

```javascript
// chatbot.js
async function initializeChatbot() {
    // Your OpenAI Assistant API configuration
    const ASSISTANT_ID = 'your-assistant-id';
    const API_KEY = 'your-api-key';
    
    // Initialize chatbot logic here
    // Handle messages, display responses, etc.
}
```

3. Include it in index.html:

```html
<script src="chatbot.js"></script>
```

## 🎨 Brand Colors Used

- Primary Red: `#DD292F`
- Light Red: `#FF5050`
- Lighter Red: `#FF8585`
- Beige: `#EDDBD5`
- Gray: `#D9D9D9`
- Black: `#000000`
- White: `#FFFFFF`
- Teal: `#45FFCA`
- Blue: `#114E8E`

## ♿ Accessibility Features

✅ WCAG 2.1 AA Compliant
✅ Keyboard navigation support
✅ Screen reader friendly
✅ High contrast ratios (4.5:1 minimum)
✅ Focus indicators
✅ Semantic HTML
✅ ARIA labels where needed
✅ Reduced motion support
✅ Responsive design

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px
- Small Mobile: < 480px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance Tips

1. **Optimize Images**: Compress all images before uploading
   - Use tools like TinyPNG or ImageOptim
   - Recommended formats: WebP for photos, SVG for logos

2. **Enable Caching**: Add these meta tags to `<head>`:

```html
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

3. **Minify Files** (for production):
   - CSS: Use cssnano or clean-css
   - JS: Use UglifyJS or Terser
   - HTML: Use html-minifier

## 🔗 Important Links to Update

Before going live, verify all these links in index.html work:

- [ ] Skool Community: https://www.skool.com/she-is-ai-community
- [ ] Brand Ambassadors: https://sheisai.ai/brand-ambassadors
- [ ] Submissions: https://sheisai.ai/submissions
- [ ] XPERT Agency: https://sheisai.squarespace.com/xpert-agency
- [ ] Events: https://sheisai.ai/events
- [ ] AI Fashion Awards: https://sheisai.ai/ai-fashion-awards
- [ ] Main Website: https://sheisai.ai/
- [ ] All email addresses (sheisai@sheisai.ai, etc.)
- [ ] All social media links (LinkedIn, Facebook, Instagram, YouTube, TikTok)

## 📧 Email Links

All email links use `mailto:` protocol. They will open the user's default email client.

## 🚨 Before Launch Checklist

- [ ] Replace all logo placeholders
- [ ] Add real videos or remove placeholders
- [ ] Add team member photos
- [ ] Update "Site Created By" with your name
- [ ] Test all navigation links
- [ ] Test all external links
- [ ] Test all email links
- [ ] Test on mobile devices
- [ ] Test with screen reader
- [ ] Test keyboard navigation
- [ ] Verify color contrast
- [ ] Check loading speed
- [ ] Test chatbot functionality (when integrated)
- [ ] Add meta description for SEO
- [ ] Add Open Graph tags for social sharing

## 🔐 Security Considerations

1. **HTTPS**: Ensure your hosting supports HTTPS
2. **Content Security Policy**: Add CSP headers
3. **API Keys**: Never expose API keys in frontend code
4. **Form Validation**: Add server-side validation for any forms
5. **CORS**: Configure properly if using external APIs

## 📈 SEO Optimization

Add these meta tags to `<head>` in index.html:

```html
<meta name="description" content="Join SHE IS AI - A global ecosystem empowering women and underrepresented voices in AI through education, community, and ethical innovation.">
<meta name="keywords" content="women in AI, ethical AI, AI education, AI community, diversity in tech">
<meta property="og:title" content="SHE IS AI - Global Welcome Guide">
<meta property="og:description" content="Helping women, underrepresented leaders and rising talent thrive in the age of AI.">
<meta property="og:image" content="https://yourdomain.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://yourdomain.com">
<meta name="twitter:card" content="summary_large_image">
```

## 🐛 Troubleshooting

### Issue: Navigation not smooth scrolling
**Solution**: Check if JavaScript is loading properly. View browser console for errors.

### Issue: Mobile menu not closing
**Solution**: Clear browser cache and reload page.

### Issue: Videos not displaying
**Solution**: Check video URL format and ensure HTTPS is used.

### Issue: Fonts not loading
**Solution**: Verify internet connection (fonts load from Google Fonts CDN).

## 📞 Support

For questions about **SHE IS AI**:
- Email: sheisai@sheisai.ai
- Website: https://sheisai.ai

For technical website issues:
- Check browser console for error messages
- Verify all files are in the same directory
- Ensure internet connection for external resources (fonts, icons)

## 📄 License

© 2025 SHE IS AI Magazine Ltd. All rights reserved.

## 🎉 Deployment

### Option 1: Simple Hosting (Netlify/Vercel)
1. Create account on Netlify or Vercel
2. Drag and drop your folder
3. Site is live!

### Option 2: Traditional Hosting (cPanel)
1. Upload all files via FTP
2. Ensure index.html is in root directory
3. Configure domain settings

### Option 3: GitHub Pages
1. Create GitHub repository
2. Push all files
3. Enable GitHub Pages in settings
4. Site will be live at username.github.io/repo-name

## 🔄 Updates & Maintenance

To update content:
1. Edit index.html directly (all content is there)
2. Save and upload to your hosting
3. Clear browser cache to see changes

To update styles:
1. Edit styles.css
2. Save and upload
3. Hard refresh browser (Ctrl+Shift+R)

---

**Built with ❤️ for SHE IS AI**

*Empowering women and underrepresented voices in the age of AI*