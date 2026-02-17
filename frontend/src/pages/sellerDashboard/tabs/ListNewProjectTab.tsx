import { useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { user } from "@/utils/atom";
import {
  usePrivateReposInfiniteQuery,
  useTotalListedProjectsQuery,
  useInstallationStatusQuery,
} from "@/hooks/apiQueries";
import {
  PrivateRepoData,
  projectListingValidatedFormData,
  ProjectMediaMetadata,
  SellerDashboardTabTypes,
} from "../utils/types";
import PrivateRepoImport from "../main-components/PrivateRepoImport";
import ProjectListingForm from "../main-components/ProjectListingForm";
import GitHubAppInstallPrompt from "../main-components/GitHubAppInstallPrompt";
import { TransitionWrapper } from "../sub-components/TransitionWrapper";
import {
  usePreSignedUrlForProjectMediaUploadMutation,
  useValidateMediaUploadAndStoreProjectMutation,
} from "@/hooks/apiMutations";
import AnimatedLoadWrapper from "@/components/wrappers/AnimatedLoadWrapper";
import { FolderPlus, Loader2 } from "lucide-react";
import { errorToast, successToast } from "@/components/ui/customToast";
import { tryCatch } from "@/utils/tryCatch.util";

const backend_uri = import.meta.env.VITE_BACKEND_URI;

interface ListNewProjectTabProps {
  logout?: () => Promise<void>;
  setActiveTab: (curr: SellerDashboardTabTypes) => void;
}

export default function ListNewProjectTab({
  logout,
  setActiveTab,
}: ListNewProjectTabProps) {
  const [userData] = useRecoilState(user);
  const [isImportState, setIsImportState] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formProps, setFormProps] = useState<PrivateRepoData>({
    name: "",
    description: "",
    language: "",
    updated_at: "",
    github_repo_id: "",
    installation_id: undefined,
  });

  const queryClient = useQueryClient();

  const { data: installationStatus, isLoading: installationStatusLoading } =
    useInstallationStatusQuery({ logout });

  const {
    data: totalListedProjectsData,
    isLoading: totalListedProjectsDataLoading,
  } = useTotalListedProjectsQuery({ logout });

  const {
    data: repoData,
    isLoading: repoDataLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePrivateReposInfiniteQuery({ logout });

  const { mutateAsync: preSignedUrlMutate } =
    usePreSignedUrlForProjectMediaUploadMutation({
      logout,
    });

  const { mutateAsync: validationAndStoreMutate } =
    useValidateMediaUploadAndStoreProjectMutation({
      logout,
    });

  const allRepos = useMemo(() => {
    if (!repoData?.pages) return [];
    return repoData.pages.flatMap((page) => page.repos ?? []);
  }, [repoData]);

  const handleUIStateChange = (
    isImportState: boolean,
    newFormProps?: PrivateRepoData
  ) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsImportState(isImportState);
      if (newFormProps) {
        setFormProps(newFormProps);
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const [response, error] = await tryCatch(
      axios.get(
        `${backend_uri}/projects/getPrivateRepos?page=1&refreshStatus=true`,
        { withCredentials: true }
      )
    );

    if (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        errorToast("Too many refresh requests. Please wait.");
      }
      setIsRefreshing(false);
      return;
    }

    const data = response.data.data;

    if (data?.isRateLimited) {
      successToast(
        response.data.message || "Too many requests. Cached data fetched."
      );
    }

    queryClient.setQueryData(["privateRepoQuery"], () => ({
      pages: [data],
      pageParams: [1],
    }));

    setIsRefreshing(false);
  };

  const handleGetPreSignedUrls = async (
    metadata: Array<ProjectMediaMetadata>,
    existingImageCount: number,
    existingVideoCount: number,
    modificationType: string
  ) => {
    const response = await preSignedUrlMutate({
      metadata,
      existingImageCount,
      existingVideoCount,
      modificationType,
    });
    return response;
  };

  const handleValidateUploadAndStoreProject = async (
    projectData: projectListingValidatedFormData,
    modificationType: string
  ) => {
    const response = await validationAndStoreMutate({
      projectData,
      modificationType,
    });
    return response;
  };

  return (
    <AnimatedLoadWrapper>
      <div className="flex flex-col h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] mt-10 lg:mt-0 md:mt-0 pb-4 lg:pb-6">
        <div className="flex-shrink-0 mb-4 lg:mb-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <FolderPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                List New Project
              </h1>
              <p className="text-xs lg:text-sm text-gray-500">
                Import and list your project for sale
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative h-full bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-600/[0.02] pointer-events-none" />

            <div className="relative z-10 h-full overflow-y-auto p-4 lg:p-6 custom-scrollbar">
              {installationStatusLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
              ) : !installationStatus?.data?.hasInstallation ? (
                <GitHubAppInstallPrompt
                  installUrl={installationStatus?.data?.installUrl || ""}
                />
              ) : (
                <TransitionWrapper
                  isTransitioning={isTransitioning}
                  identifier={isImportState ? "import" : "form"}
                  className={isImportState ? "h-full flex flex-col" : ""}
                >
                  {isImportState ? (
                    <PrivateRepoImport
                      userData={userData}
                      privateRepoData={allRepos}
                      repoDataLoading={repoDataLoading}
                      totalListedProjectsDataLoading={
                        totalListedProjectsDataLoading
                      }
                      totalListedProjectsData={totalListedProjectsData}
                      setFormPropsAndSwitchUI={(props) =>
                        handleUIStateChange(false, props)
                      }
                      handleRefresh={handleRefresh}
                      isRefreshing={isRefreshing}
                      fetchNextPage={fetchNextPage}
                      hasNextPage={hasNextPage ?? false}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  ) : (
                    <ProjectListingForm
                      formProps={formProps}
                      setFormPropsAndSwitchUI={(props) =>
                        handleUIStateChange(true, props)
                      }
                      handleGetPreSignedUrls={handleGetPreSignedUrls}
                      handleValidateUploadAndStoreProject={
                        handleValidateUploadAndStoreProject
                      }
                      setActiveTab={setActiveTab}
                    />
                  )}
                </TransitionWrapper>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedLoadWrapper>
  );
}
