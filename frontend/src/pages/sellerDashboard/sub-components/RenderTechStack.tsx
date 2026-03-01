export const RenderTechStack = (
  techStack: string[],
  maxVisible: number = 3
) => {
  if (!techStack || techStack.length === 0) return null;

  const visibleTechs = techStack.slice(0, maxVisible);
  const extraTechs = techStack.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {visibleTechs.map((tech) => (
        <span
          key={tech}
          className="px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black font-space font-bold uppercase tracking-wider text-[10px] border-2 border-transparent truncate max-w-[100px]"
        >
          {tech}
        </span>
      ))}
      {extraTechs > 0 && (
        <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-space font-bold uppercase tracking-wider text-[10px] border-2 border-black dark:border-white">
          +{extraTechs}
        </span>
      )}
    </div>
  );
};
