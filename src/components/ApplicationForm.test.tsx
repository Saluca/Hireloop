import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationForm } from "./ApplicationForm";

const doNothing = () => {};

describe("ApplicationForm", () => {
  test("renders all form fields", () => {
    render(<ApplicationForm onAdd={doNothing} />);
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date applied/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job description/i)).toBeInTheDocument();
  });

  test('has "Applied" as the default status', () => {
    render(<ApplicationForm onAdd={doNothing} />);
    expect(screen.getByRole("combobox", { name: /status/i })).toHaveValue(
      "Applied",
    );
  });

  test("status dropdown contains all status options", () => {
    render(<ApplicationForm onAdd={doNothing} />);
    const select = screen.getByRole("combobox", { name: /status/i });
    const options = Array.from(select.querySelectorAll("option")).map(
      (o) => o.textContent,
    );
    expect(options).toEqual([
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
      "No Answer",
    ]);
  });

  test("does not call onAdd when all required fields are empty", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<ApplicationForm onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: /add application/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("does not call onAdd when company is only whitespace", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<ApplicationForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/company/i), "   ");
    await user.type(screen.getByLabelText(/job title/i), "Engineer");
    await user.type(screen.getByLabelText(/date applied/i), "2024-01-15");

    await user.click(screen.getByRole("button", { name: /add application/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("calls onAdd with correct data when all required fields are filled", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<ApplicationForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/company/i), "Umbrella Corporation");
    await user.type(screen.getByLabelText(/job title/i), "Frontend Engineer");
    await user.type(screen.getByLabelText(/date applied/i), "2024-01-15");
    await user.selectOptions(screen.getByLabelText(/status/i), "Interview");
    await user.type(
      screen.getByLabelText(/job description/i),
      "Exciting role at Umbrella Corporation.",
    );

    await user.click(screen.getByRole("button", { name: /add application/i }));

    expect(onAdd).toHaveBeenCalledWith({
      company: "Umbrella Corporation",
      jobTitle: "Frontend Engineer",
      dateApplied: "2024-01-15",
      status: "Interview",
      description: "Exciting role at Umbrella Corporation.",
    });
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  test("resets all fields to empty after successful submission", async () => {
    const user = userEvent.setup();
    render(<ApplicationForm onAdd={vi.fn()} />);

    await user.type(screen.getByLabelText(/company/i), "Umbrella Corporation");
    await user.type(screen.getByLabelText(/job title/i), "Frontend Engineer");
    await user.type(screen.getByLabelText(/date applied/i), "2024-01-15");
    await user.selectOptions(screen.getByLabelText(/status/i), "Offer");

    await user.click(screen.getByRole("button", { name: /add application/i }));

    expect(screen.getByLabelText(/company/i)).toHaveValue("");
    expect(screen.getByLabelText(/job title/i)).toHaveValue("");
    expect(screen.getByLabelText(/date applied/i)).toHaveValue("");
    expect(screen.getByRole("combobox", { name: /status/i })).toHaveValue(
      "Applied",
    );
    expect(screen.getByLabelText(/job description/i)).toHaveValue("");
  });
});
