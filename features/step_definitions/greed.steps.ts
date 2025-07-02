import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

const SCORE_TRIPLE_ONE = 1000;
const SCORE_TRIPLE_TWO = 200;
const SCORE_TRIPLE_THREE = 300;
const SCORE_TRIPLE_FOUR = 400;
const SCORE_TRIPLE_FIVE = 500;
const SCORE_TRIPLE_SIX = 600;
const SCORE_THREE_PAIR = 800;
const SCORE_STRAIGHT = 1200;
const MULTIPLICATOR_FOUR_SAME_NUMBER = 2;
const MULTIPLICATOR_FIVE_SAME_NUMBER = 4;
const MULTIPLICATOR_SIX_SAME_NUMBER = 8;

const triple_scores: Record<number, number> = {
    1: SCORE_TRIPLE_ONE,
    2: SCORE_TRIPLE_TWO,
    3: SCORE_TRIPLE_THREE,
    4: SCORE_TRIPLE_FOUR,
    5: SCORE_TRIPLE_FIVE,
    6: SCORE_TRIPLE_SIX,
};
let diceRoll: number[] = [];
let score = 0;

function calculateGreedScore(diceRoll: number[]) {
    const diceCounts = new Map<number, number>([
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
    ]);

    diceRoll.forEach((dice) => diceCounts.set(dice, (diceCounts.get(dice) ?? 0) + 1));

    let total = 0;

    if (checkPairs(diceCounts)) {
        return SCORE_THREE_PAIR;
    }

    if (checkStraight(diceCounts)) {
        return SCORE_STRAIGHT;
    }

    total += getScoreTriple(diceCounts);

    return total;
}

function checkPairs(diceCounts: Map<number, number>) {
    let pairCount = 0;

    for (const [, count] of diceCounts.entries()) {
        if (count === 2) {
            pairCount++;
        }
    }

    return pairCount === 3;
}

function checkStraight(diceCounts: Map<number, number>) {
    for (const [, count] of diceCounts.entries()) {
        if (count !== 1) {
            return false;
        }
    }

    return true;
}

function getScoreTriple(diceCounts: Map<number, number>) {
    let score = 0;

    for (const [diceValue, count] of diceCounts.entries()) {
        if (count >= 3) {
            const baseScore = triple_scores[diceValue];

            if (count === 4) {
                score += baseScore * MULTIPLICATOR_FOUR_SAME_NUMBER;
            } else if (count === 5) {
                score += baseScore * MULTIPLICATOR_FIVE_SAME_NUMBER;
            } else if (count === 6) {
                score += baseScore * MULTIPLICATOR_SIX_SAME_NUMBER;
            } else {
                score += baseScore;
            }
        }

        if (count < 3) {
            if (diceValue === 1) {
                score += 100 * count;
            } else if (diceValue === 5) {
                score += 50 * count;
            }
        }
    }

    return score;
}

Given('un lancer de dés {string}', (diceString: string) => {
    diceRoll = JSON.parse(diceString);
});

When('je calcule le score', () => {
    score = calculateGreedScore(diceRoll);
});

Then('le score doit être {int}', (expectedScore: number) => {
    assert.strictEqual(score, expectedScore);
});
