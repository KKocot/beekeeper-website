import { createSignal, type Component } from "solid-js";

const CopyButton: Component = () => {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install @hiveio/beekeeper");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = "npm install @hiveio/beekeeper";
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      class="group flex items-center gap-3 rounded-lg border border-border-subtle bg-code-bg px-4 py-3 font-mono text-sm transition hover:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/30"
      aria-label={copied() ? "Copied!" : "Copy npm install command"}
    >
      <span class="text-text-tertiary select-none">$</span>
      <span class="text-text-primary">npm install @hiveio/beekeeper</span>
      <span class="ml-1 flex-shrink-0 text-text-tertiary transition group-hover:text-text-secondary">
        {copied() ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-success"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default CopyButton;
