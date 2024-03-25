import { useState } from 'react';
import { expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

const Component = () => {

    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)}>Decrease</button>
            <div>{count}</div>
        </div>
    );
};

describe('Home', () => {
    it('should render correctly', () => {
        const { getByText } = render(<Component />);

        expect(getByText('Increase')).toBeInTheDocument();
        expect(getByText('Decrease')).toBeInTheDocument();
        expect(getByText('0')).toBeInTheDocument();
        fireEvent.click(getByText('Increase'));
        expect(getByText('1')).toBeInTheDocument();
        fireEvent.click(getByText('Decrease'));
        expect(getByText('0')).toBeInTheDocument();

    });
});
