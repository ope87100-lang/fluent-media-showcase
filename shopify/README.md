# How to Import Fluent Media Portfolio into Shopify

Follow these simple steps to import your portfolio section into your Shopify store.

---

### Step 1: Log into Your Shopify Admin
1. Open your Shopify Admin panel.
2. Go to **Online Store** -> **Themes**.
3. Next to your active theme (e.g. Dawn, Impulse, Prestige), click the `...` (three dots) button and select **Edit code**.

---

### Step 2: Create the Custom Section
1. In the left sidebar file tree, find the **Sections** folder.
2. Click **Add a new section**.
3. Name the file:
   ```text
   fluent-media-portfolio.liquid
   ```
4. Click **Done**.

---

### Step 3: Paste the Code
1. Open [`fluent-media-portfolio.liquid`](./fluent-media-portfolio.liquid).
2. Copy all the contents and paste them into the newly created section file in Shopify, replacing any default code.
3. Click **Save** in the top right corner.

---

### Step 4: Add Section to Your Store Pages
1. Go back to **Online Store** -> **Themes** and click the green **Customize** button.
2. Navigate to the page where you want the portfolio to appear (e.g., Homepage or a new Portfolio page).
3. In the left panel, click **Add section**.
4. Search for:
   ```text
   Fluent Media Portfolio
   ```
5. Click to add it. You can adjust the heading, text, and drag it anywhere on the page!
6. Click **Save**.

---

### Optional: Full Standalone Page in Shopify
If you want a dedicated URL like `yourstore.com/pages/portfolio`:
1. Go to **Online Store** -> **Pages** -> **Add page**.
2. Title it: `Portfolio`.
3. In the content editor, click the **Show HTML** button (`<>`).
4. Paste the HTML from `portfolio.html` or assign your custom theme template.
5. Click **Save**.
