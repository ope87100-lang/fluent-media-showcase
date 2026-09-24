# Fluent Media | 3D Interactive Portfolio & AI Growth Concierge

Modern, multi-page, responsive 3D interactive portfolio website for **Fluent Media**, founded by certified strategist & Academic Gold Medalist **Zubair Jamil (Zubair Ansari)**.

---

## 🌟 Key Highlights & Features

1. **Modern iOS 17 Design System**:
   - Frosted glassmorphism (`backdrop-filter: blur(28px)`), blur boxes, hairline luminous borders, vibrant Apple accent glows.
   - Clean typography using Google Fonts: *Plus Jakarta Sans* and *Space Grotesk*.

2. **3D Interactive WebGL Experience (Three.js)**:
   - Dynamic 3D particle constellation with mouse gravity repulsion and camera lerping.
   - Floating wireframe 3D geometric meshes (torus knot & icosahedron) that rotate with scroll depth.
   - 3D card tilt physics with specular sheen on hover.

3. **Multi-Page Architecture**:
   - [`index.html`](./index.html): Home page with 3D hero, credentials, 9 core capabilities, featured projects, 20% discount monthly retainers, client reviews slider, contact order hub, and floating AI chatbot.
   - [`about.html`](./about.html): Founder story, Academic Gold Medal honors, marketing philosophy, timeline milestones, and 4 non-negotiable operational standards.
   - [`services.html`](./services.html): In-depth breakdown of all 9 core services (GMB, Meta Ads, Google PPC, Viral Video Reels, Graphic Design, Pixel/CAPI, Shopify Setup, Technical SEO, Political Social PR) with deliverables & FAQs.
   - [`portfolio.html`](./portfolio.html): Interactive client showcase with category filter tabs (Political, E-Commerce, Video Reels, Creators), real verified social media links, and image lightbox modal.
   - [`blog.html`](./blog.html): Marketing insights hub with featured strategy guides, topic tags, and newsletter capture.
   - [`blog-post.html`](./blog-post.html): SEO-optimized single article masterclass with table of contents and author bio.
   - [`contact.html`](./contact.html): Dedicated contact and consultation page with direct email dispatch to **info.zubairansari@gmail.com**, WhatsApp to **+923294357248**, and Free 30-Minute Zoom Consultation booking.

4. **FluentBot - AI Growth Concierge**:
   - Located on every page via a floating iOS 17 capsule widget.
   - Contextually answers client questions about pricing, services, ROAS benchmarks, Zubair's credentials, and booking.
   - **Google Gemini Integration**: Click the gear icon in the chat header to paste a Gemini API Key (`AIzaSy...`) for real-time generative intelligence, or rely on the built-in instant knowledge engine.
   - **End Chat & Email Transcript**: Visitors can click "End Chat & Email Transcript" at any time. The entire conversation history is formatted and dispatched directly to **info.zubairansari@gmail.com**, with a parallel 1-click WhatsApp backup!

5. **Direct Form Email Integration**:
   - When any client submits the contact or order form, their name, contact, selected package, and project brief are dispatched directly to **info.zubairansari@gmail.com**.
   - Also provides an instant 1-click button to open the formatted brief in WhatsApp to **+923294357248**!

6. **Shopify Integration Package**:
   - Located in the [`shopify/`](./shopify/) folder.
   - [`fluent-media-portfolio.liquid`](./shopify/fluent-media-portfolio.liquid): Ready-to-use section file that can be added to any Shopify theme (Dawn, Impulse, Prestige) with a simple copy-paste.
   - [`shopify/README.md`](./shopify/README.md): Step-by-step import guide.

---

## 🖼️ How to Add or Change Images

1. **Your Profile / Founder Photo**:
   - Currently uses `https://files.catbox.moe/mhlqby.jpeg`.
   - To replace: Save your photo in `assets/images/zubair-photo.jpg` and update the `src` attribute in `index.html` and `about.html`.

2. **Portfolio Screenshots (Ad accounts, ROAS dashboards, client work)**:
   - Save your screenshots in `assets/images/`.
   - In `portfolio.html`, duplicate any `<div class="portfolio-item">` card and update the `img src` to your image path.

3. **Agency Logo**:
   - Currently uses `https://i.postimg.cc/5X6rKV8G/fluent-media-marketing-serviecs.png`.
   - To update, replace the link in `<header>` and `<footer>` across the HTML files.

---

## 🚀 How to Run Locally

You can open any of the HTML files directly in your web browser (e.g. Chrome, Edge) by double-clicking `index.html`, or serve it with a local HTTP server:

```powershell
# Using Python
cd C:\Users\lenovo\.gemini\antigravity\scratch\fluent-media-portfolio
python -m http.server 8000

# Open in browser: http://localhost:8000
```

---

## 🌐 Free 1-Click Deployment Options

- **Vercel / Netlify**: Drag-and-drop the `fluent-media-portfolio` folder directly into your dashboard.
- **GitHub Pages**: Push this repository to GitHub and enable GitHub Pages under repository Settings.
- **Custom Domain**: Point `fluentmedia.agency` (or any domain) to your hosting provider via standard DNS CNAME/A records.
