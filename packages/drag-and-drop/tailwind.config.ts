import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "dnd-",
  theme: {},
} satisfies Config;

export default config;
