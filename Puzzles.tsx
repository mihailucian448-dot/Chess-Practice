@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Chess Practice — Mahon Cinematic design system. All colors HSL. */

@layer base {
  :root {
    --background: 24 25% 4%;
    --foreground: 26 45% 88%;

    --card: 22 28% 7%;
    --card-foreground: 26 45% 88%;

    --popover: 22 28% 7%;
    --popover-foreground: 26 45% 88%;

    --primary: 14 67% 40%;
    --primary-foreground: 26 45% 95%;

    --secondary: 22 28% 12%;
    --secondary-foreground: 26 45% 88%;

    --muted: 22 20% 14%;
    --muted-foreground: 26 12% 60%;

    --accent: 14 67% 40%;
    --accent-foreground: 26 45% 95%;

    --destructive: 0 70% 45%;
    --destructive-foreground: 26 45% 95%;

    --border: 22 25% 16%;
    --input: 22 25% 16%;
    --ring: 14 67% 40%;

    --radius: 0.25rem;

    /* Brand-specific tokens */
    --void: 24 25% 4%;
    --mahogany-900: 22 28% 7%;
    --mahogany-800: 22 30% 12%;
    --wood: 22 28% 25%;
    --wood-light: 26 25% 40%;
    --ember: 14 67% 40%;
    --ember-glow: 14 80% 55%;
    --tungsten: 26 45% 88%;
    --tungsten-muted: 26 12% 55%;

    /* Board */
    --board-light: 36 38% 78%;
    --board-dark: 22 35% 28%;
    --board-highlight: 50 80% 55%;

    --gradient-ember: linear-gradient(135deg, hsl(14 67% 40%), hsl(20 70% 30%));
    --gradient-fade: linear-gradient(180deg, hsl(var(--void)) 0%, transparent 30%, transparent 70%, hsl(var(--void)) 100%);
    --shadow-ember: 0 0 40px hsl(14 80% 55% / 0.25);
    --shadow-deep: 0 20px 60px -20px hsl(0 0% 0% / 0.6);

    --font-serif: 'Cormorant Garamond', serif;
    --font-sans: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    --transition-smooth: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

    --sidebar-background: 22 28% 7%;
    --sidebar-foreground: 26 45% 88%;
    --sidebar-primary: 14 67% 40%;
    --sidebar-primary-foreground: 26 45% 95%;
    --sidebar-accent: 22 30% 12%;
    --sidebar-accent-foreground: 26 45% 88%;
    --sidebar-border: 22 25% 16%;
    --sidebar-ring: 14 67% 40%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: var(--font-sans);
    background-image:
      radial-gradient(ellipse at top, hsl(14 50% 12% / 0.4), transparent 60%),
      radial-gradient(ellipse at bottom, hsl(22 30% 8% / 0.6), transparent 70%);
    background-attachment: fixed;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-serif);
    font-weight: 500;
    letter-spacing: -0.02em;
  }
}

@layer utilities {
  .font-serif { font-family: var(--font-serif); }
  .font-mono { font-family: var(--font-mono); }
  .text-balance { text-wrap: balance; }
  .text-pretty { text-wrap: pretty; }

  .ember-glow {
    box-shadow: var(--shadow-ember);
  }

  .ink-divider {
    background: linear-gradient(90deg, transparent, hsl(var(--wood) / 0.6), transparent);
    height: 1px;
  }
}

@keyframes ember-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.animate-ember-pulse { animation: ember-pulse 2.4s ease-in-out infinite; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
