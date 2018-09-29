import { ITarget, IMonthlySavings } from "./data";

export function consolidate(inputTargets: ITarget[]): ITarget[] {
  return [...inputTargets].sort((a, b) => a.inMonths - b.inMonths).reduce(
    (consolidated, curr) => {
      let prevTarget = getLastTarget(consolidated);
      if (curr.inMonths != prevTarget.inMonths)
        return [...consolidated, mergeTargets(prevTarget, curr)];
      return [
        ...consolidated.slice(0, consolidated.length - 2),
        mergeTargets(prevTarget, curr)
      ];
    },
    <ITarget[]>[]
  );
}

function getLastTarget(array: ITarget[]): ITarget {
  if (array.length) return array[array.length - 1];
  return {
    cost: 0,
    name: "",
    inMonths: 0
  };
}

function mergeTargets(first: ITarget, second: ITarget): ITarget {
  return {
    cost: first.cost + second.cost,
    inMonths: Math.max(first.inMonths, second.inMonths),
    name: first.name ? `${first.name} + ${second.name}` : second.name
  };
}

export function calculateSavingsNeeded(
  targets: ITarget[],
  alreadyMetTarget: ITarget = { cost: 0, inMonths: 0, name: "" }
): IMonthlySavings[] {
  if (!targets.length) return [];
  let savingsToReachTarget = targets.map(
    t =>
      (t.cost - alreadyMetTarget.cost) /
      (t.inMonths - alreadyMetTarget.inMonths)
  );
  let maxMonthlySavingsNeeded = Math.max(...savingsToReachTarget);
  let constSavingsTo = savingsToReachTarget.lastIndexOf(
    maxMonthlySavingsNeeded
  );
  let coveredTarget = targets[constSavingsTo];
  return [
    {
      value: maxMonthlySavingsNeeded,
      fromMonth: alreadyMetTarget.inMonths + 1,
      tillMonth: coveredTarget.inMonths
    },
    ...calculateSavingsNeeded(targets.slice(constSavingsTo + 1), coveredTarget)
  ];
}
