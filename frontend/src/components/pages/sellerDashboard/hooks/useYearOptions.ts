export const useYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );
};
