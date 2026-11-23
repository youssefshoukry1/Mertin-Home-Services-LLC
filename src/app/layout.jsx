import "./globals.css";
import "./Motion/motion.css";
import SiteMotion from "./Motion/SiteMotion";
import Footer from "./Footer/Footer";
import WhatsApp from "./WhatsApp/WhatsApp";

export const metadata = {
  title: "Mertin Home Services LLC",
  description: "Property maintenance, repairs, installation, cleaning, and renovation for property owners, managers, and businesses in Cape Coral, Florida.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>{children}<Footer /><WhatsApp /><SiteMotion /></body>
    </html>
  );
}
