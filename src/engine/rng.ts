export class RNG {
  private state: number;

  constructor(seed: string) {
    this.state = xfnv1a(seed)();
  }

  next(): number {
    // mulberry32
    let t = (this.state += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    return r;
  }

  int(min: number, maxInclusive: number): number {
    const r = this.next();
    return min + Math.floor(r * (maxInclusive - min + 1));
  }

  pick<T>(arr: T[]): T {
    if (arr.length === 0) throw new Error("RNG.pick called with empty array");
    return arr[this.int(0, arr.length - 1)];
  }

  weightedPick<T extends { weight: number }>(arr: T[]): T {
    const total = arr.reduce((a, b) => a + Math.max(0, b.weight), 0);
    if (total <= 0) return arr[0];
    let roll = this.next() * total;
    for (const item of arr) {
      roll -= Math.max(0, item.weight);
      if (roll <= 0) return item;
    }
    return arr[arr.length - 1];
  }
}

// Hash seed -> 32-bit
function xfnv1a(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += h << 13; h ^= h >>> 7;
    h += h << 3; h ^= h >>> 17;
    h += h << 5;
    return h >>> 0;
  };
}
