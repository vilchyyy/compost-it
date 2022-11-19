import { useInView } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface sectionProps {
  children?: React.ReactNode;
  setActiveSection: Dispatch<SetStateAction<number>>;
  id: number;
}
export const SectionContainer = ({
  children,
  id,
  setActiveSection,
}: sectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      setActiveSection(id);
    }
  }, [isInView]);
  return (
    <div className="p-14" ref={ref}>
      {children}
    </div>
  );
};
