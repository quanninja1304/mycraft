'use strict';

const T = 0;
const _ = 0xFFFFFFFF;

const SS = {
  h1:'#F5C28D',h2:'#EBB87D',h3:'#3D2B1F',h4:'#6B3A2A',
  h5:'#C1796A',h6:'#8B3A2D',h7:'#A0522D',
  b1:'#3B6BC7',b2:'#2A4E9E',b3:'#5588E8',b4:'#1E3A80',
  p1:'#2D4A99',p2:'#1E3070',p3:'#4060B8',
  r1:'#6B3A2A',r2:'#8B5C3A',
  s1:'#2A1A0A',s2:'#3A2A10',
};

const CP = {
  g1:'#4A8F3F',g2:'#2D6B24',g3:'#6AB55A',g4:'#1A4A14',
  g5:'#3A7030',g6:'#5DA050',
  d1:'#111111',d2:'#222222',
};

const PG = {
  p1:'#F4A4B8',p2:'#E8849A',p3:'#C0607A',
  p4:'#F8C0D0',p5:'#D07090',
  e1:'#111111',
};

const BE = {
  y1:'#F5D800',y2:'#E0C000',y3:'#FFF000',
  b1:'#2B1A00',b2:'#3D2600',
  w1:'#FFFFFF',w2:'#E8E8FF',
  s1:'#CCCCFF',s2:'#AAAAEE',
  o1:'#FF9900',
};

const GB = {
  gt:'#5D9E3A', gl:'#4A8A28', gd:'#6EB848',
  d1:'#8B5C2A', d2:'#7A4D20', d3:'#9C6A35', d4:'#6B3A15',
};

const DS = {
  b1:'#44E8F8',b2:'#22CCEE',b3:'#00AADD',b4:'#0088BB',
  h1:'#8B5C2A',h2:'#6B3A15',
  g1:'#CCCCCC',g2:'#AAAAAA',
  w1:'#FFFFFF',
};

const DI = {
  c1:'#44E8F8',c2:'#22CCEE',c3:'#00AADD',
  c4:'#0088BB',c5:'#AAEEFF',c6:'#88DDFF',
  w1:'#FFFFFF',
};

const HP = {
  r1:'#FF3D3D',r2:'#CC0000',r3:'#FF6666',
  p1:'#FF85B8',p2:'#FF3D7F',
};

const BW = {
  b1:'#8B5C2A',b2:'#6B3A15',b3:'#A07840',
  s1:'#DDDDDD',s2:'#BBBBBB',
  l1:'#F5C28D',
};

const FL = {
  r1:'#DD2222',r2:'#FF3333',r3:'#BB1111',
  g1:'#3A7030',g2:'#2D5A24',g3:'#4A8040',
  y1:'#FFDD00',
};

const SPRITES = {};

