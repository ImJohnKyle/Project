# John Kyle Uriarte – Portfolio (Portfolio Project)

Personal portfolio website built with plain HTML, CSS and JavaScript (no build tools needed).

## Folder structure

```
john-kyle-portfolio/
├── index.html        # page content (Home, About, Projects & Learning, Contact)
├── css/style.css     # all styling, colors and responsive rules
├── js/main.js        # mobile menu, active nav link, email button
├── images/
│   ├── profile.jpg   # your photo (used in the hero and, zoomed by CSS, in the top bar)
│   ├── cert-*.jpg    # certificate images
│   └── favicon.png   # browser tab icon (your photo)
├── projects/
│   └── sip-club/     # the Sip Club website demo (opens from the project card)
├── .nojekyll         # tells GitHub Pages to serve files as they are
└── README.md
```

## Publish on GitHub Pages

1. Sign in to GitHub and create a new **public** repository (for a personal site, name it `ImJohnKyle.github.io`; otherwise any name works).
2. Upload everything inside this folder (so `index.html` is at the top level of the repository).
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, then press **Save**.
4. Wait 1–2 minutes. Your site will be live at:
   - `https://imjohnkyle.github.io/` (if the repository is named `ImJohnKyle.github.io`)
   - `https://imjohnkyle.github.io/<repository-name>/` (any other name)

## Updating the site (maintenance plan)

- Add new projects by copying a `<article class="card pop">` block in `index.html`.
- Change colors in the `:root` section at the top of `css/style.css`.
- Replace `images/profile.jpg` to change your photo everywhere (keep the same file name). The top-bar version is zoomed in with CSS (`.avatar img` in `css/style.css`).
- Commit and push the change. GitHub Pages updates automatically.
- Review the skills and projects every semester and check that all links still work once a month.
