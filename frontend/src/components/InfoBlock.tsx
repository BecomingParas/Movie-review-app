// InfoBlock.tsx
import React from "react";

type InfoBlockProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
};

const InfoBlock: React.FC<InfoBlockProps> = ({ label, value, className }) => {
  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">
        {label}
      </h3>
      <div className="text-sm">{value}</div>
    </div>
  );
};

export default InfoBlock;
