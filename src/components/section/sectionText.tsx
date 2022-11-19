interface sectionProps {
  children?: React.ReactNode;
}

export const SectionText = ({ children }: sectionProps) => {
  return (
    <h3 className="  text-justify text-2xl font-normal leading-relaxed tracking-wide text-gray-900">
      {children}
    </h3>
  );
};
