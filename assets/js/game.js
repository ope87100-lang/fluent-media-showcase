/**
 * Fluent Media - Viral Ad Growth Tycoon & Live PKR ROI Calculator
 * Founder: Zubair Jamil (Academic Gold Medalist)
 * Agency: Fluent Media | WhatsApp: +923294357248 | Email: info.zubairansari@gmail.com
 */

// =============================================================================
// 1. SYNTHESIZED SOUND ENGINE (Web Audio API - Zero External MP3 Dependencies)
// =============================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCollect(freq = 587.33) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playHazard() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {}
      }, idx * 90);
    });
  }
}

const sfx = new SoundFX();

// =============================================================================
// 2. VIRAL AD GROWTH TYCOON (Arcade Mini-Game)
// =============================================================================
class ViralAdTycoonGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 600;
    this.height = this.canvas.height = 420;

    this.isRunning = false;
    this.isPaused = false;
    this.animationId = null;

    // Campaign Parameters
    this.selectedNiche = 'ecommerce';
    this.adBudgetPKR = 50000;
    this.simulatedRevenue = 0;
    this.currentROAS = 1.0;
    this.itemsCaught = 0;
    this.gameTimeTotal = 25; // 25 seconds per campaign sprint
    this.timeLeft = this.gameTimeTotal;
    this.timerInterval = null;

    // Player Rocket / Growth Ship
    this.player = {
      x: this.width / 2,
      y: this.height - 45,
      width: 58,
      height: 32,
      speed: 8,
      color: '#6366f1'
    };

    this.items = [];
    this.floatingTexts = [];
    this.keys = {};
    this.lastSpawn = 0;

    this.initControls();
    this.renderWelcomeScreen();
  }

  initControls() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'].includes(e.code)) {
        this.keys[e.code] = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'].includes(e.code)) {
        this.keys[e.code] = false;
      }
    });

    // Touch & Mouse Dragging for seamless mobile play
    const updatePlayerPosFromPointer = (clientX) => {
      if (!this.isRunning) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      this.player.x = Math.max(this.player.width / 2, Math.min(this.width - this.player.width / 2, x));
    };

    this.canvas.addEventListener('mousemove', (e) => {
      updatePlayerPosFromPointer(e.clientX);
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        updatePlayerPosFromPointer(e.touches[0].clientX);
      }
    }, { passive: false });

    // Handle Window Resize
    window.addEventListener('resize', () => {
      if (!this.canvas || !this.canvas.parentElement) return;
      const newWidth = this.canvas.parentElement.clientWidth;
      if (newWidth > 100) {
        this.width = this.canvas.width = newWidth;
        this.player.y = this.height - 45;
        this.player.x = Math.min(this.player.x, this.width - this.player.width / 2);
      }
    });
  }

  start(niche = 'ecommerce', budget = 50000) {
    sfx.init();
    this.selectedNiche = niche;
    this.adBudgetPKR = budget;
    this.simulatedRevenue = 0;
    this.currentROAS = 1.0;
    this.itemsCaught = 0;
    this.timeLeft = this.gameTimeTotal;
    this.items = [];
    this.floatingTexts = [];
    this.isRunning = true;
    this.isPaused = false;
    this.player.x = this.width / 2;

    this.updateHUD();

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.isRunning || this.isPaused) return;
      this.timeLeft--;
      this.updateHUD();
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.loop();
  }

  spawnItem() {
    const types = [
      { name: 'Winning Creative', type: 'good', icon: '⚡', rev: 18000, roas: 0.45, color: '#10b981' },
      { name: 'Viral Short Reel', type: 'good', icon: '🔥', rev: 25000, roas: 0.65, color: '#6366f1' },
      { name: 'High-ROAS Buyer', type: 'good', icon: '👑', rev: 45000, roas: 1.10, color: '#f59e0b' },
      { name: 'Ad Fatigue', type: 'bad', icon: '💤', rev: -12000, roas: -0.30, color: '#f43f5e' },
      { name: 'Meta Policy Ban', type: 'bad', icon: '🚫', rev: -22000, roas: -0.55, color: '#e11d48' }
    ];

    // 70% positive winning items, 30% hazards
    const isGood = Math.random() < 0.72;
    const pool = types.filter(t => isGood ? t.type === 'good' : t.type === 'bad');
    const chosen = pool[Math.floor(Math.random() * pool.length)];

    this.items.push({
      x: 30 + Math.random() * (this.width - 60),
      y: -20,
      size: 28,
      speed: 2.5 + Math.random() * 2.2,
      data: chosen
    });
  }

  updateHUD() {
    const budgetEl = document.getElementById('tycoon-budget-display');
    const roasEl = document.getElementById('tycoon-roas-display');
    const revEl = document.getElementById('tycoon-rev-display');
    const timeEl = document.getElementById('tycoon-time-display');

    if (budgetEl) budgetEl.innerText = `₨ ${this.adBudgetPKR.toLocaleString()}`;
    if (roasEl) roasEl.innerText = `${Math.max(0.5, this.currentROAS).toFixed(2)}x`;
    if (revEl) revEl.innerText = `₨ ${Math.max(0, Math.round(this.simulatedRevenue)).toLocaleString()}`;
    if (timeEl) timeEl.innerText = `${this.timeLeft}s`;
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Move Player
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      this.player.x = Math.max(this.player.width / 2, this.player.x - this.player.speed);
    }
    if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      this.player.x = Math.min(this.width - this.player.width / 2, this.player.x + this.player.speed);
    }

    // 2. Draw Grid in background
    this.drawBackgroundGrid();

    // 3. Spawn Items
    const now = Date.now();
    if (now - this.lastSpawn > 620) {
      this.spawnItem();
      this.lastSpawn = now;
    }

    // 4. Update & Draw Items
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.y += item.speed;

      // Draw Item
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(item.x, item.y, item.size / 2, 0, Math.PI * 2);
      this.ctx.fillStyle = item.data.type === 'good' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)';
      this.ctx.fill();
      this.ctx.strokeStyle = item.data.color;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Icon
      this.ctx.font = '16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(item.data.icon, item.x, item.y);
      this.ctx.restore();

      // Check Collision with Player
      const px = this.player.x;
      const py = this.player.y;
      const dist = Math.hypot(item.x - px, item.y - py);

      if (dist < (item.size / 2 + this.player.width / 2)) {
        // Caught!
        if (item.data.type === 'good') {
          sfx.playCollect();
          this.simulatedRevenue += item.data.rev;
          this.currentROAS += item.data.roas;
          this.itemsCaught++;
          this.addFloatingText(`+₨ ${item.data.rev.toLocaleString()}`, item.x, item.y, '#34d399');
        } else {
          sfx.playHazard();
          this.simulatedRevenue = Math.max(0, this.simulatedRevenue + item.data.rev);
          this.currentROAS = Math.max(0.8, this.currentROAS + item.data.roas);
          this.addFloatingText(`${item.data.name}!`, item.x, item.y, '#f87171');
        }

        this.updateHUD();
        this.items.splice(i, 1);
        continue;
      }

      // Remove off-screen
      if (item.y > this.height + 30) {
        this.items.splice(i, 1);
      }
    }

    // 5. Draw Floating Feedback Texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 1.2;
      ft.opacity -= 0.025;

      if (ft.opacity <= 0) {
        this.floatingTexts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.font = 'bold 12px "Space Grotesk", sans-serif';
      this.ctx.fillStyle = ft.color;
      this.ctx.globalAlpha = Math.max(0, ft.opacity);
      this.ctx.textAlign = 'center';
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    }

    // 6. Draw Player Rocket / Growth Pad
    this.drawPlayer();

    this.animationId = requestAnimationFrame(() => this.loop());
  }

  drawBackgroundGrid() {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  drawPlayer() {
    this.ctx.save();
    const x = this.player.x;
    const y = this.player.y;
    const w = this.player.width;
    const h = this.player.height;

    // Glowing base
    const grad = this.ctx.createLinearGradient(x - w / 2, y, x + w / 2, y + h);
    grad.addColorStop(0, '#6366f1');
    grad.addColorStop(0.5, '#8b5cf6');
    grad.addColorStop(1, '#a855f7');

    this.ctx.shadowColor = '#6366f1';
    this.ctx.shadowBlur = 15;

    // Rocket capsule body
    this.ctx.beginPath();
    this.ctx.roundRect(x - w / 2, y, w, h, 14);
    this.ctx.fillStyle = grad;
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    // Core Indicator
    this.ctx.beginPath();
    this.ctx.arc(x, y + h / 2, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();

    // Thrust Flame
    const flameH = 6 + Math.random() * 8;
    this.ctx.beginPath();
    this.ctx.moveTo(x - 8, y + h);
    this.ctx.lineTo(x, y + h + flameH);
    this.ctx.lineTo(x + 8, y + h);
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.fill();

    this.ctx.restore();
  }

  addFloatingText(text, x, y, color) {
    this.floatingTexts.push({ text, x, y, color, opacity: 1.0 });
  }

  renderWelcomeScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackgroundGrid();

    this.ctx.save();
    this.ctx.textAlign = 'center';

    // Title
    this.ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText('🚀 Fluent Media Viral Campaign Tycoon', this.width / 2, this.height / 2 - 35);

    // Subtitle
    this.ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText('Move Growth Core with Mouse / Touch to catch Winning Creatives & 10x ROAS!', this.width / 2, this.height / 2);

    this.ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    this.ctx.fillStyle = '#34d399';
    this.ctx.fillText('⚡ Creatives (+₨) | 🔥 Viral Reels (+₨) | 🚫 Avoid Meta Bans & Fatigue', this.width / 2, this.height / 2 + 30);

    this.ctx.restore();
  }

  endGame() {
    this.isRunning = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.animationId) cancelAnimationFrame(this.animationId);

    sfx.playVictory();

    // Trigger Confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    const finalROAS = Math.max(1.2, this.currentROAS).toFixed(2);
    const finalRevenue = Math.max(this.adBudgetPKR * 2, Math.round(this.simulatedRevenue));

    // Show Game Over Modal in DOM
    const modal = document.getElementById('tycoon-result-modal');
    if (modal) {
      modal.classList.remove('hidden');
      const scoreRev = document.getElementById('result-revenue-text');
      const scoreRoas = document.getElementById('result-roas-text');
      const scoreBudget = document.getElementById('result-budget-text');
      const waBtn = document.getElementById('result-whatsapp-cta');

      if (scoreRev) scoreRev.innerText = `₨ ${finalRevenue.toLocaleString()}`;
      if (scoreRoas) scoreRoas.innerText = `${finalROAS}x ROAS`;
      if (scoreBudget) scoreBudget.innerText = `₨ ${this.adBudgetPKR.toLocaleString()}`;

      if (waBtn) {
        const msg = encodeURIComponent(
          `Salam Zubair! I just played your Viral Ad Tycoon game on fluentmedia.agency.\n` +
          `🏆 My Campaign Score: ${finalROAS}x ROAS & ₨ ${finalRevenue.toLocaleString()} Revenue.\n` +
          `I want to claim my 20% discount and scale my real business with Fluent Media!`
        );
        waBtn.href = `https://wa.me/923294357248?text=${msg}`;
      }
    }
  }
}

