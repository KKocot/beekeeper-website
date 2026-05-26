import { createSignal, For, Show, type Component, type JSX } from "solid-js";

// --- Raw code strings for copy functionality ---

const tsCode = `import { createBeekeeper } from "@hiveio/beekeeper";

const beekeeper = await createBeekeeper();
const session = beekeeper.createSession("my.salt");

const wallet = await session.createWallet("my_wallet", "password123");

// Import a private key
await wallet.importKey("5JkFnXrLM2ap9t3AmAxBJvQHF7xSKtnTrCTginQCkhzU5Ls5Kgz");

// Sign a transaction digest
const signature = wallet.signDigest(
  "9a37a3a1e800f498035464c3e21e377a7a18dead30a8e01a68ca54860a1ed4ca"
);

console.log(signature.value);`;

const pyCode = `from beekeepy import Beekeeper

with Beekeeper.factory() as beekeeper, \\
    beekeeper.create_session() as session, \\
    session.create_wallet(name="my_wallet", password="secret") as wallet:

    # Import a private key
    public_key = wallet.import_key(
        private_key="5JkFnXrLM2ap9t3AmAxBJvQHF7xSKtnTrCTginQCkhzU5Ls5Kgz"
    )

    # Sign a transaction digest
    signature = wallet.sign_digest(
        digest="9a37a3a1e800f498035464c3e21e377a7a18dead30a8e01a68ca54860a1ed4ca",
        public_key=public_key
    )`;

const httpCode = `// Sign a digest
POST http://127.0.0.1:5001
{
  "jsonrpc": "2.0",
  "method": "beekeeper_api.sign_digest",
  "params": {
    "token": "SESSION_TOKEN",
    "sig_digest": "9a37a3a1e800...",
    "public_key": "STM6Lg..."
  },
  "id": 1
}

// Response
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "signature": "1f4a9b..."
  }
}`;

// --- Syntax-highlighted JSX builders ---

function kw(text: string): JSX.Element {
  return <span class="text-[#C792EA]">{text}</span>;
}

function str(text: string): JSX.Element {
  return <span class="text-accent">{text}</span>;
}

function fn(text: string): JSX.Element {
  return <span class="text-[#82AAFF]">{text}</span>;
}

function cmt(text: string): JSX.Element {
  return <span class="text-text-tertiary">{text}</span>;
}

function plain(text: string): JSX.Element {
  return <span class="text-text-primary">{text}</span>;
}

function TsHighlighted(): JSX.Element {
  return (
    <>
      {kw("import")} {plain("{ ")}
      {fn("createBeekeeper")}
      {plain(" }")} {kw("from")} {str('"@hiveio/beekeeper"')}{plain(";")}{"\n"}
      {"\n"}
      {kw("const")} {plain("beekeeper = ")}{kw("await")} {fn("createBeekeeper")}{plain("();")}{"\n"}
      {kw("const")} {plain("session = beekeeper.")}{fn("createSession")}{plain("(")}{str('"my.salt"')}{plain(");")}{"\n"}
      {"\n"}
      {kw("const")} {plain("wallet = ")}{kw("await")} {plain("session.")}{fn("createWallet")}{plain("(")}{str('"my_wallet"')}{plain(", ")}{str('"password123"')}{plain(");")}{"\n"}
      {"\n"}
      {cmt("// Import a private key")}{"\n"}
      {kw("await")} {plain("wallet.")}{fn("importKey")}{plain("(")}{str('"5JkFnXrLM2ap9t3AmAxBJvQHF7xSKtnTrCTginQCkhzU5Ls5Kgz"')}{plain(");")}{"\n"}
      {"\n"}
      {cmt("// Sign a transaction digest")}{"\n"}
      {kw("const")} {plain("signature = wallet.")}{fn("signDigest")}{plain("(")}{"\n"}
      {plain("  ")}{str('"9a37a3a1e800f498035464c3e21e377a7a18dead30a8e01a68ca54860a1ed4ca"')}{"\n"}
      {plain(");")}{"\n"}
      {"\n"}
      {plain("console.")}{fn("log")}{plain("(signature.value);")}
    </>
  );
}

function PythonHighlighted(): JSX.Element {
  return (
    <>
      {kw("from")} {plain("beekeepy ")} {kw("import")} {plain("Beekeeper")}{"\n"}
      {"\n"}
      {kw("with")} {plain("Beekeeper.")}{fn("factory")}{plain("() ")}{kw("as")} {plain("beekeeper, \\")}{"\n"}
      {plain("    beekeeper.")}{fn("create_session")}{plain("() ")}{kw("as")} {plain("session, \\")}{"\n"}
      {plain("    session.")}{fn("create_wallet")}{plain("(")}{plain("name=")}{str('"my_wallet"')}{plain(", password=")}{str('"secret"')}{plain(") ")}{kw("as")} {plain("wallet:")}{"\n"}
      {"\n"}
      {cmt("    # Import a private key")}{"\n"}
      {plain("    public_key = wallet.")}{fn("import_key")}{plain("(")}{"\n"}
      {plain("        private_key=")}{str('"5JkFnXrLM2ap9t3AmAxBJvQHF7xSKtnTrCTginQCkhzU5Ls5Kgz"')}{"\n"}
      {plain("    )")}{"\n"}
      {"\n"}
      {cmt("    # Sign a transaction digest")}{"\n"}
      {plain("    signature = wallet.")}{fn("sign_digest")}{plain("(")}{"\n"}
      {plain("        digest=")}{str('"9a37a3a1e800f498035464c3e21e377a7a18dead30a8e01a68ca54860a1ed4ca"')}{plain(",")}{"\n"}
      {plain("        public_key=public_key")}{"\n"}
      {plain("    )")}
    </>
  );
}

