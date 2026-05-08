import type { Meta, StoryObj } from '@storybook/react';
import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

import {
  NightMarketPoster,
  type NightMarketPosterProps,
} from '@/components/blocks/night-market-poster';

const meta: Meta<typeof NightMarketPoster> = {
  title: 'Blocks/NightMarketPoster',
  component: NightMarketPoster,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NightMarketPoster>;

const offers = [
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Prime Vandal',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 1170,
    discountPercent: 34,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'EXCLUSIVE',
    tierColor: 'rgb(245, 149, 91)',
    name: 'Glitchpop Neon Ultraviolet Phantom X',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 925,
    discountPercent: 48,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Oni Guardian',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png',
    originalPrice: 1275,
    discountedPrice: 995,
    discountPercent: 22,
    weaponCategory: 'EEquippableCategory::Sidearm',
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Champions 2024 Sovereign Judge',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 1510,
    discountPercent: 15,
    weaponCategory: 'EEquippableCategory::Shotgun',
  },
  {
    tierLabel: 'EXCLUSIVE',
    tierColor: 'rgb(245, 149, 91)',
    name: 'Reaver Vandal',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 888,
    discountPercent: 50,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'RGX 11z Pro Neon Overdrive Phantom',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 1245,
    discountPercent: 30,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
];

function PosterWithDownload(args: NightMarketPosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (!posterRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, pixelRatio: 1 });
      const link = document.createElement('a');
      link.download = `night-market-${args.playerTag.replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'poster'}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export poster as PNG:', err);
      window.alert('Failed to export poster. See console for details.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <button
        type="button"
        onClick={handleDownload}
        disabled={busy}
        style={{
          padding: '8px 16px',
          background: busy ? 'rgba(255, 70, 85, 0.6)' : 'rgb(255, 70, 85)',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.08em',
          cursor: busy ? 'wait' : 'pointer',
        }}>
        {busy ? 'Generating…' : 'Download JPG'}
      </button>
      <div ref={posterRef}>
        <NightMarketPoster {...args} />
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {
    offers,
    countdownValue: '72H 00M',
    playerTag: '@N0CT#TW1',
  },
  render: (args) => <PosterWithDownload {...args} />,
};
