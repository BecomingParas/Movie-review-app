import React from "react";

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mb-4 sm:mb-8 gap-2">
      <div className="flex items-center gap-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
          {title}
        </h2>
        <div className="w-[40px] sm:w-[60px] h-[2px] bg-red-500 mt-3 sm:mt-4 ml-1" />
      </div>
      {showMore && (
        <button
          onClick={onShowMore}
          className="text-sm font-normal text-white tracking-wider hover:text-red-500 transition-colors"
        >
          SEE MORE
        </button>
      )}
    </div>
  );
};
