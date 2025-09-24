import React from "react";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

const SectionTitle = ({ title, subtitle, align = "center" }: SectionTitleProps) => {
  const alignment = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <div className={`max-w-2xl mx-auto ${alignment}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};

export default SectionTitle;


