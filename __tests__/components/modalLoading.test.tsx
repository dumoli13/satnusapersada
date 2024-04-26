import React from 'react';
import { render } from '@testing-library/react';
import ModalLoading from '@/src/components/ModalLoading';

describe('ModalLoading', () => {
  test('renders ModalLoading component with CircularProgress when open is true', () => {
    const { getByRole } = render(<ModalLoading open />);
    const dialogElement = getByRole('dialog');
    const circularProgressElement = getByRole('progressbar');

    expect(dialogElement).toBeInTheDocument();
    expect(circularProgressElement).toBeInTheDocument();
  });

  test('does not render ModalLoading component when open is false', () => {
    const { queryByRole } = render(<ModalLoading open={false} />);
    const dialogElement = queryByRole('dialog');
    const circularProgressElement = queryByRole('progressbar');

    expect(dialogElement).not.toBeInTheDocument();
    expect(circularProgressElement).not.toBeInTheDocument();
  });
});