SPRITES.grass = {
  w:16, h:16,
  rows:[
    [GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt,GB.gt],
    [GB.gt,GB.gd,GB.gt,GB.gd,GB.gt,GB.gt,GB.gd,GB.gt,GB.gt,GB.gd,GB.gt,GB.gt,GB.gt,GB.gd,GB.gt,GB.gt],
    [GB.gl,GB.gt,GB.gt,GB.gt,GB.gd,GB.gl,GB.gt,GB.gt,GB.gd,GB.gt,GB.gt,GB.gl,GB.gt,GB.gt,GB.gd,GB.gl],
    [GB.gt,GB.gt,GB.gl,GB.gt,GB.gt,GB.gt,GB.gt,GB.gl,GB.gt,GB.gt,GB.gt,GB.gt,GB.gl,GB.gt,GB.gt,GB.gt],
    [GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1,GB.d1],
    [GB.d1,GB.d2,GB.d3,GB.d1,GB.d2,GB.d1,GB.d3,GB.d2,GB.d1,GB.d3,GB.d1,GB.d2,GB.d1,GB.d3,GB.d2,GB.d1],
    [GB.d3,GB.d1,GB.d2,GB.d3,GB.d1,GB.d3,GB.d2,GB.d1,GB.d3,GB.d2,GB.d3,GB.d1,GB.d3,GB.d2,GB.d1,GB.d3],
    [GB.d2,GB.d3,GB.d1,GB.d2,GB.d3,GB.d2,GB.d1,GB.d3,GB.d2,GB.d1,GB.d2,GB.d3,GB.d2,GB.d1,GB.d3,GB.d2],
    [GB.d1,GB.d2,GB.d3,GB.d4,GB.d2,GB.d1,GB.d4,GB.d2,GB.d1,GB.d3,GB.d4,GB.d1,GB.d2,GB.d3,GB.d1,GB.d4],
    [GB.d3,GB.d1,GB.d2,GB.d1,GB.d3,GB.d4,GB.d1,GB.d3,GB.d4,GB.d2,GB.d1,GB.d4,GB.d3,GB.d1,GB.d4,GB.d2],
    [GB.d2,GB.d4,GB.d1,GB.d3,GB.d1,GB.d2,GB.d3,GB.d1,GB.d2,GB.d4,GB.d3,GB.d2,GB.d1,GB.d4,GB.d2,GB.d1],
    [GB.d1,GB.d2,GB.d4,GB.d2,GB.d4,GB.d1,GB.d2,GB.d4,GB.d3,GB.d1,GB.d2,GB.d3,GB.d4,GB.d2,GB.d3,GB.d4],
    [GB.d4,GB.d3,GB.d2,GB.d1,GB.d3,GB.d4,GB.d1,GB.d2,GB.d1,GB.d3,GB.d4,GB.d1,GB.d2,GB.d1,GB.d2,GB.d3],
    [GB.d2,GB.d1,GB.d3,GB.d4,GB.d2,GB.d3,GB.d4,GB.d1,GB.d4,GB.d2,GB.d1,GB.d4,GB.d3,GB.d4,GB.d1,GB.d2],
    [GB.d1,GB.d4,GB.d1,GB.d2,GB.d1,GB.d2,GB.d3,GB.d4,GB.d3,GB.d1,GB.d3,GB.d2,GB.d1,GB.d3,GB.d4,GB.d1],
    [GB.d3,GB.d2,GB.d4,GB.d3,GB.d4,GB.d1,GB.d2,GB.d3,GB.d2,GB.d4,GB.d2,GB.d3,GB.d4,GB.d2,GB.d3,GB.d4],
  ]
};

SPRITES.heart = {
  w:16, h:16,
  rows:[
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,HP.p1,HP.p2,HP.p2,T,T,T,T,HP.p1,HP.p2,HP.p2,HP.p1,T,T,T],
    [T,HP.p2,HP.r3,HP.r1,HP.r1,HP.p2,T,T,HP.p2,HP.r3,HP.r1,HP.r1,HP.r1,HP.p2,T,T],
    [T,HP.p2,HP.r1,HP.r3,HP.r1,HP.r1,HP.p2,HP.p2,HP.r1,HP.r1,HP.r3,HP.r1,HP.r1,HP.p2,T,T],
    [T,HP.p2,HP.r1,HP.r1,HP.r2,HP.r1,HP.r1,HP.r1,HP.r2,HP.r1,HP.r1,HP.r2,HP.r1,HP.p2,T,T],
    [T,T,HP.p2,HP.r1,HP.r2,HP.r1,HP.r1,HP.r1,HP.r1,HP.r2,HP.r1,HP.r1,HP.p2,T,T,T],
    [T,T,T,HP.p2,HP.r1,HP.r1,HP.r2,HP.r1,HP.r1,HP.r1,HP.r2,HP.p2,T,T,T,T],
    [T,T,T,T,HP.p2,HP.r1,HP.r1,HP.r1,HP.r1,HP.r1,HP.p2,T,T,T,T,T],
    [T,T,T,T,T,HP.p2,HP.r1,HP.r2,HP.r1,HP.p2,T,T,T,T,T,T],
    [T,T,T,T,T,T,HP.p2,HP.r1,HP.p2,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,HP.p2,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  ]
};

