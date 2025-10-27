export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-16 border-t border-base-300">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <aside>
          <h2 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            NeoTstore
          </h2>
          <p className="text-sm leading-relaxed text-base-content/70">
            Solusi belanja digital masa kini.  
            Produk berkualitas, pelayanan cepat, dan pengalaman berbelanja modern.
          </p>
        </aside>

        {/* Layanan */}
        <nav>
          <h6 className="footer-title mb-3">Layanan</h6>
          <ul className="space-y-2">
            <li><a href="#" className="link link-hover">Pengiriman</a></li>
            <li><a href="#" className="link link-hover">Bantuan</a></li>
            <li><a href="#" className="link link-hover">Garansi</a></li>
          </ul>
        </nav>

        {/* Perusahaan */}
        <nav>
          <h6 className="footer-title mb-3">Perusahaan</h6>
          <ul className="space-y-2">
            <li><a href="#" className="link link-hover">Tentang Kami</a></li>
            <li><a href="#" className="link link-hover">Karir</a></li>
            <li><a href="#" className="link link-hover">Kontak</a></li>
          </ul>
        </nav>

        {/* Sosial Media */}
        <nav>
          <h6 className="footer-title mb-3">Sosial</h6>
          <ul className="space-y-2">
            <li><a href="#" className="link link-hover">Instagram</a></li>
            <li><a href="#" className="link link-hover">Twitter</a></li>
            <li><a href="#" className="link link-hover">Facebook</a></li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-base-300 py-6 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()} <span className="font-semibold text-primary">NeoTstore</span>. Semua hak dilindungi.
      </div>
    </footer>
  );
}
