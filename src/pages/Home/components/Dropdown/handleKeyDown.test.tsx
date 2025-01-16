import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./index";

describe("Dropdown Component", () => {
  const itemsDropdown = ["Item 1", "Item 2", "Item 3"];

  it("should select the next item when Down/ArrowDown key is pressed", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};

    render(
      <Dropdown value={null} onChange={jest.fn()} items={itemsDropdown} />
    );

    const opener = screen.getByTestId("dropdown_openerButton");
    userEvent.click(opener);

    await waitFor(() => {
      expect(screen.getAllByRole("option")[0]).toBeVisible();
    });

    const items = screen.getAllByRole("option");
    userEvent.keyboard("{arrowdown}");

    await waitFor(() => {
      expect(items[0]).toHaveAttribute("aria-selected", "true");
    });
  });

  it("should select the previous item when Up/ArrowUp key is pressed", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};

    render(
      <Dropdown value={null} onChange={jest.fn()} items={itemsDropdown} />
    );

    const opener = screen.getByTestId("dropdown_openerButton");
    userEvent.click(opener);

    await waitFor(() => {
      expect(screen.getAllByRole("option")[0]).toBeVisible();
    });

    const items = screen.getAllByRole("option");
    userEvent.keyboard("{arrowdown}");
    userEvent.keyboard("{arrowdown}");
    userEvent.keyboard("{arrowup}");

    await waitFor(() => {
      expect(items[0]).toHaveAttribute("aria-selected", "true");
    });
  });

  it("should select the first item when Home/PageUp key is pressed", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    render(
      <Dropdown value={null} onChange={jest.fn()} items={itemsDropdown} />
    );

    const opener = screen.getByTestId("dropdown_openerButton");
    userEvent.click(opener);

    await waitFor(() => {
      expect(screen.getAllByRole("option")[0]).toBeVisible();
    });

    const items = screen.getAllByRole("option");
    userEvent.keyboard("{home}");

    await waitFor(() => {
      expect(items[0]).toHaveAttribute("aria-selected", "true");
    });
  });

  it("should select the last item when End/PageDown key is pressed", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    render(
      <Dropdown value={null} onChange={jest.fn()} items={itemsDropdown} />
    );

    const opener = screen.getByTestId("dropdown_openerButton");
    userEvent.click(opener);

    await waitFor(() => {
      expect(screen.getAllByRole("option")[0]).toBeVisible();
    });

    const items = screen.getAllByRole("option");
    userEvent.keyboard("{end}");
    await waitFor(() => {
      expect(items[items.length - 1]).toHaveAttribute("aria-selected", "true");
    });
  });
});
