import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({ value = 0, onChange }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(value || 0);

  // Atualiza o estado se a prop "value" mudar
  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`star ${star <= (hovered || selected) ? "active" : ""}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => {
            setSelected(star);
            if (onChange) onChange(star);
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
