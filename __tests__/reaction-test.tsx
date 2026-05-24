function compareHands(
  dominant: number,
  nonDominant: number
): string {

  return nonDominant > dominant
    ? "slower"
    : "faster";
}

describe(
  "Reaction Hand Comparison",
  () => {

    test(
      "non-dominant hand is slower",
      () => {

        const result =
          compareHands(200, 300);

        expect(result)
          .toBe("slower");
      }
    );

    test(
      "non-dominant hand is faster",
      () => {

        const result =
          compareHands(300, 200);

        expect(result)
          .toBe("faster");
      }
    );

    test(
      "equal times return faster",
      () => {

        const result =
          compareHands(200, 200);

        expect(result)
          .toBe("faster");
      }
    );
  }
);