import * as React from "react";

interface IProps {
  columns: (string | { header: string; width: number })[];
}

export default function({ columns }: IProps) {
  return (
    <thead>
      <tr>
        {columns.map(
          col =>
            typeof col === "string" ? (
              <th>{col}</th>
            ) : (
              <th style={{ width: `${col.width}px` }}>{col.header}</th>
            )
        )}
      </tr>
    </thead>
  );
}
