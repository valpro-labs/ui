import type { Meta, StoryObj } from '@storybook/react';
import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

import {
  NightMarketPolaroidPoster,
  type NightMarketPolaroidPosterProps,
} from '@/components/blocks/night-market-polaroid-poster';
import type { NightMarketOffer } from '@/components/blocks/night-market-offer';

const offers: NightMarketOffer[] = [
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: '靈爭鬪魂 鐮刀',
    iconUrl: 'https://media.valorant-api.com/weaponskinchromas/252c202e-4f8f-c064-8059-0ea0c851cc3c/fullrender.png',
    originalPrice: 3550,
    discountedPrice: 2343,
    discountPercent: 34,
    weaponCategory: 'EEquippableCategory::Melee',
  },
  {
    tierLabel: 'EXCLUSIVE',
    tierColor: 'rgb(245, 149, 91)',
    name: 'Glitchpop Phantom',
    iconUrl: 'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 925,
    discountPercent: 48,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'DELUXE',
    tierColor: 'rgb(0, 153, 135)',
    name: '鉻風引擎 短管',
    iconUrl: 'https://media.valorant-api.com/weaponskinchromas/d48011de-4ccc-18e8-6352-e18cd9d02b6c/fullrender.png',
    originalPrice: 1275,
    discountedPrice: 1020,
    discountPercent: 20,
    weaponCategory: 'EEquippableCategory::Sidearm',
  },
  {
    tierLabel: 'PREMIUM', tierColor: 'rgb(209, 84, 141)', name: 'Champions Judge', iconUrl: 'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png', originalPrice: 1775, discountedPrice: 1510, discountPercent: 15, weaponCategory: 'EEquippableCategory::Shotgun',
  },
  {
    tierLabel: 'EXCLUSIVE', tierColor: 'rgb(245, 149, 91)', name: 'Reaver Vandal', iconUrl: 'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png', originalPrice: 1775, discountedPrice: 888, discountPercent: 50, weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM', tierColor: 'rgb(209, 84, 141)', name: 'RGX Phantom', iconUrl: 'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png', originalPrice: 1775, discountedPrice: 1245, discountPercent: 30, weaponCategory: 'EEquippableCategory::Rifle',
  },
];

const longNameOffers = offers.map((offer, index) => ({
  ...offer,
  name: [
    'Glitchpop Champions Edition Signature Vandal Variant',
    'Reaver Sovereign Limited Anniversary Phantom Collection',
    'SuperExtremelyLongUnbrokenSkinNameWithNoSpaces-Sheriff',
    'Sentinels of Light Ruination Protocol Spectre',
    'Prelude to Chaos Doodle Buds Tactical Knife',
    'Radiant Entertainment System Retro Future Operator',
  ][index] ?? offer.name,
}));

const meta: Meta<typeof NightMarketPolaroidPoster> = {
  title: 'Blocks/NightMarketPolaroidPoster',
  component: NightMarketPolaroidPoster,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'desktop' } },
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export default meta;
type Story = StoryObj<typeof NightMarketPolaroidPoster>;

function PosterWithDownload(args: NightMarketPolaroidPosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (!posterRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, pixelRatio: 1 });
      const link = document.createElement('a');
      link.download =
        `night-market-polaroid-${args.playerTag.replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'poster'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export polaroid poster as PNG:', err);
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
        {busy ? 'Generating…' : 'Download PNG'}
      </button>
      <div ref={posterRef}>
        <NightMarketPolaroidPoster {...args} />
      </div>
    </div>
  );
}

export const Default: Story = {
  args: { offers, playerTag: '@N0CT#TW1' },
  render: (args) => <PosterWithDownload {...args} />,
};

/** Verifies long offer names shrink within the reserved one-line card name area. */
export const LongNames: Story = {
  args: { offers: longNameOffers, playerTag: '@N0CT#TW1' },
  render: (args) => <PosterWithDownload {...args} />,
};
