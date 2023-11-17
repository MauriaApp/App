import React, { useRef } from "react";
import styles from "./AssociationCard.module.scss";
import { useIntersectionObserver } from "usehooks-ts";
import clsx from "clsx";

type AssociationCardProps = {
  image: string;
  name: string;
  onClick?: () => void;
};

const AssociationCard: React.FC<AssociationCardProps> = ({
  name,
  image,
  onClick,
}) => {
  const cardRef = useRef(null);
  const entry = useIntersectionObserver(cardRef, {});
  const isVisible = entry?.isIntersecting!!;

  return (
    <article
      ref={cardRef}
      className={clsx(
        "card shadow",
        styles["container"],
        isVisible && "glassy"
      )}
      onClick={onClick}
    >
      <img className={styles["image"]} src={image} alt={name} />
      <h3 className={styles["name"]}>{name}</h3>
    </article>
  );
};

export default AssociationCard;
