import type { Meta, StoryObj } from '@storybook/react';
import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

import {
  MatchDetailPoster,
  type MatchDetailPosterProps,
} from '@/components/blocks/match-detail-poster';

const jettPortrait =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png';
const jettIcon =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayiconsmall.png';
const havenSplash =
  'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/splash.png';
const bindSplash =
  'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/splash.png';

function PosterWithDownload(args: MatchDetailPosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (!posterRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 1,
      });
      const link = document.createElement('a');
      link.download = `match-detail-${args.mapName.toLowerCase()}-${args.outcomeLabel.toLowerCase()}.png`;
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
        {busy ? 'Generating...' : 'Download PNG'}
      </button>
      <div ref={posterRef}>
        <MatchDetailPoster {...args} />
      </div>
    </div>
  );
}

const meta: Meta<typeof MatchDetailPoster> = {
  title: 'Blocks/MatchDetailPoster',
  component: MatchDetailPoster,
  parameters: { layout: 'centered' },
  args: {
    brandLabel: 'VALPRO',
    outcomeLabel: 'VICTORY',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 10,
    mapName: 'Haven',
    modeLabel: 'Competitive',
    durationLabel: '42:17',
    mapBackgroundUrl: havenSplash,
    agentPortraitUrl: jettPortrait,
    agentIconUrl: jettIcon,
    agentName: 'Jett',
    playerTag: 'N0CT#TW1',
    kills: 28,
    deaths: 14,
    assists: 7,
    primaryMetrics: [
      { label: 'ACS', value: 324 },
      { label: 'ADR', value: 186 },
      { label: 'HS%', value: '34%' },
      { label: 'RATING', value: '1.42' },
    ],
    secondaryMetrics: [
      { label: 'FIRST BLOOD', value: 5 },
      { label: 'PLANTS', value: 4 },
      { label: 'DEFUSES', value: 2 },
      { label: 'KAST', value: '82%' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof MatchDetailPoster>;

export const Default: Story = {
  render: (args) => <PosterWithDownload {...args} />,
};

export const Defeat: Story = {
  args: {
    outcomeLabel: 'DEFEAT',
    result: 'loss',
    myTeamScore: 8,
    enemyTeamScore: 13,
    mapName: 'Bind',
    durationLabel: '37:06',
    mapBackgroundUrl: bindSplash,
    playerTag: 'N0CT#TW1',
    kills: 19,
    deaths: 17,
    assists: 6,
    primaryMetrics: [
      { label: 'ACS', value: 271 },
      { label: 'ADR', value: 158 },
      { label: 'HS%', value: '29%' },
      { label: 'RATING', value: '1.09' },
    ],
    secondaryMetrics: [
      { label: 'FIRST BLOOD', value: 2 },
      { label: 'PLANTS', value: 3 },
      { label: 'DEFUSES', value: 0 },
      { label: 'KAST', value: '69%' },
    ],
  },
  render: (args) => <PosterWithDownload {...args} />,
};
