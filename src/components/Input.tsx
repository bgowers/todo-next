"use client";

import { ChangeEvent, FC, FormEvent, MouseEvent } from "react";
import { LoadingSpinner } from "./LoadingSpiner";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  className?: string;
};

export const Input: FC<Props> = ({
  onSubmit,
  onChange,
  value,
  className,
  isLoading,
}) => (
  <div className={`prose form-control ${className}`}>
    <form className="input-group" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="New todo..."
        className="input input-bordered"
        onChange={onChange}
        value={value}
      />
      <button className="btn btn-square" type="submit">
        {isLoading ? (
          <LoadingSpinner className="w-6 h-6" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 16 16"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        )}
      </button>
    </form>
  </div>
);
