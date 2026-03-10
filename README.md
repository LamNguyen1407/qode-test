# 📸 Qode Test – Photo Sharing Application

🔗 **Live Demo:** [https://qode-test-eight.vercel.app/](https://qode-test-eight.vercel.app/)

A modern **photo sharing web application** built with a production-ready full-stack architecture.
Users can upload photos, view photo feeds, and interact through comments.

This project demonstrates my ability to design and build a **scalable full-stack application**, including backend API, database modeling, cloud storage integration, and deployment.

---

# 🚀 Features

* 📷 Upload and share photos
* 🗂 Photo feed with latest uploads
* 💬 Comment system for each photo
* ☁️ Image storage using AWS S3
* ⚡ Fast full-stack application with Next.js
* 🗄 Efficient database queries with Prisma ORM
* 🌐 Production deployment on Vercel

---

# 🛠 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **TailwindCSS**

### Backend

* **Next.js API Routes**
* **Prisma ORM**

### Database

* **PostgreSQL**

### Cloud & Infrastructure

* **AWS S3** – Image storage
* **Vercel** – Hosting and deployment

---

# 🏗 Architecture

The application follows a **modern full-stack architecture**:

```
Client (Next.js UI)
        │
        ▼
Next.js API Routes
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL Database
        │
        ▼
AWS S3 (Image Storage)
```

Key design decisions:

* **Prisma ORM** for type-safe database queries
* **AWS S3** for scalable file storage
* **Next.js full-stack architecture** to simplify deployment
* **Server-side data fetching** for better performance

---

# 📂 Project Structure

```
app/
 ├─ api/           # API routes
 ├─ components/    # Reusable UI components
 ├─ lib/           # Utilities (Prisma client, helpers)
 ├─ types/         # TypeScript types
 └─ page.tsx       # Main page

prisma/
 └─ schema.prisma  # Database schema
```

---

# 🗄 Database Schema

The core models:

### Photo

* id
* title
* url
* description
* authorName
* createdAt

### Comment

* id
* photoId
* text
* authorName
* createdAt

Relationship:

```
Photo 1 ──── N Comment
```

---

# ⚡ Performance Considerations

* Optimized database queries using **Prisma relations**
* Avoided **N+1 query problems** with `include`
* Images stored in **AWS S3** instead of database
* Leveraged **Vercel edge infrastructure** for fast deployment

---

# 🌍 Deployment

The application is deployed using:

* **Vercel** for frontend + serverless backend
* **PostgreSQL** for persistent data
* **AWS S3** for image storage

Live demo:

👉 [https://qode-test-eight.vercel.app/](https://qode-test-eight.vercel.app/)

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/LamNguyen1407/qode-test.git
cd qode-test
```

Install dependencies:

```bash
npm install
```

Setup environment variables:

```
DATABASE_URL=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
```

Run the development server:

```bash
npm run dev
```

# 👨‍💻 Author

Built by **Lam Nguyen**


Chỉ cần gửi tôi **link GitHub repo**, tôi sẽ **review README và chỉnh lại cho level production**.
