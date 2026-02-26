import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { ProjectModificationFormProps, ProjectType } from "../utils/types";
import { useProjectSubmission } from "../hooks/useProjectSubmission";
import { useQueryClient } from "@tanstack/react-query";
import UploadOverlay from "../sub-components/UploadOverlay";
import ProjectGeneralInfo from "../sub-components/ProjectGeneralInfo";
import ProjectMediaUploader from "../sub-components/ProjectMediaUploader";
import ProjectPriceSelection from "../sub-components/ProjectPriceSelection";

export default function ProjectModificationForm({
  formProps,
  setFormProps,
  handleUIStateChange,
  handleGetPreSignedUrls,
  handleValidateUploadAndStoreProject,
  setActiveTab,
}: ProjectModificationFormProps) {
  const title = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState(formProps.description || "");
  const [projectType, setProjectType] =
    useState<ProjectType>((formProps.project_type as ProjectType) || "Web Application");
  const [techStack, setTechStack] = useState<string[]>(formProps.tech_stack);
  const [techInput, setTechInput] = useState("");
  const [liveLink, setLiveLink] = useState(formProps.live_link || "");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [price, setPrice] = useState(formProps.price || 299);
  const [existingImages, setExistingImages] = useState<string[]>(
    formProps.project_images
  );
  const [existingVideo, setExistingVideo] = useState<string | null>(
    formProps.project_video || null
  );

  const queryClient = useQueryClient();

  const handleReturnToAllListings = () => {
    queryClient.invalidateQueries({ queryKey: ["initialProjectDataQuery"] });

    setFormProps({
      github_repo_id: "",
      isActive: false,
      title: "",
      description: "",
      tech_stack: [],
      live_link: "",
      price: 0,
      project_images: [],
      project_type: "",
      project_video: "",
    });

    handleUIStateChange("projects");
  };

  const { handleSubmit, isSubmitting, uploadProgress } = useProjectSubmission({
    handleGetPreSignedUrls,
    handleValidateUploadAndStoreProject,
    modificationType: "existing",
    setActiveTab,
    handleReturnToAllListings,
    onRepoAccessError: handleReturnToAllListings,
    github_repo_id: formProps.github_repo_id || "",
    installation_id: formProps.github_installation_id,
  });

  const onSubmit = () => {
    handleSubmit({
      title: title.current?.value || "",
      description,
      projectType,
      techStack,
      liveLink,
      images,
      video,
      price,
      existingImages,
      existingVideo,
    });
  };

  return (
    <div>
      {isSubmitting && <UploadOverlay uploadProgress={uploadProgress} />}

      <div className="space-y-6">
        <div>
          <div className="space-y-6">
            <div className="flex justify-end mb-8">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-3 px-6 py-4 bg-transparent border-2 border-black dark:border-white text-black dark:text-white font-space font-bold uppercase tracking-widest text-[10px] md:text-sm rounded-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                onClick={handleReturnToAllListings}
              >
                <Undo2 className="w-4 h-4" />
                Undo Changes
              </Button>
            </div>

            <ProjectGeneralInfo
              setDescription={setDescription}
              setTechInput={setTechInput}
              setTechStack={setTechStack}
              setProjectType={setProjectType}
              setLiveLink={setLiveLink}
              defaultTitle={formProps.title}
              description={description}
              techInput={techInput}
              techStack={techStack}
              projectType={projectType}
              liveLink={liveLink}
              title={title}
            />

            <ProjectMediaUploader
              images={images}
              setImages={setImages}
              video={video}
              setVideo={setVideo}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
              existingVideo={existingVideo}
              setExistingVideo={setExistingVideo}
            />

            <ProjectPriceSelection price={price} setPrice={setPrice} />

            <Button
              type="button"
              className="w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-space font-bold uppercase tracking-widest text-[10px] md:text-sm rounded-none border-2 border-transparent hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-black dark:hover:border-white transition-colors duration-300 mt-12"
              onClick={onSubmit}
            >
              Submit Modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

