import React from "react";

import "./card-tags.css";
const CardTags = ({ tags }) => {
  function tagColor(tag) {
    let color = "";
    switch (tag.name) {
      case "research": {
        color = "red";
        break;
      }
      case "marketing": {
        color = "purple";
        break;
      }
      case "design": {
        color = "green";
        break;
      }
      default:
        break;
    }
    return color;
  }
  return (
    <div className="card-tag-wrapp">
      <div className="card-tag">
        {tags.map((tag) => {
          return (
            <span key={tag.name} style={{ backgroundColor: tagColor(tag) }}>
              {tag.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CardTags;
