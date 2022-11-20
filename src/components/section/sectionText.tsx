interface sectionProps {
  children?: React.ReactNode;
}

export const SectionText = ({ children }: sectionProps) => {
  return (
    <h3 className="  text-justify text-base font-normal leading-relaxed tracking-wider text-gray-900 sm:text-2xl">
      {children}
    </h3>
  );
};
