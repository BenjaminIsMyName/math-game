import { render, screen, cleanup } from "@testing-library/react";
import Question from "../components/Question";
import "@testing-library/jest-dom";

afterEach(cleanup);

for (let i = 0; i < 100; i++)
  describe("Question", () => {
    it("creates only questions that their answer is between 1-3", () => {
      render(<Question setAnswer={() => {}} score={0} />);
      const res = eval(screen.getByTestId("question").innerHTML);
      expect(res).toBeLessThan(4);
      expect(res).toBeGreaterThan(0);
    });
  });

// same as above, different approach
describe("Question", () => {
  it("creates only questions that their answer is between 1-3", () => {
    const { getByTestId } = render(<Question setAnswer={() => {}} score={0} />);
    const res = eval(getByTestId("question").innerHTML);
    expect(res).toBeLessThan(4);
    expect(res).toBeGreaterThan(0);
  });
});
