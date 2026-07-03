// ============================================================
// Shared TypeScript types/interfaces
// ============================================================
// Re-export data types for convenience.
// Add any additional shared types here.
// ============================================================

export type {
  PersonalInfo,
  AboutInfo,
  SocialLink,
  NavItem,
  SkillItem,
  SkillCategoryGroup,
  ThesisStat,
  EducationInfo,
  Project,
} from '@/data/portfolio-data';

// -----------------------------------------------------------
// Generic utility types
// -----------------------------------------------------------

/** Section IDs used for scroll-spy and navigation */
export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'education'
  | 'projects'
  | 'contact';

/** Props common to all section components */
export interface SectionProps {
  id: SectionId;
  className?: string;
}
