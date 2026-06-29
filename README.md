# Elakkya & Gowdham Raj Wedding Website 🌸

An elegant, highly aesthetic, and poetic single-page wedding website created for your sister **Elakkya** and **Gowdham Raj**, celebrating their marriage on **13th September** at **Ponamaravathi, Tamil Nadu, India**.

This website features:
- ✨ **Dreamy Canvas Particles**: Soft floating gold stardust and rose-pink sparkles reflecting a starlit Indian wedding sky.
- 📜 **Poetic Storytelling**: Scrolling stanzas of a romantic, custom-written love poem that fades in beautifully.
- 🖼️ **Premium Watercolor Art**: AI-generated watercolor backdrop of a traditional wedding stage (mandapam) and couple silhouette.
- ⏳ **Celebration Countdown**: A dynamic, responsive circular countdown ticking down the days, hours, minutes, and seconds.
- 🎵 **Floating Music Player**: A toggleable, atmospheric audio player playing a soft ambient classical melody.
- 💌 **Glassmorphic RSVP Form**: Interactive guest invitation response form that records RSVP responses locally and fires off a colorful confetti splash on completion.
- 🗺️ **Venue details**: Quick Google Maps redirection link pointing directly to Ponamaravathi.

---

## 🚀 How to Host on Your GitHub Pages (For Free)

Since this is a static website, you can host it for free on **GitHub Pages** directly from your GitHub account. Follow these simple steps:

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account.
2. Click **New** to create a new repository.
3. Name your repository (e.g., `wedding` or `<your-username>.github.io`).
4. Keep it **Public** (required for free GitHub Pages).
5. Leave "Add a README", "Add .gitignore", and "Choose a license" **unchecked** (we already have files ready!).
6. Click **Create repository**.

### Step 2: Initialize Git and Push Code
Open a terminal in your workspace folder (`wedding-website`) and run the following commands (replace `your-username` and `your-repo-name` with your actual GitHub details):

```bash
# Initialize a local Git repository
git init

# Add all files to staging
git add .

# Commit changes
git commit -m "Initial commit: Elakkya and Gowdham Raj wedding website"

# Rename default branch to main
git branch -M main

# Link your local repository to your GitHub remote
git remote add origin https://github.com/your-username/your-repo-name.git

# Push the code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository page on GitHub.
2. Click on the **Settings** tab (gear icon at the top).
3. On the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**, select **Deploy from a branch** in the Source dropdown.
5. Under **Branch**, select **main** and `/ (root)` folder, then click **Save**.
6. Wait 1–2 minutes. Refresh the page, and GitHub will provide a link at the top, like:
   `https://your-username.github.io/your-repo-name/`

---

## 🎨 Customizations & Custom Assets

Here are quick details on how you can further personalize the site for your family:

### 1. Wedding Music
Currently, the site loads a soft ambient instrumental song from an online stream in `index.html`:
```html
<audio id="wedding-audio" loop preload="auto">
    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" type="audio/mpeg">
</audio>
```
To use a custom song, you can download a royalty-free Indian classical flute or sitar track, name it `melody.mp3`, save it inside `assets/images/`, and update the path to:
```html
<source src="assets/images/melody.mp3" type="audio/mpeg">
```

### 2. Replacing Couple Silhouette with Actual Photos
To add actual photos of Elakkya and Gowdham Raj:
- Put the photo in `assets/images/`.
- Let's say the image is named `engagement_photo.jpg`.
- In `index.html`, update the image tag:
  ```html
  <img src="assets/images/engagement_photo.jpg" alt="Elakkya and Gowdham Raj" class="story-img">
  ```

### 3. Check RSVP Submissions
Since there is no back-end database, responses submitted via the RSVP form are stored in the user's browser storage (`localStorage`). To see them, open the browser's developer console (F12) on the website and type:
```javascript
JSON.parse(localStorage.getItem('wedding_rsvps'))
```
This is perfect for simple tracking, or you can integrate it with services like EmailJS, Formspree, or Google Sheets later if needed.
