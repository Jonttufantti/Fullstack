import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Todo from "./Todo";

describe("Todo component", () => {
  test("renders todo text", () => {
    const todo = {
      text: "Learn Docker",
      done: false,
    };

    render(<Todo todo={todo} onDelete={() => {}} onComplete={() => {}} />);

    const element = screen.getByText("Learn Docker");
    expect(element).toBeDefined();
  });

  test('shows "Set as done" button when todo is not done', () => {
    const todo = {
      text: "Learn Docker",
      done: false,
    };

    render(<Todo todo={todo} onDelete={() => {}} onComplete={() => {}} />);

    const button = screen.getByText("Set as done");
    expect(button).toBeDefined();
  });

  test('shows "This todo is done" text when todo is done', () => {
    const todo = {
      text: "Learn Docker",
      done: true,
    };

    render(<Todo todo={todo} onDelete={() => {}} onComplete={() => {}} />);

    const element = screen.getByText("This todo is done");
    expect(element).toBeDefined();
  });
});