// =============================================================================
// 3. LIVE PKR ROI & MARKETING BUDGET CALCULATOR ENGINE
// =============================================================================
function initROICalculator() {
  const budgetSlider = document.getElementById('roi-budget-slider');
  const budgetDisplay = document.getElementById('roi-slider-val');
  const nicheSelect = document.getElementById('roi-niche-select');

  // Outputs
  const impressionsEl = document.getElementById('calc-impressions');
  const leadsEl = document.getElementById('calc-leads');
  const revenueEl = document.getElementById('calc-revenue');
  const roasEl = document.getElementById('calc-roas');
  const profitDifferenceEl = document.getElementById('calc-difference');

  if (!budgetSlider) return;

  const nicheMultipliers = {
    ecommerce: { cpm: 380, convRate: 0.032, aov: 3800, targetRoas: 5.2 },
    realestate: { cpm: 550, convRate: 0.015, aov: 120000, targetRoas: 7.5 },
    food: { cpm: 240, convRate: 0.055, aov: 1800, targetRoas: 4.6 },
    services: { cpm: 420, convRate: 0.028, aov: 25000, targetRoas: 5.8 }
  };

  const calculate = () => {
    const budget = parseInt(budgetSlider.value, 10) || 50000;
    const nicheKey = nicheSelect ? nicheSelect.value : 'ecommerce';
    const config = nicheMultipliers[nicheKey] || nicheMultipliers.ecommerce;

    if (budgetDisplay) {
      budgetDisplay.innerText = `₨ ${budget.toLocaleString()}`;
    }

    // Projections
    const impressions = Math.round((budget / config.cpm) * 1000);
    const clicks = Math.round(impressions * 0.022); // 2.2% CTR average
    const leads = Math.max(12, Math.round(clicks * config.convRate));
    
    // Revenue calculations
    const managedRoas = config.targetRoas;
    const projectedRevenue = Math.round(budget * managedRoas);
    const diyRevenue = Math.round(budget * 1.7); // standard in-house ~1.7x ROAS
    const netGain = projectedRevenue - diyRevenue;

    if (impressionsEl) impressionsEl.innerText = `${(impressions / 1000).toFixed(1)}k+ Views`;
    if (leadsEl) leadsEl.innerText = `${leads.toLocaleString()} Leads / Orders`;
    if (revenueEl) revenueEl.innerText = `₨ ${projectedRevenue.toLocaleString()}`;
    if (roasEl) roasEl.innerText = `${managedRoas.toFixed(1)}x ROAS`;
    if (profitDifferenceEl) {
      profitDifferenceEl.innerText = `+₨ ${netGain.toLocaleString()} Extra Profit vs In-House`;
    }

    // Update CTA link
    const ctaBtn = document.getElementById('calc-whatsapp-btn');
    if (ctaBtn) {
      const waText = encodeURIComponent(
        `Salam Zubair! I used your Live PKR ROI Calculator for ${nicheKey.toUpperCase()}.\n` +
        `My planned budget is ₨ ${budget.toLocaleString()}/month and target revenue is ₨ ${projectedRevenue.toLocaleString()} (${managedRoas}x ROAS).\n` +
        `Let's schedule a Zoom call to discuss scaling!`
      );
      ctaBtn.href = `https://wa.me/923294357248?text=${waText}`;
    }
  };

  budgetSlider.addEventListener('input', calculate);
  if (nicheSelect) {
    nicheSelect.addEventListener('change', calculate);
  }

  calculate();
}

