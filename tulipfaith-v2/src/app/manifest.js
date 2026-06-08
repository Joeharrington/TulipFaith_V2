export default function manifest() {
  return {
    name: "Tulip Faith",
    short_name: "TulipFaith",
    description: "Faith formation, serialized fiction, Bible study, and prayer.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#2E1045",
    categories: ["books", "education", "lifestyle"],
    icons: [
      {
        src: "/images/Tulip_Faith_Logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
