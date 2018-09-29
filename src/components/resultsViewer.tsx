import * as React from "react";
import * as d from "../data";
import * as Table from "react-bootstrap/lib/Table";
import TableHead from "./tableHead";
import TableRow from "./tableRow";

interface IProps {
  savings: d.IMonthlySavings[];
}

export default function({ savings }: IProps) {
  return (
    <div>
      <h2>Savings schedule</h2>
      {savings.length === 0 && "No savings needed yet. Add a target."}
      <Table style={{ maxWidth: "300px" }} bordered striped>
        {savings.length > 0 && <TableHead columns={["Month(s)", "Savings"]} />}
        <tbody>
          {savings.map(s => (
            <TableRow
              data={[
                s.fromMonth === s.tillMonth
                  ? s.fromMonth
                  : `${s.fromMonth} - ${s.tillMonth}`,
                s.value
              ]}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