SPRITES.diamond = {
  w:16, h:16,
  rows:[
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,DI.w1,DI.c5,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,DI.c5,DI.c1,DI.c2,DI.c5,DI.c1,T,T,T,T,T,T],
    [T,T,T,T,DI.c6,DI.c1,DI.c3,DI.c2,DI.c1,DI.c3,DI.c6,T,T,T,T,T],
    [T,T,T,DI.c5,DI.c2,DI.c3,DI.c4,DI.c3,DI.c2,DI.c4,DI.c2,DI.c5,T,T,T,T],
    [T,T,DI.c6,DI.c1,DI.c3,DI.c4,DI.c3,DI.c4,DI.c3,DI.c4,DI.c1,DI.c3,DI.c6,T,T,T],
    [T,T,DI.c5,DI.c2,DI.c4,DI.c3,DI.c4,DI.c3,DI.c4,DI.c3,DI.c2,DI.c4,DI.c5,T,T,T],
    [T,T,T,DI.c6,DI.c1,DI.c3,DI.c4,DI.c3,DI.c4,DI.c3,DI.c1,DI.c6,T,T,T,T],
    [T,T,T,T,DI.c5,DI.c2,DI.c3,DI.c4,DI.c3,DI.c2,DI.c5,T,T,T,T,T],
    [T,T,T,T,T,DI.c6,DI.c1,DI.c3,DI.c1,DI.c6,T,T,T,T,T,T],
    [T,T,T,T,T,T,DI.c5,DI.c2,DI.c5,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,DI.c6,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  ]
};

