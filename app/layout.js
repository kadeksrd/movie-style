import Navbar from "@components/header";
import "@styles/globals.css";
import { Poppins } from "next/font/google";
import dotenv from "dotenv";
import Footer from "@components/footer";

dotenv.config();

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

export const metadata = {
  title: "Movie Style",
  description: "Discover popular movie and series",
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
