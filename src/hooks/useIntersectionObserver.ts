import { useEffect, useState } from 'react';

const useIntersectionObserver = (
  sectionIds: string[],
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  }
) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds, options]);

  return activeSection;
};

export default useIntersectionObserver;
