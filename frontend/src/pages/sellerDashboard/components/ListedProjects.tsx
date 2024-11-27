import { MagicCard } from "@/components/ui/magic-card";
import { ListedProjectsProps } from "../utils/types";

const ListedProjects = ({ initialProjectData }: ListedProjectsProps) => {
  console.log(initialProjectData[0].project_images);
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {initialProjectData.map((project, idx) => (
        <MagicCard
          key={idx}
          className="bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 rounded-2xl p-6"
          gradientSize={300}
          gradientColor="#3B82F6"
          gradientOpacity={0.3}
        >
          <div className="relative mb-4">
            <img
              src={project.project_images}
              alt={project.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-xl">
              <h2 className="text-xl font-bold">{project.title}</h2>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-neutral-700 dark:text-neutral-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-xs rounded-full text-neutral-600 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </MagicCard>
      ))}
    </div>
  );
};

export default ListedProjects;
