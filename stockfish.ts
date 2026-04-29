import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Acasă" },
  { to: "/joc", label: "Joacă" },
  { to: "/puzzle", label: "Puzzle-uri" },
  { to: "/despre", label: "Despre" },
];

export const SiteHeader = () => {
  const { pathname } = useLocation();
  return (
    <header className="w-full px-6 md:px-12 py-6 flex justify-between items-center max-w-[1440px] mx-auto relative z-20">
      <Link to="/" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-tungsten">
        Chess Practice
      </Link>
      <nav className="flex items-center gap-6 md:gap-10">
        {links.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm tracking-wide transition-colors hover:text-tungsten ${
                active ? "text-tungsten" : "text-tungsten-muted"
              }`}
            >
              {l.label}
              {active && <span className="block h-px bg-ember mt-1" />}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
