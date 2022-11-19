interface sectionProps {
  children?: React.ReactNode;
}

export const SectionText = ({ children }: sectionProps) => {
  return <h3 className="  text-xl font-normal">{children}</h3>;
};
