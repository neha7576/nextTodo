type TextProps = {
  children: React.ReactNode;
  variant: "heading" | "subheading" | "body" | "label"  | "regular";
  className? : string
};
const Text = ({ children , variant , className } : TextProps) => {
  const styles = {
    heading: "text-xl font-semibold",
    subheading: "text-m font-medium",
    body: "text-sm",
    label: "text-xs",
    regular: "text-base font-normal",

  };

  return <p className={`${styles[variant]}  ${className}` }>{children}</p>;
  
};

export default Text;