import React from "react";
import Link from "next/link";

const SubjectTag = ({
  subject,
  slug,
}: {
  subject: string | undefined;
  slug: string;
}) => {
  return (
    <Link
      href={`/ai-team/${slug}`}
      className="text-xs bg-violet-700 text-white px-2 py-1 rounded-sm text-nowrap"
    >
      {subject}
    </Link>
  );
};

export default SubjectTag;