function HttpHighlighted(): JSX.Element {
  return (
    <>
      {cmt("// Sign a digest")}{"\n"}
      {kw("POST")} {plain("http://127.0.0.1:5001")}{"\n"}
      {plain("{")}{"\n"}
      {plain("  ")}{str('"jsonrpc"')}{plain(": ")}{str('"2.0"')}{plain(",")}{"\n"}
      {plain("  ")}{str('"method"')}{plain(": ")}{str('"beekeeper_api.sign_digest"')}{plain(",")}{"\n"}
      {plain("  ")}{str('"params"')}{plain(": {")}{"\n"}
      {plain("    ")}{str('"token"')}{plain(": ")}{str('"SESSION_TOKEN"')}{plain(",")}{"\n"}
      {plain("    ")}{str('"sig_digest"')}{plain(": ")}{str('"9a37a3a1e800..."')}{plain(",")}{"\n"}
      {plain("    ")}{str('"public_key"')}{plain(": ")}{str('"STM6Lg..."')}{"\n"}
      {plain("  },")}{"\n"}
      {plain("  ")}{str('"id"')}{plain(": 1")}{"\n"}
      {plain("}")}{"\n"}
      {"\n"}
      {cmt("// Response")}{"\n"}
      {plain("{")}{"\n"}
      {plain("  ")}{str('"jsonrpc"')}{plain(": ")}{str('"2.0"')}{plain(",")}{"\n"}
      {plain("  ")}{str('"id"')}{plain(": 1,")}{"\n"}
      {plain("  ")}{str('"result"')}{plain(": {")}{"\n"}
      {plain("    ")}{str('"signature"')}{plain(": ")}{str('"1f4a9b..."')}{"\n"}
      {plain("  }")}{"\n"}
      {plain("}")}
    </>
  );
}

// --- Tab definitions ---

interface Tab {
  label: string;
  badge?: string;
  lang: string;
  raw: string;
  highlighted: () => JSX.Element;
}

const tabs: Tab[] = [
  { label: "TypeScript", lang: "typescript", raw: tsCode, highlighted: TsHighlighted },
  { label: "Python", badge: "Linux only", lang: "python", raw: pyCode, highlighted: PythonHighlighted },
  { label: "HTTP API", lang: "json", raw: httpCode, highlighted: HttpHighlighted },
];

// --- Copy button component ---

function CopyCodeButton(props: { code: string }): JSX.Element {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = props.code;
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
      class="absolute right-3 top-3 rounded-md border border-border-subtle bg-bg-elevated p-1.5 text-text-tertiary transition hover:border-accent/40 hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/30"
      aria-label={copied() ? "Copied!" : "Copy code"}
    >
      <Show
        when={copied()}
        fallback={
          <svg
            width="16"
            height="16"
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
        }
      >
        <svg
          width="16"
          height="16"
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
      </Show>
    </button>
  );
}

// --- Main CodeTabs component ---

const CodeTabs: Component = () => {
  const [activeTab, setActiveTab] = createSignal(0);

  return (
    <div class="mx-auto max-w-3xl">
      {/* Tabs bar */}
      <div role="tablist" aria-label="Code examples" class="flex border-b border-border-subtle">
        <For each={tabs}>
          {(tab, i) => (
            <button
              type="button"
              onClick={() => setActiveTab(i())}
              class={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab() === i()
                  ? "border-b-2 border-accent text-accent"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
              aria-selected={activeTab() === i()}
              role="tab"
            >
              {tab.label}
              <Show when={tab.badge}>
                <span class="ml-1.5 rounded-full bg-accent-muted px-1.5 py-0.5 text-[0.625rem] font-medium leading-none text-accent">
                  {tab.badge}
                </span>
              </Show>
            </button>
          )}
        </For>
      </div>

      {/* Code panel */}
      <div class="relative">
        <For each={tabs}>
          {(tab, i) => (
            <div
              class="transition-opacity duration-200"
              style={{
                opacity: activeTab() === i() ? "1" : "0",
                position: activeTab() === i() ? "relative" : "absolute",
                top: activeTab() === i() ? "auto" : "0",
                left: activeTab() === i() ? "auto" : "0",
                right: activeTab() === i() ? "auto" : "0",
                "pointer-events": activeTab() === i() ? "auto" : "none",
              }}
              role="tabpanel"
              aria-hidden={activeTab() !== i()}
            >
              <div class="relative rounded-b-xl bg-code-bg">
                <CopyCodeButton code={tab.raw} />
                <pre class="overflow-x-auto p-6">
                  <code class="font-mono text-sm leading-relaxed">
                    {tab.highlighted()}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default CodeTabs;
