export const privateRepoPrefix = (userId: string) => {
  return `${"privateRepo_"}${userId}`;
};

export const profileInformationPrefix = (userId: string) => {
  return `${"profileInformation_"}${userId}`;
};
