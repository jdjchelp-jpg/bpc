# Deployment Guide

## 1. Commit to GitHub

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    ```

2.  **Add Files**:
    ```bash
    git add .
    ```

3.  **Commit Changes**:
    ```bash
    git commit -m "Initial commit of Blue Peak Countdown"
    ```

4.  **Create a Repository on GitHub**:
    - Go to [GitHub.com](https://github.com) and create a new repository.
    - Name it `blue-peak-countdown` (or similar).

5.  **Push to GitHub**:
    - Copy the commands provided by GitHub after creating the repo. They will look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/blue-peak-countdown.git
    git branch -M main
    git push -u origin main
    ```

## 2. Deploy to Vercel

1.  **Go to Vercel**:
    - Visit [vercel.com](https://vercel.com) and log in (you can use your GitHub account).

2.  **Add New Project**:
    - Click **"Add New..."** -> **"Project"**.

3.  **Import Git Repository**:
    - Find your `blue-peak-countdown` repository in the list and click **"Import"**.

4.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./` (default).
    - **Environment Variables**:
        - Expand the "Environment Variables" section.
        - Add the following keys (copy values from your `.env` file):
            - `NEXT_PUBLIC_SUPABASE_URL`
            - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5.  **Deploy**:
    - Click **"Deploy"**.

Vercel will build your application and provide you with a live URL (e.g., `blue-peak-countdown.vercel.app`).
