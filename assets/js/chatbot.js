/**
 * FluentBot - AI Client Concierge & Lead Capture System
 * For Fluent Media | Founder: Zubair Jamil (Zubair Ansari)
 * Direct Email Dispatch: info.zubairansari@gmail.com | WhatsApp: +923294357248
 */

class FluentChatbot {
  constructor() {
    this.targetEmail = 'info.zubairansari@gmail.com';
    this.targetPhone = '923294357248';
    this.geminiApiKey = localStorage.getItem('fluent_gemini_key') || '';
    this.chatHistory = [];
    this.isOpen = false;
    this.visitorInfo = {
      name: '',
      contact: '',
      service: ''
    };

    this.initDOM();
    this.bindEvents();
    this.greetVisitor();
  }

  initDOM() {
    // Inject Chatbot Widget into DOM
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'fluent-chatbot-container';
    widgetContainer.className = 'fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-50';
    widgetContainer.innerHTML = `
      <!-- Floating Trigger Button -->
      <button id="chatbot-toggle-btn" 
              class="relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-bold shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-xl group"
              aria-label="Open AI Growth Concierge">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <i class="fa-solid fa-wand-magic-sparkles text-lg group-hover:rotate-12 transition-transform"></i>
        <span class="text-xs tracking-wide font-semibold pr-1 hidden sm:inline">Ask FluentBot AI</span>
      </button>

      <!-- Chatbot Window (iOS 17 Blur) -->
      <div id="chatbot-modal" class="closed absolute bottom-16 left-0 w-[92vw] sm:w-[410px] h-[550px] max-h-[82vh] rounded-3xl apple-glass-interactive border border-white/15 flex flex-col shadow-2xl overflow-hidden">
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-white/10 bg-white/[0.04] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-base shadow-inner border border-white/20">
              <i class="fa-solid fa-robot"></i>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#090e1f]"></span>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="text-sm font-bold text-white font-display">FluentBot AI</h4>
                <span class="text-[9px] uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-extrabold">Online</span>
              </div>
              <p class="text-[10px] text-slate-400">Zubair Jamil Growth Concierge</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <!-- Gemini Key Settings Toggle -->
            <button id="chatbot-settings-btn" title="Configure Gemini API Key" class="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-colors">
              <i class="fa-solid fa-gear"></i>
            </button>
            <!-- Close Button -->
            <button id="chatbot-close-btn" class="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 flex items-center justify-center text-xs transition-colors">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- Gemini API Key Banner (Hidden by default) -->
        <div id="gemini-key-box" class="hidden p-3 bg-indigo-950/70 border-b border-indigo-500/30 text-xs">
          <label class="block text-[10px] text-indigo-300 font-semibold mb-1">Optional Google Gemini API Key:</label>
          <div class="flex gap-2">
            <input id="gemini-key-input" type="password" placeholder="AIzaSy..." value="${this.geminiApiKey}" class="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-[11px] focus:outline-none focus:border-indigo-400" />
            <button id="save-gemini-key" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase">Save</button>
          </div>
          <p class="text-[9px] text-slate-400 mt-1">If blank, FluentBot uses built-in smart agency intelligence.</p>
        </div>

        <!-- Chat Messages Scroll Area -->
        <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
          <!-- Messages will be appended here -->
        </div>

        <!-- Quick Suggestion Chips -->
        <div id="chatbot-chips" class="px-4 py-2 border-t border-white/[0.06] bg-black/20 flex gap-2 overflow-x-auto no-scrollbar">
          <button class="chip-btn shrink-0 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-white/10 text-[11px] transition-all">
            💰 Packages in PKR
          </button>
          <button class="chip-btn shrink-0 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-emerald-600/30 text-emerald-300 hover:text-white border border-emerald-500/20 text-[11px] transition-all">
            🎮 Play Viral Game
          </button>
          <button class="chip-btn shrink-0 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-white/10 text-[11px] transition-all">
            🎯 Meta Ads Strategy
          </button>
          <button class="chip-btn shrink-0 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-white/10 text-[11px] transition-all">
            📍 GMB Local SEO
          </button>
          <button class="chip-btn shrink-0 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/20 text-[11px] transition-all">
            🎥 Free Zoom Audit
          </button>
        </div>

        <!-- Chat Input & End-Chat Action Bar -->
        <div class="p-3 border-t border-white/10 bg-[#060a17]">
          <form id="chatbot-form" class="flex items-center gap-2">
            <input id="chatbot-input" 
                   type="text" 
                   placeholder="Ask about marketing, ads, packages..." 
                   autocomplete="off"
                   class="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors" />
            <button type="submit" 
                    id="chatbot-send-btn"
                    class="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all shadow-md">
              <i class="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </form>

          <!-- End Chat & Email Transcript Action Bar -->
          <div class="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
            <button id="end-chat-btn" class="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-semibold transition-colors">
              <i class="fa-solid fa-envelope-circle-check"></i>
              <span>End Chat & Email Transcript</span>
            </button>
            <a href="https://wa.me/923294357248" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-semibold transition-colors">
              <i class="fa-brands fa-whatsapp"></i>
              <span>WhatsApp Zubair</span>
            </a>
          </div>
        </div>

      </div>

      <!-- End Chat Modal / Email Collector Dialog -->
      <div id="end-chat-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <div class="w-full max-w-md apple-glass-interactive p-6 sm:p-7 rounded-3xl border border-white/15 shadow-2xl relative animate-float">
          <button id="close-end-chat-modal" class="absolute top-4 right-4 text-slate-400 hover:text-white text-base">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl mb-4 border border-indigo-500/30">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
          <h3 class="text-lg font-bold text-white mb-1 font-display">Send Conversation Transcript</h3>
          <p class="text-xs text-slate-300 mb-5 leading-relaxed">
            Your full chat will be dispatched to <strong>info.zubairansari@gmail.com</strong>. Zubair will review your goals and reply within 24 hours.
          </p>

          <form id="send-transcript-form" class="space-y-3.5">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">Your Name / Brand</label>
              <input id="transcript-name" type="text" required placeholder="e.g. Bilal Khan" class="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">Your Contact Email or WhatsApp</label>
              <input id="transcript-contact" type="text" required placeholder="e.g. 0300 1234567 or you@brand.com" class="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500" />
            </div>
            <button type="submit" id="submit-transcript-btn" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2">
              <i class="fa-solid fa-envelope"></i> Email Transcript Now
            </button>
            <div id="transcript-status" class="hidden text-center text-xs font-semibold pt-1"></div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(widgetContainer);
  }

  bindEvents() {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const modal = document.getElementById('chatbot-modal');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const settingsBtn = document.getElementById('chatbot-settings-btn');
    const keyBox = document.getElementById('gemini-key-box');
    const saveKeyBtn = document.getElementById('save-gemini-key');
    const keyInput = document.getElementById('gemini-key-input');
    const endChatBtn = document.getElementById('end-chat-btn');
    const endChatModal = document.getElementById('end-chat-modal');
    const closeEndChatModal = document.getElementById('close-end-chat-modal');
    const sendTranscriptForm = document.getElementById('send-transcript-form');

    // Toggle Chat
    toggleBtn.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        modal.classList.remove('closed');
        modal.classList.add('open');
        input.focus();
      } else {
        modal.classList.remove('open');
        modal.classList.add('closed');
      }
    });

    closeBtn.addEventListener('click', () => {
      this.isOpen = false;
      modal.classList.remove('open');
      modal.classList.add('closed');
    });

    // Settings Toggle
    settingsBtn.addEventListener('click', () => {
      keyBox.classList.toggle('hidden');
    });

    saveKeyBtn.addEventListener('click', () => {
      const val = keyInput.value.trim();
      this.geminiApiKey = val;
      localStorage.setItem('fluent_gemini_key', val);
      keyBox.classList.add('hidden');
      this.addBotMessage('Gemini API settings updated! FluentBot will now use this key for real-time generative responses.');
    });

    // Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim().replace(/^[^\w]+/, '');
        this.handleUserMessage(text);
      });
    });

    // Message Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      this.handleUserMessage(text);
    });

    // End Chat Trigger
    endChatBtn.addEventListener('click', () => {
      endChatModal.classList.remove('hidden');
    });

    closeEndChatModal.addEventListener('click', () => {
      endChatModal.classList.add('hidden');
    });

    // Send Transcript Action
    sendTranscriptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('transcript-name').value.trim();
      const contact = document.getElementById('transcript-contact').value.trim();
      const statusDiv = document.getElementById('transcript-status');
      const submitBtn = document.getElementById('submit-transcript-btn');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Dispatching Transcript...';

      await this.sendTranscriptEmail(name, contact, statusDiv, submitBtn);
    });
  }

  greetVisitor() {
    setTimeout(() => {
      this.addBotMessage(
        `👋 Hello! I am **FluentBot**, the AI Growth Concierge for **Fluent Media** led by Academic Gold Medalist **Zubair Jamil**.<br><br>
        How can I help your brand today? You can ask about our **Meta Ads**, **GMB ranking**, **video editing**, or our **20% Off Monthly Retainers**.`
      );
    }, 600);
  }

  addUserMessage(text) {
    const container = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = 'flex justify-end';
    msg.innerHTML = `
      <div class="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tr-sm chat-bubble-user text-xs leading-relaxed shadow-sm">
        ${this.escapeHTML(text)}
      </div>
    `;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    this.chatHistory.push({ role: 'user', text: text, time: new Date().toLocaleTimeString() });
  }

  addBotMessage(html) {
    const container = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = 'flex items-start gap-2.5';
    msg.innerHTML = `
      <div class="w-7 h-7 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs shrink-0 mt-0.5">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm chat-bubble-bot text-slate-200 text-xs leading-relaxed shadow-sm">
        ${html}
      </div>
    `;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    this.chatHistory.push({ role: 'assistant', text: html.replace(/<[^>]+>/g, ''), time: new Date().toLocaleTimeString() });
  }

  showTypingIndicator() {
    const container = document.getElementById('chatbot-messages');
    const id = 'typing-' + Date.now();
    const indicator = document.createElement('div');
    indicator.id = id;
    indicator.className = 'flex items-start gap-2.5 typing-indicator';
    indicator.innerHTML = `
      <div class="w-7 h-7 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs shrink-0">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="px-4 py-3 rounded-2xl rounded-tl-sm chat-bubble-bot text-slate-400 text-xs flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 0.15s"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 0.3s"></span>
      </div>
    `;
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
    return id;
  }

  removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  async handleUserMessage(userText) {
    this.addUserMessage(userText);
    const typingId = this.showTypingIndicator();

    // Check if Gemini API Key is available
    if (this.geminiApiKey) {
      try {
        const geminiReply = await this.queryGemini(userText);
        this.removeTypingIndicator(typingId);
        this.addBotMessage(geminiReply);
        return;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local engine:', err);
      }
    }

    // High performance local knowledge reasoning engine
    setTimeout(() => {
      this.removeTypingIndicator(typingId);
      const reply = this.generateLocalResponse(userText);
      this.addBotMessage(reply);
    }, 700);
  }

  generateLocalResponse(query) {
    const q = query.toLowerCase();

    // 0. Game / Tycoon
    if (q.includes('game') || q.includes('tycoon') || q.includes('play') || q.includes('گیم') || q.includes('کھیل')) {
      const gameSection = document.getElementById('ad-tycoon-section');
      if (gameSection) gameSection.scrollIntoView({ behavior: 'smooth' });
      return `🎮 <strong>Viral Ad Campaign Tycoon</strong> is live on our website!<br><br>
      You can test your marketing skills, dodge bad ad fatigue & account bans, catch winning creatives, and simulate your business revenue in <strong>PKR</strong>!<br><br>
      👉 <a href="game.html" class="text-indigo-400 font-bold underline">Click here to open Full-Screen Arcade Mode</a> or scroll down to test it on the homepage!`;
    }

    // 1. Pricing / Packages
    if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('charges') || q.includes('pkr') || q.includes('قیمت') || q.includes('پیکج') || q.includes('ریٹ')) {
      return `Here are our <strong>Monthly Retainer Packages (PKR)</strong> with our flat <strong>20% Discount</strong>:
      <br><br>
      • 🚀 <strong>Starter Boost:</strong> ₨ 35,000 / ماہانہ (12 Creatives, Meta Ads Setup, Copywriting, Weekly Reports).
      <br><br>
      • ⚡ <strong>Growth Accelerator (Most Popular):</strong> ₨ 65,000 / ماہانہ (Meta + TikTok Ads, 20 Posts & 8 Viral Short Video Reels, GMB Local Ranking, Pixel/CAPI).
      <br><br>
      • 👑 <strong>Brand Dominance (Enterprise):</strong> ₨ 120,000 / ماہانہ (Omnichannel Meta + Google PPC + TikTok, 30+ Viral Reels, Technical SEO, Turnkey Shopify CRO, Dedicated Strategist Zubair Jamil).
      <br><br>
      👉 Select any package on our site or message Zubair on <a href="https://wa.me/923294357248" target="_blank" class="text-emerald-400 font-bold underline">WhatsApp (+923294357248)</a> to lock in your 20% discount!`;
    }

    // 2. Founder / Zubair
    if (q.includes('zubair') || q.includes('founder') || q.includes('who are you') || q.includes('qualification') || q.includes('credential') || q.includes('gold medalist')) {
      return `<strong>Fluent Media</strong> is founded by <strong>Zubair Jamil (Zubair Ansari)</strong>:
      <br><br>
      • <strong>Academic Gold Medalist</strong> with top academic honors.<br>
      • <strong>Multi-Certified Growth Lead</strong> specializing in paid algorithmic media buying and technical SEO.<br>
      • <strong>4.9★ Fiverr Top Rated</strong> track record with over 140+ verified client engagements.<br>
      • Directly oversees every client campaign with no junior delegation.
      <br><br>
      You can speak directly with Zubair via WhatsApp at <strong>+92 329 4357248</strong> or book a Free Zoom Consultation!`;
    }

    // 3. Meta Ads / Facebook / Instagram
    if (q.includes('meta') || q.includes('facebook') || q.includes('instagram') || q.includes('ad') || q.includes('roas') || q.includes('campaign')) {
      return `Our <strong>Meta Ads Strategy</strong> is engineered to turn ad spend into profitable return on ad spend (ROAS):
      <br><br>
      • Full funnel architecture: Top-of-Funnel engagement, Middle-of-Funnel intent, and dynamic Bottom-of-Funnel retargeting.<br>
      • Server-side <strong>Conversions API (CAPI)</strong> and GTM setup to bypass iOS tracking loss.<br>
      • High-converting UGC and kinetic video creatives tested for maximum Click-Through Rate (CTR).<br>
      • Average verified ROAS of <strong>3.8x – 4.7x</strong> across e-commerce and lead gen clients.`;
    }

    // 4. GMB / Google My Business / Local SEO
    if (q.includes('gmb') || q.includes('google map') || q.includes('local') || q.includes('near me') || q.includes('ranking')) {
      return `Our <strong>Google My Business (GMB) & Map Pack Ranking</strong> service includes:
      <br><br>
      • Verified profile setup, exact geo-tagging & category mapping for Lahore & global locations.<br>
      • Local citation building and schema integration to secure a spot in the Top 3 Map Pack.<br>
      • Review generation funnels and weekly geo-optimized photo updates to trigger Google's local algorithm.<br>
      • Result: Constant incoming direct calls and storefront visits without paying per click!`;
    }

    // 5. Video Editing / Reels / TikTok / Shorts
    if (q.includes('video') || q.includes('reel') || q.includes('tiktok') || q.includes('short') || q.includes('edit')) {
      return `We produce <strong>High-Retention Viral Video Reels</strong> for TikTok, Instagram Reels, and YouTube Shorts:
      <br><br>
      • Dynamic 3-second hook pacing to eliminate scrolling past.<br>
      • Kinetic animated captions, sound effects, B-roll overlays, and zoom cuts.<br>
      • Formatted specifically to beat social algorithmic drop-off curves.<br>
      • Handled organic campaigns generating over 80,000+ views in 30 days.`;
    }

    // 6. Real Clients / Projects / Syed Shah Husban / Portfolio
    if (q.includes('client') || q.includes('work') || q.includes('portfolio') || q.includes('project') || q.includes('proof') || q.includes('bukhari')) {
      return `Here are some of our active verified client engagements:
      <br><br>
      1. <strong>Syed Shah Husban Bukhari</strong> (@syedshahhusban) — PTI Political Public Leadership campaign and PR management.<br>
      2. <strong>Lithora Surfaces</strong> (@lithora_surfaces) — Architectural marble feeds and B2B client funnels.<br>
      3. <strong>House of Biryan</strong> (@houseofbiryan_india) — Viral hospitality food media.<br>
      4. <strong>Alricks Da Veteran</strong> (@alricksdaveteran) — Musician brand architecture & short-form music reels.<br>
      5. <strong>Lou Lou Locaa</strong> (@louloulocaa) — Gaming creator content and YouTube retention edits.<br>
      6. <strong>Chief Wayah</strong> (@chiefwayah) — Global herbal health TikTok store funnels.
      <br><br>
      Check the <strong>Client Work</strong> section on this page to explore their live Instagram, Facebook, and TikTok channels!`;
    }

    // 7. Contact / Phone / Email / WhatsApp / Consultation
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('email') || q.includes('whatsapp') || q.includes('zoom') || q.includes('audit')) {
      return `You can reach <strong>Zubair Jamil</strong> directly right now:
      <br><br>
      📞 <strong>Phone:</strong> <a href="tel:03294357248" class="text-indigo-400 font-bold underline">0329 4357248</a> (+92 329 4357248)<br>
      💬 <strong>WhatsApp:</strong> <a href="https://wa.me/923294357248" target="_blank" class="text-emerald-400 font-bold underline">Chat on WhatsApp</a><br>
      ✉️ <strong>Direct Email:</strong> <a href="mailto:info.zubairansari@gmail.com" class="text-indigo-400 font-bold underline">info.zubairansari@gmail.com</a><br>
      🎥 <strong>Free 30-Min Zoom Audit:</strong> Zero-obligation screen-sharing audit of your ad account and social channels!`;
    }

    // Default Fallback
    return `Thank you for sharing! To tailor the perfect growth roadmap for your business:
    <br><br>
    • What industry is your business in (e.g. E-Commerce, Local Services, Personal Brand, Real Estate)?<br>
    • Are you looking for paid ad funnels (Meta/Google), short-form video editing, or local GMB ranking?
    <br><br>
    You can also click <strong>End Chat & Email Transcript</strong> below to send your notes straight to Zubair at <em>info.zubairansari@gmail.com</em>!`;
  }

  async queryGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`;
    const systemPrompt = `You are FluentBot, the elite AI growth concierge for Fluent Media, a premier digital marketing agency founded by certified strategist and Academic Gold Medalist Zubair Jamil (Zubair Ansari) based in Lahore, Pakistan.
    Fluent Media services include: GMB Local SEO, Meta Ads (FB & IG), Google Search PPC, Viral Short Video Editing (Reels/TikTok/Shorts), Graphic Design & Branding, Pixel/CAPI setup, Shopify Store Setup, and Political Leadership PR Management.
    Packages: Basic Starter (30k PKR/mo), Standard Growth (55k PKR/mo), Premium Scale (95k PKR/mo) with 20% August discount.
    Contact: Phone/WhatsApp +923294357248, Email info.zubairansari@gmail.com.
    Style: Confident, sophisticated, conversion-oriented, modern iOS 17 style. Concise and helpful. Always encourage booking a free 30-min Zoom consultation or messaging Zubair on WhatsApp.`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nVisitor Message: ${prompt}` }] }
        ]
      })
    });

    if (!response.ok) throw new Error(`Gemini HTTP Error: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].text.replace(/\n/g, '<br>');
  }

  async sendTranscriptEmail(name, contact, statusDiv, submitBtn) {
    statusDiv.classList.remove('hidden');
    statusDiv.className = 'text-center text-xs font-semibold pt-2 text-indigo-300';
    statusDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing and dispatching your transcript...';

    // Format conversation transcript
    let formattedChat = `FLUENT MEDIA - CLIENT AI CHAT TRANSCRIPT\n`;
    formattedChat += `==============================================\n`;
    formattedChat += `Date & Time: ${new Date().toLocaleString()}\n`;
    formattedChat += `Visitor Name: ${name}\n`;
    formattedChat += `Visitor Contact: ${contact}\n`;
    formattedChat += `Recipient Email: ${this.targetEmail}\n`;
    formattedChat += `==============================================\n\n`;

    this.chatHistory.forEach((msg, idx) => {
      formattedChat += `[${msg.time}] ${msg.role.toUpperCase()}:\n${msg.text}\n\n`;
    });

    formattedChat += `==============================================\n`;
    formattedChat += `End of Chatbot Session | Fluent Media Portal`;

    // 1. Try sending via Web3Forms verified direct API
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '556e9c60-e4b7-4e7c-87d9-0b73c4d72fe7',
          to: this.targetEmail,
          subject: `FluentBot Chat Inquiry from ${name} (${contact})`,
          from_name: name,
          name: name,
          contact: contact,
          message: formattedChat
        })
      });
      const data = await response.json();
      if (data.success) {
        statusDiv.className = 'text-center text-xs font-bold pt-2 text-emerald-400';
        statusDiv.innerHTML = `✓ Transcript successfully dispatched to Zubair Jamil (${this.targetEmail})!<br><span class="text-[10px] text-slate-300">We will review your inquiry and get back to you shortly.</span>`;
        this.finishTranscriptSuccess(name, contact, formattedChat);
        return;
      }
    } catch (e) {
      console.warn('Web3Forms dispatch exception, attempting Formspree backup:', e);
    }

    // 2. Backup: Try sending via Formspree Endpoint
    try {
      const response = await fetch('https://formspree.io/f/mqkenpzk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _replyto: contact.includes('@') ? contact : this.targetEmail,
          name: name,
          contact: contact,
          subject: `FluentBot Chat Inquiry from ${name} (${contact})`,
          message: formattedChat,
          destination: this.targetEmail
        })
      });

      if (response.ok) {
        statusDiv.className = 'text-center text-xs font-bold pt-2 text-emerald-400';
        statusDiv.innerHTML = `✓ Transcript successfully dispatched to Zubair Jamil (${this.targetEmail})!<br><span class="text-[10px] text-slate-300">We will review your inquiry and get back to you shortly.</span>`;
        this.finishTranscriptSuccess(name, contact, formattedChat);
        return;
      }
    } catch (e) {
      console.warn('Formspree dispatch exception:', e);
    }

    // 2. Fallback: Mailto + Direct WhatsApp confirmation
    const mailtoLink = `mailto:${this.targetEmail}?subject=${encodeURIComponent('FluentBot Chat Transcript - ' + name)}&body=${encodeURIComponent(formattedChat)}`;
    const encodedWa = encodeURIComponent(`*NEW AI CHAT TRANSCRIPT (Fluent Media)*\n\n*Name:* ${name}\n*Contact:* ${contact}\n\n${formattedChat.substring(0, 1200)}...`);
    const waLink = `https://wa.me/${this.targetPhone}?text=${encodedWa}`;

    statusDiv.className = 'text-center text-xs font-bold pt-2 text-emerald-400';
    statusDiv.innerHTML = `
      ✓ Transcript compiled!<br>
      <div class="mt-2 flex gap-2 justify-center">
        <a href="${waLink}" target="_blank" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold">
          <i class="fa-brands fa-whatsapp"></i> Send to WhatsApp
        </a>
        <a href="${mailtoLink}" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold">
          <i class="fa-solid fa-envelope"></i> Open Email App
        </a>
      </div>
    `;

    this.finishTranscriptSuccess(name, contact, formattedChat);
  }

  finishTranscriptSuccess(name, contact, transcript) {
    const submitBtn = document.getElementById('submit-transcript-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '✓ Transcript Sent';
      submitBtn.classList.replace('bg-indigo-600', 'bg-emerald-600');
    }

    this.addBotMessage(
      `🎉 Thank you <strong>${this.escapeHTML(name)}</strong>! Your entire chat transcript has been forwarded to <strong>Zubair Jamil</strong> at <em>info.zubairansari@gmail.com</em>. He will review your business requirements and contact you via <strong>${this.escapeHTML(contact)}</strong> shortly!`
    );

    setTimeout(() => {
      const modal = document.getElementById('end-chat-modal');
      if (modal) modal.classList.add('hidden');
    }, 3500);
  }

  escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.fluentChatbot = new FluentChatbot();
});
