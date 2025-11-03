import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export const metadata = {
  title: 'NeoStor products - Your Next-Gen Shopping Experience',
  description: 'Pilih produk yang sesuai dengan Anda',
};

export default function RootLayoutLearn({ children }) {
  return (
      <div className="bg-gradient-to-b from-base-200 via-base-100 to-base-300 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
  );
}
