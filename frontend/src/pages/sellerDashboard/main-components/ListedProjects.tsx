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
import {
  Eye,
  EyeOff,
  Edit,
  Trash2,
  AlertTriangle,
  Loader2,
  XCircle,
  RefreshCw,
  RotateCcw,
  PackageCheck,
} from "lucide-react";
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
  handleRetryRepoZipUpload,
  handleRefreshRepoZipStatus,
  handleRefreshRepoZip,
  setFormProps,
}: ListedProjectsProps) => {
  const queryClient = useQueryClient();
  const [projectStatuses, setProjectStatuses] = useState<Array<boolean>>([]);
  const [togglingIndices, setTogglingIndices] = useState<Set<number>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [zipStatuses, setZipStatuses] = useState<Record<number, string>>({});
  const [refreshingIndices, setRefreshingIndices] = useState<Set<number>>(new Set());
  const [retryingIndices, setRetryingIndices] = useState<Set<number>>(new Set());
  const [refreshZipIndices, setRefreshZipIndices] = useState<Set<number>>(new Set());

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

  const handleRefreshStatus = async (idx: number) => {
    if (refreshingIndices.has(idx)) return;
    setRefreshingIndices((prev) => new Set(prev).add(idx));
    try {
      await handleRefreshRepoZipStatus(idx);
      setZipStatuses((prev) => {
        const next = { ...prev };
        delete next[idx];
        return next;
      });
    } finally {
      setRefreshingIndices((prev) => {
        const next = new Set(prev);
        next.delete(idx);
        return next;
      });
    }
  };

  const handleRetry = async (idx: number) => {
    if (retryingIndices.has(idx)) return;
    setRetryingIndices((prev) => new Set(prev).add(idx));
    try {
      await handleRetryRepoZipUpload(initialProjectData[idx].github_repo_id);
      setZipStatuses((prev) => ({ ...prev, [idx]: "PROCESSING" }));
    } finally {
      setRetryingIndices((prev) => {
        const next = new Set(prev);
        next.delete(idx);
        return next;
      });
    }
  };

  const getEffectiveZipStatus = (idx: number) => {
    return zipStatuses[idx] || initialProjectData[idx].repo_zip_status;
  };

  const handleRefreshZip = async (idx: number) => {
    if (refreshZipIndices.has(idx)) return;
    setRefreshZipIndices((prev) => new Set(prev).add(idx));
    try {
      await handleRefreshRepoZip(initialProjectData[idx].github_repo_id);
      setZipStatuses((prev) => ({ ...prev, [idx]: "PROCESSING" }));
    } finally {
      setRefreshZipIndices((prev) => {
        const next = new Set(prev);
        next.delete(idx);
        return next;
      });
    }
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
    <TooltipProvider delayDuration={0}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 pb-10">
        {initialProjectData.map((project, idx) => (
          <div key={idx} className="relative group bg-white dark:bg-[#050505] border-2 border-black dark:border-white p-4 lg:p-6 flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <div className="relative z-10 flex flex-col h-full">
              <div className="relative mb-6 border-2 border-black dark:border-white">
                <div className="absolute top-2 right-2 z-20 flex items-center space-x-2">
                  {!project.github_access_revoked && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Toggle
                          aria-label="Toggle project active status"
                          pressed={projectStatuses[idx]}
                          onPressedChange={() => handleProjectToggle(idx)}
                          className="bg-white dark:bg-[#050505] border-black dark:border-white text-black dark:text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-none border-2 transition-all duration-200 p-2 data-[state=on]:bg-black dark:data-[state=on]:bg-white data-[state=on]:text-white dark:data-[state=on]:text-black"
                        >
                          {projectStatuses[idx] ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Toggle>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-space font-bold uppercase tracking-widest text-[10px]"
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
                          className="bg-white dark:bg-[#050505] border-black dark:border-white text-black dark:text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-none border-2 transition-all duration-200 p-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-space font-bold uppercase tracking-widest text-[10px]"
                      >
                        Modify Project
                      </TooltipContent>
                    </Tooltip>
                  )}

                  {!project.github_access_revoked && getEffectiveZipStatus(idx) === "SUCCESS" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRefreshZip(idx)}
                          disabled={refreshZipIndices.has(idx)}
                          className="bg-white dark:bg-[#050505] border-black dark:border-white text-green-600 dark:text-green-400 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-white rounded-none border-2 transition-all duration-200 p-2 disabled:opacity-50"
                        >
                          <PackageCheck className={`h-4 w-4 ${refreshZipIndices.has(idx) ? "animate-spin" : ""}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-space font-bold uppercase tracking-widest text-[10px]"
                      >
                        Re-upload repository ZIP
                      </TooltipContent>
                    </Tooltip>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(idx)}
                        className="bg-white dark:bg-[#050505] border-black dark:border-white text-red-600 dark:text-red-400 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white rounded-none border-2 transition-all duration-200 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-space font-bold uppercase tracking-widest text-[10px]"
                    >
                      Delete Project
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="w-full h-48 overflow-hidden bg-black/5 dark:bg-white/5 relative">
                  <img
                    src={project.project_images}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${(!projectStatuses[idx] || project.github_access_revoked) ? "opacity-30 grayscale" : ""}`}
                  />
                  {(!projectStatuses[idx] || project.github_access_revoked) && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 dark:bg-white/10 backdrop-blur-[2px] overflow-hidden">
                      <div className="bg-red-500 text-white font-syne font-black uppercase text-xl md:text-2xl tracking-[0.3em] py-2 px-0 border-y-4 border-black dark:border-white w-[120%] text-center transform -rotate-6 shadow-2xl">
                        {project.github_access_revoked ? "REVOKED" : "INACTIVE"}
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md border-t-2 border-black dark:border-white p-3">
                  <h2 className="text-sm font-space font-bold uppercase tracking-widest truncate text-black dark:text-white">
                    {truncateText(project.title, 35)}
                  </h2>
                </div>
              </div>

              {project.github_access_revoked && (
                <div className="flex items-start gap-3 p-4 border-2 border-red-500 bg-red-500/5 mt-4 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] uppercase font-bold tracking-wider font-space text-red-600 dark:text-red-400 leading-tight">
                    GITHUB ACCESS REVOKED. REINSTALL APP TO RESTORE.
                  </p>
                </div>
              )}

              {getEffectiveZipStatus(idx) === "PROCESSING" && (
                <div className="flex items-center gap-3 p-4 border-2 border-blue-500 bg-blue-500/5 mt-4 mb-2">
                  <Loader2 className="h-4 w-4 text-blue-500 animate-spin flex-shrink-0" />
                  <span className="text-[10px] uppercase font-bold tracking-wider font-space text-blue-600 dark:text-blue-400 flex-grow">
                    PACKAGING REPOSITORY...
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleRefreshStatus(idx)}
                        disabled={refreshingIndices.has(idx)}
                        className="p-1.5 hover:bg-blue-500/10 border-2 border-transparent transition-colors disabled:opacity-50 text-blue-500"
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${refreshingIndices.has(idx) ? "animate-spin" : ""}`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-space font-bold uppercase tracking-widest text-[10px]"
                    >
                      Refresh status
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {getEffectiveZipStatus(idx) === "FAILED" && (
                <div className="flex items-center gap-3 p-4 border-2 border-red-500 bg-red-500/5 mt-4 mb-2">
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="text-[10px] uppercase font-bold tracking-wider font-space text-red-600 dark:text-red-400 flex-grow">
                    UPLOAD FAILED
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleRetry(idx)}
                        disabled={retryingIndices.has(idx)}
                        className="p-1.5 hover:bg-red-500/10 border-2 border-transparent transition-colors disabled:opacity-50 text-red-500"
                      >
                        <RotateCcw
                          className={`h-4 w-4 ${retryingIndices.has(idx) ? "animate-spin" : ""}`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-space font-bold uppercase tracking-widest text-[10px]"
                    >
                      Retry upload
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleRefreshStatus(idx)}
                        disabled={refreshingIndices.has(idx)}
                        className="p-1.5 hover:bg-red-500/10 border-2 border-transparent transition-colors disabled:opacity-50 text-red-500"
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${refreshingIndices.has(idx) ? "animate-spin" : ""}`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-none font-space font-bold uppercase tracking-widest text-[10px]"
                    >
                      Refresh status
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              <div className="flex flex-col flex-grow mt-4 space-y-4">
                <p
                  className={`
                  text-sm font-space text-gray-700 dark:text-gray-300
                  line-clamp-3
                  ${!projectStatuses[idx] || project.github_access_revoked ? "opacity-50" : ""}
                `}
                >
                  {truncateText(project.description, 120)}
                </p>
                <div className="mt-auto pt-4 border-t-2 border-black/10 dark:border-white/10">
                  {RenderTechStack(project.tech_stack)}
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
