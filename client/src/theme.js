import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: { value: "#FAF7F2" },
        surface: { value: "#FAF7F2" },
        border: { value: "#1A1A18" },
        text: {
          primary: { value: "#1A1A18" },
          muted: { value: "#575756" },
        },
        positive: { value: "#1C7B5D" },
        negative: { value: "#C53030" },
      },
      fonts: {
        body: { value: "'Inter', sans-serif" },
        heading: { value: "'Source Serif 4', Georgia, serif" },
        sans: { value: "'Inter', sans-serif" },
      },
      radii: {
        sm: { value: "0px" },
        md: { value: "0px" },
        lg: { value: "0px" },
        xl: { value: "0px" },
      },
      shadows: {
        sm: { value: "none" },
        md: { value: "none" },
      },
    },
  },
  globalCss: {
    "html, body": {
      backgroundColor: "#FAF7F2",
      color: "#1A1A18",
      fontFamily: "'Inter', sans-serif",
      fontSize: "15px",
      lineHeight: "1.6",
      margin: 0,
      padding: 0,
      WebkitFontSmoothing: "antialiased",
    },
  },
})

export const system = createSystem(defaultConfig, config)
export default system
