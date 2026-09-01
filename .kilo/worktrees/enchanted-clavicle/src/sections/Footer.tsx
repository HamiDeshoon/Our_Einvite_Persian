export default function Footer() {
  return (
    <footer
      className="relative py-[60px]"
      style={{
        zIndex: 10,
        background: 'var(--color-cream)',
        borderTop: '1px solid rgba(212, 165, 116, 0.3)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <h3
          className="font-serif text-[24px] font-light mb-2"
          style={{ color: 'var(--color-espresso)' }}
        >
          Fatemeh &amp; Hamid
        </h3>

        <p
          className="font-sans text-[14px] font-light tracking-[0.1em] mb-4"
          style={{ color: 'var(--color-taupe)' }}
        >
          13 . 08 . 2026
        </p>

        <p
          className="font-serif italic text-[16px]"
          style={{ color: 'var(--color-gold)' }}
        >
          With love and gratitude
        </p>
      </div>
    </footer>
  );
}
