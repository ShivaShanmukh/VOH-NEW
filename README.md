# ABC Active Breathing Course Website

A vanilla HTML/CSS/JavaScript website for the Active Breathing Course (ABC) program by Voices of Hope, developed in partnership with NHS Cambridge University Hospitals and Kingston University London.

## 🌟 Overview

The ABC Active Breathing Course is a 6-week program designed to help children develop better breathing techniques for improved focus, calm, and wellbeing. This website provides an interactive platform for participants to access weekly exercises and track their progress.

## 🚀 Features

### Core Functionality
- **6-Week Course Structure**: Individual pages for each week with unique exercises
- **Video-Based Exercises**: Embedded video tutorials for breathing techniques
- **Sequential Video Unlocking**: Videos unlock progressively as users complete previous exercises
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI**: Card-based navigation with color-coded week badges

### Recent Updates (February 2026)
- ✅ **Logo Update**: Replaced Cambridge University logo with NHS Cambridge University Hospitals logo
- ✅ **Donate Button**: Updated to link directly to VoH donation page (opens in new tab)
- ✅ **Social Media Icons**: Fixed footer icons and added clickable links
- ✅ **Week Navigation**: Implemented card-based "Continue Your Journey" design across all week pages
- ✅ **Navigation Cleanup**: Removed "Enroll" option from navigation bar and footer
- ✅ **Footer Enhancement**: Changed "Site Visits" text color to white for better visibility

## 📁 Project Structure

```
VANILLA_HANDOVER/
├── index.html              # Homepage with course overview
├── week-1.html            # Week 1: Basic breathing techniques
├── week-2.html            # Week 2: Deeper techniques
├── week-3.html            # Week 3: Advanced breathing patterns
├── week-4.html            # Week 4: Rhythmic breathing exercises
├── week-5.html            # Week 5: Powerful breathing techniques
├── week-6.html            # Week 6: Breathing mastery
├── style.css              # Main stylesheet
├── script.js              # Core JavaScript functionality
├── video-lock.js          # Sequential video unlocking logic
└── assets/
    ├── images/            # Logo, badges, and UI assets
    └── videos/            # Exercise video files
```

## 🎨 Design Features

### Color Scheme
Each week has a unique color theme:
- **Week 1**: Blue - Calm and focused
- **Week 2**: Teal - Energy and control
- **Week 3**: Pink - Balance and confidence
- **Week 4**: Yellow - Rhythm and synchronization
- **Week 5**: Orange - Power and clarity
- **Week 6**: Beige - Mastery and completion

### Navigation
- **Header**: HOME | FIND OUT MORE | CONTACT US | DONATE
- **Week Cards**: Individual cards with badges, descriptions, and "VIEW EXERCISES" buttons
- **Footer**: Newsletter signup, social media links, contact information

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for structure
- **CSS3**: Custom styling with Tailwind CSS via CDN
- **Vanilla JavaScript**: No frameworks - pure JS for functionality
- **Google Fonts**: Bebas Neue, Lato, Oswald

## 🚦 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for local development server)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShivaShanmukh/VOH-NEW.git
   cd VANILLA_HANDOVER
   ```

2. **Start local server**
   ```bash
   npx -y live-server --port=3000
   ```

3. **Open in browser**
   Navigate to `http://localhost:3000`

## 📝 Key Functionality

### Video Locking System
- Videos unlock sequentially as users complete previous exercises
- Progress is tracked using localStorage
- Prevents skipping ahead to maintain course structure

### Modal System
- Contact form modal
- Newsletter signup
- Smooth animations and transitions

### Responsive Breakpoints
- Desktop: > 768px (3-column grid)
- Tablet: 768px (2-column grid)
- Mobile: < 768px (single column, stacked layout)

## 🤝 Partners

- **Voices of Hope**: Course provider and charity organization
- **NHS Cambridge University Hospitals**: Healthcare partner
- **Kingston University London**: Academic partner

## 📞 Contact

- **Email**: info@voh.org.uk
- **Address**: 161A Clarence Street, Kingston-Upon-Thames, Surrey KT1 1QT
- **Charity Registration**: UK Charity Commission 1187454

## 🔗 Links

- **Donate**: [https://www.voh.org.uk/appeal/donate/](https://www.voh.org.uk/appeal/donate/)
- **Facebook**: [https://www.facebook.com/voicesofhope](https://www.facebook.com/voicesofhope)
- **Twitter**: [https://twitter.com/voicesofhope](https://twitter.com/voicesofhope)
- **Instagram**: [https://www.instagram.com/voicesofhope](https://www.instagram.com/voicesofhope)
- **YouTube**: [https://www.youtube.com/voicesofhope](https://www.youtube.com/voicesofhope)

## 📄 License

Copyright 2026 Voices of Hope. All rights reserved.

## 🙏 Acknowledgments

Special thanks to all partners and contributors who made this breathing course accessible to children and families.

---

**Every Breath Counts** - Your child's journey to better focus, calm, and wellbeing starts here.
