import { useState } from 'react';

/**
 * Manage tooltip state and handlers
 * @param {Object} options - Tooltip configuration
 * @param {number} [options.delay=300] - Delay before showing tooltip
 * @returns {Object} Tooltip state and handlers
 */
const useTooltip = (options = {}) => {
  const { delay = 300 } = options;
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (content, event) => {
    const { clientX, clientY } = event;

    // Prevent multiple tooltip triggers
    const timeoutId = setTimeout(() => {
      setTooltipContent(content);
      setTooltipPosition({ x: clientX, y: clientY });
    }, delay);

    return () => clearTimeout(timeoutId);
  };

  const hideTooltip = () => {
    setTooltipContent(null);
  };

  return {
    tooltipContent,
    tooltipPosition,
    showTooltip,
    hideTooltip
  };
};

export default useTooltip;