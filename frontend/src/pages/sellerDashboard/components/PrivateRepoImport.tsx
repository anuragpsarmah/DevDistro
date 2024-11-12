import { useState } from "react";
import { User } from "@/types/types";
import { PrivateRepoData } from "../utils/types";
import { Search, Lock, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RepoImportSkeleton } from "./Skeletons";

interface RepoImportProps {
  userData: User;
  privateRepoData: Array<PrivateRepoData>;
  isLoading: boolean;
  setFormProps: (curr: PrivateRepoData) => void;
}

export default function RepoImport({
  userData,
  privateRepoData,
  isLoading,
  setFormProps,
}: RepoImportProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleImportClick = (index: number) => {
    setFormProps(privateRepoData[index]);
  };

  const filteredRepos = privateRepoData.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center lg:text-left md:text-left">
          Import Git Repository
        </h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300">
            <Github className="h-4 w-4" />
            <span>{userData.username}</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-700 text-gray-300 w-full"
            />
          </div>

          <ScrollArea className="max-h-[80vh] overflow-y-auto rounded-md border border-gray-700">
            <div className="space-y-2 p-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <RepoImportSkeleton key={index} />
                ))
              ) : filteredRepos.length > 0 ? (
                filteredRepos.map((repo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300 font-medium">
                        {repo.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-200 font-medium truncate">
                            {repo.name.length > 30
                              ? repo.name.slice(0, 27) + "..."
                              : repo.name}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Lock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400 text-sm">
                              {repo.updated_at}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        className="bg-gray-800 shrink-0"
                        onClick={() => handleImportClick(index)}
                      >
                        Import
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">
                  No matching repositories found.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
