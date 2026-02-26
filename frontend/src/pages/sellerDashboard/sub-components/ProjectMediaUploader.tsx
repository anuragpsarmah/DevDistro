import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from "lucide-react";
import { MAX_IMAGES } from "../utils/constants";
import { ChangeEvent, useMemo, memo, useEffect, useRef } from "react";
import { ProjectMediaUploaderProps } from "../utils/types";

const ProjectMediaUploader = memo(function ProjectMediaUploader({
  images,
  setImages,
  video,
  setVideo,
  existingImages,
  setExistingImages,
  existingVideo,
  setExistingVideo,
}: ProjectMediaUploaderProps) {
  const imageUrlsRef = useRef<{ [key: string]: string }>({});
  const videoUrlRef = useRef<string | null>(null);

  const newImageUrls = useMemo(() => {
    const newUrls: string[] = [];

    images.forEach((image, index) => {
      if (!imageUrlsRef.current[image.name + index]) {
        imageUrlsRef.current[image.name + index] = URL.createObjectURL(image);
      }
      newUrls.push(imageUrlsRef.current[image.name + index]);
    });

    Object.entries(imageUrlsRef.current).forEach(([key, url]) => {
      if (!images.some((img, idx) => key === img.name + idx)) {
        URL.revokeObjectURL(url);
        delete imageUrlsRef.current[key];
      }
    });

    return newUrls;
  }, [images]);

  const newVideoUrl = useMemo(() => {
    if (video) {
      const newUrl = URL.createObjectURL(video);
      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
      }
      videoUrlRef.current = newUrl;
      return videoUrlRef.current;
    }
    if (videoUrlRef.current) {
      URL.revokeObjectURL(videoUrlRef.current);
      videoUrlRef.current = null;
    }
    return null;
  }, [video]);

  useEffect(() => {
    const imageUrls = { ...imageUrlsRef.current };
    const videoUrl = videoUrlRef.current;

    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, []);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const existingCount = existingImages?.length || 0;
    const totalImages = existingCount + images.length + files.length;

    if (totalImages <= MAX_IMAGES) {
      setImages((prevImages: File[]) => [...prevImages, ...(files as File[])]);
    }
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
      if (existingVideo && setExistingVideo) {
        setExistingVideo(null);
      }
    }
  };

  const removeNewImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    if (setExistingImages && existingImages) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const removeNewVideo = () => {
    setVideo(null);
  };

  const removeExistingVideo = () => {
    if (setExistingVideo) {
      setExistingVideo(null);
    }
  };

  const totalImagesCount = (existingImages?.length || 0) + images.length;

  return (
    <>
      <div>
        <Label className="font-space text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600 dark:text-gray-400 mt-10 mb-3 block flex items-center">
          Project Images
          <span className="text-[10px] text-gray-400 ml-2 tracking-widest">
            (UP TO {MAX_IMAGES} IMAGES)
          </span>
        </Label>
        <p className="font-space text-xs text-gray-500 mb-4 uppercase tracking-wider font-bold">
          Add screenshots or mockups showcasing key features
        </p>
        <div className="flex flex-wrap gap-4 mt-2">
          {existingImages?.map((url, index) => (
            <div key={`existing-${url}`} className="relative group">
              <img
                src={url}
                alt={`Existing project image ${index + 1}`}
                className="w-24 h-24 object-cover border-2 border-black/20 dark:border-white/20 transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={`Remove existing image ${index + 1}`}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}

          {newImageUrls.map((url, index) => (
            <div key={images[index].name + index} className="relative group">
              <img
                src={url}
                alt={`New project image ${index + 1}`}
                className="w-24 h-24 object-cover border-2 border-black/20 dark:border-white/20 transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => removeNewImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={`Remove new image ${index + 1}`}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}

          {totalImagesCount < MAX_IMAGES && (
            <label className="w-24 h-24 flex items-center justify-center bg-transparent border-2 border-dashed border-black/20 dark:border-white/20 cursor-pointer hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
                multiple
              />
              <Plus className="w-6 h-6 text-black dark:text-white" />
            </label>
          )}
        </div>
      </div>
      <div className="mt-10">
        <Label className="font-space text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600 dark:text-gray-400 mb-3 block flex items-center">
          Project Demo Video
          <span className="text-[10px] text-gray-400 ml-2 tracking-widest">(OPTIONAL)</span>
        </Label>
        <p className="font-space text-xs text-gray-500 mb-4 uppercase tracking-wider font-bold">
          Add a short demo video showcasing your project in action
        </p>
        {existingVideo ? (
          <div className="relative mt-2 border-2 border-black/20 dark:border-white/20 p-2 group bg-black/5 dark:bg-white/5 transition-colors duration-300">
            <video src={existingVideo} className="w-full" controls />
            <button
              type="button"
              onClick={removeExistingVideo}
              className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Remove existing video"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : newVideoUrl ? (
          <div className="relative mt-2 border-2 border-black/20 dark:border-white/20 p-2 group bg-black/5 dark:bg-white/5 transition-colors duration-300">
            <video src={newVideoUrl} className="w-full" controls />
            <button
              type="button"
              onClick={removeNewVideo}
              className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Remove new video"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center w-full h-40 mt-2 border-2 border-dashed border-black/20 dark:border-white/20 cursor-pointer hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="sr-only"
            />
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-black dark:text-white mb-2 transition-colors duration-300" />
              <span className="font-space text-xs text-black dark:text-white uppercase font-bold tracking-widest transition-colors duration-300">
                UPLOAD DEMO VIDEO (MAX 50MB)
              </span>
            </div>
          </label>
        )}
      </div>
    </>
  );
});

export default ProjectMediaUploader;
