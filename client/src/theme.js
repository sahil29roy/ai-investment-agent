import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: { value: "#0D0F12" },
        surface: { value: "#16191D" },
        positive: { value: "#00D084" },
        negative: { value: "#FF4757" },
        border: { value: "#23272F" },
        text: {
          primary: { value: "#E2E8F0" },
          muted: { value: "#8A909C" },
        },
      },
      fonts: {
        body: { value: "'Inter', sans-serif" },
        heading: { value: "'Inter', sans-serif" },
        mono: { value: "'JetBrains Mono', 'IBM Plex Mono', monospace" },
      },
      radii: {
        xs: { value: "1px" },
        sm: { value: "2px" },
        md: { value: "2px" },
        lg: { value: "2px" },
      },
    },
  },
  globalCss: {
    "html, body": {
      backgroundColor: "#0D0F12",
      color: "#E2E8F0",
      fontFamily: "'Inter', sans-serif",
      fontSize: "13px",
      lineHeight: "1.4",
      margin: 0,
      padding: 0,
    },
    // Grayscale focus rings, custom thin scrollbars, etc. for terminal aesthetic
    ":focus-visible": {
      outline: "1px solid #8A909C !important",
      outlineOffset: "0px !important",
    },
  },
})

export const system = createSystem(defaultConfig, config)
export default system
