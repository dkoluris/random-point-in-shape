const BBox          = require('@turf/bbox');
const Random        = require('@turf/random');
const BooleanWithin = require('@turf/boolean-within');
const Helpers       = require('@turf/helpers');

function createPointWithinShape(points) {
    if (points.length < 3) {
        throw new Error('Not enough points to create a valid polygon');
    }

    if (points[0] !== points[points.length - 1]) {
        points.push(points[0]);
    }

    const polygon = Helpers.polygon([points]);
    const bbox = BBox.default(polygon);
    let position;

    do {
        position = Random.randomPosition(bbox);
    }
    while (!BooleanWithin.default(Helpers.point(position), polygon));

    return position;
}

module.exports = createPointWithinShape;
