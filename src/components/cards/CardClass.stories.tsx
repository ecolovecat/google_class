import type { Meta, StoryObj } from '@storybook/react';

import CardClass from './CardClass';

const meta: Meta<typeof CardClass> = {
    component: CardClass,
};

export default meta;

type Story = StoryObj<typeof CardClass>;

export const SimpleCardClass: Story = {
    args: {
        color: 'red',
        headerUrl:
            'https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg',
        avataUrl: 'https://bit.ly/ryan-florence',
        title: 'Card Title',
        subTitle: 'Card Subtitle',
        ownerName: 'Owner Name',
    },
    render: (args) => <CardClass {...args} />,
};
