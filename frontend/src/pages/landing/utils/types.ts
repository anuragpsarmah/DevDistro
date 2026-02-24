export interface FAQItem {
  question: string;
  answer: string;
}

export interface featuredReviewType {
  username: string;
  profile_image_url: string;
  job_role: string;
  review_description: string;
  review_stars: number;
}

export interface HeaderProps {
  handleAuthNavigate: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}
