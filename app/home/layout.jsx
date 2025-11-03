import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'NeoStore home | Your Next-Gen Shopping Experience',
  description: 'Belanja modern dengan gaya masa depan.',
};

export default function RootLayoutHome({ children }) {
  return (
      <div className="bg-gradient-to-b from-base-200 via-base-100 to-base-300 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
  );
}
