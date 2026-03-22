import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

export function ListingBody({ blocks }: { blocks: PortableTextBlock[] }) {
  return (
    <div className="max-w-none">
      <PortableText
        value={blocks}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="mb-4 leading-relaxed text-slate-300">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="mb-4 mt-4 font-display text-2xl text-white">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-3 mt-3 font-display text-xl text-white">
                {children}
              </h3>
            ),
          },
        }}
      />
    </div>
  );
}
