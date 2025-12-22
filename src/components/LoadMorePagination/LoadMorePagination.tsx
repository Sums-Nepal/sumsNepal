import React from "react";
import Button from "../Button/Button";

interface loadMorePaginationProps {
  onClick: () => void;
  disabled: boolean;
  text?: string;
}

const LoadMorePagination: React.FC<loadMorePaginationProps> = ({ onClick, disabled, text }) => {
  return <Button onClick={onClick} disabled={disabled} className="bg-orange-500 text-white">{text}</Button>;
};

export default LoadMorePagination;