SPRITES.sword = {
  w:16, h:16,
  rows:[
    [T,T,T,T,T,T,T,T,T,T,T,T,DS.b1,DS.w1,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,DS.b2,DS.b1,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,DS.b1,DS.b3,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,DS.b2,DS.b1,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,DS.b1,DS.b2,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,DS.b2,DS.b1,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,DS.b1,DS.b3,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,DS.b2,DS.b1,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,DS.g1,DS.h1,DS.b1,T,T,T,T,T,T,T,T,T],
    [T,T,T,DS.g1,DS.h2,DS.h1,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,DS.g2,DS.h1,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,DS.h1,DS.h2,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,DS.h2,DS.h1,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [DS.h1,DS.h2,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [DS.h2,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  ]
};

SPRITES.bow = {
  w:16, h:16,
  rows:[
    [T,T,T,T,T,T,T,T,T,T,T,T,BW.b1,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,BW.b2,BW.b3,BW.b1,T,T],
    [T,T,T,T,T,T,T,T,T,T,BW.b1,BW.s1,BW.b2,T,T,T],
    [T,T,T,T,T,T,T,T,T,BW.b3,BW.s1,BW.b1,T,T,T,T],
    [T,T,T,T,T,T,T,T,BW.b1,BW.s2,BW.b2,T,T,T,T,T],
    [T,T,T,T,T,T,T,BW.b2,BW.s1,BW.b3,T,T,T,T,T,T],
    [T,T,T,T,T,T,BW.b3,BW.s2,BW.b1,T,T,T,T,T,T,T],
    [T,T,T,T,T,BW.b1,BW.s1,BW.b2,T,T,T,T,T,T,T,T],
    [T,T,T,T,BW.b2,BW.s2,BW.b3,T,T,T,T,T,T,T,T,T],
    [T,T,T,BW.b3,BW.s1,BW.b1,T,T,T,T,T,T,T,T,T,T],
    [T,T,BW.b1,BW.s2,BW.b2,T,T,T,T,T,T,T,T,T,T,T],
    [T,BW.b2,BW.s1,BW.b3,T,T,T,T,T,T,T,T,T,T,T,T],
    [BW.b3,BW.s2,BW.b1,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [BW.b1,BW.b2,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [BW.b2,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  ]
};

SPRITES.flower = {
  w:16, h:16,
  rows:[
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,FL.y1,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,FL.r3,FL.r1,FL.r2,T,T,T,T,T,T,T],
    [T,T,T,T,T,FL.r2,FL.r1,FL.r3,FL.r1,FL.r2,T,T,T,T,T,T],
    [T,T,T,T,FL.r3,FL.r1,FL.r2,FL.r1,FL.r2,FL.r1,FL.r3,T,T,T,T,T],
    [T,T,T,T,FL.r2,FL.r1,FL.r3,FL.r2,FL.r3,FL.r1,FL.r2,T,T,T,T,T],
    [T,T,T,T,T,FL.r3,FL.r1,FL.r2,FL.r1,FL.r3,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,FL.g1,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,FL.g2,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,FL.g3,FL.g1,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,FL.g2,FL.g1,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,FL.g1,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,FL.g2,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,FL.g1,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,FL.g3,T,T,T,T,T,T,T,T],
    [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  ]
};

// ── STEVE (12×24, animated) ──
function steveFrame(legPhase) {
  const S = SS;
  const rows = [];
  // head
  rows.push([T,T,S.r1,S.r2,S.r1,S.r2,S.r1,S.r2,S.r1,T,T,T]);
  rows.push([T,S.r1,S.r2,S.h1,S.h2,S.h1,S.h2,S.h1,S.r2,S.r1,T,T]);
  rows.push([T,S.r2,S.h2,S.h1,S.h2,S.h1,S.h2,S.h1,S.h2,S.r1,T,T]);
  rows.push([T,S.h1,S.h3,S.h3,S.h2,S.h1,S.h2,S.h3,S.h3,S.h1,T,T]);
  rows.push([T,S.h2,S.h1,S.h5,S.h2,S.h1,S.h1,S.h5,S.h1,S.h2,T,T]);
  rows.push([T,S.h1,S.h2,S.h1,S.h2,S.h1,S.h2,S.h1,S.h2,S.h1,T,T]);
  rows.push([T,T,S.h4,S.h2,S.h7,S.h2,S.h7,S.h2,S.h4,T,T,T]);
  rows.push([T,T,T,S.h6,S.h2,S.h1,S.h1,S.h2,S.h6,T,T,T]);
  // body+arms
  rows.push([T,S.b3,S.b1,S.b2,S.b1,S.b2,S.b1,S.b2,S.b1,S.b3,T,T]);
  rows.push([S.b3,S.b1,S.b2,S.b1,S.b2,S.b1,S.b2,S.b1,S.b2,S.b1,S.b3,T]);
  rows.push([S.b2,S.b1,S.b3,S.b2,S.b1,S.b2,S.b1,S.b3,S.b2,S.b1,S.b2,T]);
  rows.push([S.b1,S.b2,S.b1,S.b3,S.b2,S.b1,S.b2,S.b1,S.b3,S.b2,S.b1,T]);
  rows.push([S.b3,S.b1,S.b2,S.b1,S.b3,S.b2,S.b3,S.b1,S.b2,S.b1,S.b3,T]);
  rows.push([S.b2,S.b3,S.b1,S.b2,S.b1,S.b3,S.b1,S.b2,S.b1,S.b3,S.b2,T]);
  rows.push([T,S.b1,S.b2,S.b1,S.b2,S.b3,S.b2,S.b1,S.b2,S.b1,T,T]);
  rows.push([T,S.b2,S.b3,S.b2,S.b3,S.b1,S.b3,S.b2,S.b3,S.b2,T,T]);

  // legs
  if (legPhase === 0) {
    rows.push([T,T,S.p1,S.p2,S.p1,T,T,S.p1,S.p2,S.p1,T,T]);
    rows.push([T,T,S.p2,S.p1,S.p2,T,T,S.p2,S.p1,S.p2,T,T]);
    rows.push([T,T,S.p1,S.p2,S.p1,T,T,S.p1,S.p2,S.p1,T,T]);
    rows.push([T,T,S.p3,S.p1,S.p3,T,T,S.p3,S.p1,S.p3,T,T]);
    rows.push([T,T,T,S.s1,S.s2,T,T,T,S.s1,S.s2,T,T]);
    rows.push([T,T,T,S.s2,S.s1,T,T,T,S.s2,S.s1,T,T]);
    rows.push([T,T,S.s1,S.s1,S.s2,T,T,S.s1,S.s1,S.s2,T,T]);
    rows.push([T,T,S.s2,S.s1,T,T,T,T,S.s2,S.s1,T,T]);
  } else if (legPhase === 1) {
    rows.push([T,T,T,S.p1,S.p2,S.p1,T,S.p1,S.p1,S.p2,T,T]);
    rows.push([T,T,T,S.p2,S.p1,S.p2,T,S.p2,S.p1,S.p2,T,T]);
    rows.push([T,T,T,S.p1,S.p2,S.p1,T,S.p1,S.p2,S.p1,T,T]);
    rows.push([T,T,T,S.p3,S.p1,S.p3,T,S.p3,S.p1,S.p3,T,T]);
    rows.push([T,T,T,T,S.s1,S.s2,T,T,S.s1,S.s2,T,T]);
    rows.push([T,T,T,T,S.s2,S.s1,T,T,S.s2,S.s1,T,T]);
    rows.push([T,T,T,S.s1,S.s2,T,T,T,S.s1,S.s2,T,T]);
    rows.push([T,T,S.s2,S.s1,T,T,T,T,S.s2,S.s1,T,T]);
  } else {
    rows.push([T,T,S.p1,S.p1,S.p2,T,T,T,S.p1,S.p2,S.p1,T]);
    rows.push([T,T,S.p2,S.p1,S.p2,T,T,T,S.p2,S.p1,S.p2,T]);
    rows.push([T,T,S.p1,S.p2,S.p1,T,T,T,S.p1,S.p2,S.p1,T]);
    rows.push([T,T,S.p3,S.p1,S.p3,T,T,T,S.p3,S.p1,S.p3,T]);
    rows.push([T,T,S.s1,S.s2,T,T,T,T,T,S.s1,S.s2,T]);
    rows.push([T,T,S.s2,S.s1,T,T,T,T,T,S.s2,S.s1,T]);
    rows.push([T,T,S.s1,S.s2,T,T,T,T,S.s1,S.s2,T,T]);
    rows.push([T,T,S.s2,S.s1,T,T,T,T,S.s2,S.s1,T,T]);
  }

  return { w:12, h:24, rows };
}

function creeperFrame(legPhase) {
  const C = CP;
  const rows = [];
  rows.push([T,C.g1,C.g2,C.g1,C.g2,C.g3,C.g2,C.g1,C.g2,C.g1,T,T]);
  rows.push([T,C.g2,C.g1,C.g2,C.g1,C.g2,C.g1,C.g2,C.g1,C.g2,T,T]);
  rows.push([T,C.g3,C.g2,C.d1,C.d1,C.g1,C.g2,C.d1,C.d1,C.g3,T,T]);
  rows.push([T,C.g1,C.g2,C.d1,C.d2,C.g2,C.g1,C.d2,C.d1,C.g1,T,T]);
  rows.push([T,C.g2,C.g1,C.g2,C.g1,C.g2,C.g1,C.g2,C.g1,C.g2,T,T]);
  rows.push([T,C.g1,C.g2,C.d1,C.d1,C.d2,C.d1,C.d1,C.g2,C.g1,T,T]);
  rows.push([T,C.g3,C.g1,C.d2,C.d1,C.d2,C.d1,C.d2,C.g1,C.g3,T,T]);
  rows.push([T,C.g2,C.g3,C.g2,C.g1,C.g2,C.g1,C.g2,C.g3,C.g2,T,T]);
  rows.push([T,T,C.g2,C.g1,C.g2,C.g3,C.g2,C.g1,C.g2,T,T,T]);
  rows.push([T,T,C.g1,C.g3,C.g1,C.g2,C.g1,C.g3,C.g1,T,T,T]);
  rows.push([T,T,C.g3,C.g2,C.g3,C.g1,C.g3,C.g2,C.g3,T,T,T]);
  rows.push([T,T,C.g2,C.g1,C.g2,C.g3,C.g2,C.g1,C.g2,T,T,T]);
  if (legPhase===0){
    for(let r=0;r<12;r++) rows.push([T,C.g2,C.g1,T,T,T,T,C.g2,C.g1,T,T,T]);
  } else {
    for(let r=0;r<12;r++){
      rows.push([T,C.g2,C.g1,T,T,T,T,C.g2,C.g1,T,T,T]);
    }
  }
  return { w:12, h:24, rows };
}

function pigFrame(legPhase) {
  const P = PG;
  const rows = [];
  rows.push([T,T,T,P.p1,P.p1,P.p1,P.p1,P.p1,P.p1,P.p1,P.p1,T,T,T,T,T]);
  rows.push([T,T,P.p4,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p4,P.p1,P.p1,T,T,T]);
  rows.push([T,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,T,T]);
  rows.push([P.p4,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p1,P.p2,P.e1,P.p5,T,T]);
  rows.push([P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p2,P.e1,P.p3,P.e1,T,T]);
  rows.push([P.p4,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p1,P.e1,P.p5,P.p1,T,T]);
  rows.push([T,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,T,T,T]);
  rows.push([T,T,P.p4,P.p1,P.p2,P.p1,P.p2,P.p1,P.p2,P.p1,P.p4,T,T,T,T,T]);
  if (legPhase === 0) {
    rows.push([T,T,P.p5,P.p3,T,T,T,T,T,P.p5,P.p3,T,T,T,T,T]);
    rows.push([T,T,P.p3,P.p5,T,T,T,T,T,P.p3,P.p5,T,T,T,T,T]);
    rows.push([T,T,P.p5,P.p3,T,T,T,T,T,P.p5,P.p3,T,T,T,T,T]);
    rows.push([T,T,P.p2,P.p1,T,T,T,T,T,P.p2,P.p1,T,T,T,T,T]);
    rows.push([T,T,P.p3,P.p5,T,T,T,T,T,P.p3,P.p5,T,T,T,T,T]);
    rows.push([T,T,P.p1,P.p2,T,T,T,T,T,P.p1,P.p2,T,T,T,T,T]);
  } else {
    rows.push([T,T,P.p3,P.p5,T,T,T,T,T,P.p5,P.p3,T,T,T,T,T]);
    rows.push([T,T,P.p5,P.p3,T,T,T,T,T,P.p3,P.p5,T,T,T,T,T]);
    rows.push([T,T,P.p3,P.p2,T,T,T,T,T,P.p5,P.p2,T,T,T,T,T]);
    rows.push([T,T,P.p2,P.p1,T,T,T,T,T,P.p2,P.p1,T,T,T,T,T]);
    rows.push([T,T,P.p1,P.p3,T,T,T,T,T,P.p1,P.p3,T,T,T,T,T]);
    rows.push([T,T,P.p3,P.p1,T,T,T,T,T,P.p3,P.p1,T,T,T,T,T]);
  }
  return { w:16, h:14, rows };
}

function beeFrame(wingPhase) {
  const B = BE;
  const rows = [];
  rows.push([T,T,T,T,T,T,T,T,T,T,T,T,T,T]);
  if (wingPhase===0){
    rows.push([T,B.w2,B.w1,B.w2,T,T,T,T,B.w2,B.w1,B.w2,T,T,T]);
    rows.push([B.w2,B.w1,B.s1,B.w1,B.w2,T,T,B.w2,B.w1,B.s1,B.w1,B.w2,T,T]);
    rows.push([T,B.w2,B.w1,B.s2,B.w1,T,T,T,B.w1,B.s2,B.w1,T,T,T]);
  } else {
    rows.push([T,T,T,T,T,T,T,T,T,T,T,T,T,T]);
    rows.push([T,B.w2,B.w1,B.w2,B.w1,B.w2,T,B.w2,B.w1,B.w2,B.w1,T,T,T]);
    rows.push([T,B.w2,B.s1,B.s2,B.w1,T,T,T,B.s1,B.s2,B.w1,T,T,T]);
  }
  rows.push([T,T,T,B.y3,B.y1,B.y2,B.y1,B.y2,B.y1,B.y3,T,T,T,T]);
  rows.push([T,T,B.b2,B.b1,B.b2,B.b1,B.b2,B.b1,B.b2,B.b1,B.b2,T,T,T]);
  rows.push([T,T,B.y2,B.y1,B.y3,B.y1,B.y2,B.y1,B.y3,B.y1,B.y2,T,T,T]);
  rows.push([T,T,B.b1,B.b2,B.b1,B.b2,B.b1,B.b2,B.b1,B.b2,B.b1,T,T,T]);
  rows.push([T,T,T,B.y1,B.y2,B.y3,B.y1,B.y3,B.y2,B.y1,T,T,T,T]);
  rows.push([T,T,T,T,B.b1,B.b2,B.b1,B.b2,B.b1,T,T,T,T,T]);
  rows.push([T,T,T,T,T,T,B.b2,T,T,T,T,T,T,T]);
  rows.push([T,T,T,T,T,T,T,T,T,T,T,T,T,T]);
  return { w:14, h:12, rows };
}

function cowFrame(legPhase) {
  const B = '#111111', W = '#EEEEEE', G = '#888888', U = '#FFB3D4';
  const rows = [];
  rows.push([T,T,T,T,T,T,T,T,T,T,T,B,T,T,T,B]);
  rows.push([T,T,W,W,W,B,W,B,W,W,W,B,W,W,W,B]);
  rows.push([T,T,W,B,B,W,W,B,B,W,W,W,W,B,W,W]);
  rows.push([T,T,W,W,W,W,W,W,W,W,W,W,G,G,G,G]);
  rows.push([T,B,B,W,U,U,W,W,B,B,W,W,G,B,G,B]);
  rows.push([T,B,B,W,U,U,W,W,B,B,W,W,G,G,G,G]);
  rows.push([T,W,W,W,W,W,W,W,W,W,W,W,T,T,T,T]);
  if (legPhase === 0) {
    rows.push([T,T,W,B,T,T,T,T,T,B,W,T,T,T,T,T]);
    rows.push([T,T,B,W,T,T,T,T,T,W,B,T,T,T,T,T]);
    rows.push([T,T,W,B,T,T,T,T,T,B,W,T,T,T,T,T]);
    rows.push([T,T,B,B,T,T,T,T,T,B,B,T,T,T,T,T]);
  } else {
    rows.push([T,T,B,W,T,T,T,T,T,W,B,T,T,T,T,T]);
    rows.push([T,T,W,B,T,T,T,T,T,B,W,T,T,T,T,T]);
    rows.push([T,T,B,W,T,T,T,T,T,W,B,T,T,T,T,T]);
    rows.push([T,T,B,B,T,T,T,T,T,B,B,T,T,T,T,T]);
  }
  return { w:16, h:11, rows };
}

function goatFrame(legPhase) {
  const W = '#E0DDDF', T1 = '#D2B48C', B = '#111111', H = '#CDBA96';
  const rows = [];
  rows.push([T,T,T,T,T,T,T,T,T,T,T,T,T,H,T,H]);
  rows.push([T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W]);
  rows.push([T,T,W,W,W,W,W,W,W,W,W,W,W,B,W,W]);
  rows.push([T,T,W,W,W,W,W,W,W,W,W,W,W,W,W,W]);
  rows.push([T,T,W,W,W,W,W,W,W,W,W,W,W,W,T,T]);
  rows.push([T,T,W,W,W,W,W,W,W,W,W,W,T,T,T,T]);
  if (legPhase === 0) {
    rows.push([T,T,W,T1,T,T,T,T,T,T1,W,T,T,T,T,T]);
    rows.push([T,T,T1,W,T,T,T,T,T,W,T1,T,T,T,T,T]);
    rows.push([T,T,B,B,T,T,T,T,T,B,B,T,T,T,T,T]);
  } else {
    rows.push([T,T,T1,W,T,T,T,T,T,W,T1,T,T,T,T,T]);
    rows.push([T,T,W,T1,T,T,T,T,T,T1,W,T,T,T,T,T]);
    rows.push([T,T,B,B,T,T,T,T,T,B,B,T,T,T,T,T]);
  }
  return { w:16, h:9, rows };
}

function renderSprite(canvas, spriteObj, scale) {
  scale = scale || 2;
  const s = typeof spriteObj === 'function' ? spriteObj(0) : spriteObj;
  canvas.width  = s.w * scale;
  canvas.height = s.h * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  drawRows(ctx, s.rows, scale);
}

function drawRows(ctx, rows, scale) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  rows.forEach((row, ry) => {
    row.forEach((color, cx) => {
      if (!color || color === T) return;
      ctx.fillStyle = color;
      ctx.fillRect(cx * scale, ry * scale, scale, scale);
    });
  });
}

function createMob(type, scale, speed, startX, dir, layer) {
  const canvas = document.createElement('canvas');
  canvas.className = 'mob-canvas';
  layer.appendChild(canvas);

  let frame = 0;
  let x = startX;
  const facing = dir > 0 ? 1 : -1;

  function getSprite(f) {
    const phase = [0,1,0,2][f % 4];
    if (type === 'steve')   return steveFrame(phase);
    if (type === 'creeper') return creeperFrame(phase);
    if (type === 'pig')     return pigFrame(phase);
    if (type === 'bee')     return beeFrame(f % 2);
    if (type === 'cow')     return cowFrame(phase);
    if (type === 'goat')    return goatFrame(phase);
  }

  function draw() {
    const s = getSprite(frame);
    canvas.width  = s.w * scale;
    canvas.height = s.h * scale;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.save();
    if (facing < 0) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    drawRows(ctx, s.rows, scale);
    ctx.restore();
    canvas.style.left = x + 'px';
  }

  draw();

  let lastT = 0;
  const frameMs  = 220;
  const pixelsMs = speed;

  function tick(t) {
    if (!canvas.isConnected) return;
    const dt = t - lastT;
    if (dt > frameMs) {
      frame++;
      draw();
      lastT = t;
    }
    x += dir * pixelsMs * (dt / 1000);
    const W = window.innerWidth;
    if (x > W + 80)  x = -80;
    if (x < -80)     x = W + 80;
    canvas.style.left = x + 'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return canvas;
}

window.MC = {
  SPRITES, renderSprite, drawRows, createMob,
  steveFrame, creeperFrame, pigFrame, beeFrame, cowFrame, goatFrame
};
