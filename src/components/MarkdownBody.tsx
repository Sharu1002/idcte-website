import ReactMarkdown from "react-markdown";

export default function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose-idcte max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
