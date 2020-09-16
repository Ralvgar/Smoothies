/*export class SmoothieNeuralNet {
    constructor() {
        this.net = new NeuralNetwork({hiddenLayers: [3], activation: 'sigmoid'});
    }
    train(smoothies) {
        const trainingData = smoothies.map(smoothie => {
            const input = {};
            Object.keys(Ingredient).forEach((key) => {
                input[key] = smoothie.smoothie.indexOf(key) !== -1 ? 1 : 0;
            });
            return {
                input,
                output: {score: smoothie.score}
            }
        });
        this.net.train(trainingData);
    }
    predict(smoothie) {
        const input = {};
        Object.keys(Ingredient).forEach((key) => {
            input[key] = smoothie.indexOf(key) !== -1 ? 1 : 0;
        });
        return this.net.run(input)
    }
}*/

