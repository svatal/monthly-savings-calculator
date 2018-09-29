import { expect } from "chai";
import * as p from "../src/processor";

describe("processor", () => {
  describe("consolidate", () => {
    it("keeps the first element unchanged", () => {
      let result = p.consolidate([beerIn2Months, moreBeersIn5Months]);
      expect(result[0]).to.deep.equal(beerIn2Months);
    });
    it("second element have aggregated cost", () => {
      let result = p.consolidate([beerIn2Months, moreBeersIn5Months]);
      expect(result[1]).to.deep.equal({
        cost: beerIn2Months.cost + moreBeersIn5Months.cost,
        inMonths: 5,
        name: "beer + more beer"
      });
    });
    it("orders the elements by due time", () => {
      let result = p.consolidate([moreBeersIn5Months, beerIn2Months]);
      expect(result[0]).to.deep.equal(beerIn2Months);
    });
    it("merges items with same due time", () => {
      let result = p.consolidate([moreBeersIn5Months, carIn5Months]);
      expect(result).to.deep.equal([
        {
          cost: moreBeersIn5Months.cost + carIn5Months.cost,
          inMonths: 5,
          name: "more beer + car"
        }
      ]);
    });
    it("items are merged even when there is item inbetween", () => {
      let result = p.consolidate([
        moreBeersIn5Months,
        houseInTwoYears,
        carIn5Months
      ]);
      expect(result).to.have.lengthOf(2);
    });
  });

  describe("calculateSavingsNeeded", () => {
    describe("single target", () => {
      it("produces expected result", () => {
        let result = p.calculateSavingsNeeded([beerIn2Months]);
        expect(result).to.deep.equal([
          {
            value: beerIn2Months.cost / beerIn2Months.inMonths,
            fromMonth: 1,
            tillMonth: beerIn2Months.inMonths
          }
        ]);
      });
    });

    describe("small target, big target", () => {
      it("results in single saving amount", () => {
        let consolidated = p.consolidate([
          { cost: 100, inMonths: 2, name: "" },
          { cost: 400, inMonths: 5, name: "" }
        ]);
        let result = p.calculateSavingsNeeded(consolidated);
        expect(result).to.be.deep.equal([
          {
            value: 100,
            fromMonth: 1,
            tillMonth: 5
          }
        ]);
      });
    });

    describe("big target, small target", () => {
      it("results in different saving amounts", () => {
        let consolidated = p.consolidate([
          { cost: 400, inMonths: 2, name: "" },
          { cost: 100, inMonths: 6, name: "" }
        ]);
        let result = p.calculateSavingsNeeded(consolidated);
        expect(result).to.be.deep.equal([
          {
            value: 200,
            fromMonth: 1,
            tillMonth: 2
          },
          {
            value: 25,
            fromMonth: 3,
            tillMonth: 6
          }
        ]);
      });
    });

    describe("big target, small target, small target", () => {
      it("merges small targets", () => {
        let consolidated = p.consolidate([
          { cost: 400, inMonths: 2, name: "" },
          { cost: 100, inMonths: 6, name: "" },
          { cost: 100, inMonths: 10, name: "" }
        ]);
        let result = p.calculateSavingsNeeded(consolidated);
        expect(result).to.be.deep.equal([
          {
            value: 200,
            fromMonth: 1,
            tillMonth: 2
          },
          {
            value: 25,
            fromMonth: 3,
            tillMonth: 10
          }
        ]);
      });
    });

    describe("big target, medium target, small target", () => {
      it("every target is met separately", () => {
        let consolidated = p.consolidate([
          { cost: 400, inMonths: 2, name: "" },
          { cost: 200, inMonths: 6, name: "" },
          { cost: 100, inMonths: 10, name: "" }
        ]);
        let result = p.calculateSavingsNeeded(consolidated);
        expect(result).to.be.deep.equal([
          {
            value: 200,
            fromMonth: 1,
            tillMonth: 2
          },
          {
            value: 50,
            fromMonth: 3,
            tillMonth: 6
          },
          {
            value: 25,
            fromMonth: 7,
            tillMonth: 10
          }
        ]);
      });
    });
  });
});

const beerIn2Months = { cost: 100, inMonths: 2, name: "beer" };
const moreBeersIn5Months = { cost: 500, inMonths: 5, name: "more beer" };
const carIn5Months = { cost: 10000, inMonths: 5, name: "car" };
const houseInTwoYears = { cost: 5000000, inMonths: 24, name: "house" };
