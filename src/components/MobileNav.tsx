import { createSignal, type Component } from "solid-js";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Getting Started", href: "#getting-started" },
  { label: "Endpoints", href: "#endpoints" },
  { label: "API", href: "#api" },
] as const;

const MobileNav: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <div class="md:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen() ? "Close menu" : "Open menu"}
        aria-expanded={isOpen()}
        class="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition hover:text-text-primary"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          {isOpen() ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen() && (
        <div class="fixed inset-x-0 top-16 z-40 border-b border-border-subtle bg-bg-elevated">
          <nav aria-label="Mobile navigation" class="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                href={link.href}
                onClick={close}
                class="py-3 text-base text-text-secondary transition hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://gitlab.syncad.com/hive/beekeeper"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              class="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-center font-semibold text-bg-primary transition hover:bg-accent-hover"
            >
              Source Code
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
