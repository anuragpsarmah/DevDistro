import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ListedProjectsProps } from "../utils/types";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, EyeOff, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorScreenListedProjects } from "../sub-components/ErrorScreens";
import { NoProjectsScreen } from "../sub-components/NoProjectsScreen";
import { RenderTechStack } from "../sub-components/RenderTechStack";
import { DeleteConfirmationModal } from "../sub-components/DeleteConfirmationModal";
import { ListedProjectSkeleton } from "../sub-components/Skeletons";

const ListedProjects = ({
  initialProjectData,
  isLoading,
  isError,
  handleToggleProjectListing,
  handleDeleteProjectListing,
  handleUIStateChange,
  setFormProps,
}: ListedProjectsProps) => {
  const queryClient = useQueryClient();
  const [projectStatuses, setProjectStatuses] = useState<Array<boolean>>([]);
  const [togglingIndices, setTogglingIndices] = useState<Set<number>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (initialProjectData && !isLoading && !isError) {
      setProjectStatuses(initialProjectData.map((data) => data.isActive));
    }
  }, [initialProjectData, isLoading, isError]);

  const handleProjectToggle = async (index: number) => {
    if (togglingIndices.has(index)) return;

    setTogglingIndices((prev) => new Set(prev).add(index));
    const response = await handleToggleProjectListing(
      initialProjectData[index].github_repo_id
    );
    if (response) {
      setProjectStatuses((prev) => {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
      });
    }
    setTogglingIndices((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const handleDeleteClick = (index: number) => {
    setProjectToDelete(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete !== null) {
      const response = await handleDeleteProjectListing(
        initialProjectData[projectToDelete].github_repo_id
      );
      if (response) {
        queryClient.invalidateQueries({ queryKey: ["initialProjectDataQuery"] });
      }
    }
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleEditProject = (idx: number) => {
    const { project_images, ...other_props } = initialProjectData[idx];
    setFormProps((prev) => {
      return { ...prev, ...other_props };
    });
    handleUIStateChange("form", other_props.github_repo_id);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 p-4 lg:p-6">
        {[...Array(6)].map((_, index) => (
          <ListedProjectSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) return <ErrorScreenListedProjects />;

  if (initialProjectData.length === 0) return <NoProjectsScreen />;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 p-4 lg:p-6">
        {initialProjectData.map((project, idx) => (
          <div key={idx} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-xl rounded-2xl pointer-events-none" />
            <div className="relative bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-4 lg:p-5 transition-all duration-300 ease-in-out flex flex-col hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-600/[0.02] pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="relative mb-4">
              <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
                {!project.github_access_revoked && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Toggle
                        aria-label="Toggle project active status"
                        pressed={projectStatuses[idx]}
                        onPressedChange={() => handleProjectToggle(idx)}
                        className="bg-white/10 hover:bg-white/20 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-200 p-1.5"
                      >
                        {projectStatuses[idx] ? (
                          <Eye className="h-4 w-4 text-gray-300" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        )}
                      </Toggle>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-gray-900/95 backdrop-blur-xl text-gray-200 border-white/10"
                    >
                      {projectStatuses[idx] ? "Unlist Project" : "List Project"}
                    </TooltipContent>
                  </Tooltip>
                )}

                {!project.github_access_revoked && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProject(idx)}
                        className="bg-white/10 hover:bg-white/20 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-200 p-1.5"
                      >
                        <Edit className="h-4 w-4 text-gray-300" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-gray-900/95 backdrop-blur-xl text-gray-200 border-white/10"
                    >
                      Modify Project
                    </TooltipContent>
                  </Tooltip>
                )}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(idx)}
                      className="bg-white/10 hover:bg-red-500/20 rounded-lg border border-white/5 hover:border-red-500/30 transition-all duration-200 p-1.5"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-gray-900/95 backdrop-blur-xl text-gray-200 border-white/10"
                  >
                    Delete Project
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="w-full h-48 overflow-hidden rounded-xl border border-white/5">
                <img
                  src={project.project_images}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{
                    opacity: projectStatuses[idx] && !project.github_access_revoked ? 1 : 0.5,
                    filter: projectStatuses[idx] && !project.github_access_revoked ? "none" : "grayscale(80%)",
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-2 rounded-b-xl">
                <h2 className="text-xl font-bold truncate">
                  {truncateText(project.title, 25)}
                </h2>
              </div>
            </div>

            {project.github_access_revoked && (
              <div className="flex items-start gap-2 px-3 py-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/90">
                  GitHub access revoked. Reinstall the GitHub App with access to this repository to restore.
                </p>
              </div>
            )}

            <div className="flex flex-col flex-grow space-y-4">
              <p
                className={`
                  text-gray-300
                  line-clamp-3
                  ${!projectStatuses[idx] || project.github_access_revoked ? "opacity-50" : ""}
                `}
              >
                {truncateText(project.description, 120)}
              </p>
              <div className="mt-auto">
                {RenderTechStack(project.tech_stack)}
              </div>
            </div>
              </div>
            </div>
          </div>
        ))}

        <DeleteConfirmationModal
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </TooltipProvider>
  );
};

export default ListedProjects;
