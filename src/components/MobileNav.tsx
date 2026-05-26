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
            <div class="mt-3 flex items-center justify-center gap-6 border-t border-border-subtle pt-3">
              <a
                href="https://gitlab.syncad.com/hive/beekeeper"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                aria-label="GitLab Repository"
                class="text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                <svg class="size-7" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 30.4L21.3 14.1H10.7L16 30.4Z"/><path d="M16 30.4L10.7 14.1H2.4L16 30.4Z" opacity="0.7"/><path d="M2.4 14.1L0.5 20.1C0.3 20.7 0.5 21.4 1 21.8L16 30.4L2.4 14.1Z" opacity="0.5"/><path d="M2.4 14.1H10.7L7.4 3.9C7.2 3.3 6.4 3.3 6.2 3.9L2.4 14.1Z"/><path d="M16 30.4L21.3 14.1H29.6L16 30.4Z" opacity="0.7"/><path d="M29.6 14.1L31.5 20.1C31.7 20.7 31.5 21.4 31 21.8L16 30.4L29.6 14.1Z" opacity="0.5"/><path d="M29.6 14.1H21.3L24.6 3.9C24.8 3.3 25.6 3.3 25.8 3.9L29.6 14.1Z"/></svg>
              </a>
              <a
                href="https://www.npmjs.com/package/@hiveio/beekeeper"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                aria-label="npm Package"
                class="text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                <svg class="size-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
