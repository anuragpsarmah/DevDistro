import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { JOB_ROLES } from "../utils/constants";
import { AccountInformationProps } from "../utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  FormFieldSkeleton,
  ReviewSectionSkeleton,
} from "../sub-components/Skeletons";
import { CitySearchInput } from "../sub-components/CitySearchInput";
import { ReviewSection } from "../sub-components/ReviewSection";

export default function AccountInformation({
  isInitialLoading,
  activeUserData,
  profileInformationData,
  setProfileInformationData,
  selectedJobRole,
  setSelectedJobRole,
  cityInput,
  setCityInput,
  cities,
  isLoadingCities,
  cityError,
  handleCitySelect,
  showSuggestions,
  setShowSuggestions,
  review,
  rating,
  handleReviewChange,
  setRating,
}: AccountInformationProps) {
  return (
    <>
      <div className="w-full h-[2px] bg-black/10 dark:bg-white/10 my-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div className="space-y-8">
          {isInitialLoading ? (
            <>
              <FormFieldSkeleton />
              <FormFieldSkeleton />
              <FormFieldSkeleton />
              <FormFieldSkeleton />
            </>
          ) : (
            <>
              <div>
                <Label
                  htmlFor="github-username"
                  className="font-space font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/50 dark:text-white/50 mb-3 block"
                >
                  GitHub Username
                </Label>
                <Input
                  id="github-username"
                  value={activeUserData.username}
                  readOnly
                  className="bg-black/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 text-black dark:text-white focus:border-red-500 focus:ring-0 rounded-none transition-colors duration-300 p-4 font-space h-auto cursor-not-allowed"
                />
              </div>

              <div>
                <Label
                  htmlFor="name"
                  className="font-space font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/50 dark:text-white/50 mb-3 block"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={
                    activeUserData.name ||
                    "Name not available. Update your GitHub profile."
                  }
                  readOnly
                  className="bg-black/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 text-black dark:text-white focus:border-red-500 focus:ring-0 rounded-none transition-colors duration-300 p-4 font-space h-auto cursor-not-allowed"
                />
              </div>

              <div>
                <Label
                  htmlFor="job-role"
                  className="font-space font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs text-black/50 dark:text-white/50 mb-3 block"
                >
                  Job Role
                </Label>
                <Select
                  value={selectedJobRole}
                  onValueChange={setSelectedJobRole}
                >
                  <SelectTrigger className="w-full bg-transparent border-2 border-black/20 dark:border-white/20 text-black dark:text-white hover:border-black dark:hover:border-white transition-colors duration-300 focus:ring-0 focus:border-red-500 rounded-none h-auto p-4 font-space">
                    <SelectValue placeholder="Select a job role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#050505] border-2 border-black dark:border-white rounded-none">
                    {JOB_ROLES.map((role) => (
                      <SelectItem
                        key={role}
                        value={role}
                        className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer font-space text-sm text-black dark:text-white rounded-none"
                      >
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <CitySearchInput
                cityInput={cityInput}
                onCityInputChange={setCityInput}
                cities={cities}
                isLoadingCities={isLoadingCities}
                cityError={cityError}
                onCitySelect={handleCitySelect}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
              />
            </>
          )}
        </div>
        {isInitialLoading ? (
          <ReviewSectionSkeleton />
        ) : (
          <ReviewSection
            review={review}
            rating={rating}
            onReviewChange={handleReviewChange}
            onRatingChange={setRating}
          />
        )}
      </div>
      <div className="w-full h-[2px] bg-black/10 dark:bg-white/10 my-12" />

      <div className="space-y-8">
        <div className="flex items-start justify-between gap-6 p-6 border-2 border-black/10 dark:border-white/10">
          <div>
            <h3 className="font-syne text-xl uppercase tracking-widest font-bold text-black dark:text-white mb-2">
              Profile Visibility
            </h3>
            <p className="font-space text-sm text-gray-600 dark:text-gray-400">
              Allow others to see your profile details and listings.
            </p>
          </div>
          {isInitialLoading ? (
            <div className="w-12 h-6">
              <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20" />
            </div>
          ) : (
            <Switch
              checked={profileInformationData.profile_visibility}
              onCheckedChange={(checked: boolean) => {
                setProfileInformationData((prev) => ({
                  ...prev,
                  profile_visibility: checked,
                }));
              }}
              className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-black/20 dark:data-[state=unchecked]:bg-white/20 border-2 border-transparent hover:border-black dark:hover:border-white rounded-none transition-all duration-300"
            />
          )}
        </div>

        <div className="flex items-start justify-between gap-6 p-6 border-2 border-black/10 dark:border-white/10">
          <div>
            <h3 className="font-syne text-xl uppercase tracking-widest font-bold text-black dark:text-white mb-2">
              Auto-repackage on code change
            </h3>
            <p className="font-space text-sm text-gray-600 dark:text-gray-400">
              Automatically repackage your listed projects when you push code
              changes to GitHub.
            </p>
          </div>
          {isInitialLoading ? (
            <div className="w-12 h-6">
              <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20" />
            </div>
          ) : (
            <Switch
              checked={profileInformationData.auto_repackage_on_push}
              onCheckedChange={(checked: boolean) => {
                setProfileInformationData((prev) => ({
                  ...prev,
                  auto_repackage_on_push: checked,
                }));
              }}
              className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-black/20 dark:data-[state=unchecked]:bg-white/20 border-2 border-transparent hover:border-black dark:hover:border-white rounded-none transition-all duration-300"
            />
          )}
        </div>
      </div>
    </>
  );
}
