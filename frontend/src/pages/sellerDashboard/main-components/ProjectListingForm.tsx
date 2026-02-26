import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Import } from "lucide-react";
import { ProjectListingFormProps, ProjectType } from "../utils/types";
import { useProjectSubmission } from "../hooks/useProjectSubmission";
import UploadOverlay from "../sub-components/UploadOverlay";
import ProjectGeneralInfo from "../sub-components/ProjectGeneralInfo";
import ProjectMediaUploader from "../sub-components/ProjectMediaUploader";
import ProjectPriceSelection from "../sub-components/ProjectPriceSelection";

export default function ProjectListingForm({
  formProps,
  setFormPropsAndSwitchUI,
  handleGetPreSignedUrls,
  handleValidateUploadAndStoreProject,
  setActiveTab,
}: ProjectListingFormProps) {
  const title = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState(formProps.description || "");
  const [projectType, setProjectType] =
    useState<ProjectType>("Web Application");
  const [techStack, setTechStack] = useState<string[]>([formProps.language]);
  const [techInput, setTechInput] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [price, setPrice] = useState<number>(0.1);

  const handleDifferentProjectImport = () => {
    setFormPropsAndSwitchUI({
      name: "",
      description: "",
      language: "",
      updated_at: "",
      github_repo_id: "",
      installation_id: undefined,
    });
  };

  const { handleSubmit, isSubmitting, uploadProgress } = useProjectSubmission({
    handleGetPreSignedUrls,
    handleValidateUploadAndStoreProject,
    modificationType: "new",
    setActiveTab,
    onRepoAccessError: handleDifferentProjectImport,
    github_repo_id: formProps.github_repo_id,
    installation_id: formProps.installation_id,
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
    });
  };

  return (
    <div>
      {isSubmitting && <UploadOverlay uploadProgress={uploadProgress} />}

      <div className="space-y-6">
        <div className="rounded-xl">
          <div className="space-y-6">
            <div className="flex justify-end mb-8">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-3 px-6 py-4 bg-transparent border-2 border-black dark:border-white text-black dark:text-white font-space font-bold uppercase tracking-widest text-[10px] md:text-sm rounded-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                onClick={handleDifferentProjectImport}
              >
                <Import className="w-4 h-4" />
                Import Different Project
              </Button>
            </div>

            <ProjectGeneralInfo
              setDescription={setDescription}
              setTechInput={setTechInput}
              setTechStack={setTechStack}
              setProjectType={setProjectType}
              setLiveLink={setLiveLink}
              defaultTitle={formProps.name}
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
            />

            <ProjectPriceSelection price={price} setPrice={setPrice} />

            <Button
              type="button"
              className="w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-space font-bold uppercase tracking-widest text-[10px] md:text-sm rounded-none border-2 border-transparent hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-black dark:hover:border-white transition-colors duration-300 mt-12"
              onClick={onSubmit}
            >
              Submit Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
