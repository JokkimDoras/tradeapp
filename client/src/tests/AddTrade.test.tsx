import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AddTrade from "../component/addtrade/AddTrade";

vi.mock("../hooks/useSidebar", () => ({
  useSidebar: () => ({
    toggleSidebar: vi.fn(),
  }),
}));
vi.mock("../hooks/useUser", () => ({
  useUser: () => ({
    user: vi.fn(),
  }),
}));
vi.mock("../hooks/useTrade", () => ({
  default: () => ({
    addTrade: vi.fn(),
    updateTrade: vi.fn(),
  }),
}));

test("renders add trade page", () => {
  render(<AddTrade setIsOpen={() => {}} />);

  expect(screen.getByText(/New Position Node/i)).toBeTruthy();
});
