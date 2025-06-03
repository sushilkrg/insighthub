# 🧠 InsightHub

**InsightHub** is a modern full-stack web application that enables users to collect honest feedback, reviews, suggestions, and insights anonymously and securely. Perfect for creators, vloggers, educators, event organizers, and teams who value crowd-sourced input.

Live Demo: [https://insighthub-six.vercel.app](https://insighthub-six.vercel.app)

---

## 🚀 Features

- 🔗 Create shareable links with custom questions
- 🕵️‍♂️ Accept anonymous suggestions or feedback
- ✅ OTP email verification (via Resend)
- 🔐 Authentication with **NextAuth** (Google, GitHub, Credentials)
- 🧪 Form validation with **Zod**
- 📥 Save insights with `tag`, `question`, and related `messages`
- 👤 Manage profile with live update (name, profile image, email)
- 🌐 Mobile-first responsive UI
- 🌈 Built with **ShadCN**, **Tailwind CSS**, and **TypeScript**

---

## 🛠️ Tech Stack

### Frontend
- [Next.js (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Hook Form](https://react-hook-form.com/)


### Backend
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemailer API](https://nodemailer.com/) (for OTP verification)

---

## 📂 Folder Structure
<pre lang="md">
  <code>
    ``` 
    /app 
    ├── (auth) # Auth routes (login, register) 
    ├── (dashboard) # Main user dashboard 
    ├── api # API endpoints (email-otp, insight, profile) 
    ├── insight # Dynamic route for specific insights 
    ├── profile # Profile management page 
    ├── components # Reusable UI components 
    ├── lib # Utilities (db, auth, zod schemas) 
    ├── actions # Server Actions (create, update, delete) 
    ├── types # TypeScript types 
    └── styles # Tailwind configs, globals
    ``` 
  </code>
</pre>

---


## ✅ How It Works

1. **User signs up** (or logs in via Google/GitHub).
2. Creates a **question prompt** and shares the link.
3. **Anonymous users** open the link and submit **suggestions or reviews**.
4. Suggestions are stored and displayed on the creator’s dashboard.
5. Users can manage their profile and insights in real-time.

---


## 🔐 Environment Variables

Create a `.env.local` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_random_secret

# Providers
SMTP_USER=your_smtp_user_id
SMTP_PASSWORD=your_smtp_password
```

# 1. Clone the repo
git clone https://github.com/sushilkrg/insighthub.git
cd insighthub

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env

# 4. Run the app locally
npm run dev
