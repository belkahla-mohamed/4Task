// DraggableCard.jsx
import { useDraggable } from "@dnd-kit/core";

const DraggableCard = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        cursor: "grab",
        touchAction: "none",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableCard;
