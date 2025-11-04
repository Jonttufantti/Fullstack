import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {part.name} ({part.exerciseCount})
          </h3>
          <p>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <h3>
            {part.name} ({part.exerciseCount})
          </h3>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <h3>
            {part.name} ({part.exerciseCount})
          </h3>
          <p>{part.description}</p>
          <p>
            Background material:{" "}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      );

    case "special":
      return (
        <div>
          <h3>
            {part.name} ({part.exerciseCount})
          </h3>
          <p>{part.description}</p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      const _exhaustiveCheck: never = part;
      return _exhaustiveCheck;
  }
};

export default Part;
