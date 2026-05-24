function calculateScore(
  maxAcceleration: number,
  maxTilt: number
): number {

  const rawScore =
    100 -
    maxAcceleration * 10 -
    maxTilt * 5;

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(rawScore)
    )
  );
}

describe(
  "Earthquake Stability Score",
  () => {

    test(
      "stable structures score higher",
      () => {

        const score =
          calculateScore(1, 2);

        expect(score).toBe(80);
      }
    );

    test(
      "unstable structures score lower",
      () => {

        const score =
          calculateScore(5, 8);

        expect(score).toBe(10);
      }
    );

    test(
      "score never goes below zero",
      () => {

        const score =
          calculateScore(20, 20);

        expect(score).toBe(0);
      }
    );

    test(
      "score never exceeds 100",
      () => {

        const score =
          calculateScore(-1, -1);

        expect(score).toBe(100);
      }
    );
  }
);
