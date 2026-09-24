import os

pages = ['about.html', 'services.html', 'portfolio.html', 'blog.html', 'blog-post.html', 'game.html']

for page in pages:
    if not os.path.exists(page):
        continue
    with open(page, 'r', encoding='utf-8') as f:
        html = f.read()

    modified = False

    # 1. Update WhatsApp footer to include second number
    old_wa = '<span>WhatsApp / Phone: <a href="tel:03294357248"'
    new_wa = """<span>Primary WhatsApp / Phone: <a href="https://wa.me/923294357248" class="text-white hover:text-emerald-400 font-medium">0329 4357248</a> (+92 329 4357248)</span>
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-brands fa-whatsapp text-indigo-400 text-sm"></i>
              <span>Secondary WhatsApp / Phone: <a href="https://wa.me/923184628170" class="text-white hover:text-indigo-400 font-medium">0318 4628170</a> (+92 318 4628170)</span>
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-qrcode text-indigo-400 text-sm"></i>
              <span>Smart QR Code: <a href="qr.html" class="text-indigo-300 hover:text-white underline font-semibold">Scan & Save Contact (vCard / Hub)</a></span>"""

    if old_wa in html and '03184628170' not in html:
        html = html.replace(old_wa, new_wa)
        modified = True

    # 2. Add QR Hub to navigation
    if 'qr.html' not in html:
        # Check targets
        targets = [
            '<a href="portfolio.html" class="hover:text-indigo-400 transition-colors">Client Work</a>',
            '<a href="portfolio.html" class="hover:text-indigo-400 transition-colors">Portfolio</a>',
            '<a href="portfolio.html" class="hover:text-indigo-400 transition-colors">Work Portfolio</a>',
            '<a href="portfolio.html" class="text-indigo-400 font-bold border-b border-indigo-400 pb-0.5">Work Portfolio</a>',
            '<a href="portfolio.html" class="text-indigo-400 font-bold border-b border-indigo-400 pb-0.5">Client Work</a>',
            '<a href="portfolio.html" class="text-indigo-400 font-bold border-b border-indigo-400 pb-0.5">Portfolio</a>'
        ]
        for t in targets:
            if t in html:
                replacement = t + '\n        <a href="qr.html" class="hover:text-indigo-400 transition-colors flex items-center gap-1.5"><i class="fa-solid fa-qrcode"></i> QR Connect</a>'
                html = html.replace(t, replacement, 1)
                modified = True
                break

    # 3. Add to footer quick navigation
    old_nav = '<li><a href="contact.html" class="hover:text-indigo-400 transition-colors">Contact & Booking</a></li>'
    new_nav = '<li><a href="qr.html" class="text-indigo-300 hover:text-white transition-colors flex items-center gap-1"><i class="fa-solid fa-qrcode text-indigo-400"></i> QR Connect Hub & vCard</a></li>\n            ' + old_nav
    if old_nav in html and 'QR Connect Hub' not in html:
        html = html.replace(old_nav, new_nav, 1)
        modified = True

    if modified:
        with open(page, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Updated {page}")
    else:
        print(f"No changes needed for {page}")
