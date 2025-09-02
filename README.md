# XTX E-commerce (Vue 3 + Vite)

A full-stack oriented e-commerce web app built with **Vue 3**, **Pinia**, and modern front-end tooling.  
Deployed on **Vercel** for fast, zero-config hosting.

- **Live Demo**: https://xtx-project-75kd-7gn6wp0wq-3315744065qqcoms-projects.vercel.app
- **Repository**: https://github.com/fjin1010-commits/Xtx_project

> Screenshots  
> ![Home](docs/screenshots/home.jpg)  
> ![Cart](docs/screenshots/category.jpg)

---

## ✨ Features

- [x] Product listing & detail pages
- [x] Global state with **Pinia** (cart, user/session, UI states)
- [x] Responsive layout (Flex/Grid), **Element Plus** UI components
- [x] Reusable API utilities (fetch wrappers, error handling)
- [x] Client-side routing (vue-router), protected routes (e.g., checkout)
- [ ] Checkout & payment gateway placeholder (Stripe/PayPal planned)
- [ ] Admin dashboard (product CRUD, order management) – *planned*

> Tip: keep a clear “in-progress” label for HR/reviewers so they know what’s shipped and what’s planned.

---

## 🛠 Tech Stack

- **Front-end**: Vue 3, Pinia, Vue Router, Element Plus, Vite
- **Styling**: CSS3 / SCSS, Flexbox & Grid, responsive design
- **Tooling**: ESLint, npm scripts
- **Deployment**: Vercel (CI/CD)

> Languages breakdown shown by GitHub:
> Vue ~80%, JavaScript ~17.7%, SCSS ~1.9%, HTML ~0.4%. :contentReference[oaicite:1]{index=1}

---

```bash
# 1) Clone
git clone https://github.com/fjin1010-commits/Xtx_project.git
cd Xtx_project

# 2) Install
npm install

# 3) Dev
npm run dev

# 4) Build
npm run build

# 5) Preview (after build)
npm run preview

# 6) Lint
npm run lint

