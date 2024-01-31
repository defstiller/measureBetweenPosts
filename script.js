function calculateMetalCuts() {
    const wholeWall = parseInt(document.getElementById('wholeWall').value, 10);
    const fractionalWall = parseFraction(document.getElementById('fractionalWall').value);

    if (isNaN(wholeWall) || isNaN(fractionalWall)) {
        alert('Please enter valid numbers for the wall length.');
        return;
    }

    let wallLength = wholeWall + fractionalWall;

    let numberOfPosts = parseInt(document.getElementById('numberOfPosts').value, 10);

    // Retrieve the sizes for the first and last posts
    let firstPostSize = parseInt(document.getElementById('firstPostSize').value, 10);
    let lastPostSize = parseInt(document.getElementById('lastPostSize').value, 10);

    // Adjust the total post width calculation
    let totalPostWidth = (numberOfPosts - 2) * 2 + firstPostSize + lastPostSize; // 2 inches is the standard width

    let usableLength = wallLength - totalPostWidth;
    let numberOfGaps = numberOfPosts - 1;
    let cutLength = usableLength / numberOfGaps;

    // Convert cutLength to mixed fraction for display
    const cutLengthMixedFraction = decimalToMixedFraction(cutLength);
    let centersDisplay = calculatePostCenters(numberOfPosts, cutLength);
    document.getElementById('cutLengthResult').textContent = cutLengthMixedFraction;
    document.getElementById('gapsNumber').textContent = numberOfGaps;
    document.getElementById('postCenters').textContent = centersDisplay;
    document.getElementById('results').style.display = 'block';
}

function calculatePostCenters(numberOfPosts, cutLength) {
    if (numberOfPosts <= 2) {
        return "No center post";
    }

    // Calculate the position of the first center
    let firstCenter = cutLength + 1; // Position after the first post
    return decimalToMixedFraction(firstCenter);
}


function parseFraction(fractionString) {
    const parts = fractionString.split('/');
    if (parts.length === 2) {
        const numerator = parseInt(parts[0]);
        const denominator = parseInt(parts[1]);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            return numerator / denominator;
        }
    }
    return 0;
}
function decimalToMixedFraction(decimal) {
    const wholePart = Math.floor(decimal);
    const decimalPart = decimal - wholePart;
    const tolerance = 1e-10;

    // Avoiding fractional part if it's very small (close to zero)
    if (decimalPart < tolerance) {
        return `${wholePart}`;
    }

    let numerator = Math.round(decimalPart * 16);
    let denominator = 16;

    const gcd = (a, b) => (b < tolerance ? a : gcd(b, a % b));
    const commonDivisor = gcd(numerator, denominator);

    numerator /= commonDivisor;
    denominator /= commonDivisor;

    // Avoiding whole part if it's zero
    return wholePart === 0 ? `${numerator}/${denominator}` : `${wholePart} ${numerator}/${denominator}`;
}
