import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from '../UserForm';

describe('UserForm Component', () => {
  beforeEach(() => {
    // 重置 mocks
    vi.clearAllMocks();
  });

  it('renders form with all fields and submit button', () => {
    render(<UserForm />);

    // 檢查表單元素是否存在
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors when form submitted with empty fields', async () => {
    render(<UserForm />);

    // 提交空表單
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // 等待驗證錯誤顯示
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<UserForm />);

    // 輸入無效電子郵件
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });

    // 提交表單
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // 檢查錯誤訊息
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for negative age', async () => {
    render(<UserForm />);

    // 輸入負數年齡
    fireEvent.input(screen.getByLabelText(/age/i), {
      target: { value: '-1' },
    });

    // 提交表單
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // 檢查錯誤訊息
    await waitFor(() => {
      expect(screen.getByText(/age must be at least 0/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    // 模擬 window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<UserForm />);

    // 填寫有效數據
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });

    fireEvent.input(screen.getByLabelText(/age/i), {
      target: { value: '25' },
    });

    // 提交表單
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // 驗證表單提交成功
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        expect.stringContaining('John Doe')
      );
      expect(alertMock).toHaveBeenCalledWith(
        expect.stringContaining('john@example.com')
      );
      expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('25'));
    });

    alertMock.mockRestore();
  });
});
