import "./globals.css";
import "./Motion/motion.css";
import SiteMotion from "./Motion/SiteMotion";
import Footer from "./Footer/Footer";

export const metadata = {
  title: "Mertin Home Services LLC",
  description: "Home services, repairs, assembly, installation, cleaning, and renovation in Cape Coral, Florida, and surrounding areas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>{children}<Footer /><SiteMotion /></body>
    </html>
  );
}
