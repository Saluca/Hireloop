import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationCard } from "./ApplicationCard";
import type { JobApplication } from "../types";

const baseApp: JobApplication = {
  id: "1",
  company: "Umbrella Corporation",
  jobTitle: "Software Engineer",
  dateApplied: "2024-01-15",
  status: "Applied",
  description: "",
};

const doNothing = () => {};

describe("ApplicationCard", () => {
  test("renders company name and job title", () => {
    render(
      <ApplicationCard
        application={baseApp}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );
    expect(screen.getByText("Umbrella Corporation")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  test("renders formatted date applied", () => {
    render(
      <ApplicationCard
        application={baseApp}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );
    const formatted = new Date("2024-01-15T00:00:00").toLocaleDateString();
    expect(screen.getByText(`Applied: ${formatted}`)).toBeInTheDocument();
  });

  test("renders status badge", () => {
    render(
      <ApplicationCard
        application={baseApp}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );
    expect(
      screen.getByText("Applied", { selector: "span" }),
    ).toBeInTheDocument();
  });

  test("does not show description toggle when description is empty", () => {
    render(
      <ApplicationCard
        application={baseApp}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /show more/i }),
    ).not.toBeInTheDocument();
  });

  test("shows description text when description is provided", () => {
    const app = {
      ...baseApp,
      description: "Exciting role building new features.",
    };
    render(
      <ApplicationCard
        application={app}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );
    expect(
      screen.getByText("Exciting role building new features."),
    ).toBeInTheDocument();
  });

  test("toggles show more and show less when description is provided", async () => {
    const user = userEvent.setup();
    const app = { ...baseApp, description: "Some job description text." };
    render(
      <ApplicationCard
        application={app}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );

    const showMore = screen.getByRole("button", { name: /show more/i });
    expect(showMore).toBeInTheDocument();

    await user.click(showMore);
    expect(
      screen.getByRole("button", { name: /show less/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /show less/i }));
    expect(
      screen.getByRole("button", { name: /show more/i }),
    ).toBeInTheDocument();
  });

  test("calls onDelete with the correct id when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <ApplicationCard
        application={baseApp}
        onUpdateStatus={doNothing}
        onDelete={onDelete}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /delete application/i }),
    );
    expect(onDelete).toHaveBeenCalledWith("1");
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("calls onUpdateStatus with id and selected status when select changes", async () => {
    const user = userEvent.setup();
    const onUpdateStatus = vi.fn();
    render(
      <ApplicationCard
        application={baseApp}
        onUpdateStatus={onUpdateStatus}
        onDelete={doNothing}
      />,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: /update status/i }),
      "Interview",
    );
    expect(onUpdateStatus).toHaveBeenCalledWith("1", "Interview");
  });

  test("status select contains all status options", () => {
    render(
      <ApplicationCard
        application={baseApp}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );
    const select = screen.getByRole("combobox", { name: /update status/i });
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

  test("status select reflects the current application status", () => {
    const app = { ...baseApp, status: "Offer" as const };
    render(
      <ApplicationCard
        application={app}
        onUpdateStatus={doNothing}
        onDelete={doNothing}
      />,
    );
    expect(
      screen.getByRole("combobox", { name: /update status/i }),
    ).toHaveValue("Offer");
  });
});
