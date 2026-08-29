import type { Meta, StoryObj } from '@storybook/react';
import { getFontEmbedCSS, toPng } from 'html-to-image';
import { useRef, useState } from 'react';

import {
  MatchDetailPoster,
  type MatchDetailPosterProps,
} from '@/components/blocks/match-detail-poster';

const jettPortrait =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png';
const jettIcon =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
const reynaIcon =
  'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';
const havenSplash =
  'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/splash.png';
const bindSplash =
  'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/splash.png';
const ascendantRankColor = 'rgb(106, 226, 175)';
const unrankedRankColor = 'rgb(237, 233, 226)';

function PosterWithDownload(args: MatchDetailPosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const posterWidth = args.width ?? 1080;
  const posterHeight = args.height ?? 1920;

  async function handleDownload() {
    if (!posterRef.current) return;
    setBusy(true);
    try {
      // Make the export use the same loaded font faces as the live poster.
      // Without this, html-to-image can fall back while rendering its SVG
      // foreignObject and change the width of large score text.
      await document.fonts.ready;
      const fontEmbedCSS = await getFontEmbedCSS(posterRef.current);
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 1,
        fontEmbedCSS,
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
      <div
        ref={posterRef}
        style={{
          width: posterWidth,
          height: posterHeight,
          overflow: 'visible',
        }}>
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
    dateLabel: 'August 21, 2026',
    rankColor: ascendantRankColor,
    rankLabel: 'ASCENDANT 1',
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
      { label: 'KAST', value: '82%' },
    ],
    secondaryMetrics: [
      { label: 'FIRST BLOOD', value: 5 },
      { label: 'PLANTS', value: 4 },
      { label: 'DEFUSES', value: 2 },
      { label: 'KAST', value: '82%' },
    ],
    firstDeaths: 2,
    comparisons: [
      { label: 'ACS', value: 324, delta: '+28', playerPercent: 78, benchmarkPercent: 66 },
      { label: 'ADR', value: 186, delta: '-8', playerPercent: 58, benchmarkPercent: 63 },
      { label: 'K/D', value: '2.00', delta: '+0.68', playerPercent: 72, benchmarkPercent: 50 },
      { label: 'HS%', value: '34%', delta: '-3%', playerPercent: 54, benchmarkPercent: 60 },
      { label: 'KAST', value: '82%', delta: '+8%', playerPercent: 80, benchmarkPercent: 62 },
    ],
    moments: [
      { label: 'OPENING DUELS', value: '5 / 2', description: 'FK / FD · +3 ENTRY DIFF' },
      { label: 'MULTI-KILLS', value: '4K×1 · 3K×2 · 2K×4', description: '7 MULTI-KILL ROUNDS' },
      { label: 'OBJECTIVE IMPACT', value: '4 / 2', description: 'PLANTS / DEFUSES' },
      { label: 'ROUND IMPACT', value: 812, description: 'BEST ROUND · COMBAT SCORE · ROUND 18' },
    ],
    insights: [
      { text: 'ENTRY IMPACT', color: 'rgb(34, 255, 197)' },
      { text: 'MULTI-KILL THREAT', color: 'rgb(255, 185, 82)' },
      { text: 'OBJECTIVE PLAYER', color: 'rgb(34, 255, 197)' },
      { text: 'HIGH IMPACT', color: 'rgb(34, 255, 197)' },
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
    dateLabel: 'August 21, 2026',
    rankColor: unrankedRankColor,
    rankLabel: 'UNRATED',
    mapBackgroundUrl: bindSplash,
    agentIconUrl: reynaIcon,
    agentName: 'Reyna',
    playerTag: 'N0CT#TW1',
    kills: 19,
    deaths: 17,
    assists: 6,
    primaryMetrics: [
      { label: 'ACS', value: 271 },
      { label: 'ADR', value: 158 },
      { label: 'HS%', value: '29%' },
      { label: 'KAST', value: '69%' },
    ],
    secondaryMetrics: [
      { label: 'FIRST BLOOD', value: 2 },
      { label: 'PLANTS', value: 3 },
      { label: 'DEFUSES', value: 0 },
      { label: 'KAST', value: '69%' },
    ],
    firstDeaths: 4,
    comparisons: [
      { label: 'ACS', value: 271, delta: '+11', playerPercent: 66, benchmarkPercent: 61 },
      { label: 'ADR', value: 158, delta: '-1', playerPercent: 62, benchmarkPercent: 63 },
      { label: 'K/D', value: '1.12', delta: '-0.18', playerPercent: 48, benchmarkPercent: 56 },
      { label: 'HS%', value: '29%', delta: '+2%', playerPercent: 72, benchmarkPercent: 68 },
      { label: 'KAST', value: '69%', delta: '-9%', playerPercent: 58, benchmarkPercent: 72 },
    ],
    moments: [
      { label: 'OPENING DUELS', value: '2 / 4', description: 'FK / FD · -2 ENTRY DIFF' },
      { label: 'MULTI-KILLS', value: '3K×1 · 2K×2', description: '3 MULTI-KILL ROUNDS' },
      { label: 'OBJECTIVE IMPACT', value: '3 / 0', description: 'PLANTS / DEFUSES' },
      { label: 'ROUND IMPACT', value: 775, description: 'BEST ROUND · COMBAT SCORE · ROUND 11' },
    ],
    insights: [
      { text: 'AGGRESSIVE ENTRY', color: 'rgb(240, 203, 116)' },
      { text: 'MULTI-KILL THREAT', color: 'rgb(255, 185, 82)' },
      { text: 'LOW SURVIVAL', color: 'rgb(255, 70, 85)' },
      { text: 'OBJECTIVE PLAYER', color: 'rgb(34, 255, 197)' },
    ],
  },
  render: (args) => <PosterWithDownload {...args} />,
};

export const Draw: Story = {
  args: {
    outcomeLabel: 'DRAW',
    result: 'draw',
    myTeamScore: 12,
    enemyTeamScore: 12,
    mapName: 'Ascent',
    modeLabel: 'Unrated',
    durationLabel: '44:08',
    dateLabel: 'August 22, 2026',
    rankColor: unrankedRankColor,
    rankLabel: 'UNRATED',
    mapBackgroundUrl: havenSplash,
    playerTag: 'N0CT#TW1',
    kills: 22,
    deaths: 22,
    assists: 8,
    primaryMetrics: [
      { label: 'ACS', value: 248 },
      { label: 'ADR', value: 161 },
      { label: 'HS%', value: '31%' },
      { label: 'KAST', value: '74%' },
    ],
    secondaryMetrics: [
      { label: 'FIRST BLOODS', value: 3 },
      { label: 'PLANTS', value: 4 },
      { label: 'DEFUSES', value: 3 },
      { label: 'KAST', value: '74%' },
    ],
    firstDeaths: 3,
    comparisons: [
      { label: 'ACS', value: 248, delta: '+4', playerPercent: 68, benchmarkPercent: 64 },
      { label: 'ADR', value: 161, delta: '-6', playerPercent: 58, benchmarkPercent: 62 },
      { label: 'K/D', value: '1.00', delta: '0.00', playerPercent: 50, benchmarkPercent: 50 },
      { label: 'HS%', value: '31%', delta: '+1%', playerPercent: 66, benchmarkPercent: 62 },
      { label: 'KAST', value: '74%', delta: '-4%', playerPercent: 62, benchmarkPercent: 68 },
    ],
    moments: [
      { label: 'OPENING DUELS', value: '3 / 3', description: 'FK / FD · EVEN' },
      { label: 'MULTI-KILLS', value: '3K×1 · 2K×2', description: '3 MULTI-KILL ROUNDS' },
      { label: 'OBJECTIVE IMPACT', value: '4 / 3', description: 'PLANTS / DEFUSES' },
      { label: 'ROUND IMPACT', value: 701, description: 'BEST ROUND · COMBAT SCORE · ROUND 20' },
    ],
    insights: [
      { text: 'EVEN OPENER', color: 'rgb(240, 203, 116)' },
      { text: 'MULTI-KILL THREAT', color: 'rgb(255, 185, 82)' },
      { text: 'OBJECTIVE PLAYER', color: 'rgb(34, 255, 197)' },
      { text: 'STEADY IMPACT', color: 'rgb(240, 203, 116)' },
    ],
  },
  render: (args) => <PosterWithDownload {...args} />,
};

export const Chinese: Story = {
  args: {
    outcomeLabel: '勝利',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 10,
    mapName: '遺落境地',
    modeLabel: '競技模式',
    durationLabel: '42:17',
    dateLabel: '2026年8月21日',
    rankColor: ascendantRankColor,
    rankLabel: '超凡 1',
    mapBackgroundUrl: havenSplash,
    agentIconUrl: jettIcon,
    agentName: '捷特',
    playerTag: 'N0CT#TW1',
    kills: 28,
    deaths: 14,
    assists: 7,
    primaryMetrics: [
      { label: 'ACS', value: 324 },
      { label: 'ADR', value: 186 },
      { label: 'HS%', value: '34%' },
      { label: 'KAST', value: '82%' },
    ],
    secondaryMetrics: [
      { label: '首殺', value: 5 },
      { label: '下包', value: 4 },
      { label: '拆包', value: 2 },
      { label: 'KAST', value: '82%' },
    ],
    comparisons: [
      { label: 'ACS', value: 324, delta: '+28', playerPercent: 78, benchmarkPercent: 66 },
      { label: 'ADR', value: 186, delta: '-8', playerPercent: 58, benchmarkPercent: 63 },
      { label: 'K/D', value: '2.00', delta: '+0.68', playerPercent: 72, benchmarkPercent: 50 },
      { label: '爆頭率', value: '34%', delta: '-3%', playerPercent: 54, benchmarkPercent: 60 },
      { label: 'KAST', value: '82%', delta: '+8%', playerPercent: 80, benchmarkPercent: 62 },
    ],
    moments: [
      { label: '開局對槍', value: '5 / 2', description: '首殺 / 首死 · 進攻差 +3' },
      { label: '多殺表現', value: '4K×1 · 3K×2 · 2K×4', description: '共 7 回合多殺' },
      { label: '目標影響', value: '4 / 2', description: '下包 / 拆包' },
      { label: '回合影響', value: 812, description: '最佳回合 · 戰鬥分數 · 第 18 回合' },
    ],
    insights: [
      { text: '進攻核心', color: 'rgb(34, 255, 197)' },
      { text: '多殺威脅', color: 'rgb(255, 185, 82)' },
      { text: '目標執行者', color: 'rgb(34, 255, 197)' },
      { text: '高影響力', color: 'rgb(34, 255, 197)' },
    ],
    labels: {
      vsLobby: '對比大廳',
      matchMoments: '比賽亮點',
    },
  },
  render: (args) => <PosterWithDownload {...args} />,
};
