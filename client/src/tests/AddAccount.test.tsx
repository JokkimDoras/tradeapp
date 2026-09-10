
import { test, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AddAccount from "../component/addAccount/AddAccount";
import { toast } from "sonner";

const mockCreateAccount = vi.fn();
const mockSetIsModalOpen = vi.fn();
const mockToggleSidebar = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("../hooks/useSidebar", () => ({
  useSidebar: () => ({
    toggleSidebar: mockToggleSidebar,
  }),
}));

vi.mock("../hooks/useAccount", () => ({
  default: () => ({
    createAccount: mockCreateAccount,
    setIsModalOpen: mockSetIsModalOpen,
  }),
}));

vi.mock("../component/ui/NavBar", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders add account form", () => {
  render(<AddAccount />);

  expect(
    screen.getByRole("heading", { name: "Add an Account" })
  ).toBeTruthy();

  expect(
    screen.getByPlaceholderText("Personal Live Workspace")
  ).toBeTruthy();

  expect(
    screen.getByPlaceholderText("Prop Firm / IC Markets")
  ).toBeTruthy();

  expect(
    screen.getByPlaceholderText("100000")
  ).toBeTruthy();

  expect(
    screen.getByRole("button", { name: "Save Account" })
  ).toBeTruthy();

  expect(
    screen.getByRole("button", { name: "Cancel" })
  ).toBeTruthy();
});

test("shows error when required fields are missing", async () => {
  render(<AddAccount />);

  fireEvent.click(
    screen.getByRole("button", { name: "Save Account" })
  );

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      "Fill the account details"
    );
  });

  expect(mockCreateAccount).not.toHaveBeenCalled();
});

test("updates account fields correctly", () => {
  render(<AddAccount />);

  const nameInput = screen.getByPlaceholderText(
    "Personal Live Workspace"
  );

  const brokerInput = screen.getByPlaceholderText(
    "Prop Firm / IC Markets"
  );

  const balanceInput = screen.getByPlaceholderText("100000");

  fireEvent.change(nameInput, {
    target: {
      value: "My Trading Account",
    },
  });

  fireEvent.change(brokerInput, {
    target: {
      value: "IC Markets",
    },
  });

  fireEvent.change(balanceInput, {
    target: {
      value: "50000",
    },
  });

  expect(nameInput).toHaveValue("My Trading Account");

  expect(brokerInput).toHaveValue("IC Markets");

  expect(balanceInput).toHaveValue("50000");
});

test("only allows numbers in starting balance", () => {
  render(<AddAccount />);

  const balanceInput = screen.getByPlaceholderText("100000");

  fireEvent.change(balanceInput, {
    target: {
      value: "50abc000xyz",
    },
  });

  expect(balanceInput).toHaveValue("50000");
});

test("creates account with correct data", async () => {
  mockCreateAccount.mockResolvedValue(undefined);

  render(<AddAccount />);

  const nameInput = screen.getByPlaceholderText(
    "Personal Live Workspace"
  );

  const brokerInput = screen.getByPlaceholderText(
    "Prop Firm / IC Markets"
  );

  const balanceInput = screen.getByPlaceholderText("100000");

  const accountTypeSelect = document.querySelector(
    'select[name="account_type"]'
  );

  const currencySelect = document.querySelector(
    'select[name="currency"]'
  );

  if (!accountTypeSelect) {
    throw new Error("Account type select not found");
  }

  if (!currencySelect) {
    throw new Error("Currency select not found");
  }

  fireEvent.change(nameInput, {
    target: {
      value: "Trading Account",
    },
  });

  fireEvent.change(brokerInput, {
    target: {
      value: "IC Markets",
    },
  });

  fireEvent.change(balanceInput, {
    target: {
      value: "50000",
    },
  });

  fireEvent.change(accountTypeSelect, {
    target: {
      value: "live",
    },
  });

  fireEvent.change(currencySelect, {
    target: {
      value: "EUR",
    },
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Save Account" })
  );

  await waitFor(() => {
    expect(mockCreateAccount).toHaveBeenCalledWith({
      name: "Trading Account",
      broker: "IC Markets",
      account_type: "live",
      currency: "EUR",
      starting_balance: "50000",
    });
  });

  expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
});

test("closes modal when cancel is clicked", () => {
  render(<AddAccount />);

  fireEvent.click(
    screen.getByRole("button", { name: "Cancel" })
  );

  expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
});

test("shows Saving while account is being created", async () => {
  let resolveCreateAccount!: () => void;

  mockCreateAccount.mockReturnValue(
    new Promise<void>((resolve) => {
      resolveCreateAccount = resolve;
    })
  );

  render(<AddAccount />);

  const nameInput = screen.getByPlaceholderText(
    "Personal Live Workspace"
  );

  const balanceInput = screen.getByPlaceholderText("100000");

  fireEvent.change(nameInput, {
    target: {
      value: "Trading Account",
    },
  });

  fireEvent.change(balanceInput, {
    target: {
      value: "50000",
    },
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Save Account" })
  );

  expect(
    screen.getByRole("button", { name: "Saving..." })
  ).toBeTruthy();

  expect(
    screen.getByRole("button", { name: "Saving..." })
  ).toBeDisabled();

  resolveCreateAccount();

  await waitFor(() => {
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });
});