// =============================================================================
// 4. INITIALIZATION HOOKS
// =============================================================================
window.addEventListener('DOMContentLoaded', () => {
  // Initialize Tycoon Game if canvas exists
  if (document.getElementById('tycoon-canvas')) {
    window.tycoonGame = new ViralAdTycoonGame('tycoon-canvas');

    const startBtn = document.getElementById('tycoon-start-btn');
    const nicheSelect = document.getElementById('tycoon-niche-select');
    const budgetSelect = document.getElementById('tycoon-budget-select');
    const playAgainBtn = document.getElementById('tycoon-play-again-btn');
    const closeResultBtn = document.getElementById('tycoon-close-result-btn');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const niche = nicheSelect ? nicheSelect.value : 'ecommerce';
        const budget = budgetSelect ? parseInt(budgetSelect.value, 10) : 50000;
        window.tycoonGame.start(niche, budget);
      });
    }

    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        const modal = document.getElementById('tycoon-result-modal');
        if (modal) modal.classList.add('hidden');
        const niche = nicheSelect ? nicheSelect.value : 'ecommerce';
        const budget = budgetSelect ? parseInt(budgetSelect.value, 10) : 50000;
        window.tycoonGame.start(niche, budget);
      });
    }

    if (closeResultBtn) {
      closeResultBtn.addEventListener('click', () => {
        const modal = document.getElementById('tycoon-result-modal');
        if (modal) modal.classList.add('hidden');
        window.tycoonGame.renderWelcomeScreen();
      });
    }
  }

  // Initialize ROI Calculator
  initROICalculator();
});
