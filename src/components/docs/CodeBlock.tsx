import { CopyButton } from "@/components/docs/CopyButton";

// Small line-based YAML highlighter — good enough for the fixed config
// examples we show in docs, without pulling in a syntax-highlighting library.
function renderYamlValue(value: string) {
  if (!value) return null;
  if (value === "|" || value === ">") return <span className="text-outline">{value}</span>;
  if (value === "true" || value === "false") {
    return <span className="text-[#c4abff]">{value}</span>;
  }
  if (/^-?\d+(\.\d+)?$/.test(value)) return <span className="text-[#c4abff]">{value}</span>;
  if (/^".*"$/.test(value)) return <span className="text-[#ffb4ab]">{value}</span>;
  return <span className="text-[#d4e4fa]">{value}</span>;
}

function renderYamlCode(code: string) {
  if (!code) return null;

  const listMatch = code.match(/^(-\s+)(.*)$/);
  if (listMatch) {
    return (
      <>
        <span className="text-outline">{listMatch[1]}</span>
        {renderYamlValue(listMatch[2])}
      </>
    );
  }

  const kvMatch = code.match(/^([\w.]+):(\s*)(.*)$/);
  if (kvMatch) {
    const [, key, sep, value] = kvMatch;
    return (
      <>
        <span className="text-[#89ceff]">{key}</span>
        <span className="text-[#94a3b8]">:</span>
        {sep}
        {renderYamlValue(value)}
      </>
    );
  }

  return <span className="text-[#d4e4fa]">{code}</span>;
}

function highlightYamlLine(line: string, key: number) {
  const indent = line.match(/^\s*/)?.[0] ?? "";
  const rest = line.slice(indent.length);

  if (rest.startsWith("#")) {
    return (
      <div key={key}>
        {indent}
        <span className="text-[#798098]">{rest}</span>
      </div>
    );
  }

  let codePart = rest;
  let commentPart = "";
  let inQuotes = false;
  for (let i = 0; i < rest.length; i++) {
    const ch = rest[i];
    if (ch === '"') inQuotes = !inQuotes;
    if (ch === "#" && !inQuotes) {
      codePart = rest.slice(0, i).trimEnd();
      commentPart = rest.slice(i);
      break;
    }
  }

  return (
    <div key={key}>
      {indent}
      {renderYamlCode(codePart)}
      {commentPart && (
        <>
          {"  "}
          <span className="text-[#798098]">{commentPart}</span>
        </>
      )}
    </div>
  );
}

export function CodeBlock({ filename, code }: { filename: string; code: string }) {
  const lines = code.split("\n");
  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/20 bg-[#0f172a] shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#1e293b] px-4 py-2">
        <span className="font-mono text-xs text-[#94a3b8]">{filename}</span>
        <CopyButton text={code} className="text-[#94a3b8] hover:text-[#e2e8f0]" />
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-relaxed text-[#d4e4fa]">
          <code>{lines.map((line, i) => highlightYamlLine(line, i))}</code>
        </pre>
      </div>
    </div>
  );
}
