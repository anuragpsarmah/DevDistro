import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
} from "lucide-react";
import type { TreeNode } from "@/utils/types";

interface FileTreeNodeProps {
  node: TreeNode;
  depth: number;
}

function FileTreeNode({ node, depth }: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const paddingLeft = depth * 16;

  if (node.type === "file") {
    return (
      <div
        className="flex items-center gap-1.5 py-0.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        style={{ paddingLeft: `${paddingLeft + 4}px` }}
      >
        <FileText className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
        <span className="font-mono text-xs text-black dark:text-white truncate">
          {node.name}
        </span>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-1.5 py-0.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
        style={{ paddingLeft: `${paddingLeft + 4}px` }}
      >
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
        )}
        {isOpen ? (
          <FolderOpen className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
        ) : (
          <Folder className="w-3.5 h-3.5 flex-shrink-0 text-black dark:text-white" />
        )}
        <span className="font-mono text-xs font-bold text-black dark:text-white truncate">
          {node.name}
        </span>
      </button>

      {isOpen && node.children && node.children.length > 0 && (
        <div className="border-l-2 border-black/20 dark:border-white/20 ml-4" style={{ marginLeft: `${paddingLeft + 12}px` }}>
          {node.children.map((child, idx) => (
            <FileTreeNode key={`${child.name}-${idx}`} node={child} depth={0} />
          ))}
        </div>
      )}
    </div>
  );
}

interface FileTreeProps {
  node: TreeNode;
}

export default function FileTree({ node }: FileTreeProps) {
  const children = node.children ?? [];

  if (children.length === 0) {
    return (
      <p className="font-space text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        No files found in repository.
      </p>
    );
  }

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-[#050505] overflow-auto max-h-96 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
      <div className="py-2">
        {children.map((child, idx) => (
          <FileTreeNode key={`${child.name}-${idx}`} node={child} depth={0} />
        ))}
      </div>
    </div>
  );
}
