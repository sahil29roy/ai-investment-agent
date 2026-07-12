import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: { value: "#0F6E56" },
        bg: { value: "#FAFAF8" },
        surface: { value: "#FFFFFF" },
        border: { value: "#E2E8F0" },
        text: {
          primary: { value: "#1A202C" },
          muted: { value: "#718096" },
        },
        positive: { value: "#0F6E56" },
        negative: { value: "#E53E3E" },
      },
      fonts: {
        body: { value: "'Inter', sans-serif" },
        heading: { value: "'Inter', sans-serif" },
      },
      radii: {
        sm: { value: "6px" },
        md: { value: "8px" },
        lg: { value: "12px" },
        xl: { value: "16px" },
      },
      shadows: {
        sm: { value: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)" },
        md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" },
      },
    },
  },
  globalCss: {
    "html, body": {
      backgroundColor: "#FAFAF8",
      color: "#1A202C",
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
