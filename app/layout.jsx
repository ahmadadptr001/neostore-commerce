import './globals.css';

export const metadata = {
  title: 'NeoStore | Your Next-Gen Shopping Experience',
  description: 'Belanja modern dengan gaya masa depan.',
};

export default function RootLayouGlobal({ children }) {
  return (
    <html lang="id" data-theme="corporate">
      <body className="bg-gradient-to-b from-base-200 via-base-100 to-base-300 min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
