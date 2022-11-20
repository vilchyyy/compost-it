interface headerProps {
  children?: React.ReactNode;
}

export const SectionHeader = ({ children }: headerProps) => {
  return (
    <h3 className="bg-white p-3 text-center text-3xl font-bold md:text-6xl ">
      {children}
    </h3>
  );
};
