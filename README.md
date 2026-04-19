# Muhammad Kamran Tufail — AI Portfolio
**Live, public, AI-powered portfolio with voice agent and Claude-powered "Ask Me" chat.**

---

## Folder Structure
```
portfolio-deploy/
├── index.html       ← Public portfolio (deploy this)
├── admin.html       ← Secure admin panel (also deployed, URL not publicized)
├── api/
│   └── ask.js       ← Vercel serverless function (Anthropic API proxy)
├── vercel.json      ← Vercel configuration
├── .env.example     ← Environment variables template
└── README.md        ← This file
```

---

## Step 1 — Get Your Anthropic API Key
1. Go to **https://console.anthropic.com**
2. Sign in or create a free account
3. Go to **API Keys** → click **Create Key**
4. Copy the key (starts with `sk-ant-api03-...`)
5. Keep it safe — you'll paste it in Step 3

---

## Step 2 — Push to GitHub
```bash
# In your terminal, inside the portfolio-deploy folder:
git init
git add .
git commit -m "Initial portfolio deploy"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 3 — Deploy to Vercel
1. Go to **https://vercel.com** → sign in with GitHub
2. Click **"Add New Project"**
3. Select your portfolio repo
4. Click **"Deploy"** (leave all settings as default)
5. Vercel will give you a URL like `your-name.vercel.app`

**Then add your API key:**
1. In Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Name: `ANTHROPIC_API_KEY`
4. Value: paste your key from Step 1
5. Environment: check **Production**, **Preview**, **Development**
6. Click **Save**
7. Go to **Deployments** → click **"Redeploy"** on the latest deployment

---

## Step 4 — Set a Custom Domain (Optional but Recommended)
In Vercel → your project → **Settings** → **Domains**:
- Add a domain like `kamrantufail.com`
- Or use the free `.vercel.app` URL

**Recommended free option**: Use `kamrantufail.vercel.app` — looks clean on LinkedIn.

---

## Step 5 — Test Everything
Visit your live URL and check:
- [ ] Portfolio loads with all sections
- [ ] Click a project card → voice agent speaks ✓
- [ ] Click "Ask Me" → type a question → Claude responds + speaks ✓
- [ ] All sections scroll correctly on mobile ✓

---

## Admin Panel
**URL**: `your-site.vercel.app/admin.html`

**Default password**: `kamran2025`

**Features**:
- Add / delete projects, skill categories, experience entries
- Export JSON to update the live site (see Export tab)
- Change admin password (stored as SHA-256 hash in browser)

**To make admin changes live for ALL visitors**:
1. Edit in admin panel → Export tab → copy the JSON
2. Paste it into `index.html` to replace the arrays
3. `git add . && git commit -m "Update projects" && git push`
4. Vercel auto-deploys in ~30 seconds ✓

**Secret shortcut**: Press `Ctrl+Shift+A` on the portfolio to open admin.

---

## Updating Content
Every time you want to update your portfolio:
```bash
# Edit index.html with new projects/skills/etc.
git add .
git commit -m "Add new project: XYZ"
git push
# → Vercel deploys automatically in 30 seconds
```

---

## Architecture Summary
```
Visitor browser
      ↓
index.html (Vercel CDN — global, fast)
      ↓ (Ask Me chat)
/api/ask  (Vercel Serverless Function — Node.js 18)
      ↓
Anthropic API (Claude claude-sonnet-4-20250514)
      ↓
Response back to browser → displayed + spoken via Web Speech API
```

**Voice Agent**: Runs entirely in the browser using Web Speech API. Zero server cost. Works for every visitor.

**Ask Me Chat**: Goes through your server proxy. API key is never exposed to visitors.

---

## Security Notes
- ✅ API key stored in Vercel environment (server-side only, never in frontend code)
- ✅ Admin password stored as SHA-256 hash in localStorage
- ✅ Admin URL is not linked from the main portfolio
- ✅ `noindex, nofollow` on admin.html (search engines won't index it)
- ✅ Input validation and rate limiting in the API proxy

---

## Costs
| Service | Cost |
|---------|------|
| Vercel hosting | **Free** (Hobby plan) |
| Anthropic API | ~$0.003 per "Ask Me" conversation (very cheap) |
| Custom domain | $10–12/year (optional) |

---

## Support
Built by **Muhammad Kamran Tufail**  
📧 muhammadkamrantufailofficial@gmail.com  
🔗 linkedin.com/in/muhammad-kamran-tufail
