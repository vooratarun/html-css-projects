# Twitter Clone Angular
This project is an Angular conversion of the original static `twitter-clone` HTML/CSS layout.
## What changed
- The static page was migrated into Angular standalone `App` component files.
- Existing local images are now served from `public/images`.
- The Twitter embed is loaded after the Angular view renders.
- The original static files were preserved in `legacy-static/` for reference.
## Run locally
```bash
npm install
npm start
```
Then open the local URL shown by Angular in your browser.
## Build
```bash
npm run build
```
## Test
```bash
npm test
```
