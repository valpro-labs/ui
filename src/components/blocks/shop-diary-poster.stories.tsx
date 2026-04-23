import type { Meta, StoryObj } from '@storybook/react';
import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

import {
  ShopDiaryPoster,
  type ShopDiaryOffer,
  type ShopDiaryPosterProps,
} from '@/components/blocks/shop-diary-poster';

const OFFERS: ShopDiaryOffer[] = [
  {
    index: '01',
    tierColor: 'rgb(90, 159, 226)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
    name: 'Immortalized Vandal',
    price: 1775,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    index: '02',
    tierColor: 'rgb(0, 153, 135)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png',
    name: 'Task Force 809 Frenzy',
    price: 1275,
    weaponCategory: 'EEquippableCategory::Sidearm',
  },
  {
    index: '03',
    tierColor: 'rgb(209, 84, 141)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    name: 'Valorant Go! Vol. 2 Operator',
    price: 2175,
    weaponCategory: 'EEquippableCategory::Sniper',
  },
  {
    index: '04',
    tierColor: 'rgb(245, 149, 91)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png',
    name: 'Doombringer Odin',
    price: 2475,
    weaponCategory: 'EEquippableCategory::Heavy',
  },
];

function PosterWithDownload(args: ShopDiaryPosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  // The poster itself is cross-platform and doesn't load fonts; the
  // Caveat display face is a Storybook-only dep so we inject the
  // Google-fonts stylesheet here instead of inside the component.

  async function handleDownload() {
    if (!posterRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        // `pixelRatio: 1` — the poster is already authored at 1080×1920,
        // so no extra upscaling is needed.
        pixelRatio: 1,
      });
      const slug = args.dateLabel
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const link = document.createElement('a');
      link.download = `shop-diary-${slug || 'poster'}.png`;
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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap"
      />
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
        <ShopDiaryPoster {...args} />
      </div>
    </div>
  );
}

const meta: Meta<typeof ShopDiaryPoster> = {
  title: 'Blocks/ShopDiaryPoster',
  component: ShopDiaryPoster,
  parameters: { layout: 'centered' },
  args: {
    offers: OFFERS,
    brandLabel: 'VALPRO',
    issueLabel: 'Daily Offer',
    dateLabel: 'APR 23 · 2026',
  },
};

export default meta;
type Story = StoryObj<typeof ShopDiaryPoster>;

/**
 * Full 1080×1920 share poster wrapping today's four daily offers.
 * Offer data (names, prices, chroma URLs, tier colors) mirrors
 * `Pages/Store` so the same skins appear across stories.
 *
 * Click **Download PNG** to export the poster as a 1080×1920 image,
 * ready to share. Uses `html-to-image` to inline cross-origin weapon
 * renders before rasterising.
 */
export const Default: Story = {
  render: (args) => <PosterWithDownload {...args} />,
};

/**
 * Stress test for name overflow — each tile carries a progressively longer
 * name so you can see how the handwritten-font name block handles two-line,
 * three-line, and pathological inputs (including an unbroken hyphen-heavy
 * string with no word boundaries).
 */
export const LongNames: Story = {
  args: {
    offers: [
      {
        ...OFFERS[0],
        name: 'Glitchpop 2.0 Elder Flame Vandal',
      },
      {
        ...OFFERS[1],
        name: 'Reaver Champions Edition Signature Frenzy Variant',
      },
      {
        ...OFFERS[2],
        name: 'Recon Limited Anniversary Showdown Collector Operator Signature',
      },
      {
        ...OFFERS[3],
        name: 'SuperExtremelyLongUnbrokenSkinNameWithNoSpaces-Odin',
      },
    ],
  },
  render: (args) => <PosterWithDownload {...args} />,
};
