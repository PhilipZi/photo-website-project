/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Layout from './Layout';

describe('Layout component', () => {
	it('should render children', () => {
		const text = 'Click me';
		render(<Layout>{text}</Layout>);
		const layout = screen.getByText(text);
		expect(layout).toBeInTheDocument();
	});
});
