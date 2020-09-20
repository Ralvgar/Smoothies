export class SmoothieNeuralNet {
    constructor() {
        this.net = new brain.NeuralNetwork({ hiddenLayers: [3], activation: 'sigmoid' });
    }
    train(ingredients, smoothies) {
        const trainingData = smoothies.map(smoothie => {
            const input = ingredients.reduce((acc, ingredient) => {
                acc[ingredient] = smoothie.fruits.includes(ingredient) ? 1 : 0;
                return acc;
            }, {})
            return {
                input,
                output: { score: smoothie.value / 4 }
            }
        });
        this.net.train(trainingData);
    }
    predict(ingredients, smoothie) {
        const input = ingredients.reduce((acc, ingredient) => {
            acc[ingredient] = smoothie.includes(ingredient) ? 1 : 0;
            return acc;
        }, {});
        return this.net.run(input)
    }
}

