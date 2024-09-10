class RecintosZoo {

    analisaRecintos(animal, quantidade) {
    }

    constructor() {
        
        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "macaco", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "gazela", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "leao", quantidade: 1 }] }
        ];

        this.animais = {
            leao: { tamanho: 3, bioma: ["savana"], carnivoro: true },
            leopardo: { tamanho: 2, bioma: ["savana"], carnivoro: true },
            crocodilo: { tamanho: 3, bioma: ["rio"], carnivoro: true },
            macaco: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            gazela: { tamanho: 2, bioma: ["savana"], carnivoro: false },
            hipopotamo: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
          };
    }

    analisaRecintos(animal, quantidade) {

        animal = animal.toLowerCase();
    
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }
    
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }
    
        const animalInfo = this.animais[animal];
        let recintosViaveis = [];
    
        this.recintos.forEach(recinto => {
            let espacoOcupado = 0;
            let carnivoroPresente = false;
            let outroAnimalPresente = false;
            let existeMacaco = false;
    
            recinto.animaisExistentes.forEach(existente => {
                espacoOcupado += existente.quantidade * this.animais[existente.especie].tamanho;
                if (this.animais[existente.especie].carnivoro) carnivoroPresente = true;
                if (existente.especie !== "macaco") outroAnimalPresente = true;
                if (existente.especie === "macaco") existeMacaco = true;
            });
    
        
            let espacoNecessario = quantidade * animalInfo.tamanho;
            if (recinto.animaisExistentes.length > 0) {
                espacoNecessario += 1;
            }
    
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado - espacoNecessario;
        
            const biomaValido = animalInfo.bioma.includes(recinto.bioma) || recinto.bioma.includes(animalInfo.bioma.join(" e "));
            const carnivoroCondicao = !carnivoroPresente || (carnivoroPresente && animalInfo.carnivoro);
            const macacoCondicao = animal === "macaco" ? outroAnimalPresente || existeMacaco : true;
            const espacoSuficiente = espacoLivre >= 0;
        
            if (biomaValido && carnivoroCondicao && macacoCondicao && espacoSuficiente) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }

        });
        
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
    
        return { recintosViaveis };
    }

}

export { RecintosZoo as RecintosZoo };
