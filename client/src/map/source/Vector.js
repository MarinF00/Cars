
import { Vector as VectorSource } from 'ol/source';

function Vector({ features }) {
    return new VectorSource({
        features
    });
}

export default Vector;