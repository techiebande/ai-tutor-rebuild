import { TutorProps } from "@/interfaces/tutorProps";
import Image from "next/image";

export default function TutorCard({ tutor }: { tutor: TutorProps }) {
  return (
    <div className="tutor-card">
      <Image src={tutor.image} alt={tutor.name} width={100} height={100} />
      <h2>{tutor.name}</h2>
      <p>{tutor.expert}</p>
    </div>
  );
}
