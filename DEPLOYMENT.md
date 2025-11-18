# Render Deployment Guide

## Backend Deployment (Node.js Server)

### Step 1: Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `jknate/kambaz-quizzes-proj`
4. Configure the service:
   - **Name**: `kambaz-quizzes-server` (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
   - **Plan**: Free

### Step 2: Environment Variables
- Set `NODE_ENV` to `production`

### Step 3: Get Your Render URL
After deployment, you'll get a URL like:
`https://kambaz-quizzes-server.onrender.com` ✅ **Your current URL**

## Frontend Deployment (Next.js - Optional)

### Option 1: Vercel (Recommended for Next.js)
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set Root Directory to `client`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-render-server-url.onrender.com`

### Option 2: Render Static Site
1. Create new Static Site on Render
2. Set Build Command: `npm run build`
3. Set Publish Directory: `client/.next`
4. Set Root Directory: `client`

## Update Environment Variables

After deploying the backend:

1. **Update client/.env.local**:
   ```
   NEXT_PUBLIC_API_URL=https://kambaz-quizzes-server.onrender.com
   ```

2. **Update client/.env.production** (create this file):
   ```
   NEXT_PUBLIC_API_URL=https://kambaz-quizzes-server.onrender.com
   ```

## Testing
- Backend: Visit https://kambaz-quizzes-server.onrender.com to see "Kambaz Quizzes API Server is running!"
- Test API: https://kambaz-quizzes-server.onrender.com/hello