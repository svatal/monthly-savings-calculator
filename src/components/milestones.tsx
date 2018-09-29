import * as React from "react";
import * as d from "../data";
import * as Table from "react-bootstrap/lib/Table";
import TableHead from "./tableHead";
import TableRow from "./tableRow";

interface IProps {
  consolidatedTargets: d.ITarget[];
  savings: d.IMonthlySavings[];
}

export default function({ consolidatedTargets, savings }: IProps) {
  function saved(month: number) {
    let i = 0;
    let sum = 0;
    while (savings[i].tillMonth < month) {
      sum +=
        savings[i].value * (savings[i].tillMonth - savings[i].fromMonth + 1);
      i++;
    }
    return sum + savings[i].value * (month - savings[i].fromMonth + 1);
  }

  return (
    <div>
      <h2>Savings milestones</h2>
      {savings.length === 0 && "No savings needed yet. Add a target."}
      <Table bordered striped>
        {savings.length > 0 && (
          <TableHead
            columns={[
              "Month",
              "Reached target(s)",
              "Needed cost",
              "Spare savings",
              "Total saved"
            ]}
          />
        )}
        <tbody>
          {consolidatedTargets.map(t => (
            <TableRow
              data={[
                t.inMonths,
                t.name,
                t.cost,
                saved(t.inMonths) - t.cost,
                saved(t.inMonths)
              ]}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
