export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4f46e5", // Indigo-600 - More vibrant blue
          secondary: "#7c3aed", // Violet-600 - Rich purple
          accent: "#0ea5e9", // Sky-500 - Bright blue
          neutral: "#334155", // Slate-700 - Softer neutral
          "base-100": "#ffffff", // White
          "base-200": "#f8fafc", // Slate-50 - Crisp background
          "base-300": "#f1f5f9", // Slate-100 - Subtle contrast
          info: "#06b6d4", // Cyan-500 - Clear info
          success: "#10b981", // Emerald-500 - Fresh green
          warning: "#f59e0b", // Amber-500 - Warm warning
          error: "#ef4444", // Red-500 - Clear error
        },
        dark: {
          primary: "#818cf8", // Indigo-400 - Glowing indigo
          secondary: "#a78bfa", // Violet-400 - Bright violet
          accent: "#38bdf8", // Sky-400 - Electric blue
          neutral: "#94a3b8", // Slate-400 - Softer contrast
          "base-100": "#0f172a", // Slate-900 - Deep background
          "base-200": "#1e293b", // Slate-800 - Rich contrast
          "base-300": "#334155", // Slate-700 - Elevated surfaces
          info: "#22d3ee", // Cyan-400 - Bright info
          success: "#34d399", // Emerald-400 - Vibrant success
          warning: "#fbbf24", // Amber-400 - Bright warning
          error: "#fb7185", // Rose-400 - Soft error
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
  },
};
