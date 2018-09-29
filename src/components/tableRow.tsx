import * as React from "react";

interface IProps {
  key?: string;
  data: React.ReactNode[];
}

export default function({ key, data }: IProps) {
  return (
    <tr key={key}>
      {data.map(text => (
        <td style={{ verticalAlign: "middle" }}>{text}</td>
      ))}
    </tr>
  );
}
