interface sectionProps {
  children?: React.ReactNode;
}

export const SectionHeader = ({ children }: sectionProps) => {
  return (
    <h3 className="bg-white p-3 text-center text-5xl font-normal">
      {children}
    </h3>
  );
};
