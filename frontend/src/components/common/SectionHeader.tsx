import React from "react";
import { FiChevronRight } from "react-icons/fi";

/**
 * Props for the SectionHeader component
 * @interface
 * @property {string} title - The title text to display
 * @property {boolean} [showMore=false] - Whether to show the "See More" button
 * @property {() => void} [onShowMore] - Callback function when "See More" is clicked
 */
interface SectionHeaderProps {
  title: string;
  showMore?: boolean;
  onShowMore?: () => void;
}

/**
 * SectionHeader Component
 *
 * @component
 * @description A consistent header used across different sections of the home page.
 *
 * @param {SectionHeaderProps} props - Component props
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Latest Movies"
 *   showMore={true}
 *   onShowMore={() => console.log('Show more clicked')}
 * />
 * ```
 *
 * Features:
 * - Consistent styling across sections
 * - Optional "See More" button
 * - Responsive design
 * - Red accent line
 *
 * Accessibility:
 * - Semantic heading structure
 * - Proper button labeling
 * - Keyboard navigation support
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showMore = false,
  onShowMore,
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="h-[2px] w-12 bg-primary" />
      </div>

      {showMore && (
        <button
          onClick={onShowMore}
          className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
        >
          View All
          <FiChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
