import { createSignal, onMount, onCleanup, type Component } from "solid-js";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "API", href: "#api" },
  { label: "Endpoints", href: "#endpoints" },
  { label: "Comparison", href: "#comparison" },
  { label: "Getting Started", href: "#getting-started" },
] as const;

const MobileNav: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeSection, setActiveSection] = createSignal("");

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleSectionChange = (e: Event) => {
    const detail = (e as CustomEvent<{ section: string }>).detail;
    setActiveSection(detail.section);
  };

  onMount(() => {
    window.addEventListener("sectionchange", handleSectionChange);
    onCleanup(() => {
      window.removeEventListener("sectionchange", handleSectionChange);
    });
  });

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
                class={`border-l-2 py-3 pl-3 text-base transition hover:text-text-primary ${
                  activeSection() === link.href.slice(1)
                    ? "border-accent text-text-primary"
                    : "border-transparent text-text-secondary"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div class="mt-3 flex items-center justify-center gap-4 border-t border-border-subtle pt-3">
              <a
                href="https://gitlab.syncad.com/hive/beekeeper"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                class="flex items-center gap-2 text-sm text-text-secondary transition hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 0 0-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 0 0-.867 0L1.387 9.452.045 13.587a.924.924 0 0 0 .331 1.023L12 23.054l11.624-8.443a.92.92 0 0 0 .331-1.024"/>
                </svg>
                GitLab
              </a>
              <a
                href="https://www.npmjs.com/package/@hiveio/beekeeper"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                class="flex items-center gap-2 text-sm text-text-secondary transition hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
                </svg>
                npm
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
