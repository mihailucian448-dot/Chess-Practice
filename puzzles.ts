import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 md:pt-28 pb-16 text-center max-w-[1440px] mx-auto w-full relative">
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-ember/5 blur-[140px] rounded-full pointer-events-none"
        />
        <div className="relative animate-fade-up">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-tungsten-muted font-mono">
            Proiect de Atestat · Informatică
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[120px] leading-[0.9] font-medium tracking-tighter mt-8 text-tungsten text-balance">
            Liniște.
            <br />
            <span className="italic text-tungsten-muted">Concentrare.</span>
            <br />
            Șah.
          </h1>
          <p className="mt-10 text-tungsten-muted max-w-[52ch] mx-auto text-base md:text-lg leading-relaxed text-pretty">
            Un spațiu offline dedicat antrenamentului. Confruntă-te cu motorul Stockfish pe trei
            niveluri de dificultate sau șlefuiește-ți tactica pe puzzle-uri clasice — fără conexiune
            la internet, fără distrageri.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/joc"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ember text-tungsten text-sm tracking-[0.15em] uppercase font-medium transition-all hover:bg-ember-glow hover:ember-glow"
            >
              Începe o partidă <span aria-hidden>→</span>
            </Link>
            <Link
              to="/puzzle"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-wood/40 text-tungsten text-sm tracking-[0.15em] uppercase transition-colors hover:bg-mahogany-900/60"
            >
              Rezolvă puzzle-uri
            </Link>
          </div>
        </div>
      </section>

      <div className="ink-divider max-w-[1100px] mx-auto w-full" />

      {/* Modes */}
      <section className="px-6 md:px-12 py-24 max-w-[1200px] mx-auto w-full">
        <div className="flex items-end justify-between mb-12 border-b border-wood/30 pb-6">
          <h2 className="font-serif text-4xl md:text-5xl text-tungsten">Confruntarea</h2>
          <div className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ember opacity-60 animate-ember-pulse" />
              <span className="relative inline-flex rounded-full size-2 bg-ember" />
            </span>
            <span className="text-[10px] md:text-xs text-tungsten-muted font-mono uppercase tracking-widest">
              Stockfish · Activ
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-wood/20">
          {[
            {
              level: "Nivelul I",
              title: "Începător",
              piece: "♙",
              desc: "Analiză iertătoare. Ideal pentru asimilarea principiilor de deschidere și dezvoltarea vederii pe tablă.",
              q: "incepator",
              accent: false,
            },
            {
              level: "Nivelul II",
              title: "Intermediar",
              piece: "♘",
              desc: "Joc tactic ascuțit. Inexactitățile poziționale sunt pedepsite prompt.",
              q: "intermediar",
              accent: false,
            },
            {
              level: "Nivelul III",
              title: "Avansat",
              piece: "♛",
              desc: "Calcul la adâncime maximă. O simulare riguroasă a presiunii de turneu.",
              q: "avansat",
              accent: true,
            },
          ].map((m) => (
            <Link
              key={m.q}
              to={`/joc?dif=${m.q}`}
              className={`group bg-mahogany-900 p-8 md:p-10 flex flex-col gap-12 transition-all duration-500 hover:bg-mahogany-800 hover:-translate-y-1 ${
                m.accent ? "hover:ember-glow" : ""
              }`}
            >
              <div
                className={`text-6xl font-serif transition-colors duration-500 ${
                  m.accent ? "text-ember group-hover:text-ember-glow" : "text-wood group-hover:text-tungsten"
                }`}
              >
                {m.piece}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-tungsten-muted font-mono mb-3">
                  {m.level}
                </div>
                <h3 className="font-serif text-3xl text-tungsten mb-3">{m.title}</h3>
                <p className="text-sm text-tungsten-muted leading-relaxed">{m.desc}</p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-wood/15 pt-6">
                <span
                  className={`text-[10px] tracking-[0.25em] uppercase ${
                    m.accent ? "text-ember" : "text-wood-light group-hover:text-tungsten"
                  } transition-colors`}
                >
                  Inițiază
                </span>
                <span className={`${m.accent ? "text-ember" : "text-wood-light"} group-hover:translate-x-2 transition-transform`}>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Puzzles teaser */}
      <section className="px-6 md:px-12 py-16 max-w-[1100px] mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-mono">Studiu</span>
            <h2 className="font-serif text-4xl md:text-5xl text-tungsten mt-3">Arhiva de tactici</h2>
            <p className="text-tungsten-muted mt-6 leading-relaxed">
              Diagrame curate din partidele clasice — mat în 1, mat în 2, capcane de deschidere și
              finaluri de pioni. Exersează modele de gândire care apar la fiecare partidă.
            </p>
            <Link
              to="/puzzle"
              className="inline-flex items-center gap-3 mt-8 text-sm uppercase tracking-[0.2em] text-tungsten border-b border-wood/40 pb-1 hover:text-ember hover:border-ember transition-colors"
            >
              Deschide arhiva →
            </Link>
          </div>
          <div className="md:w-1/2 bg-mahogany-900 border border-wood/20 p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-ember/5 to-transparent pointer-events-none" />
            <blockquote className="font-serif text-2xl md:text-3xl text-tungsten italic leading-snug text-pretty">
              „Cel mai bun mod de a prezice viitorul este să îl creezi pe tabla de șah."
            </blockquote>
            <div className="mt-6 text-xs font-mono uppercase tracking-widest text-wood-light">
              — Garry Kasparov
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
