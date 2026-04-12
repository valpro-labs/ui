import type { Meta, StoryObj } from '@storybook/react';
import { CaretRight } from 'phosphor-react';

import {
  WEAPON_CATEGORY_WIDTH_GRID,
  WeaponCategoryGrid,
  type WeaponCategoryGridSection,
} from '@/components/blocks/weapon-category-grid';

const weaponIcon = (uuid: string) =>
  `https://media.valorant-api.com/weapons/${uuid}/displayicon.png`;

const buddyIcon = (levelUuid: string) =>
  `https://media.valorant-api.com/buddylevels/${levelUuid}/displayicon.png`;

// Task Force 809 Buddy
const taskForceBuddy = buddyIcon('6c3b1a9e-4067-7ed6-fc6c-fea61e0a057c');
// RGX 11z Pro Buddy
const rgxBuddy = buddyIcon('a3043ec2-4a5b-ca46-d8f6-0399f1e52565');

const SIDEARM = 'EEquippableCategory::Sidearm';
const SMG = 'EEquippableCategory::SMG';
const SHOTGUN = 'EEquippableCategory::Shotgun';
const RIFLE = 'EEquippableCategory::Rifle';
const MELEE = 'EEquippableCategory::Melee';
const SNIPER = 'EEquippableCategory::Sniper';
const HEAVY = 'EEquippableCategory::Heavy';

const sections: WeaponCategoryGridSection[] = [
  {
    key: SIDEARM,
    title: 'Sidearms',
    items: [
      {
        key: 'classic',
        imageUrl: weaponIcon('29a0cfab-485b-f5d5-779a-b59f85e204a8'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SIDEARM],
      },
      {
        key: 'shorty',
        imageUrl: weaponIcon('42da8ccc-40d5-affc-beec-15aa47b42eda'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SIDEARM],
      },
      {
        key: 'frenzy',
        imageUrl: weaponIcon('44d4e95c-4157-0037-81b2-17841bf2e8e3'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SIDEARM],
      },
      {
        key: 'ghost',
        imageUrl: weaponIcon('1baa85b4-4c70-1284-64bb-6481dfc3bb4e'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SIDEARM],
        buddyIconUrl: taskForceBuddy,
      },
      {
        key: 'sheriff',
        imageUrl: weaponIcon('e336c6b8-418d-9340-d77f-7a9e4cfe0702'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SIDEARM],
      },
    ],
  },
  {
    key: SMG,
    title: 'SMGs',
    items: [
      {
        key: 'stinger',
        imageUrl: weaponIcon('f7e1b454-4ad4-1063-ec0a-159e56b58941'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SMG],
        buddyIconUrl: rgxBuddy,
      },
      {
        key: 'spectre',
        imageUrl: weaponIcon('462080d1-4035-2937-7c09-27aa2a5c27a7'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SMG],
      },
    ],
  },
  {
    key: SHOTGUN,
    title: 'Shotguns',
    items: [
      {
        key: 'bucky',
        imageUrl: weaponIcon('910be174-449b-c412-ab22-d0873436b21b'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SHOTGUN],
      },
      {
        key: 'judge',
        imageUrl: weaponIcon('ec845bf4-4f79-ddda-a3da-0db3774b2794'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SHOTGUN],
      },
    ],
  },
  {
    key: RIFLE,
    title: 'Rifles',
    items: [
      {
        key: 'bulldog',
        imageUrl: weaponIcon('ae3de142-4d85-2547-dd26-4e90bed35cf7'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
      },
      {
        key: 'guardian',
        imageUrl: weaponIcon('4ade7faa-4cf1-8376-95ef-39884480959b'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
      },
      {
        key: 'phantom',
        imageUrl: weaponIcon('ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
        buddyIconUrl: taskForceBuddy,
      },
      {
        key: 'vandal',
        imageUrl: weaponIcon('9c82e19d-4575-0200-1a81-3eacf00cf872'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
      },
    ],
  },
  {
    key: MELEE,
    title: 'Melee',
    items: [
      {
        key: 'melee',
        imageUrl: weaponIcon('2f59173c-4bed-b6c3-2191-dea9b58be9c7'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[MELEE],
      },
    ],
  },
  {
    key: SNIPER,
    title: 'Sniper Rifles',
    items: [
      {
        key: 'marshal',
        imageUrl: weaponIcon('c4883e50-4494-202c-3ec3-6b8a9284f00b'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SNIPER],
      },
      {
        key: 'outlaw',
        imageUrl: weaponIcon('5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SNIPER],
      },
      {
        key: 'operator',
        imageUrl: weaponIcon('a03b24d3-4319-996d-0f8c-94bbfba1dfc7'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[SNIPER],
      },
    ],
  },
  {
    key: HEAVY,
    title: 'Machine Guns',
    items: [
      {
        key: 'ares',
        imageUrl: weaponIcon('55d8a0f4-4274-ca67-fe2c-06ab45efdf58'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[HEAVY],
      },
      {
        key: 'odin',
        imageUrl: weaponIcon('63e6c2b6-4a8e-869c-3d4c-e38355226584'),
        widthPercent: WEAPON_CATEGORY_WIDTH_GRID[HEAVY],
      },
    ],
  },
];

const ChevronIcon = () => <CaretRight size={14} weight="bold" color="#9ca3af" />;

const meta: Meta<typeof WeaponCategoryGrid> = {
  title: 'Blocks/WeaponCategoryGrid',
  component: WeaponCategoryGrid,
  argTypes: {
    isLoading: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponCategoryGrid>;

export const Default: Story = {
  args: {
    sections,
    chevronIcon: <ChevronIcon />,
  },
};

export const Loading: Story = {
  args: {
    sections,
    isLoading: true,
  },
};

export const SingleCategory: Story = {
  args: {
    sections: [sections[3]!],
    chevronIcon: <ChevronIcon />,
  },
};

/**
 * Every weapon has an equipped gun buddy — demonstrates the bottom-left
 * buddy icon that the loadout screen shows when a charm is attached.
 */
export const WithBuddies: Story = {
  args: {
    sections: [
      {
        key: RIFLE,
        title: 'Rifles',
        items: [
          {
            key: 'vandal',
            imageUrl: weaponIcon('9c82e19d-4575-0200-1a81-3eacf00cf872'),
            widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
            buddyIconUrl: taskForceBuddy,
          },
          {
            key: 'phantom',
            imageUrl: weaponIcon('ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a'),
            widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
            buddyIconUrl: rgxBuddy,
          },
          {
            key: 'guardian',
            imageUrl: weaponIcon('4ade7faa-4cf1-8376-95ef-39884480959b'),
            widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
            buddyIconUrl: rgxBuddy,
          },
          {
            key: 'bulldog',
            imageUrl: weaponIcon('ae3de142-4d85-2547-dd26-4e90bed35cf7'),
            widthPercent: WEAPON_CATEGORY_WIDTH_GRID[RIFLE],
            buddyIconUrl: taskForceBuddy,
          },
        ],
      },
    ],
    chevronIcon: <ChevronIcon />,
  },
};
