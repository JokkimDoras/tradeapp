import { test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddTrade from "../component/addtrade/AddTrade";
import { toast } from "sonner";

// Mock global hooks/packages
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("../hooks/useSidebar", () => ({
  useSidebar: () => ({ toggleSidebar: vi.fn() }),
}));

vi.mock("../hooks/useUser", () => ({
  useUser: () => ({
    user: { default_lot_size: 0.1, risk_per_trade: 1.0 },
  }),
}));

const mockAddTrade = vi.fn();
const mockUpdateTrade = vi.fn();

vi.mock("../hooks/useTrade", () => ({
  default: () => ({
    addTrade: mockAddTrade,
    updateTrade: mockUpdateTrade,
  }),
}));

vi.mock("../hooks/useScreenshot", () => ({
  default: () => ({ uploadScreenshots: vi.fn() }),
}));

// test case 

test('should block submission and show an error toast if required fields are missing', async () => {
  const mockSetIsOpen = vi.fn();
  const { container } = render(<AddTrade setIsOpen={mockSetIsOpen}/>);

  const form = container.querySelector("form");
  if (!form) throw new Error("Form element not found");
  
  fireEvent.submit(form);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('All Inputs Must be Filled');
  });

  expect(mockAddTrade).not.toHaveBeenCalled();
});


test("should successfully submit valid data and convert inputs to numbers", async () => {
  const mockSetIsOpen = vi.fn();
  const { container } = render(<AddTrade setIsOpen={mockSetIsOpen} />);

  const form = container.querySelector("form");
  if (!form) throw new Error("Form element not found");

  const assetInput = screen.getByPlaceholderText("Search assets (e.g., BTC/USD)...");
    fireEvent.change(assetInput, { target: { value: "GBP/USD" } });

  const dropdownOption = screen.getByRole("button", { name: /GBP\/USD/i });
  fireEvent.click(dropdownOption);

  const entryInput = container.querySelector('input[name="entry_price"]');
  const lotInput = screen.getByPlaceholderText("1.00");
  const stopLossInput = container.querySelector('input[name="stop_loss"]');
  const takeProfitInput = container.querySelector('input[name="take_profit"]');

  if (!entryInput || !lotInput) throw new Error("Required inputs missing");

  fireEvent.change(entryInput, { target: { value: "1.2500" } });
  fireEvent.change(lotInput, { target: { value: "1.00" } });
  
  if (stopLossInput) fireEvent.change(stopLossInput, { target: { value: "1.2400" } });
  if (takeProfitInput) fireEvent.change(takeProfitInput, { target: { value: "1.2700" } });

  fireEvent.submit(form);

  await waitFor(() => {
    expect(mockAddTrade).toHaveBeenCalledWith(
      expect.objectContaining({
        currency_pair: "GBP/USD",
        entry_price: 1.25,
        stop_loss: 1.24,
        take_profit: 1.27,
        lot_size: 1,
      })
    );
  });

  expect(toast.success).toHaveBeenCalledWith("New Trade was Created");
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});

test("renders add trade page", () => {
  render(<AddTrade setIsOpen={() => {}} />);
  expect(screen.getByText(/New Position Node/i)).toBeTruthy();
});